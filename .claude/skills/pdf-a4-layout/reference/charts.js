/* charts.js — กราฟแท่ง/เส้นแบบ static (HTML/SVG) ไม่พึ่งไลบรารีชาร์ต
 * ออกแบบให้ html2canvas จับเป็นภาพได้ครบ (gradient, transform, svg) และไม่ล้นขอบหน้า A4
 * data ของกราฟแท่ง: [{ label, value(0-100), count?, people? }]
 */
import { fmtPct, esc } from './pdf-layout.js';

// ไล่เฉดสีตามเกณฑ์ (เข้ม→อ่อน) — ปรับสีได้ตามธีม
export const scoreGrad = (p) => {
  const v = parseFloat(p);
  if (isNaN(v)) return 'linear-gradient(to top,#cbd5e1,#e2e8f0)';
  if (v >= 80) return 'linear-gradient(to top,#5a7d4a,#a7c98f)'; // เขียว
  if (v >= 60) return 'linear-gradient(to top,#c9a74a,#f2dd93)'; // เหลือง
  return 'linear-gradient(to top,#d97e45,#f6b78a)';              // ส้ม
};
export const scoreDark = (p) => {
  const v = parseFloat(p);
  if (isNaN(v)) return '#64748b';
  if (v >= 80) return '#4d6b40';
  if (v >= 60) return '#9c750e';
  return '#bd570d';
};

// กราฟแท่งแนวตั้ง + แกน Y + เส้นกริด — รองรับ "แท่งเยอะ" โดยหมุนป้ายแนวตั้งกันล้นหน้า
export function barChartHTML(data) {
  if (!data || data.length === 0) return '<div style="text-align:center;color:#94a3b8;padding:30px;">ยังไม่มีข้อมูล</div>';
  const n = data.length;
  const dense = n > 10;                       // แท่งเยอะ → หมุนป้าย
  const H = 200, ticks = [100, 75, 50, 25, 0];
  const barMax = n > 16 ? 22 : n > 10 ? 30 : 46;
  const gap = dense ? 3 : 8;
  const valFont = n > 16 ? 8 : dense ? 9 : 13;
  const labFont = n > 16 ? 8 : dense ? 9 : 12;
  const topPad = dense ? 46 : 22;             // เผื่อป้ายตัวเลขแนวตั้งเหนือแท่ง

  const yax = ticks.map(t => `<div style="position:absolute;right:4px;transform:translateY(-50%);top:${H - (t / 100) * H}px;font-size:10px;color:#94a3b8;font-weight:500;">${t}</div>`).join('');
  const grid = ticks.map(t => `<div style="position:absolute;left:0;right:0;top:${H - (t / 100) * H}px;border-top:${t === 0 ? '2px solid #d1d5db' : '1px solid #e5e7eb'};"></div>`).join('');

  const bars = data.map(d => {
    const v = parseFloat(d.value) || 0;
    const val = dense
      ? `<div style="height:42px;display:flex;align-items:flex-end;justify-content:center;width:100%;overflow:visible;"><span style="transform:rotate(-90deg);transform-origin:center;white-space:nowrap;font-size:${valFont}px;font-weight:800;color:${scoreDark(v)};">${fmtPct(v)}%</span></div>`
      : `<div style="font-size:${valFont}px;font-weight:800;margin-bottom:2px;color:${scoreDark(v)};white-space:nowrap;">${fmtPct(v)}%</div>`;
    // min-width:0 สำคัญมาก! กันคอลัมน์ดันความกว้างจนกราฟล้นหน้า
    return `<div style="flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:${H}px;">${val}<div style="height:${Math.max(v / 100 * H, 2)}px;width:${dense ? '82%' : '60%'};max-width:${barMax}px;background:${scoreGrad(v)};border-radius:${dense ? '3px 3px 0 0' : '6px 6px 0 0'};-webkit-print-color-adjust:exact;print-color-adjust:exact;"></div></div>`;
  }).join('');

  const xl = data.map(d => {
    const sub = d.count != null ? (' (' + d.count + (d.people != null && !dense ? ' ครั้ง · ' + d.people + ' คน' : '') + ')') : '';
    return dense
      ? `<div style="flex:1;min-width:0;height:72px;position:relative;"><div style="position:absolute;top:6px;left:50%;transform:translateX(-50%) rotate(-58deg);transform-origin:top center;white-space:nowrap;font-size:${labFont}px;font-weight:700;color:#475569;">${esc(d.label)}${sub}</div></div>`
      : `<div style="flex:1;min-width:0;text-align:center;"><div style="font-size:${labFont}px;font-weight:700;color:#475569;margin-top:8px;line-height:1.2;">${esc(d.label)}</div>${d.count != null ? `<div style="font-size:10px;color:#94a3b8;margin-top:3px;">${d.count} ครั้ง${d.people != null ? ' · ' + d.people + ' คน' : ''}</div>` : ''}</div>`;
  }).join('');

  return `<div style="display:flex;padding-top:${topPad}px;"><div style="position:relative;width:30px;height:${H}px;flex:none;">${yax}</div><div style="flex:1;min-width:0;"><div style="position:relative;height:${H}px;">${grid}<div style="position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:space-around;gap:${gap}px;">${bars}</div></div><div style="display:flex;justify-content:space-around;gap:${gap}px;">${xl}</div></div></div>`;
}

// กราฟเส้น (SVG) — viewBox ทำให้พอดีหน้าเสมอ (ไม่ล้น) แม้จุดเยอะ
export function lineChartHTML(data) {
  if (!data || data.length === 0) return '<div style="text-align:center;color:#94a3b8;padding:30px;">ยังไม่มีข้อมูล</div>';
  const W = 714, H = 230, padX = 44, padY = 30, plotW = W - padX * 2, plotH = H - padY * 2;
  const x = (i) => data.length === 1 ? padX + plotW / 2 : padX + (i / (data.length - 1)) * plotW;
  const y = (v) => padY + plotH - (Math.min(Math.max(v, 0), 100) / 100) * plotH;
  const pts = data.map((d, i) => `${x(i)},${y(parseFloat(d.value) || 0)}`).join(' ');
  const gl = [0, 25, 50, 75, 100].map(g => { const gy = y(g); return `<line x1="${padX}" y1="${gy}" x2="${W - padX}" y2="${gy}" stroke="#e5e7eb" stroke-width="1"/><text x="${padX - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="#94a3b8">${g}</text>`; }).join('');
  const dots = data.map((d, i) => { const v = parseFloat(d.value) || 0; return `<circle cx="${x(i)}" cy="${y(v)}" r="4.5" fill="${scoreDark(v)}" stroke="#fff" stroke-width="1.5"/><text x="${x(i)}" y="${y(v) - 11}" text-anchor="middle" font-size="11" font-weight="700" fill="#238885">${fmtPct(v)}%</text><text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="#64748b">${esc(d.label)}</text>`; }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;">${gl}<polyline points="${pts}" fill="none" stroke="#238885" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}
