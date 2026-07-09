/** Tailwind config สำหรับสร้าง CSS แบบ static (ใช้กับ build.js)
 *  สแกนคลาสจากซอร์ส src/app.jsx และ index.html ที่คอมไพล์แล้ว
 */
module.exports = {
  content: ['./src/app.jsx'],
  theme: { extend: {} },
  corePlugins: { preflight: true },
  plugins: [],
};
