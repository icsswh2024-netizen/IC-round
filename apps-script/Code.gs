/**
 * Google Apps Script (Code.gs) สำหรับระบบกำกับติดตาม IC
 * รองรับ: บันทึกผลประเมิน (save), ดึงข้อมูล (getData), ลบรายการ (delete), ล้างทั้งหมด (deleteAll)
 *
 * ★ เวอร์ชันนี้ "map คอลัมน์ด้วยคำสำคัญ (keyword)" เหมือนที่เว็บใช้อ่านข้อมูล
 *   จึงเข้ากับชีตเดิมของคุณได้ และจะ "เพิ่มคอลัมน์ ข้อชื่นชม / ข้อเสนอแนะ ให้อัตโนมัติ"
 *   โดยไม่ยุ่งกับคอลัมน์เดิม (ต่อท้ายเป็นคอลัมน์ใหม่ถ้ายังไม่มี)
 *
 * วิธีติดตั้ง:
 *   1) เปิด Google Sheet ปลายทาง → เมนู ส่วนขยาย (Extensions) → Apps Script
 *   2) สำรองโค้ดเดิมไว้ก่อน (คัดลอกเก็บ) แล้ววางโค้ดนี้แทนทั้งไฟล์ Code.gs
 *   3) ปรับ SHEET_NAME ด้านล่างให้ตรงกับชื่อชีตที่เก็บข้อมูล (ถ้าไม่แน่ใจ ปล่อยว่าง '' จะใช้ชีตแรก)
 *   4) กด Deploy → Manage deployments → แก้ deployment เดิม → Version: New version → Deploy
 *      (สำคัญ: ต้อง "New version" ทุกครั้ง ไม่งั้นโค้ดใหม่จะยังไม่ทำงาน) URL เดิมใช้ได้เหมือนเดิม
 */

// ===== ตั้งค่า =====
var SHEET_NAME = ''; // ชื่อชีตที่เก็บข้อมูล เช่น 'ชีต1' หรือ 'Data' — ถ้าปล่อยว่างจะใช้ชีตแรกของไฟล์

// รายการฟิลด์: key ในข้อมูลที่เว็บส่งมา, คำสำคัญไว้หาคอลัมน์เดิม, ชื่อหัวคอลัมน์ (ใช้เมื่อต้องสร้างใหม่)
var FIELDS = [
  { key: 'timestamp',        kw: ['วัน', 'เวลา', 'timestamp'], name: 'วันที่/เวลา' },
  { key: 'assessmentType',   kw: ['ประเภทแบบประเมิน'],         name: 'ประเภทแบบประเมิน' },
  { key: 'assessorName',     kw: ['ผู้ประเมิน'],               name: 'ผู้ประเมิน' },
  { key: 'deptType',         kw: ['ประเภทหน่วยงาน'],           name: 'ประเภทหน่วยงาน' },
  { key: 'department',       kw: ['หน่วยงานที่รับ'],           name: 'หน่วยงานที่รับการประเมิน' },
  { key: 'numPeople',        kw: ['จำนวนผู้'],                 name: 'จำนวนผู้รับการประเมิน' },
  { key: 'evaluateeRole',    kw: ['ตำแหน่ง'],                  name: 'ตำแหน่ง' },
  { key: 'totalFullScore',   kw: ['คะแนนเต็ม'],                name: 'คะแนนเต็ม' },
  { key: 'totalEarnedScore', kw: ['คะแนนที่ได้'],              name: 'คะแนนที่ได้' },
  { key: 'percentage',       kw: ['ร้อยละ'],                   name: 'ร้อยละ' },
  { key: 'commendation',     kw: ['ชื่นชม'],                   name: 'ข้อชื่นชม' },        // ★ ใหม่
  { key: 'suggestion',       kw: ['เสนอแนะ'],                  name: 'ข้อเสนอแนะ' },       // ★ ใหม่
  { key: 'fullDataJSON',     kw: ['json', 'ข้อมูลดิบ'],        name: 'ข้อมูลดิบ (JSON)' },
  { key: 'rawAnswers',       kw: ['คำตอบดิบ', 'คำตอบ'],        name: 'คำตอบดิบ (JSON)' }
];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (SHEET_NAME) {
    var s = ss.getSheetByName(SHEET_NAME);
    if (s) return s;
  }
  return ss.getSheets()[0];
}

function readHeaders_(sh) {
  var lastCol = sh.getLastColumn();
  if (lastCol === 0) return [];
  return sh.getRange(1, 1, 1, lastCol).getValues()[0].map(function (h) { return String(h); });
}

function findColByKeyword_(headers, keywords) {
  for (var i = 0; i < headers.length; i++) {
    var h = headers[i].toLowerCase();
    for (var k = 0; k < keywords.length; k++) {
      if (h.indexOf(keywords[k].toLowerCase()) !== -1) return i;
    }
  }
  return -1;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ===== ดึงข้อมูลทั้งหมด (เว็บเรียก ?action=getData) =====
function doGet(e) {
  try {
    var sh = getSheet_();
    var data = sh.getDataRange().getValues();
    return json_({ status: 'success', data: data });
  } catch (err) {
    return json_({ status: 'error', message: String(err) });
  }
}

// ===== บันทึก / ลบ =====
function doPost(e) {
  var lock = LockService.getScriptLock();
  try { lock.waitLock(20000); } catch (ignore) {}
  try {
    var body = JSON.parse(e.postData.contents);
    var sh = getSheet_();

    // --- ล้างทั้งหมด ---
    if (body.action === 'deleteAll') {
      var last = sh.getLastRow();
      if (last > 1) sh.deleteRows(2, last - 1);
      return json_({ status: 'success', message: 'deletedAll' });
    }

    // --- ลบรายการเดียว ---
    if (body.action === 'delete') {
      var data = sh.getDataRange().getValues();
      if (data.length < 2) return json_({ status: 'success', message: 'empty' });
      var headers = data[0].map(String);
      var jsonCol = findColByKeyword_(headers, ['json', 'ข้อมูลดิบ']);
      var deptCol = findColByKeyword_(headers, ['หน่วยงานที่รับ']);
      var timeCol = findColByKeyword_(headers, ['วัน', 'เวลา', 'timestamp']);
      for (var r = data.length - 1; r >= 1; r--) {
        var match = false;
        if (jsonCol !== -1 && data[r][jsonCol]) {
          try { var rec = JSON.parse(data[r][jsonCol]); if (String(rec.id) === String(body.id)) match = true; } catch (er) {}
        }
        if (!match && timeCol !== -1 && deptCol !== -1) {
          if (String(data[r][timeCol]) === String(body.timestampStr) && String(data[r][deptCol]) === String(body.department)) match = true;
        }
        if (match) { sh.deleteRow(r + 1); break; }
      }
      return json_({ status: 'success', message: 'deleted' });
    }

    // --- บันทึกผลประเมินใหม่ ---
    var headers2 = readHeaders_(sh);
    // หา/สร้างคอลัมน์ให้ครบทุกฟิลด์ (รวม ข้อชื่นชม/ข้อเสนอแนะ ที่จะเพิ่มใหม่ถ้ายังไม่มี)
    FIELDS.forEach(function (f) {
      var idx = findColByKeyword_(headers2, f.kw);
      if (idx === -1) {
        headers2.push(f.name);
        idx = headers2.length - 1;
        sh.getRange(1, headers2.length).setValue(f.name);
      }
      f._idx = idx;
    });
    var row = [];
    for (var c = 0; c < headers2.length; c++) row.push('');
    FIELDS.forEach(function (f) {
      if (body[f.key] !== undefined && body[f.key] !== null) row[f._idx] = body[f.key];
    });
    sh.appendRow(row);
    return json_({ status: 'success', message: 'saved' });

  } catch (err) {
    return json_({ status: 'error', message: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (ignore2) {}
  }
}
