function doPost(e) {
  try {
    // ระบบตรวจสอบยืดหยุ่น: รองรับทั้งการส่งแบบ JSON ตรงๆ และส่งผ่าน Form data (Hidden Form) เพื่อทะลวง CORS block
    var rawDataStr = (e.parameter && e.parameter.payload) ? e.parameter.payload : e.postData.contents;
    var data = JSON.parse(rawDataStr);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // ===================================================================
    // [ฟังก์ชันเพิ่มใหม่] จัดการบันทึกจำนวนเจ้าหน้าที่ ลงแท็บ "ชีต4"
    // ===================================================================
    if (data.action === 'saveStaffCounts') {
      var staffSheet = ss.getSheetByName("ชีต4");
      if (!staffSheet) {
        staffSheet = ss.insertSheet("ชีต4");
      }
      staffSheet.clearContents();

      // สร้างหัวตารางหลักใน ชีต4
      staffSheet.appendRow(["รหัส_หน่วยงาน_ตำแหน่ง", "จำนวนเจ้าหน้าที่"]);
      staffSheet.getRange(1, 1, 1, 2).setFontWeight("bold").setBackground("#e2e8f0");

      var rows = [];
      for (var key in data.data) {
        if(data.data[key] !== "" && data.data[key] !== null) {
            rows.push([key, data.data[key]]);
        }
      }
      if (rows.length > 0) {
         staffSheet.getRange(2, 1, rows.length, 2).setValues(rows);
      }

      // บันทึกประวัติการแก้ไขลงแท็บ "ประวัติบันทึกเจ้าหน้าที่" เผื่อใช้ตรวจสอบย้อนหลัง
      if (data.updateLog) {
          var logSheet = ss.getSheetByName("ประวัติบันทึกเจ้าหน้าที่");
          if (!logSheet) {
              logSheet = ss.insertSheet("ประวัติบันทึกเจ้าหน้าที่");
              logSheet.appendRow(["วันที่/เวลา", "หน่วยงาน", "ผู้บันทึก", "รายละเอียด (ตำแหน่ง: จำนวน)"]);
              logSheet.getRange(1, 1, 1, 4).setFontWeight("bold").setBackground("#e2e8f0");
          }

          var detailsText = "";
          try {
              var inputs = JSON.parse(data.updateLog.details);
              var parts = [];
              for (var r in inputs) {
                  if (inputs[r] !== "" && inputs[r] !== null) {
                      parts.push(r + ": " + inputs[r] + " คน");
                  }
              }
              detailsText = parts.join(", ");
          } catch(err) {
              detailsText = data.updateLog.details;
          }

          logSheet.appendRow([
              data.updateLog.timestamp,
              data.updateLog.department,
              data.updateLog.recorderName,
              detailsText
          ]);
      }
      return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
    }

    // ระบบตรวจสอบ Fail-safe: สกัดกั้นแถวขยะที่มีแต่วันที่ว่างเปล่าไหลเข้าตาราง
    if (!data.action && !data.assessmentType && !data.department && !data.fullDataJSON) {
        return ContentService.createTextOutput(JSON.stringify({"status": "ignored", "message": "Blocked empty row"})).setMimeType(ContentService.MimeType.JSON);
    }

    // กำหนดปลายทางแบบระบุชื่อแท็บชัดเจน เพื่อล็อกข้อมูลผลประเมินให้อยู่ใน "ชีต1" เท่านั้น ไม่ให้วิ่งไปทับชีตอื่น
    var sheet = ss.getSheetByName("ชีต1") || ss.getSheets()[0];

    // ===================================================================
    // [ฟังก์ชันเดิมคงไว้] 1. จัดการคำสั่งล้างข้อมูลทั้งหมด (Delete All)
    // ===================================================================
    if (data.action === 'deleteAll') {
      var lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.deleteRows(2, lastRow - 1);
      }
      return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
    }

    // ===================================================================
    // [ฟังก์ชันเดิมคงไว้] 2. จัดการคำสั่งลบข้อมูลแถวเดียวแบบอัจฉริยะ (Delete Single Record)
    // ===================================================================
    if (data.action === 'delete') {
      var targetId = data.id ? data.id.toString() : "";
      var targetTime = data.timestampStr || "";
      var targetDept = data.department || "";

      var sheetData = sheet.getDataRange().getDisplayValues();

      var jsonColIdx = -1;
      var timeColIdx = 0;
      var deptColIdx = 4;

      for (var c = 0; c < sheetData[0].length; c++) {
         var h = sheetData[0][c].toString().toLowerCase();
         if (h.indexOf('json') > -1 || h.indexOf('ข้อมูลดิบ') > -1) jsonColIdx = c;
         if (h.indexOf('วัน') > -1 || h.indexOf('เวลา') > -1) timeColIdx = c;
         if (h.indexOf('หน่วยงานที่รับ') > -1) deptColIdx = c;
      }

      if(jsonColIdx === -1) jsonColIdx = 9;

      for (var i = sheetData.length - 1; i >= 1; i--) {
         var isMatch = false;

         if (jsonColIdx > -1 && sheetData[i][jsonColIdx]) {
             try {
                 var record = JSON.parse(sheetData[i][jsonColIdx]);
                 if (record.id && record.id.toString() === targetId) isMatch = true;
             } catch(err) {}
         }

         if (!isMatch && targetTime && targetDept) {
             var rowTime = sheetData[i][timeColIdx] || "";
             var rowDept = sheetData[i][deptColIdx] || "";
             if (rowTime === targetTime && rowDept === targetDept) isMatch = true;
         }

         if (isMatch) {
             sheet.deleteRow(i + 1);
             return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
         }
      }
      return ContentService.createTextOutput(JSON.stringify({"status": "not_found"})).setMimeType(ContentService.MimeType.JSON);
    }

    // ===================================================================
    // [เพิ่มใหม่] 2.1 แอดมินแก้ไขข้อมูลทั่วไปของแถวเดียว (Update Single Record)
    //   ค้นแถวจาก id ในคอลัมน์ JSON (ถ้าไม่เจอใช้วัน/เวลาสำรอง) แล้วอัปเดตเฉพาะคอลัมน์ข้อมูลทั่วไป
    //   (ไม่แตะคะแนน/ผลรายข้อ) พร้อมอัปเดตคอลัมน์ JSON ให้ตรงกัน
    // ===================================================================
    if (data.action === 'update') {
      var uTargetId = data.id ? data.id.toString() : "";
      var uTargetTime = data.timestampStr || "";
      var uData = sheet.getDataRange().getDisplayValues();
      var uHead = uData[0];
      function uCol(keyword) { for (var c = 0; c < uHead.length; c++) { if (uHead[c].toString().toLowerCase().indexOf(keyword.toLowerCase()) > -1) return c; } return -1; }
      var uJson = -1, uTime = 0;
      for (var c = 0; c < uHead.length; c++) {
        var uh = uHead[c].toString().toLowerCase();
        if (uh.indexOf('json') > -1 || uh.indexOf('ข้อมูลดิบ') > -1) uJson = c;
        if (uh.indexOf('วัน') > -1 || uh.indexOf('เวลา') > -1) uTime = c;
      }
      if (uJson === -1) uJson = 9;
      var cType = uCol('ประเภทแบบประเมิน'), cAssessor = uCol('ผู้ประเมิน'), cDeptType = uCol('ประเภทหน่วยงาน'), cDept = uCol('หน่วยงานที่รับ'), cNum = uCol('จำนวนผู้'), cRole = uCol('ตำแหน่ง');
      // [กันหัวตารางเพี้ยน] โค้ด save เขียน "ประเภทแบบประเมิน" ที่คอลัมน์ B (ตำแหน่งที่ 2) เสมอ
      // ถ้าหาไม่เจอตามชื่อหัว ให้ชี้ไปคอลัมน์ B แทน (กันไม่ให้สร้างคอลัมน์ซ้ำ/ข้ามการอัปเดต)
      if (cType === -1) cType = 1;

      for (var i = uData.length - 1; i >= 1; i--) {
        var uMatch = false;
        if (uJson > -1 && uData[i][uJson]) { try { var uRec = JSON.parse(uData[i][uJson]); if (uRec.id && uRec.id.toString() === uTargetId) uMatch = true; } catch (e) {} }
        if (!uMatch && uTargetTime && uData[i][uTime] === uTargetTime) uMatch = true;
        if (uMatch) {
          var uRow = i + 1;
          if (cType > -1) sheet.getRange(uRow, cType + 1).setValue(data.assessmentType);
          if (cAssessor > -1) sheet.getRange(uRow, cAssessor + 1).setValue(data.assessorName);
          if (cDeptType > -1) sheet.getRange(uRow, cDeptType + 1).setValue(data.deptType);
          if (cDept > -1) sheet.getRange(uRow, cDept + 1).setValue(data.department);
          if (cNum > -1) sheet.getRange(uRow, cNum + 1).setValue(data.numPeople);
          if (cRole > -1 && data.evaluateeRole !== undefined) sheet.getRange(uRow, cRole + 1).setValue(data.evaluateeRole);
          // ข้อชื่นชม/ข้อเสนอแนะ: หา-หรือ-สร้างคอลัมน์
          var uHdrs = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
          var ci = uHdrs.indexOf('ข้อชื่นชม'); if (ci === -1) { uHdrs.push('ข้อชื่นชม'); ci = uHdrs.length - 1; sheet.getRange(1, ci + 1).setValue('ข้อชื่นชม').setFontWeight("bold").setBackground("#bbf7d0"); }
          sheet.getRange(uRow, ci + 1).setValue(data.commendation || "");
          var si = uHdrs.indexOf('ข้อเสนอแนะ'); if (si === -1) { uHdrs.push('ข้อเสนอแนะ'); si = uHdrs.length - 1; sheet.getRange(1, si + 1).setValue('ข้อเสนอแนะ').setFontWeight("bold").setBackground("#bbf7d0"); }
          sheet.getRange(uRow, si + 1).setValue(data.suggestion || "");
          // [เพิ่มใหม่] อัปเดตคะแนนรวม/ร้อยละ เมื่อแอดมินแก้ผลรายข้อ
          var cFull = uCol('คะแนนเต็ม'), cEarned = uCol('คะแนนที่ได้'), cPct = uCol('ร้อยละ');
          if (cFull > -1 && data.totalFullScore !== undefined && data.totalFullScore !== null) sheet.getRange(uRow, cFull + 1).setValue(data.totalFullScore);
          if (cEarned > -1 && data.totalEarnedScore !== undefined && data.totalEarnedScore !== null) sheet.getRange(uRow, cEarned + 1).setValue(data.totalEarnedScore);
          if (cPct > -1 && data.percentage !== undefined && data.percentage !== null) sheet.getRange(uRow, cPct + 1).setValue(data.percentage);
          // [เพิ่มใหม่] อัปเดตคอลัมน์ "ข้อ X" ตามผลรายข้อที่แก้ไข (หา-หรือ-สร้าง)
          if (data.itemCells) {
            var iHdrs = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
            for (var qk in data.itemCells) {
              var qi = iHdrs.indexOf(qk);
              if (qi === -1) { iHdrs.push(qk); qi = iHdrs.length - 1; sheet.getRange(1, qi + 1).setValue(qk).setFontWeight("bold").setBackground("#fef08a"); }
              sheet.getRange(uRow, qi + 1).setValue(data.itemCells[qk]);
            }
          }
          if (uJson > -1 && data.fullDataJSON) sheet.getRange(uRow, uJson + 1).setValue(data.fullDataJSON);
          return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({"status": "not_found"})).setMimeType(ContentService.MimeType.JSON);
    }

    // ===================================================================
    // [ฟังก์ชันเดิมคงไว้] 3. สร้างหัวตารางพื้นฐานหากยังไม่มี
    // ===================================================================
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 1).getValues()[0];
    if (headers.length === 0 || headers[0] === "") {
      headers = ["วันที่/เวลา", "ประเภทแบบประเมิน", "ผู้ประเมิน", "ประเภทหน่วยงาน", "หน่วยงานที่รับการประเมิน", "จำนวนผู้ถูกประเมิน (คน)", "คะแนนเต็มรวม", "คะแนนที่ได้รวม", "ร้อยละเฉลี่ย", "ข้อมูลดิบ (JSON)", "ข้อชื่นชม", "ข้อเสนอแนะ"];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#e2e8f0");
    }

    // ===================================================================
    // [ฟังก์ชันเดิมคงไว้] 4. บันทึกข้อมูลผลการประเมินใหม่
    // ===================================================================
    var rowData = [
      data.timestamp || new Date().toLocaleString('th-TH'),
      data.assessmentType,
      data.assessorName,
      data.deptType,
      data.department,
      data.numPeople,
      data.totalFullScore,
      data.totalEarnedScore,
      data.percentage,
      data.fullDataJSON
    ];

    // ===================================================================
    // [เพิ่มใหม่] 4.1 บันทึก "ข้อชื่นชม" และ "ข้อเสนอแนะ" เป็นคอลัมน์
    //   ใช้ตรรกะ find-or-create เหมือนคอลัมน์ "ข้อ X" ด้านล่าง
    //   -> ถ้าชีตยังไม่มีคอลัมน์นี้ จะเพิ่มให้อัตโนมัติ โดยไม่กระทบคอลัมน์เดิม
    // ===================================================================
    var extraCols = [["ข้อชื่นชม", data.commendation], ["ข้อเสนอแนะ", data.suggestion]];
    for (var xc = 0; xc < extraCols.length; xc++) {
      var exName = extraCols[xc][0];
      var exColIndex = headers.indexOf(exName);
      if (exColIndex === -1) {
        headers.push(exName);
        sheet.getRange(1, headers.length).setValue(exName).setFontWeight("bold").setBackground("#bbf7d0");
        exColIndex = headers.length - 1;
      }
      while (rowData.length <= exColIndex) { rowData.push(""); }
      rowData[exColIndex] = extraCols[xc][1] || "";
    }

    if (data.rawAnswers) {
      var answersObj = JSON.parse(data.rawAnswers);
      var aggregatedAnswers = {};
      for (var personIndex in answersObj) {
        var personAnswers = answersObj[personIndex];
        var pNum = parseInt(personIndex) + 1;
        for (var qId in personAnswers) {
          if (!aggregatedAnswers[qId]) aggregatedAnswers[qId] = [];
          var ans = personAnswers[qId];
          var textAns = ans === 'DONE' ? 'ปฏิบัติ' : (ans === 'NOT_DONE' ? 'ไม่ปฏิบัติ' : 'NA');
          aggregatedAnswers[qId].push("คนที่ " + pNum + ":" + textAns);
        }
      }
      for (var qId in aggregatedAnswers) {
        var headerName = "ข้อ " + qId;
        var colIndex = headers.indexOf(headerName);
        if (colIndex === -1) {
          headers.push(headerName);
          sheet.getRange(1, headers.length).setValue(headerName).setFontWeight("bold").setBackground("#fef08a");
          colIndex = headers.length - 1;
        }
        while (rowData.length <= colIndex) { rowData.push(""); }
        rowData[colIndex] = aggregatedAnswers[qId].join(" | ");
      }
    }
    sheet.appendRow(rowData);
    return ContentService.createTextOutput(JSON.stringify({"status": "success"})).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // ===================================================================
  // [ฟังก์ชันเพิ่มใหม่] ดึงข้อมูลจำนวนเจ้าหน้าที่ล่าสุดจาก "ชีต4" ไปแสดงบนหน้าเว็บ
  // ===================================================================
  if (e.parameter.action === 'getStaffCounts') {
    try {
      var staffSheet = ss.getSheetByName("ชีต4");
      var counts = {};
      if (staffSheet) {
        var data = staffSheet.getDataRange().getValues();
        for (var i = 1; i < data.length; i++) {
          if (data[i][0]) counts[data[i][0]] = data[i][1];
        }
      }
      return ContentService.createTextOutput(JSON.stringify({"status": "success", "data": counts})).setMimeType(ContentService.MimeType.JSON);
    } catch(err) {
      return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": err.toString()})).setMimeType(ContentService.MimeType.JSON);
    }
  }

  // ===================================================================
  // [ฟังก์ชันเพิ่มใหม่] ดึงรายชื่อผู้ลงนามทีม IPC จากแท็บ "ลงนาม"
  //   คืน ชื่อ/ตำแหน่ง/กลุ่มงาน + รูปลายเซ็นจาก Google Drive แปลงเป็น base64 (data URI)
  //   เหตุผลที่ต้องแปลง base64: html2canvas ตอนบันทึก PDF โหลดรูปจาก Drive ตรง ๆ ไม่ได้ (ติด CORS)
  // ===================================================================
  if (e.parameter.action === 'getSignatures') {
    try {
      var sigSheet = ss.getSheetByName("ลงนาม");
      var out = [];
      if (sigSheet) {
        var vals = sigSheet.getDataRange().getValues();
        var head = vals.length ? vals[0].map(function (h) { return String(h).trim(); }) : [];
        function findCol(keys, def) {
          for (var c = 0; c < head.length; c++) {
            for (var k = 0; k < keys.length; k++) {
              if (head[c].toLowerCase().indexOf(keys[k]) > -1) return c;
            }
          }
          return def;
        }
        var cName = findCol(["ชื่อ"], 0);
        var cPos  = findCol(["ตำแหน่ง"], 1);
        var cGrp  = findCol(["กลุ่มงาน"], 2);
        var cLink = findCol(["link", "ลิงก์", "ลายเซ็น", "รูป"], 3);
        for (var i = 1; i < vals.length; i++) {
          var name = String(vals[i][cName] || "").trim();
          if (!name) continue;
          var link = String(vals[i][cLink] || "").trim();
          var img = "";
          if (link) {
            try {
              var m = link.match(/[-\w]{25,}/); // สกัด File ID จากลิงก์ Google Drive
              if (m) {
                var blob = DriveApp.getFileById(m[0]).getBlob();
                img = "data:" + blob.getContentType() + ";base64," + Utilities.base64Encode(blob.getBytes());
              }
            } catch (e2) { img = ""; }
          }
          out.push({
            name: name,
            position: String(vals[i][cPos] || "").trim(),
            group: String(vals[i][cGrp] || "").trim(),
            image: img
          });
        }
      }
      return ContentService.createTextOutput(JSON.stringify({"status": "success", "data": out})).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()})).setMimeType(ContentService.MimeType.JSON);
    }
  }

  // ===================================================================
  // [ฟังก์ชันเดิมคงไว้ ปรับปรุงล็อกแท็บ] ดึงข้อมูลประวัติเพื่อแสดงผลในหน้าเว็บ
  // ===================================================================
  if (e.parameter.action === 'getData') {
    try {
      var sheet = ss.getSheetByName("ชีต1") || ss.getSheets()[0];
      var data = sheet.getDataRange().getDisplayValues();
      return ContentService.createTextOutput(JSON.stringify({"status": "success", "data": data})).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()})).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('แบบประเมินและกำกับติดตามมาตรฐาน IC')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// =====================================================================
// [เครื่องมือล้างข้อมูลครั้งเดียว] normalizeSheetFromJson()
//   ใช้แก้ปัญหา "หัวตาราง/ข้อมูลเลื่อนคอลัมน์" และ "ประเภทแบบประเมินกระจายหลายคอลัมน์"
//   วิธีทำงาน: อ่าน JSON (แหล่งข้อมูลจริงที่ครบทุกแถว) มาสร้างคอลัมน์หลัก A–J ใหม่ให้ทุกแถวตรงกัน
//   แล้วตั้งหัวตารางมาตรฐาน + ลบคอลัมน์ "ประเภทแบบประเมิน" ที่ซ้ำ
//   *** สำรองชีตอัตโนมัติก่อนแก้เสมอ ***
//   วิธีรัน: เปิด Apps Script editor -> เลือกฟังก์ชัน normalizeSheetFromJson -> กด Run
// =====================================================================
function normalizeSheetFromJson() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = findDataSheet_(ss);
  if (!sheet) throw new Error('ไม่พบชีตข้อมูล (ไม่มีคอลัมน์ JSON) — ยกเลิก');

  // 1) สำรองชีตก่อนเสมอ
  var stamp = Utilities.formatDate(new Date(), 'GMT+7', 'yyyyMMdd_HHmmss');
  sheet.copyTo(ss).setName(sheet.getName() + '_สำรอง_' + stamp);

  var values = sheet.getDataRange().getValues();
  if (values.length < 2) throw new Error('ไม่มีข้อมูลให้จัด');

  var looksJson = function (v) { return typeof v === 'string' && v.trim().charAt(0) === '{' && v.indexOf('"') > -1; };
  var STD = ["วันที่/เวลา", "ประเภทแบบประเมิน", "ผู้ประเมิน", "ประเภทหน่วยงาน", "หน่วยงานที่รับการประเมิน", "จำนวนผู้ถูกประเมิน (คน)", "คะแนนเต็มรวม", "คะแนนที่ได้รวม", "ร้อยละเฉลี่ย", "ข้อมูลดิบ (JSON)"];

  var fixed = 0, skipped = 0;
  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    if (!row || row.join('').trim() === '') continue;
    // หา JSON ในแถวนี้ (ตำแหน่งอาจต่างกันในแต่ละแถว)
    var jIdx = -1;
    for (var c = 0; c < row.length; c++) { if (looksJson(row[c])) { jIdx = c; break; } }
    if (jIdx === -1) { skipped++; continue; }
    var rec;
    try { rec = JSON.parse(row[jIdx]); } catch (e) { skipped++; continue; }
    if (!rec || typeof rec !== 'object') { skipped++; continue; }

    var gs = (rec.overallSummaryData && rec.overallSummaryData.grandSummary) || {};
    var block = [
      row[0] || rec.timestampStr || '',                                   // A วันที่/เวลา (คงค่าเดิม)
      rec.assessmentType || '',                                           // B ประเภทแบบประเมิน
      rec.assessorName || '',                                             // C ผู้ประเมิน
      rec.deptType || '',                                                 // D ประเภทหน่วยงาน
      rec.department || '',                                               // E หน่วยงานที่รับ
      (rec.numPeople != null ? rec.numPeople : ''),                       // F จำนวนผู้ถูกประเมิน
      (gs.fullScore != null ? gs.fullScore : ''),                         // G คะแนนเต็มรวม
      (gs.earnedScore != null ? gs.earnedScore : ''),                     // H คะแนนที่ได้รวม
      (gs.percentage != null ? gs.percentage : ''),                       // I ร้อยละเฉลี่ย
      row[jIdx]                                                           // J ข้อมูลดิบ (JSON)
    ];
    sheet.getRange(r + 1, 1, 1, 10).setValues([block]);
    // ถ้า JSON เดิมอยู่นอกบล็อก A–J (คอลัมน์ > J) ให้ล้างช่องเดิมกันซ้ำ
    if (jIdx > 9) sheet.getRange(r + 1, jIdx + 1).setValue('');
    fixed++;
  }

  // 2) ตั้งหัวตารางมาตรฐาน A–J
  sheet.getRange(1, 1, 1, 10).setValues([STD]).setFontWeight('bold').setBackground('#e2e8f0');

  // 3) ลบคอลัมน์ "ประเภทแบบประเมิน" ที่ซ้ำ (เฉพาะที่อยู่นอกคอลัมน์ B) — ลบจากขวาไปซ้าย
  var lastCol = sheet.getLastColumn();
  var hdr = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  var removed = 0;
  for (var c = lastCol - 1; c >= 10; c--) {
    if (String(hdr[c]).trim() === 'ประเภทแบบประเมิน') { sheet.deleteColumn(c + 1); removed++; }
  }

  var msg = 'จัดข้อมูลสำเร็จ: แก้ ' + fixed + ' แถว, ข้าม ' + skipped + ' แถว (ไม่มี JSON), ลบคอลัมน์ซ้ำ ' + removed + ' คอลัมน์. ชีต: ' + sheet.getName() + ' (มีสำรอง _สำรอง_' + stamp + ')';
  try { SpreadsheetApp.getUi().alert(msg); } catch (e) {}
  Logger.log(msg);
  return msg;
}

// หา "ชีตข้อมูล" อัตโนมัติ = ชีตแรกที่มีเซลล์เป็น JSON (ขึ้นต้นด้วย { )
function findDataSheet_(ss) {
  var sheets = ss.getSheets();
  for (var s = 0; s < sheets.length; s++) {
    var sh = sheets[s];
    var lastRow = Math.min(sh.getLastRow(), 6);
    var lastCol = sh.getLastColumn();
    if (lastRow < 2 || lastCol < 1) continue;
    var vals = sh.getRange(1, 1, lastRow, lastCol).getValues();
    for (var r = 1; r < vals.length; r++) {
      for (var c = 0; c < vals[r].length; c++) {
        var v = vals[r][c];
        if (typeof v === 'string' && v.trim().charAt(0) === '{' && v.indexOf('"') > -1) return sh;
      }
    }
  }
  return null;
}
