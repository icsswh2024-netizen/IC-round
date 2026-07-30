---
name: pdf-a4-layout
description: >-
  สร้างเอกสาร PDF แบบแบ่งหน้า A4 ในเว็บหน้าเดียว (client-side) โดยไม่พึ่งไลบรารีชาร์ต/CDN ที่อาจถูกบล็อก
  — เรนเดอร์ HTML/SVG เป็นหน้า A4 (794×1123px) แล้วแปลงเป็น PDF ด้วย html2canvas + jsPDF.
  Use when building printable reports, dashboards-to-PDF, บันทึก/พิมพ์ PDF, กราฟลง PDF, แบบฟอร์ม A4,
  หรือแก้ปัญหา: กราฟ/ตารางเลยขอบหน้า, ข้อความไทยชิดขอบ/ตัดหาย, รูปหายตอนบันทึก PDF (CORS),
  แบ่งหน้าไม่พอดี, หรือ preview ต้องตรงกับไฟล์ที่ดาวน์โหลด. เหมาะกับ React/Vanilla ที่ต้องพิมพ์บนมือถือ/แท็บเล็ต.
---

# สร้าง PDF แบบ A4 ฝั่งเบราว์เซอร์ (ready-to-use)

แนวทางนี้สร้าง PDF โดย **เรนเดอร์ HTML เป็นหน้า A4 จริง แล้วถ่ายภาพแต่ละหน้าด้วย html2canvas → ใส่ลง jsPDF**
ข้อดี: พรีวิว (DOM) กับไฟล์ที่ได้ **ตรงกันเป๊ะ**, ทำงานออฟไลน์/บนเครือข่ายที่บล็อก CDN ได้ (กราฟวาดเองด้วย SVG/CSS),
พิมพ์บนมือถือ/แท็บเล็ตได้.

## ขั้นตอนใช้งาน (3 ขั้น)

1. **ประกอบ HTML หน้า A4** ด้วย `buildA4Pages(title, subtitle, blocks)` — `blocks` คือ `[{ h, html }]`
   โดย `h` = ความสูงโดยประมาณ (px) ใช้จัดแบ่งหน้าอัตโนมัติ, `html` = เนื้อหา (การ์ด/กราฟ/ตาราง).
2. **แสดงพรีวิว**: ใส่ HTML ที่ได้ลง container (เช่น `dangerouslySetInnerHTML` / `el.innerHTML`).
3. **ดาวน์โหลด/พิมพ์**: เรียก `downloadA4Pdf(containerEl, filename)` (html2canvas ต่อ `.pdf-page` → jsPDF)
   หรือ `printA4Iframe(html)` สำหรับสั่งพิมพ์ผ่านเบราว์เซอร์.

ไฟล์โค้ดพร้อมคัดลอก: `reference/pdf-layout.js` (การจัดหน้า + ดาวน์โหลด),
`reference/charts.js` (กราฟแท่ง/เส้นแบบ static), `reference/table.js` (ตารางแบ่งหน้าจาก array).

โหลด `<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" defer>`
และ `jspdf.umd.min.js` (ใช้ `window.html2canvas`, `window.jspdf.jsPDF`). ถ้าเครือข่ายบล็อก CDN ให้ inline ไฟล์ไว้ในหน้า.

## ข้อควรระวังสำคัญ (บทเรียนจากของจริง)

1. **จัดข้อความกึ่งกลางแนวตั้งในเซลล์ ใช้ flex ไม่ใช่ `vertical-align: middle`**
   html2canvas วางข้อความ (โดยเฉพาะภาษาไทย) เหลื่อมจากเบราว์เซอร์เมื่อใช้ `vertical-align: middle` ของ `<td>`
   → ใช้ `<td style="padding:0"><div style="display:flex; align-items:center; height:100%">…</div></td>` แทน จึงตรงกันทั้งพรีวิวและ PDF.

2. **ข้อความไทยยาวไม่มีเว้นวรรค → ใส่ `overflow-wrap:anywhere; word-break:break-word`** กันล้นเซลล์/ตัดหาย.

3. **กราฟหลายแท่งเลยขอบหน้า → ตั้ง `min-width:0` ที่คอลัมน์ flex**
   ค่า `min-width:auto` (ดีฟอลต์) ทำให้คอลัมน์ยุบต่ำกว่าความกว้างป้ายตัวเลข (`97.53%` แบบ nowrap) ไม่ได้ → รวมกันเกินหน้า.
   เมื่อแท่งเยอะ (>10) ให้ **หมุนป้ายตัวเลข/ชื่อเป็นแนวตั้ง** (`transform: rotate(-90deg / -58deg)`) + ลดฟอนต์/ความกว้างแท่ง.

4. **รูปจาก URL ภายนอก (เช่น Google Drive) จะหายใน PDF เพราะ CORS**
   html2canvas จับ `<img src="https://…">` ข้ามโดเมนไม่ได้ → ต้องฝังเป็น **base64 data URI** (ให้ฝั่ง backend แปลงมาให้).

5. **กราฟ = HTML/SVG ล้วน ไม่พึ่งไลบรารีชาร์ต** เพื่อให้ทำงานเมื่อ CDN ถูกบล็อก และให้ html2canvas จับได้ครบ
   (รองรับ `linear-gradient`, inline `<svg>`, `transform: rotate` — html2canvas 1.4.x เรนเดอร์ได้).

6. **สีพื้นหลัง/ไล่เฉดต้องติดตอนพิมพ์** → ใส่ `-webkit-print-color-adjust:exact; print-color-adjust:exact`.

7. **แบ่งหน้าไม่ตัดกลางบล็อก**: ประเมิน "ความสูง (px)" ของแต่ละบล็อกแล้วแพ็กลงหน้าตามงบ (หน้าแรกงบน้อยกว่าเพราะมีหัวเรื่อง).
   ตั้งหน้า A4 `min-height:1123px` (ไม่ใช้ `overflow:hidden` ถ้าไม่จำเป็น) แล้วแพ็กแบบพอประมาณ (เช่น 2 การ์ด/หน้า).

8. **แปลง PDF แบบ fit-to-page**: `ratio = min(pdfW/canvasW, pdfH/canvasH)` เพื่อไม่ให้ภาพตกขอบ.

9. **ตัวเลขร้อยละ**: จัดรูปแบบด้วย `fmtPct` (ทศนิยม 2 ตำแหน่ง, จำนวนเต็มไม่ใส่ทศนิยม) ให้สม่ำเสมอทุกจุด.

## หน้า A4 มาตรฐาน (px @ ~96dpi)

- ขนาดหน้า: `width:794px; min-height:1123px` (แนวตั้ง) — เนื้อหาใช้ได้ ~1041px หลังหัก padding บน/ล่าง.
- `padding: 34px 40px 48px;` เป็นค่าเริ่มต้นที่ปลอดภัย.
- แต่ละหน้าต้องมี `class="pdf-page"` เพื่อให้ตัวดาวน์โหลดจับทีละหน้า.
