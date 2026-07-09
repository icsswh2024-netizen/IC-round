#!/usr/bin/env node
/*
 * build.js — ขั้นตอน build ของเว็บหน้าเดียว (index.html)
 *
 *   1) คอมไพล์ src/app.jsx (JSX) -> JavaScript ธรรมดา (classic runtime = React.createElement)
 *      แล้วฝังกลับเข้า index.html ระหว่าง <!-- APP:START --> ... <!-- APP:END -->
 *   2) สร้าง Tailwind CSS แบบ static (เฉพาะคลาสที่ใช้จริง) แล้วฝังระหว่าง
 *      <!-- TWCSS:START --> ... <!-- TWCSS:END -->  (แทน Play CDN เพื่อความเร็ว/ลื่นบนมือถือ)
 *
 * วิธีใช้:
 *   1) npm install            (ติดตั้ง @babel/standalone + tailwindcss ครั้งแรก)
 *   2) แก้ไขโค้ดที่ src/app.jsx
 *   3) node build.js          (สร้าง index.html ใหม่)
 *
 * เหตุผล: การแปลง JSX สด (Babel) และการสร้าง CSS สด (Tailwind Play CDN) ในเบราว์เซอร์
 * ทำให้ช้า/ค้าง/จอขาววูบบนมือถือ การคอมไพล์ล่วงหน้าตัดภาระเหล่านั้นออกทั้งหมด
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src', 'app.jsx');
const IDX = path.join(ROOT, 'index.html');

function injectBetween(html, startMarker, endMarker, innerHtml, label) {
  const s = html.indexOf(startMarker);
  const e = html.indexOf(endMarker);
  if (s === -1 || e === -1) {
    console.error(`ไม่พบ marker ${label} ใน index.html`);
    process.exit(1);
  }
  return html.slice(0, s) + innerHtml + html.slice(e + endMarker.length);
}

// ---------- 1) คอมไพล์ JSX ----------
const Babel = require('@babel/standalone');
const jsx = fs.readFileSync(SRC, 'utf8');
// classic runtime ให้เข้ากับ React แบบ UMD (global window.React) — ห้ามใช้ automatic runtime
const compiled = Babel.transform(jsx, { presets: [['react', { runtime: 'classic' }]] }).code;

let html = fs.readFileSync(IDX, 'utf8');
html = injectBetween(
  html,
  '<!-- APP:START',
  '<!-- APP:END -->',
  '<!-- APP:START (สร้างอัตโนมัติจาก src/app.jsx โดย build.js — อย่าแก้ตรงนี้โดยตรง) -->\n  <script>\n' + compiled + '\n  </script>\n  <!-- APP:END -->',
  'APP:START/APP:END'
);
fs.writeFileSync(IDX, html, 'utf8');
console.log(`[JSX] คอมไพล์: src/app.jsx (${jsx.length}) -> JS (${compiled.length})`);

// ---------- 1.5) ฝัง React/ReactDOM (UMD) ในไฟล์ ไม่พึ่ง CDN (กันจอขาวเมื่อเครือข่ายบล็อก cdnjs) ----------
try {
  const reactCode = fs.readFileSync(path.join(ROOT, 'vendor', 'react.production.min.js'), 'utf8');
  const reactDomCode = fs.readFileSync(path.join(ROOT, 'vendor', 'react-dom.production.min.js'), 'utf8');
  html = fs.readFileSync(IDX, 'utf8');
  // ใช้ replacement function กันอักขระ $ ในโค้ด React ถูกตีความเป็น special pattern
  const reactBlock =
    '<!-- REACT:START (ฝัง React/ReactDOM ในไฟล์โดย build.js — กันจอขาวเมื่อเครือข่ายบล็อก cdnjs) -->\n' +
    '  <script>' + reactCode + '\n</script>\n' +
    '  <script>' + reactDomCode + '\n</script>\n' +
    '  <!-- REACT:END -->';
  const s = html.indexOf('<!-- REACT:START');
  const e = html.indexOf('<!-- REACT:END -->');
  if (s === -1 || e === -1) throw new Error('ไม่พบ marker REACT:START/REACT:END');
  html = html.slice(0, s) + reactBlock + html.slice(e + '<!-- REACT:END -->'.length);
  fs.writeFileSync(IDX, html, 'utf8');
  console.log(`[REACT] ฝัง React/ReactDOM ในไฟล์ (${reactCode.length + reactDomCode.length} ตัวอักษร)`);
} catch (err) {
  console.warn('[REACT] ข้ามการฝัง React (คง CDN/inline เดิมไว้):', err.message);
}

// ---------- 2) สร้าง Tailwind CSS แบบ static ----------
function findTailwindBin() {
  const names = process.platform === 'win32' ? ['tailwindcss.cmd', 'tailwindcss'] : ['tailwindcss'];
  const dirs = [
    path.join(ROOT, 'node_modules', '.bin'),
    // fallback: ตำแหน่งที่อาจติดตั้งไว้ระหว่างพัฒนา
    process.env.TAILWIND_BIN_DIR || '',
  ].filter(Boolean);
  for (const d of dirs) for (const n of names) {
    const p = path.join(d, n);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

try {
  const bin = findTailwindBin();
  if (!bin) {
    console.warn('[CSS] ข้ามการสร้าง Tailwind CSS: ไม่พบ tailwindcss (รัน `npm install` ก่อน) — CSS เดิมใน index.html ยังคงอยู่');
  } else {
    const inputPath = path.join(ROOT, '.tw.input.css');
    const outputPath = path.join(ROOT, '.tw.output.css');
    fs.writeFileSync(inputPath, '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');
    execFileSync(bin, ['-c', path.join(ROOT, 'tailwind.config.js'), '-i', inputPath, '-o', outputPath, '--minify'], { stdio: 'pipe' });
    const css = fs.readFileSync(outputPath, 'utf8').trim();
    fs.unlinkSync(inputPath); fs.unlinkSync(outputPath);
    html = fs.readFileSync(IDX, 'utf8');
    html = injectBetween(
      html,
      '<!-- TWCSS:START',
      '<!-- TWCSS:END -->',
      '<!-- TWCSS:START (Tailwind CSS แบบ static สร้างโดย build.js — อย่าแก้ตรงนี้โดยตรง) -->\n  <style>' + css + '</style>\n  <!-- TWCSS:END -->',
      'TWCSS:START/TWCSS:END'
    );
    fs.writeFileSync(IDX, html, 'utf8');
    console.log(`[CSS] สร้าง Tailwind CSS แบบ static (${css.length} ตัวอักษร) ฝังใน index.html แล้ว`);
  }
} catch (err) {
  console.warn('[CSS] สร้าง Tailwind CSS ไม่สำเร็จ (คง CSS เดิมไว้):', err.message);
}
