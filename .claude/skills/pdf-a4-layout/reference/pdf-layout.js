/* pdf-layout.js — เครื่องมือจัดหน้า A4 + ดาวน์โหลด/พิมพ์ PDF ฝั่งเบราว์เซอร์ (framework-agnostic)
 * ต้องมี window.html2canvas และ window.jspdf.jsPDF (โหลดจาก CDN หรือ inline)
 * คัดลอกไปใช้ได้เลย — ปรับ style/ฟอนต์ตามต้องการ
 */

// ---------- helper: จัดรูปแบบร้อยละ (2 ตำแหน่ง, จำนวนเต็มไม่ใส่ทศนิยม) ----------
export const fmtPct = (p) => {
  const v = parseFloat(p);
  if (isNaN(v)) return '0';
  return Number.isInteger(v) ? String(v) : v.toFixed(2);
};

// ---------- helper: escape ป้องกัน HTML injection จากข้อมูลผู้ใช้ ----------
export const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------- ประกอบ HTML หน้า A4 จาก blocks ----------
// blocks: [{ h: number(px โดยประมาณ), html: string }]
// firstBudget/restBudget = งบความสูงต่อหน้า (หน้าแรกน้อยกว่าเพราะมีหัวเรื่อง)
export function buildA4Pages(title, subtitle, blocks, opts = {}) {
  const {
    firstBudget = 900, restBudget = 1030,
    a4 = "width:794px; min-height:1123px; background:#fff; padding:34px 40px 48px; box-shadow:0 4px 6px rgba(0,0,0,0.2); margin:0 auto; box-sizing:border-box; position:relative; font-family:'Sarabun',sans-serif; color:#000;",
    containerStyle = "background:#cbd5e1; padding:40px 20px; display:flex; flex-direction:column; gap:30px; align-items:center;"
  } = opts;

  const pages = [];
  let cur = [], used = 0, budget = firstBudget;
  blocks.forEach(b => {
    if (cur.length && used + b.h > budget) { pages.push(cur); cur = []; used = 0; budget = restBudget; }
    cur.push(b); used += b.h;
  });
  if (cur.length) pages.push(cur);
  if (pages.length === 0) pages.push([]);

  const total = pages.length;
  let html = `<div id="pdf-pages-container" style="${containerStyle}">`;
  pages.forEach((pg, i) => {
    const pageNo = `<div style="position:absolute; top:15px; right:40px; font-size:12pt; color:#555; font-weight:bold;">หน้า ${i + 1}/${total}</div>`;
    const header = i === 0
      ? `<div style="text-align:center; margin-bottom:18px;"><div style="font-size:20pt; font-weight:bold;">${title}</div>${subtitle ? `<div style="font-size:14pt; color:#333; margin-top:4px;">${subtitle}</div>` : ''}</div>`
      : '';
    html += `<div class="pdf-page" style="${a4}">${pageNo}${header}${pg.map(b => b.html).join('')}</div>`;
  });
  html += `</div>`;
  return html;
}

// ---------- ดาวน์โหลด PDF: ถ่ายภาพแต่ละ .pdf-page ด้วย html2canvas → jsPDF ----------
// container = element ที่มี .pdf-page อยู่ข้างใน (เช่น div ที่ใส่ผล buildA4Pages)
export async function downloadA4Pdf(container, filename = 'document.pdf', scale = 2) {
  if (!window.html2canvas || !window.jspdf) throw new Error('ต้องโหลด html2canvas + jspdf ก่อน');
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = pdf.internal.pageSize.getHeight();
  const pages = container.querySelectorAll('.pdf-page');

  for (let i = 0; i < pages.length; i++) {
    if (i > 0) pdf.addPage();
    const el = pages[i];
    const oShadow = el.style.boxShadow, oMargin = el.style.margin;
    el.style.boxShadow = 'none'; el.style.margin = '0'; // เอาเงา/ระยะออกให้คมชัดติดขอบ
    const canvas = await window.html2canvas(el, { scale, useCORS: true, backgroundColor: '#ffffff', letterRendering: true });
    el.style.boxShadow = oShadow; el.style.margin = oMargin;
    const img = canvas.toDataURL('image/jpeg', 0.95);
    // fit-to-page กันภาพตกขอบ
    const ratio = Math.min(pdfW / canvas.width, pdfH / canvas.height);
    const w = canvas.width * ratio, h = canvas.height * ratio;
    pdf.addImage(img, 'JPEG', (pdfW - w) / 2, 0, w, h);
  }
  pdf.save(filename);
}

// ---------- สั่งพิมพ์ผ่านเบราว์เซอร์ (สำหรับหน้า HTML เต็ม ๆ ที่มี @media print) ----------
export function printA4Iframe(fullHtmlDoc) {
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position:fixed; right:0; bottom:0; width:0; height:0; border:0;';
  document.body.appendChild(iframe);
  const doc = iframe.contentWindow.document;
  doc.open(); doc.write(fullHtmlDoc); doc.close();
  setTimeout(() => { try { iframe.contentWindow.focus(); iframe.contentWindow.print(); } catch (e) {} }, 400);
}

// ---------- การ์ด/บล็อกสำเร็จรูป ----------
export const cardHTML = (title, subtitle, inner) =>
  `<div style="border:2px solid #e5e7eb; border-radius:18px; padding:18px 20px; margin-bottom:16px; background:#fff;">
     <div style="font-size:15pt; font-weight:800; color:#32355c; line-height:1.2;">${esc(title)}</div>
     ${subtitle ? `<div style="font-size:11pt; color:#94a3b8; margin-top:2px;">${esc(subtitle)}</div>` : ''}
     <div style="margin-top:8px;">${inner}</div>
   </div>`;
