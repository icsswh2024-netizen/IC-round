/* table.js — ตารางแบ่งหน้า A4 จากข้อมูล array (generic)
 * รับ rows = array ของ array (แต่ละ row = หนึ่งแถว, ค่าในแต่ละช่อง = string/number)
 *   - แถวว่าง []            = ตัวคั่นกลุ่ม (เริ่มตารางใหม่)
 *   - แถวที่มี 1 ช่อง        = หัวข้อย่อย (sub-header, span เต็มแถว)
 *   - แถวแรกของกลุ่ม (>2 ช่อง) = หัวตาราง (ทำซ้ำเมื่อขึ้นหน้าใหม่)
 * คืน HTML container ที่มี .pdf-page (ใช้กับ downloadA4Pdf ได้ทันที)
 *
 * จุดสำคัญที่แก้ปัญหา html2canvas/ไทย:
 *   - จัดกึ่งกลางแนวตั้งด้วย <div flex> ใน <td> (ไม่ใช้ vertical-align:middle)
 *   - overflow-wrap:anywhere กันข้อความไทยยาวล้น/ตัดหาย
 */
import { esc } from './pdf-layout.js';

export function buildPaginatedTables(rows, reportTitle, subtitle = '', opts = {}) {
  const {
    a4 = "width:794px; height:1123px; background:#fff; padding:35px 40px 60px 40px; box-shadow:0 4px 6px rgba(0,0,0,.2); margin:0 auto; box-sizing:border-box; position:relative; overflow:hidden; display:flex; flex-direction:column; font-family:'Sarabun',sans-serif;",
    maxRowsFirst = 16, maxRowsRest = 21,
  } = opts;

  // ---- คำนวณ "น้ำหนักความสูง" ของแถว (แถวข้อความยาวกินหลายบรรทัด) ----
  const rowWeight = (row) => {
    if (!row || row.length === 0) return 1;
    let maxLines = 1;
    const cols = row.length;
    row.forEach((cell, ci) => {
      let perLine = 70;
      if (cols === 6 && ci === 1) perLine = 45;
      else if (cols === 2 && ci === 1) perLine = 90;
      else if (cols > 6) perLine = 20;
      maxLines = Math.max(maxLines, Math.ceil(String(cell || '').length / perLine));
    });
    return maxLines;
  };

  // ---- สร้าง <table> จากกลุ่มแถว ----
  const flushGroup = (group) => {
    const maxCols = Math.max(...group.map(r => r.length));
    let t = `<table style="width:100%;border-collapse:collapse;margin-bottom:15px;font-size:11pt;font-family:'Sarabun',sans-serif;table-layout:${maxCols > 6 ? 'auto' : 'fixed'};word-wrap:break-word;"><tbody>`;
    group.forEach((row, rIdx) => {
      const isSub = row.length === 1 || (row.length > 1 && row.slice(1).every(v => v === '' || v == null));
      const isHead = rIdx === 0 && maxCols > 2 && !isSub;
      t += '<tr>';
      for (let ci = 0; ci < maxCols; ci++) {
        let val = row[ci] != null ? row[ci] : '';
        let span = 1, tdExtra = '', align = 'center', pad = '14px 10px';
        if (isSub) { if (ci === 0) span = maxCols; else continue; }
        if (isHead) { tdExtra = 'background:#e5e7eb;font-weight:bold;'; align = 'center'; }
        else if (isSub) { tdExtra = 'background:#f3f4f6;font-weight:bold;'; align = 'left'; }
        else if (ci === 0 && maxCols >= 3) align = 'left';
        else align = 'center';
        const justify = align === 'left' ? 'flex-start' : 'center';
        t += `<td colspan="${span}" style="border:1px solid #333;padding:0;height:1px;${tdExtra}">`
          + `<div style="display:flex;align-items:center;justify-content:${justify};height:100%;box-sizing:border-box;padding:${pad};line-height:1.3;overflow-wrap:anywhere;word-break:break-word;text-align:${align};">${esc(val)}</div>`
          + `</td>`;
      }
      t += '</tr>';
    });
    return t + '</tbody></table>';
  };

  // ---- แบ่งกลุ่มด้วยแถวว่าง ----
  let start = 0;
  if (rows[0] && rows[0][0] && /แบบประเมิน|สรุปผล|ประวัติ/.test(String(rows[0][0]))) start = 2; // ข้ามหัวเรื่องซ้ำ
  const groups = []; let g = [];
  for (let i = start; i < rows.length; i++) {
    if (!rows[i] || rows[i].length === 0) { if (g.length) groups.push(g); g = []; }
    else g.push(rows[i]);
  }
  if (g.length) groups.push(g);

  // ---- ประกอบหน้า A4 (ทวนหัวตารางเมื่อข้ามหน้า) ----
  const pageHeader = (first, n) => {
    const no = `<div style="position:absolute;top:15px;right:40px;font-size:12pt;color:#555;font-weight:bold;">หน้า ${n}</div>`;
    if (first) return `<div class="pdf-page" style="${a4}">${no}<div style="font-size:14pt;color:#000;line-height:1.4;flex-shrink:0;padding-top:10px;"><div style="font-size:20pt;font-weight:bold;text-align:center;margin-bottom:5px;">${reportTitle}</div>${subtitle ? `<div style="font-size:14pt;text-align:center;margin-bottom:20px;color:#333;">${subtitle}</div>` : ''}</div><div style="flex-grow:1;overflow:hidden;">`;
    return `<div class="pdf-page" style="${a4}">${no}<div style="flex-grow:1;overflow:hidden;padding-top:20px;">`;
  };
  const closePage = () => `</div></div>`;

  let html = `<div id="pdf-pages-container" style="background:#cbd5e1;padding:40px 20px;display:flex;flex-direction:column;gap:30px;align-items:center;">`;
  let first = true, pageNum = 1, cur = pageHeader(true, 1), count = 0;
  const maxRows = () => first ? maxRowsFirst : maxRowsRest;

  groups.forEach(group => {
    const w = group.reduce((s, r) => s + rowWeight(r), 0);
    if (count + w > maxRows() && count > 0) { html += cur + closePage(); first = false; pageNum++; cur = pageHeader(false, pageNum); count = 0; }
    cur += flushGroup(group);
    count += w + 1;
  });
  html += cur + closePage() + `</div>`;
  return html;
}
