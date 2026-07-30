# ตัวอย่างการใช้งาน

## A) กราฟลง PDF (แบบที่ใช้ในหน้าประวัติของแอปนี้)

```js
import { buildA4Pages, downloadA4Pdf, cardHTML, fmtPct } from './pdf-layout.js';
import { barChartHTML, lineChartHTML } from './charts.js';

// เตรียม blocks (h = ความสูงโดยประมาณ px; แท่งเยอะให้เผื่อสูงขึ้น)
const blocks = [];
const barCard = (title, sub, data) =>
  blocks.push({ h: data.length > 10 ? 480 : 400, html: cardHTML(title, sub, barChartHTML(data)) });

barCard('คะแนนเฉลี่ยแยกตามประเภทหน่วยงาน', 'IPD / OPD', byDeptType); // byDeptType = [{label,value,count}]
barCard('คะแนนเฉลี่ยแยกตามแบบประเมิน', 'เรียงมาก→น้อย', byType);
blocks.push({ h: 340, html: cardHTML('แนวโน้มรายเดือน', '', lineChartHTML(byMonth), false) });

const html = buildA4Pages('สรุปผลการประเมิน', 'โรงพยาบาล…', blocks);

// พรีวิว
document.getElementById('preview').innerHTML = html;
// ดาวน์โหลด (ต้องโหลด html2canvas + jspdf ก่อน)
await downloadA4Pdf(document.getElementById('preview'), 'summary.pdf');
```

## B) ตารางลง PDF (จากข้อมูล array)

```js
import { buildPaginatedTables } from './table.js';
import { downloadA4Pdf } from './pdf-layout.js';

const rows = [
  ['สรุปผลการประเมิน', 'โรงพยาบาล…'],   // แถวหัวเรื่อง (จะถูกข้าม แสดงเป็น title แทน)
  [],                                     // ตัวคั่น
  ['ข้อมูลทั่วไป'],                        // sub-header (1 ช่อง)
  ['แบบประเมิน', 'VAP'],
  ['หน่วยงาน', 'หอผู้ป่วยอายุรกรรม'],
  [],
  ['รายการ', 'ปฏิบัติ', 'ไม่ปฏิบัติ', 'ร้อยละ'], // หัวตาราง (>2 ช่อง, ทวนซ้ำเมื่อข้ามหน้า)
  ['1.1 ล้างมือ', 3, 0, '100%'],
  ['1.2 สวมถุงมือ', 2, 1, '66.67%'],
];
const html = buildPaginatedTables(rows, 'สรุปผลการประเมิน', 'โรงพยาบาล…');
document.getElementById('preview').innerHTML = html;
await downloadA4Pdf(document.getElementById('preview'), 'report.pdf');
```

## C) React (แสดงพรีวิว + ปุ่มบันทึก)

```jsx
const [html, setHtml] = useState('');
const ref = useRef(null);
const open = () => setHtml(buildA4Pages('…', '…', blocks));
// ...
{html && (
  <div>
    <button onClick={() => downloadA4Pdf(ref.current, 'file.pdf')}>บันทึก PDF</button>
    <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
  </div>
)}
```

## หมายเหตุ
- ถ้าใช้ไฟล์แบบ CommonJS ให้เปลี่ยน `export`/`import` เป็น `module.exports`/`require` หรือรวมเป็นไฟล์เดียว
  แล้วผูกเป็น global ก็ได้ (ไม่จำเป็นต้องเป็น ES module).
- รูปภาพ (โลโก้/ลายเซ็น) ที่มาจากโดเมนอื่น ต้องแปลงเป็น base64 data URI ก่อนฝัง มิฉะนั้นจะหายใน PDF (CORS).
- ฟอนต์ไทย: โหลด `Sarabun`/`TH Sarabun` ให้เสร็จก่อนเรียก html2canvas (ใช้ `document.fonts.ready`).
