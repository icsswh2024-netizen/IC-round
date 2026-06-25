#!/usr/bin/env node
/*
 * build.js — คอมไพล์ src/app.jsx (JSX) เป็น JavaScript ธรรมดา
 * แล้วฝังกลับเข้า index.html ระหว่าง <!-- APP:START --> ... <!-- APP:END -->
 *
 * วิธีใช้:
 *   1) npm install        (ติดตั้ง @babel/standalone ครั้งแรก)
 *   2) แก้ไขโค้ดที่ src/app.jsx
 *   3) node build.js      (สร้าง index.html ใหม่)
 *
 * เหตุผล: เดิมหน้าเว็บใช้ Babel standalone แปลง JSX สดในเบราว์เซอร์
 * ซึ่งช้า/ค้างบนมือถือ การคอมไพล์ล่วงหน้าทำให้ไม่ต้องโหลด Babel (~3MB)
 * และไม่ต้องแปลงสดทุกครั้งที่เปิดหน้า
 */
const fs = require('fs');
const path = require('path');
const Babel = require('@babel/standalone');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src', 'app.jsx');
const IDX = path.join(ROOT, 'index.html');

const jsx = fs.readFileSync(SRC, 'utf8');
const compiled = Babel.transform(jsx, { presets: ['react'] }).code;

let html = fs.readFileSync(IDX, 'utf8');
const startMarker = '<!-- APP:START';
const endMarker = '<!-- APP:END -->';
const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);
if (startIdx === -1 || endIdx === -1) {
  console.error('ไม่พบ marker APP:START / APP:END ใน index.html');
  process.exit(1);
}

const block =
  '<!-- APP:START (สร้างอัตโนมัติจาก src/app.jsx โดย build.js — อย่าแก้ตรงนี้โดยตรง) -->\n' +
  '  <script>\n' + compiled + '\n  </script>\n' +
  '  ' + endMarker;

html = html.slice(0, startIdx) + block + html.slice(endIdx + endMarker.length);
fs.writeFileSync(IDX, html, 'utf8');
console.log(`คอมไพล์สำเร็จ: src/app.jsx (${jsx.length} ตัวอักษร) -> index.html (${compiled.length} ตัวอักษร JS)`);
