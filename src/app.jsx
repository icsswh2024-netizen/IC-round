
    const { useState, useMemo, useRef, useEffect } = React;

    // --- URL สำหรับ Google Script ล่าสุด ---
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzYqfYWNLM7cxN1fB9L8NoN3SuZHSuJsqf0DL4Ea72ge8A88cNL2zrY_7ecZvDlsv4B/exec"; 

    // --- SVG Icons Components ---
    const IconProps = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" };
    const Activity = ({className}) => <svg className={className} {...IconProps}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
    const Building2 = ({className}) => <svg className={className} {...IconProps}><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>;
    const User = ({className}) => <svg className={className} {...IconProps}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    const Users = ({className}) => <svg className={className} {...IconProps}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    const Search = ({className}) => <svg className={className} {...IconProps}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
    const NurseCap = ({className}) => <svg className={className} {...IconProps}><path d="M4 14.5l1-9A2 2 0 0 1 7 4h10a2 2 0 0 1 2 1.5l1 9Z"/><path d="M12 7v4"/><path d="M10 9h4"/></svg>;
    const ChevronDown = ({className}) => <svg className={className} {...IconProps}><path d="m6 9 6 6 6-6"/></svg>;
    const CheckCircle2 = ({className}) => <svg className={className} {...IconProps}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>;
    const XCircle = ({className}) => <svg className={className} {...IconProps}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>;
    const MinusCircle = ({className}) => <svg className={className} {...IconProps}><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>;
    const Calculator = ({className}) => <svg className={className} {...IconProps}><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>;
    const Loader2 = ({className}) => <svg className={`animate-spin ${className}`} {...IconProps}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>;
    const Download = ({className}) => <svg className={className} {...IconProps}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>;
    const FileText = ({className}) => <svg className={className} {...IconProps}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>;
    const LayoutDashboard = ({className}) => <svg className={className} {...IconProps}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>;
    const Printer = ({className}) => <svg className={className} {...IconProps}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>;
    const Clock = ({className}) => <svg className={className} {...IconProps}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
    const Trash2 = ({className}) => <svg className={className} {...IconProps}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>;
    const AlertTriangle = ({className}) => <svg className={className} {...IconProps}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>;
    const CloudDownload = ({className}) => <svg className={className} {...IconProps}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>;
    const LogOut = ({className}) => <svg className={className} {...IconProps}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;
    const PieChart = ({className}) => <svg className={className} {...IconProps}><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>;
    const FilterIcon = ({className}) => <svg className={className} {...IconProps}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>;
    const RefreshCw = ({className}) => <svg className={className} {...IconProps}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;

    // --- Custom Popup Modal Component ---
    const CustomPopup = ({ isOpen, title, message, type, onConfirm, onClose }) => {
      if (!isOpen) return null;
      return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#32355c]/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 w-full max-w-md overflow-hidden transform transition-all scale-100">
            <div className={`p-6 border-b-2 flex items-center gap-4 ${type === 'error' ? 'bg-[#f1a164]/10 border-[#f1a164]/20' : type === 'confirm' ? 'bg-[#e9c460]/10 border-[#e9c460]/20' : 'bg-[#16bba6]/10 border-[#16bba6]/20'}`}>
              {type === 'error' ? <AlertTriangle className="w-10 h-10 text-[#f1a164]" /> : 
               type === 'confirm' ? <AlertTriangle className="w-10 h-10 text-[#e9c460]" /> : 
               <CheckCircle2 className="w-10 h-10 text-[#16bba6]" />}
              <h3 className={`font-black text-2xl ${type === 'error' ? 'text-red-600' : type === 'confirm' ? 'text-amber-600' : 'text-[#238885]'}`}>
                {title || 'แจ้งเตือน'}
              </h3>
            </div>
            <div className="p-8 text-[#314566] whitespace-pre-wrap text-lg leading-relaxed font-bold">
              {message}
            </div>
            <div className="p-6 bg-gray-50 border-t-2 border-gray-100 flex justify-end gap-4">
              {type === 'confirm' && (
                <button onClick={onClose} className="px-8 py-3.5 rounded-xl font-bold text-[#314566] bg-white border-2 border-gray-300 hover:bg-gray-100 transition-colors shadow-sm text-lg">
                  ยกเลิก
                </button>
              )}
              <button 
                onClick={() => { if (onConfirm) onConfirm(); onClose(); }} 
                className={`px-10 py-3.5 rounded-xl font-black text-white transition-colors shadow-md text-lg ${
                  type === 'error' ? 'bg-red-600 hover:bg-red-700' : 
                  type === 'confirm' ? 'bg-[#e9c460] hover:bg-[#c9a74a]' : 
                  'bg-[#238885] hover:bg-[#16bba6]'
                }`}
              >
                {type === 'confirm' ? 'ยืนยัน' : 'ตกลง'}
              </button>
            </div>
          </div>
        </div>
      );
    };

    // --- Component สำหรับแสดงกล่อง Bundle ---
    const BundleCard = ({ bundleKey, data, config }) => (
      <div className={`pdf-no-break rounded-2xl p-3 border-2 ${config.color} flex flex-col items-center text-center shadow-md print:bg-white print:border-gray-300 print:shadow-none print:text-black flex-1 min-w-[160px] max-w-[200px]`}>
        <div className="h-auto flex flex-col items-center justify-center w-full border-b-2 border-white/30 pb-3 mb-3 print:border-gray-200">
          <span className="text-4xl font-black mb-0 leading-none text-white print:text-slate-800">{bundleKey}</span>
          <span className="text-sm font-bold leading-tight break-words whitespace-normal mt-2 text-center text-white/90 print:text-slate-600">{config.label}</span>
          <span className="text-xs font-bold mt-2 bg-black/20 px-3 py-1 rounded-full w-full max-w-[95%] truncate text-center text-white border border-white/10 print:bg-gray-50 print:text-slate-500 print:border-gray-200" title={config.items.join(', ')}>ข้อ: {config.items.join(', ')}</span>
        </div>
        <div className="w-full bg-black/10 rounded-xl p-3 border border-white/10 flex flex-col items-center shadow-inner print:bg-gray-50 print:border-gray-100">
          <span className="block text-4xl font-black text-white leading-none print:text-[#238885]">{data?.percent || 0}%</span>
          <span className="block text-xs font-bold text-white/80 mt-2 print:text-slate-500">ผ่าน: {data?.earned || 0}/{data?.total || 0}</span>
          <div className="w-full bg-black/20 rounded-lg px-2 py-1.5 border border-white/20 mt-3 print:bg-[#f1a164]/10 print:border-[#f1a164]/30">
             <span className="block text-xs font-bold text-white text-center print:text-[#c2651b]">ส่วนที่เหลือ: {100 - (parseInt(data?.percent) || 0)}%</span>
          </div>
        </div>
      </div>
    );

    // --- Data Constants ---
    const OPD_LIST = ["OPD1", "OPD2", "SMC", "Eye", "ENT", "ER", "HD", "CAPD", "Scop", "อื่นๆ"];
    const IPD_LIST = ["FMW", "MMW", "FSW", "MSW", "OBG", "ICU", "NICU", "PED", "PW1", "PW2", "PW3", "PW4", "PW 5", "OPR", "Ane", "SU", "อื่นๆ"];
    const SERVICE_DEPT_LIST = ["ห้อง Lab", "ทันตกรรม", "X-ray", "เวชกรรมฟื้นฟู", "อาชีวเวชกรรม", "เวชกรรมสังคม", "อื่นๆ"];
    
    const FALLBACK_ASSESSOR_LIST = [
      "อื่นๆ",
      "นางสาวอภันตรี กองทอง", "นางสาวสุรีพร ดวงสุวรรณ์", "นางบุปผา เพ็ชรหมอง", "นางสาวณัฏฐศศิ มั่นประสงค์",
      "นางสุภาดา สนทิม", "นางสาวสุวรัตน์ ภู่เพ็ง", "นางมนัสนันท์ แดงพัฒน์", "นางสาวสุรีรัตน์ กลิ่นไม้",
      "นางสาวศศิธร ศรีสุขศิริพันธ์", "นางสาววรรณราย อารีย์", "นางศิริลักษณ์ โสตถิถาวร", "นางรวิวรรณ ปานบุตร",
      "นางกัลยา พุฒฤทธิ์", "นางสาวกัณฑิมา ดาระอินทร์", "นายชูศักดิ์ ทัพพ์หสิริพงษ์", "นายธนัญชกร เชยวัตกะ",
      "นางสาวกาญจนา แมลงภู่", "นางสาวบุญญรัตน์ รัตนประภา", "นายพลัฏฐ์ ประสมรัศมี", "นางสาวนงนุช นนทประสาท",
      "นางรัตติกาล รัชบุตร", "นางดนยา อินทะวงษ์", "นางสาววันเพ็ญ พุ่มเกตุ", "นางสาวนิภาพร จงหาญ",
      "นางแววตา วงเวียน", "นางสาววราภรณ์ เนื่องกันทา", "นางสาวศิริลักษณ์ เกิดที่สุด", "นางสาวปาริฉัตร แนมบาง",
      "นางสาวปรียา ชูจันทร์", "นางลลิตา คล้ายแก้ว", "นางสาวเกศยา มั่งมี", "นางสาวพิมพ์สุภา มั่นคง",
      "นางสุภาพร พยัคฆภาพ", "นางทัศศินา มีศรี", "นางสาวศิริวรรณ นาคคุ้ม", "นางสาวกัลยา ศุทธกิจไพบูลย์",
      "นางเรณู เที่ยวนา", "นางสาวสาวิตรี จันทร์ศรี", "นางธัญญารัตน์ เด่นดวง", "นางสาวกิษดาภร จันทร์สุก",
      "นางสาวสำราญ จงรักษ์", "นางระอองดาว ยุบล", "นางสาวอัจฉรา บุญเทียน", "นางสาวดลนภัส บริบูรณ์",
      "นางเพชรรัตน์ ธีปะนะ", "นางสาววราภรณ์ นิลบุตร", "นางสาวหทัยชนก ขัดสาย", "นางสาวสมิตตรา ไขแจ้ง",
      "นางสาวพัทธยา เทพจันทร์", "นางนภาพร บุญโหล"
    ];

    const EVALUATEE_ROLES = ["พยาบาลวิชาชีพ", "ผู้ช่วยพยาบาล", "พนักงานช่วยเหลือคนไข้", "พนักงานช่วยการพยาบาล", "คนงาน", "พนักงานทำความสะอาด", "นักกายภาพบำบัด", "นักกิจกรรมบำบัด", "ผู้ช่วยนักกายภาพบำบัด", "อื่นๆ"];

    // --- Palette Configuration ---
    const CAUTI_BUNDLE_MAPPING = {
      H: { label: "Hand hygiene", th: "ทำความสะอาดมือ", items: ["1.2", "1.3"], color: "bg-[#314566] border-[#314566] text-white" },
      A: { label: "Avoid unnecessary", th: "หลีกเลี่ยงการใส่สายสวน", items: ["1.1"], color: "bg-[#238885] border-[#238885] text-white" },
      R: { label: "Review daily", th: "ทบทวนข้อบ่งชี้ทุกวัน", items: ["1.1"], color: "bg-[#8ab278] border-[#8ab278] text-white" },
      M: { label: "Maintain based on rec.", th: "ดูแลตามมาตรฐาน", items: ["1.4", "1.5", "1.6", "1.8", "1.9", "1.11"], color: "bg-[#f1a164] border-[#f1a164] text-white" }
    };

    const VAP_BUNDLE_MAPPING = {
      W: { label: "Wean", th: "ประเมินการถอดท่อฯ", items: ["2.12"], color: "bg-[#285c6c] border-[#285c6c] text-white" },
      H: { label: "Hand hygiene", th: "ทำความสะอาดมือ", items: ["1.1", "1.2", "1.3", "1.4", "2.1", "2.9", "4.1", "4.2"], color: "bg-[#314566] border-[#314566] text-white" },
      A: { label: "Aspiration Prec.", th: "ป้องกันการสำลัก", items: ["1.7", "1.10", "2.5", "3.2", "3.6", "4.9"], color: "bg-[#e9c460] border-[#e9c460] text-white" },
      P: { label: "Prevent Contam.", th: "ป้องกันการปนเปื้อน", items: ["2.4", "4.8", "4.13", "4.14", "4.16"], color: "bg-[#f1a164] border-[#f1a164] text-white" },
      O: { label: "Oral care", th: "ทำความสะอาดช่องปาก", items: ["1.6"], color: "bg-[#8ab278] border-[#8ab278] text-white" }
    };

    const MDRO_BUNDLE_MAPPING = {
      C: { label: "Communication", th: "การสื่อสาร", items: ["1.2", "3.1", "7.3"], color: "bg-[#f1a164] border-[#f1a164] text-white" },
      H: { label: "Hand hygiene", th: "ทำความสะอาดมือ", items: ["3.5", "3.9"], color: "bg-[#16bba6] border-[#16bba6] text-white" },
      I: { label: "Isolation Prec.", th: "แยกผู้ป่วยและอุปกรณ์", items: ["2.1", "2.2", "3.2", "3.4"], color: "bg-[#32355c] border-[#32355c] text-white" },
      P: { label: "Policy & Protect.", th: "นโยบายและอุปกรณ์ป้องกัน", items: ["1.5", "3.6", "3.7", "3.8", "7.4"], color: "bg-[#e9c460] border-[#e9c460] text-white" },
      E: { label: "Environ. & Edu.", th: "สิ่งแวดล้อมและให้ความรู้", items: ["1.3", "3.11", "5.4", "5.5", "5.6", "5.7"], color: "bg-[#8ab278] border-[#8ab278] text-white" }
    };

    const MDRO_NORMAL_BUNDLE_MAPPING = {
      I: { label: "Isolation", th: "การแยกผู้ป่วยและอุปกรณ์", items: ["1", "7", "8", "13"], color: "bg-[#32355c] border-[#32355c] text-white" },
      E: { label: "Education", th: "การสื่อสารและให้ความรู้", items: ["2", "3", "6", "17", "18"], color: "bg-[#e9c460] border-[#e9c460] text-white" },
      H: { label: "Hand hygiene", th: "ทำความสะอาดมือ", items: ["4", "5", "9"], color: "bg-[#16bba6] border-[#16bba6] text-white" },
      P: { label: "PPE", th: "อุปกรณ์ป้องกัน", items: ["10", "11", "12"], color: "bg-[#f1a164] border-[#f1a164] text-white" },
      M: { label: "Environment", th: "การจัดการสิ่งแวดล้อม", items: ["14", "15", "16", "19", "20", "21", "22", "23"], color: "bg-[#8ab278] border-[#8ab278] text-white" }
    };

    const FIVE_MOMENT_BUNDLE_MAPPING = {
      M1: { label: "Moment 1", th: "ก่อนสัมผัสผู้ป่วย", items: ["1.1", "1"], color: "bg-[#238885] border-[#238885] text-white" },
      M2: { label: "Moment 2", th: "ก่อนทำหัตถการ", items: ["1.2", "2"], color: "bg-[#16bba6] border-[#16bba6] text-white" },
      M3: { label: "Moment 3", th: "หลังสัมผัสผู้ป่วย", items: ["1.3", "3"], color: "bg-[#8ab278] border-[#8ab278] text-white" },
      M4: { label: "Moment 4", th: "หลังสัมผัสสิ่งคัดหลั่ง", items: ["1.4", "4"], color: "bg-[#e9c460] border-[#e9c460] text-white" },
      M5: { label: "Moment 5", th: "หลังสัมผัสสิ่งแวดล้อม", items: ["1.5", "5"], color: "bg-[#314566] border-[#314566] text-white" }
    };

    const SEVEN_STEP_BUNDLE_MAPPING = {
      S1: { label: "Step 1", th: "ฝ่ามือถูกัน", items: ["1.1", "1"], color: "bg-[#238885] border-[#238885] text-white" },
      S2: { label: "Step 2", th: "ฝ่ามือถูหลังมือ", items: ["1.2", "2"], color: "bg-[#16bba6] border-[#16bba6] text-white" },
      S3: { label: "Step 3", th: "ฝ่ามือถูหน้ามือและซอกนิ้ว", items: ["1.3", "3"], color: "bg-[#8ab278] border-[#8ab278] text-white" },
      S4: { label: "Step 4", th: "หลังมือถูฝ่ามือ", items: ["1.4", "4"], color: "bg-[#e9c460] border-[#e9c460] text-white" },
      S5: { label: "Step 5", th: "ถูนิ้วหัวแม่มือ", items: ["1.5", "5"], color: "bg-[#f1a164] border-[#f1a164] text-white" },
      S6: { label: "Step 6", th: "ปลายนิ้วถูขวางฝ่ามือ", items: ["1.6", "6"], color: "bg-[#314566] border-[#314566] text-white" },
      S7: { label: "Step 7", th: "ถูวนรอบข้อมือ", items: ["1.7", "7"], color: "bg-[#32355c] border-[#32355c] text-white" }
    };

    const getBundleMappingForType = (type) => {
        if (!type) return { mapping: {}, keys: [] };
        const t = String(type).trim().toUpperCase();
        if (t.includes('CAUTI')) return { mapping: CAUTI_BUNDLE_MAPPING, keys: ['H', 'A', 'R', 'M'] };
        if (t.includes('VAP')) return { mapping: VAP_BUNDLE_MAPPING, keys: ['W', 'H', 'A', 'P', 'O'] };
        if (t.includes('MDRO ควบคุมพิเศษ') || t.includes('MDRO พิเศษ') || t.includes('MDRCOTORL') || t.includes('DROCONTORL')) return { mapping: MDRO_BUNDLE_MAPPING, keys: ['C', 'H', 'I', 'P', 'E'] };
        if (t.includes('MDRO (ธรรมดา)') || t.includes('MDRO ธรรมดา')) return { mapping: MDRO_NORMAL_BUNDLE_MAPPING, keys: ['I', 'E', 'H', 'P', 'M'] };
        if (t.includes('5 MOMENT')) return { mapping: FIVE_MOMENT_BUNDLE_MAPPING, keys: ['M1', 'M2', 'M3', 'M4', 'M5'] };
        if (t.includes('7 STEP')) return { mapping: SEVEN_STEP_BUNDLE_MAPPING, keys: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'] };
        return { mapping: {}, keys: [] };
    };

    const getBundleKeysForItem = (itemId, type) => {
        const { mapping } = getBundleMappingForType(type);
        const keys = [];
        for (const [key, config] of Object.entries(mapping)) {
           if (config.items.includes(String(itemId).trim())) { keys.push(key); }
        }
        return keys;
    };

    const getBundleBadgeColor = (key, type) => {
        const { mapping } = getBundleMappingForType(type);
        const config = mapping[key];
        if (!config) return 'bg-[#32355c] text-white';
        const match = config.color.match(/(bg-\[[^\]]+\])/);
        return match ? match[1] : 'bg-[#32355c] text-white';
    };

    const getActualBundleItemsCount = (mapping, checklist) => {
        if (!checklist || !mapping) return 0;
        const availableItems = new Set();
        checklist.forEach(sec => sec.items && sec.items.forEach(item => availableItems.add(String(item.id).trim())));
        const matchedItems = new Set();
        Object.values(mapping).forEach(c => {
            c.items.forEach(i => {
                if (availableItems.has(String(i).trim())) matchedItems.add(String(i).trim());
            });
        });
        return matchedItems.size;
    };

    const getSectionColor = (id) => {
        switch(id) {
          case 1: return { bg: 'bg-[#285c6c]/10', headerBg: 'bg-[#285c6c]', headerText: 'text-white', border: 'border-[#285c6c]/30', text: 'text-[#285c6c]', itemText: 'text-[#1d434f]' };
          case 2: return { bg: 'bg-[#238885]/10', headerBg: 'bg-[#238885]', headerText: 'text-white', border: 'border-[#238885]/30', text: 'text-[#238885]', itemText: 'text-[#175c5a]' };
          case 3: return { bg: 'bg-[#314566]/10', headerBg: 'bg-[#314566]', headerText: 'text-white', border: 'border-[#314566]/30', text: 'text-[#314566]', itemText: 'text-[#1f2c42]' };
          case 4: return { bg: 'bg-[#8ab278]/10', headerBg: 'bg-[#8ab278]', headerText: 'text-white', border: 'border-[#8ab278]/30', text: 'text-[#5a7d4a]', itemText: 'text-[#5a7d4a]' };
          case 5: return { bg: 'bg-[#f1a164]/10', headerBg: 'bg-[#f1a164]', headerText: 'text-white', border: 'border-[#f1a164]/30', text: 'text-[#c2651b]', itemText: 'text-[#c2651b]' };
          case 6: return { bg: 'bg-[#e9c460]/10', headerBg: 'bg-[#e9c460]', headerText: 'text-[#32355c]', border: 'border-[#e9c460]/30', text: 'text-[#b48c20]', itemText: 'text-[#b48c20]' };
          case 7: return { bg: 'bg-[#32355c]/10', headerBg: 'bg-[#32355c]', headerText: 'text-white', border: 'border-[#32355c]/30', text: 'text-[#32355c]', itemText: 'text-[#1f213b]' };
          default: return { bg: 'bg-[#16bba6]/10', headerBg: 'bg-[#16bba6]', headerText: 'text-white', border: 'border-[#16bba6]/30', text: 'text-[#0e8a7a]', itemText: 'text-[#0e8a7a]' };
        }
    };

    const SearchableSelect = ({ label, options, value, onChange, placeholder }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [search, setSearch] = useState("");
      const dropdownRef = useRef(null);

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      const filteredOptions = options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

      return (
        <div className={`relative w-full ${isOpen ? 'z-50' : ''}`} ref={dropdownRef}>
          <label className="block text-xl font-bold text-[#32355c] mb-2">{label}</label>
          <div 
            className="flex items-center justify-between w-full p-4 border-2 border-gray-300 rounded-xl bg-white cursor-pointer hover:border-[#238885] transition-colors shadow-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`text-lg font-bold ${value ? "text-[#32355c]" : "text-gray-400"}`}>{value || placeholder}</span>
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
          {isOpen && (
            <div className="absolute z-50 w-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-64 flex flex-col">
              <div className="p-3 border-b-2 border-gray-100 sticky top-0 bg-white rounded-t-xl">
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 w-6 h-6 text-gray-400" />
                  <input type="text" className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16bba6]/50 bg-gray-50 text-[#32355c] placeholder-gray-400 font-bold" placeholder="พิมพ์ค้นหา (1-2 ตัวอักษร)..." value={search} onChange={(e) => setSearch(e.target.value)} onClick={(e) => e.stopPropagation()} />
                </div>
              </div>
              <div className="overflow-y-auto hide-scrollbar">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => (
                    <div key={opt} className="px-6 py-4 hover:bg-gray-50 cursor-pointer text-[#314566] text-lg font-bold border-b border-gray-50 last:border-0" onClick={() => { onChange(opt); setIsOpen(false); setSearch(""); }}>
                      {opt}
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-5 text-lg text-gray-500 text-center font-bold">ไม่พบข้อมูล</div>
                )}
              </div>
            </div>
          )}
        </div>
      );
    };

    function App() {
      const [viewMode, setViewMode] = useState("department"); 
      const [hospitalRecords, setHospitalRecords] = useState(() => {
        const saved = localStorage.getItem('ic_hospital_records');
        if (saved) { try { return JSON.parse(saved); } catch(e) { return []; } }
        return [];
      });

      const [isHistoryAuthenticated, setIsHistoryAuthenticated] = useState(false);
      
      const [dynamicChecklists, setDynamicChecklists] = useState(null);
      const [isLoadingChecklists, setIsLoadingChecklists] = useState(true);
      const [isSyncingChecklist, setIsSyncingChecklist] = useState(false);
      const [assessorList, setAssessorList] = useState(FALLBACK_ASSESSOR_LIST);

      // --- ตัวแปรสำหรับระบบแสดงพรีวิวและดาวน์โหลด PDF ---
      const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
      const [pdfPreviewState, setPdfPreviewState] = useState({ isOpen: false, htmlContent: '', filename: '' });
      const [blankFormPickerOpen, setBlankFormPickerOpen] = useState(false);

      useEffect(() => { localStorage.setItem('ic_hospital_records', JSON.stringify(hospitalRecords)); }, [hospitalRecords]);
      
      const fetchChecklistsData = async (isManual = false) => {
          setIsSyncingChecklist(true);
          const sheetId = '1y5CHVtMVWJ8Wge7YOEqrcLENHnDNxns-_Y9j-FuVFjU';
          
          try {
            try {
                const nameUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=name`;
                const nameRes = await fetch(nameUrl);
                const nameText = await nameRes.text();
                const nameJsonString = nameText.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/)[1];
                const nameJsonData = JSON.parse(nameJsonString);
                const fetchedAssessors = ["อื่นๆ"];
                nameJsonData.table.rows.forEach(row => {
                    if (row && row.c && row.c[0]) {
                        const nameVal = row.c[0].f ? String(row.c[0].f).trim() : (row.c[0].v !== null && row.c[0].v !== undefined ? String(row.c[0].v).trim() : '');
                        if (nameVal && !['ชื่อ', 'ชื่อผู้ประเมิน', 'ผู้ประเมิน', 'รายชื่อผู้ประเมิน', 'รายชื่อ'].includes(nameVal)) {
                            fetchedAssessors.push(nameVal);
                        }
                    }
                });
                if (fetchedAssessors.length > 1) {
                    setAssessorList(fetchedAssessors);
                }
            } catch (e) {
                console.error("Error fetching assessors:", e);
            }

            const sheetName = 'total';
            const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
            const response = await fetch(url);
            const text = await response.text();
            
            const jsonString = text.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\);/)[1];
            const jsonData = JSON.parse(jsonString);
            const rows = jsonData.table.rows;
            const parsedData = {};
            const getVal = (col) => {
                if (!col) return '';
                if (col.f !== undefined && col.f !== null) return String(col.f).trim();
                if (col.v !== undefined && col.v !== null) return String(col.v).trim();
                return '';
            };
            const lastMainOrderMap = {}; 

            rows.forEach((row) => {
              if (!row || !row.c || !row.c[0]) return;
              
              const assessName = getVal(row.c[0]);
              if (!assessName || assessName === 'ชื่อแบบประเมิน' || assessName === 'A') return;

              const rawMainOrder = getVal(row.c[1]);
              const subOrder = getVal(row.c[2]);
              const activity = getVal(row.c[3]);

              if (!parsedData[assessName]) {
                parsedData[assessName] = [];
                lastMainOrderMap[assessName] = 'ทั่วไป';
              }

              let mainOrder = rawMainOrder;
              if (mainOrder) {
                  lastMainOrderMap[assessName] = mainOrder;
              } else {
                  mainOrder = lastMainOrderMap[assessName];
              }

              let section = parsedData[assessName].find(s => String(s.id) === String(mainOrder));
              
              if (rawMainOrder && !subOrder && activity) {
                  if (!section) {
                      section = { id: String(mainOrder), title: activity, rawTitleText: activity, items: [] };
                      parsedData[assessName].push(section);
                  } else {
                      section.title = activity;
                      section.rawTitleText = activity;
                  }
              } else {
                  if (!section) {
                      section = { id: String(mainOrder), title: mainOrder === 'ทั่วไป' ? 'รายการประเมิน' : `หมวดที่ ${mainOrder}`, items: [] };
                      parsedData[assessName].push(section);
                  }
              }

              if (activity) {
                  if (subOrder) {
                      if (!section.items.find(i => i.id === String(subOrder))) {
                          section.items.push({ id: String(subOrder), text: activity });
                      }
                  } else if (rawMainOrder) {
                      if (!section.items.find(i => i.id === String(rawMainOrder))) {
                          section.items.push({ id: String(rawMainOrder), text: activity });
                      }
                  }
              }
            });

            Object.keys(parsedData).forEach(key => {
                parsedData[key].forEach(section => {
                    if (section.items.length > 1 && section.rawTitleText) {
                        const filteredItems = section.items.filter(item => item.text.trim() !== section.rawTitleText.trim());
                        if (filteredItems.length > 0) {
                            section.items = filteredItems;
                        }
                    }
                });

                parsedData[key].sort((a, b) => {
                    const numA = parseFloat(a.id) || 0;
                    const numB = parseFloat(b.id) || 0;
                    return numA - numB;
                });
            });

            setDynamicChecklists(parsedData);
            if (isManual) {
               setPopupConfig({ isOpen: true, title: 'ซิงค์สำเร็จ', message: 'อัปเดตข้อมูลรายการประเมินล่าสุดจาก Google Sheet เรียบร้อยแล้ว', type: 'info', onConfirm: null });
            }
          } catch (error) {
            console.error("Error fetching dynamic checklists:", error);
            if (!isManual) setDynamicChecklists({});
            else setPopupConfig({ isOpen: true, title: 'เกิดข้อผิดพลาด', message: 'ไม่สามารถดึงข้อมูลแบบประเมินได้ในขณะนี้', type: 'error', onConfirm: null });
          } finally {
            setIsLoadingChecklists(false);
            setIsSyncingChecklist(false);
          }
      };

      useEffect(() => {
        if (viewMode === 'department') {
          fetchChecklistsData();
        }
      }, [viewMode]);

      // --- ฟังก์ชันหลักสำหรับแปลง HTML ให้เป็นภาพ JPG แล้วนำไปวางลงบนหน้า PDF (WYSIWYG 100%) ---
      const triggerPDFDownloadFromPreview = () => {
        setIsGeneratingPDF(true);
        window.scrollTo(0, 0);

        setTimeout(() => {
            // สร้างกล่องจำลองซ่อนไว้ เพื่อทำการแคปเจอร์
            const wrapper = document.createElement('div');
            wrapper.style.position = 'absolute';
            wrapper.style.top = '0';
            wrapper.style.left = '-9999px';
            wrapper.style.width = '794px'; // ความกว้างกระดาษ A4 ที่ 96 DPI
            wrapper.style.backgroundColor = '#ffffff';
            wrapper.style.zIndex = '-9999'; 
            
            wrapper.innerHTML = pdfPreviewState.htmlContent;
            document.body.appendChild(wrapper);

            setTimeout(async () => {
                try {
                    const pages = wrapper.querySelectorAll('.pdf-page');
                    const { jsPDF } = window.jspdf;
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight = pdf.internal.pageSize.getHeight();
                    
                    for (let i = 0; i < pages.length; i++) {
                        if (i > 0) pdf.addPage();
                        
                        // เอา Shadow และ Margin ออกชั่วคราวเพื่อให้ภาพคมชัดติดขอบกระดาษพอดี
                        const originalShadow = pages[i].style.boxShadow;
                        const originalMargin = pages[i].style.margin;
                        pages[i].style.boxShadow = 'none';
                        pages[i].style.margin = '0';

                        const canvas = await window.html2canvas(pages[i], { 
                            scale: 2, 
                            useCORS: true,
                            letterRendering: true
                        });
                        
                        // คืนค่า CSS
                        pages[i].style.boxShadow = originalShadow;
                        pages[i].style.margin = originalMargin;

                        const imgData = canvas.toDataURL('image/jpeg', 1.0);
                        
                        // คำนวณสัดส่วนให้ภาพพอดีกับหน้า PDF 100% ไม่ตกขอบ (Auto Fit-to-Page)
                        const canvasWidth = canvas.width;
                        const canvasHeight = canvas.height;
                        const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
                        const finalWidth = canvasWidth * ratio;
                        const finalHeight = canvasHeight * ratio;
                        const startX = (pdfWidth - finalWidth) / 2; // จัดกึ่งกลางแนวนอน
                        const startY = (pdfHeight - finalHeight) / 2; // จัดกึ่งกลางแนวตั้ง

                        pdf.addImage(imgData, 'JPEG', startX, startY, finalWidth, finalHeight);
                    }
                    
                    pdf.save(pdfPreviewState.filename);
                    if (document.body.contains(wrapper)) document.body.removeChild(wrapper);
                    setIsGeneratingPDF(false);
                    setPdfPreviewState(prev => ({ ...prev, isOpen: false }));
                } catch (err) {
                    console.error("PDF generation error:", err);
                    if (document.body.contains(wrapper)) document.body.removeChild(wrapper);
                    setIsGeneratingPDF(false);
                    showPopup({ title: 'เกิดข้อผิดพลาด', message: 'ไม่สามารถสร้างไฟล์ PDF ได้', type: 'error' });
                }
            }, 300); // รอ DOM เรนเดอร์
        }, 150);
      };

      // --- ฟังก์ชันสร้างโครงสร้าง HTML Table แบ่งเป็นหน้า A4 (Pagination) พร้อมทวน Header ---
      const buildHTMLFromData = (wsData, reportTitle, subtitle = '') => {
          // สไตล์สำหรับหน้า A4 (794px x 1123px) ปรับ Padding ด้านล่าง (60px) ให้กว้างขึ้นเพื่อป้องกันตกขอบ
          const a4Style = "width: 794px; height: 1123px; background: white; padding: 35px 40px 60px 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.2); margin: 0 auto; box-sizing: border-box; position: relative; overflow: hidden; display: flex; flex-direction: column;";
          
          let html = `<div style="background-color: #cbd5e1; padding: 40px 20px; display: flex; flex-direction: column; gap: 30px; align-items: center;" id="pdf-pages-container">`;
          
          const createPageHeader = (isFirst, page) => {
              const pageNumberHtml = `<div style="position: absolute; top: 15px; right: 40px; font-family: 'Sarabun', sans-serif; font-size: 12pt; color: #555; font-weight: bold;">หน้า ${page}</div>`;
              if (isFirst) {
                  return `
                      <div class="pdf-page" style="${a4Style}">
                          ${pageNumberHtml}
                          <div style="font-family: 'Sarabun', sans-serif; font-size: 14pt; color: #000; line-height: 1.4; flex-shrink: 0; padding-top: 10px;">
                              <div style="font-size: 20pt; font-weight: bold; text-align: center; margin-bottom: 5px;">${reportTitle}</div>
                              ${subtitle ? `<div style="font-size: 14pt; text-align: center; margin-bottom: 20px; color: #333;">${subtitle}</div>` : ''}
                          </div>
                          <div style="flex-grow: 1; overflow: hidden;">
                  `;
              } else {
                  return `
                      <div class="pdf-page" style="${a4Style}">
                          ${pageNumberHtml}
                          <div style="flex-grow: 1; overflow: hidden; padding-top: 20px;">
                  `;
              }
          };
          
          const closePage = () => `</div></div>`; // ปิดกล่องเนื้อหาและกล่องหน้ากระดาษ

          let isFirstPage = true;
          let pageNum = 1;
          let currentPageHtml = createPageHeader(isFirstPage, pageNum);
          let currentRowCount = 0; 
          
          // ปรับจำนวน "น้ำหนักความสูง" สูงสุดต่อหน้า
          const MAX_ROWS_FIRST_PAGE = 16;
          const MAX_ROWS_OTHER_PAGE = 21; 

          const getMaxRows = () => isFirstPage ? MAX_ROWS_FIRST_PAGE : MAX_ROWS_OTHER_PAGE;

          // ฟังก์ชันสำหรับคำนวณ "น้ำหนัก" หรือความสูงของแต่ละบรรทัด (แก้ปัญหาคำยาวจนขึ้นบรรทัดใหม่แล้วล้นหน้ากระดาษ)
          const getRowWeight = (row) => {
              if (!row || row.length === 0) return 1;
              let maxLines = 1;
              const maxCols = row.length;
              row.forEach((cell, cIdx) => {
                  const text = String(cell || "");
                  let charsPerLine = 70; 
                  if (maxCols === 6 && cIdx === 1) charsPerLine = 45; // คอลัมน์ "หัวข้อการประเมิน" แคบหน่อย
                  else if (maxCols === 2 && cIdx === 1) charsPerLine = 90; // คอลัมน์ "ข้อมูลทั่วไป" กว้างหน่อย
                  else if (maxCols > 6) charsPerLine = 20; // สำหรับตารางสรุปรวมท้ายสุด (คอลัมน์แคบ)
                  
                  const lines = Math.ceil(text.length / charsPerLine);
                  if (lines > maxLines) maxLines = lines;
              });
              return maxLines;
          };

          // ฟังก์ชันสำหรับต่อประกอบตาราง
          const flushGroup = (groupData) => {
              if (groupData.length === 0) return '';
              
              const maxCols = Math.max(...groupData.map(r => r.length));
              // ใช้ table-layout: auto สำหรับตารางสรุปรวมท้ายสุดที่มีคอลัมน์เยอะๆ
              let tableHtml = `<table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; font-size: 11pt; font-family: 'Sarabun', sans-serif; table-layout: ${maxCols > 6 ? 'auto' : 'fixed'}; word-wrap: break-word;">`;
              
              // กำหนดสัดส่วนคอลัมน์ตายตัว ป้องกันตารางแหว่งตกขอบ
              if (maxCols === 2) {
                  tableHtml += `<colgroup><col style="width: 35%;"><col style="width: 65%;"></colgroup>`;
              } else if (maxCols === 3) {
                  tableHtml += `<colgroup><col style="width: 60%;"><col style="width: 20%;"><col style="width: 20%;"></colgroup>`;
              } else if (maxCols === 4) {
                  tableHtml += `<colgroup><col style="width: 40%;"><col style="width: 20%;"><col style="width: 20%;"><col style="width: 20%;"></colgroup>`;
              } else if (maxCols === 5) {
                  tableHtml += `<colgroup><col style="width: 15%;"><col style="width: 25%;"><col style="width: 20%;"><col style="width: 20%;"><col style="width: 20%;"></colgroup>`;
              } else if (maxCols === 6) {
                  tableHtml += `<colgroup><col style="width: 8%;"><col style="width: 47%;"><col style="width: 11.25%;"><col style="width: 11.25%;"><col style="width: 11.25%;"><col style="width: 11.25%;"></colgroup>`;
              }
              
              tableHtml += `<tbody>`;

              groupData.forEach((row, rIdx) => {
                  const isSubHeader = (row.length === 1 || (row.length > 1 && row.slice(1).every(v => v === "" || v === undefined || v === null)));
                  const isHeaderRow = (rIdx === 0 && maxCols > 2 && !isSubHeader);
                  
                  tableHtml += `<tr>`;
                  for (let cIdx = 0; cIdx < maxCols; cIdx++) {
                      let cellVal = row[cIdx] !== undefined && row[cIdx] !== null ? row[cIdx] : '';
                      let colSpan = 1;
                      
                      if (isSubHeader) {
                          if (cIdx === 0) { colSpan = maxCols; } else { continue; }
                      }

                      // ตรวจสอบเงื่อนไขว่าสอบตกหรือไม่ (สำหรับตารางครอสแท็บใน PDF)
                      let isFail = false;
                      if (typeof cellVal === 'string' && cellVal.includes('!!FAIL!!')) {
                          isFail = true;
                          cellVal = cellVal.replace('!!FAIL!!', '');
                      }

                      // แก้ปัญหาฟอนต์ไทยชิดขอบล่างโดยการเพิ่ม padding-bottom ให้มากกว่า padding-top เพื่อดันข้อความขึ้นให้อยู่กึ่งกลาง
                      let cellStyle = "border: 1px solid #333; padding: 10px 10px 18px 10px; vertical-align: middle; line-height: 1.3;";
                      
                      // สำหรับตารางสรุปรวมท้ายสุดที่มีหลายคอลัมน์ ให้บีบช่องไฟและลดขนาดฟอนต์ลงเพื่อให้พอดีกับ A4
                      if (maxCols > 6) {
                          cellStyle = "border: 1px solid #333; padding: 5px 3px 9px 3px; vertical-align: middle; line-height: 1.2; font-size: 8pt; text-align: center;";
                      }

                      if (isHeaderRow) {
                          cellStyle += " background-color: #e5e7eb; font-weight: bold; text-align: center;";
                      } else if (isSubHeader) {
                          cellStyle += " background-color: #f3f4f6; font-weight: bold; text-align: left;";
                      } else if (maxCols === 6) {
                          // ปรับรายการประเมินย่อย: อักษรตัวบางชิดขอบซ้ายทั้งหมด
                          cellStyle += " font-weight: 300; text-align: left;";
                      } else if (maxCols <= 6) {
                          if (cIdx === 0 && maxCols === 2) cellStyle += " font-weight: bold; background-color: #f9fafb;"; 
                          else if (maxCols >= 3 && cIdx === 0) cellStyle += " text-align: left;";
                          else if (maxCols >= 5 && cIdx === 1) cellStyle += " text-align: left;";
                          else cellStyle += " text-align: center;";

                          if (String(cellVal).includes('%')) cellStyle += " font-weight: bold;";
                          else if (cellVal === 'ปฏิบัติ' || cellVal === '✓') cellStyle += " color: #15803d; font-weight: bold;";
                          else if (cellVal === 'ไม่ปฏิบัติ' || cellVal === '✗') cellStyle += " color: #b91c1c; font-weight: bold;";
                          else if (cellVal === 'NA') cellStyle += " color: #6b7280;";
                      } else {
                          // จัดตำแหน่งเฉพาะสำหรับตารางรวมท้ายสุด (ครอสแท็บ) พร้อมใส่สีเมื่อไม่ผ่านเกณฑ์
                          if (cIdx === 0) cellStyle += " text-align: left; font-weight: bold;";
                          else {
                              if (isFail) cellStyle += " font-weight: bold; color: #dc2626; background-color: #fee2e2;";
                              else cellStyle += " font-weight: bold; color: #238885;";
                          }
                      }

                      tableHtml += `<td colspan="${colSpan}" style="${cellStyle}">${cellVal}</td>`;
                  }
                  tableHtml += `</tr>`;
              });
              tableHtml += `</tbody></table>`;
              return tableHtml;
          };

          // จัดกลุ่มข้อมูล
          let groups = [];
          let currentGroup = [];
          let startIndex = 0;
          if(wsData.length > 0 && wsData[0][0] && (String(wsData[0][0]).includes("แบบประเมิน") || String(wsData[0][0]).includes("สรุปผล") || String(wsData[0][0]).includes("ประวัติ"))) {
             startIndex = 2; // ข้ามชื่อหัวตารางที่ทำซ้ำ
          }

          for(let i=startIndex; i<wsData.length; i++){
              const row = wsData[i];
              if (!row || row.length === 0) {
                  if (currentGroup.length > 0) groups.push(currentGroup);
                  currentGroup = [];
              } else {
                  currentGroup.push(row);
              }
          }
          if (currentGroup.length > 0) groups.push(currentGroup);

          const isSubHeader = (r) => r.length === 1 || (r.length > 1 && r.slice(1).every(v => v === "" || v === undefined || v === null));

          // ลูปใส่แต่ละกลุ่มข้อมูลลงในหน้ากระดาษ A4
          groups.forEach((group) => {
              const groupWeightTotal = group.reduce((sum, r) => sum + getRowWeight(r), 0);

              if (groupWeightTotal > getMaxRows()) {
                  // ถ้าตารางยาวเกิน 1 หน้า ให้ดึงแถวแรก (Header) มาเตรียมไว้ทวนซ้ำ
                  const headerRow = group[0];
                  let remainingRows = group.slice(1);
                  
                  // เช็คพื้นที่ก่อนเริ่มตารางใหม่ (เผื่อพื้นที่หัวตาราง)
                  if (currentRowCount + 3 > getMaxRows()) {
                      html += currentPageHtml + closePage();
                      isFirstPage = false;
                      pageNum++;
                      currentPageHtml = createPageHeader(isFirstPage, pageNum);
                      currentRowCount = 0;
                  }

                  // แบ่งตารางเนื้อหาออกเป็น "หัวข้อใหญ่ (Sub-sections)"
                  let subSections = [];
                  let currentSec = [];
                  for(let i=0; i<remainingRows.length; i++) {
                      const r = remainingRows[i];
                      // ถ้าเจอ Sub-header ใหม่ และมีข้อมูลสะสมอยู่ ให้ตัดขึ้นหัวข้อใหม่
                      if (isSubHeader(r) && currentSec.length > 0) {
                          subSections.push(currentSec);
                          currentSec = [r];
                      } else {
                          currentSec.push(r);
                      }
                  }
                  if (currentSec.length > 0) subSections.push(currentSec);

                  if (subSections.length === 0) {
                      currentPageHtml += flushGroup([headerRow]);
                      currentRowCount += getRowWeight(headerRow) + 1;
                      return;
                  }

                  while (subSections.length > 0) {
                      let rowsForThisPage = [];
                      let availableRows = getMaxRows() - currentRowCount - getRowWeight(headerRow) - 1; // หักลบ Header และขอบว่าง

                      let nextSecWeight = subSections[0].reduce((sum, r) => sum + getRowWeight(r), 0);

                      // ถ้าเหลือบรรทัดว่างน้อยเกินไป (ไม่พอแม้แต่จะใส่หัวข้อ 1 บรรทัด) ให้ขึ้นหน้าใหม่ทันที
                      if (availableRows <= 3 && nextSecWeight > availableRows) {
                          html += currentPageHtml + closePage();
                          isFirstPage = false;
                          pageNum++;
                          currentPageHtml = createPageHeader(isFirstPage, pageNum);
                          currentRowCount = 0;
                          availableRows = getMaxRows() - getRowWeight(headerRow) - 1;
                      }

                      // นำหัวข้อใหญ่ (subSections) มาทยอยหยอดลงกระดาษ
                      while (subSections.length > 0) {
                          let nextSec = subSections[0];
                          let secWeight = nextSec.reduce((sum, r) => sum + getRowWeight(r), 0);
                          
                          if (secWeight <= availableRows) {
                              // ถ้าหัวข้อนี้ใส่พื้นที่ว่างในหน้าปัจจุบันได้พอดี
                              rowsForThisPage.push(...nextSec);
                              availableRows -= secWeight;
                              subSections.shift();
                          } else {
                              // **ถ้าหัวข้อนี้ไม่พอดีกับกระดาษปัจจุบัน**
                              if (rowsForThisPage.length === 0) {
                                  // กรณีหน้ากระดาษว่างๆ แต่หัวข้อยาวมากเกิน 1 หน้าเต็มๆ -> บังคับให้ต้องตัดแบ่ง
                                  let currentW = 0;
                                  let splitIdx = 0;
                                  for (let i = 0; i < nextSec.length; i++) {
                                      const w = getRowWeight(nextSec[i]);
                                      if (currentW + w > availableRows && splitIdx > 0) break;
                                      currentW += w;
                                      splitIdx++;
                                  }
                                  if (splitIdx === 0) splitIdx = 1; // บังคับใส่อย่างน้อย 1 แถว

                                  rowsForThisPage.push(...nextSec.slice(0, splitIdx));
                                  subSections[0] = nextSec.slice(splitIdx);
                              }
                              // **หัวใจหลัก:** หากหน้ากระดาษมีเนื้อหาเก่าอยู่แล้ว และมีหัวข้อใหญ่ตามมาแต่ใส่ไม่พอ จะยกทั้งหัวข้อไป "หน้าถัดไป" ทันที โดยการ break ออกจากลูปนี้
                              break;
                          }
                      }

                      if (rowsForThisPage.length > 0) {
                          currentPageHtml += flushGroup([headerRow, ...rowsForThisPage]);
                          // บวกน้ำหนักความสูงที่คำนวณได้
                          const renderedWeight = rowsForThisPage.reduce((sum, r) => sum + getRowWeight(r), 0);
                          currentRowCount += renderedWeight + getRowWeight(headerRow) + 1; 
                      }

                      // ถ้ายังมีหัวข้อใหญ่ตกค้างอยู่ แปลว่าพื้นที่หมด ต้องขึ้นหน้าใหม่เพื่อประมวลผลต่อ
                      if (subSections.length > 0) {
                          html += currentPageHtml + closePage();
                          isFirstPage = false;
                          pageNum++;
                          currentPageHtml = createPageHeader(isFirstPage, pageNum);
                          currentRowCount = 0;
                      }
                  }
              } else {
                  // ถ้าเป็นตารางสั้นๆ และพื้นที่ไม่พอ ค่อยตัดขึ้นหน้าใหม่
                  if (currentRowCount + groupWeightTotal > getMaxRows()) {
                      html += currentPageHtml + closePage();
                      isFirstPage = false;
                      pageNum++;
                      currentPageHtml = createPageHeader(isFirstPage, pageNum);
                      currentRowCount = 0;
                  }
                  currentPageHtml += flushGroup(group);
                  currentRowCount += groupWeightTotal + 1; // +1 เผื่อระยะช่องไฟใต้ตาราง
              }
          });

          html += currentPageHtml + closePage(); // ปิดหน้าสุดท้าย
          html += `</div>`;
          return html;
      };

      const [assessmentType, setAssessmentType] = useState("");
      const [assessorName, setAssessorName] = useState("");
      const [otherAssessorName, setOtherAssessorName] = useState("");
      const [evaluateeRole, setEvaluateeRole] = useState(""); 
      const [deptType, setDeptType] = useState("");
      const [department, setDepartment] = useState("");
      const [otherDepartment, setOtherDepartment] = useState("");
      
      const [numPeople, setNumPeople] = useState(1);
      const [activeTab, setActiveTab] = useState("0"); 
      const [completedPeople, setCompletedPeople] = useState({}); 
      const [answers, setAnswers] = useState({ 0: {} });
      
      const [isSubmitting, setIsSubmitting] = useState(false);
      const [isFetchingBackup, setIsFetchingBackup] = useState(false);
      const [hasSubmitted, setHasSubmitted] = useState(false);

      useEffect(() => {
        if (dynamicChecklists && Object.keys(dynamicChecklists).length > 0) {
          if (!assessmentType || !dynamicChecklists[assessmentType]) {
            setAssessmentType(Object.keys(dynamicChecklists)[0]);
          }
        }
      }, [dynamicChecklists, assessmentType]);

      const [popupConfig, setPopupConfig] = useState({ isOpen: false, title: '', message: '', type: 'info', onConfirm: null });

      const showPopup = (config) => setPopupConfig({ ...config, isOpen: true });
      const closePopup = () => setPopupConfig(prev => ({ ...prev, isOpen: false }));

      const currentChecklist = useMemo(() => {
        if (!dynamicChecklists) return [];
        return dynamicChecklists[assessmentType] || [];
      }, [assessmentType, dynamicChecklists]);

      const handleAnswer = (personIndex, questionId, value) => {
        setAnswers(prev => ({ ...prev, [personIndex]: { ...(prev[personIndex] || {}), [questionId]: value } }));
      };

      // --- พิมพ์แบบฟอร์มเปล่าเพื่อใช้สำรวจภาคสนาม (กรอกด้วยมือ) ---
      const printBlankForm = (type) => {
        const sections = (dynamicChecklists && dynamicChecklists[type]) || [];
        const esc = (s) => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const box = '<span style="display:inline-block;width:15px;height:15px;border:1.5px solid #333;border-radius:3px;"></span>';
        let rows = '';
        sections.forEach(section => {
          rows += `<tr><td colspan="5" style="background:#eef2f7;font-weight:bold;padding:6px 8px;border:1px solid #999;">${esc(section.title || '')}</td></tr>`;
          (section.items || []).forEach(item => {
            rows += `<tr>
              <td style="text-align:center;border:1px solid #999;padding:5px 4px;white-space:nowrap;">${esc(item.id)}</td>
              <td style="border:1px solid #999;padding:5px 8px;">${esc(item.text)}</td>
              <td style="text-align:center;border:1px solid #999;padding:5px 4px;">${box}</td>
              <td style="text-align:center;border:1px solid #999;padding:5px 4px;">${box}</td>
              <td style="text-align:center;border:1px solid #999;padding:5px 4px;">${box}</td>
            </tr>`;
          });
        });
        const html = `<!DOCTYPE html><html lang="th"><head><meta charset="utf-8"><title>แบบฟอร์มเปล่า - ${esc(type)}</title>
          <style>
            @page { size: A4; margin: 12mm; }
            * { font-family: 'Sarabun','TH Sarabun PSK',sans-serif; box-sizing:border-box; }
            body { color:#000; font-size:13px; margin:0; }
            h1 { font-size:17px; text-align:center; margin:0 0 2px; }
            .sub { text-align:center; font-size:13px; margin:0 0 10px; color:#333; }
            .info { margin:6px 0 12px; font-size:13px; line-height:2.1; }
            .fill { border-bottom:1px dotted #333; display:inline-block; }
            table { width:100%; border-collapse:collapse; }
            th { background:#285c6c; color:#fff; border:1px solid #999; padding:6px 4px; font-size:12px; }
            tr { break-inside: avoid; page-break-inside: avoid; }
            thead { display: table-header-group; }
          </style></head><body>
          <h1>แบบประเมินและกำกับติดตามมาตรฐาน IC ด้านการพยาบาล</h1>
          <div class="sub">โรงพยาบาลศรีสังวรสุโขทัย &nbsp;|&nbsp; แบบประเมิน: <b>${esc(type)}</b></div>
          <div class="info">
            หน่วยงาน <span class="fill" style="min-width:180px;"></span> &nbsp;&nbsp; ประเภท <span class="fill" style="min-width:90px;"></span><br>
            ผู้ประเมิน <span class="fill" style="min-width:170px;"></span> &nbsp;&nbsp; วันที่ <span class="fill" style="min-width:120px;"></span> &nbsp;&nbsp; จำนวนผู้รับประเมิน <span class="fill" style="min-width:60px;"></span> คน/เหตุการณ์
          </div>
          <table>
            <thead><tr>
              <th style="width:8%;">ข้อ</th><th>รายการประเมิน</th>
              <th style="width:12%;">ปฏิบัติ</th><th style="width:12%;">ไม่ปฏิบัติ</th><th style="width:10%;">NA</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
          </body></html>`;
        const iframe = document.createElement('iframe');
        iframe.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
        document.body.appendChild(iframe);
        const doc = iframe.contentWindow.document;
        doc.open(); doc.write(html); doc.close();
        setTimeout(() => {
          try { iframe.contentWindow.focus(); iframe.contentWindow.print(); } catch (e) {}
          setTimeout(() => { try { document.body.removeChild(iframe); } catch (e) {} }, 2000);
        }, 400);
      };

      const handleCompletePerson = (pIndex) => {
        const pAnswers = answers[pIndex] || {};
        const missingItems = [];
        currentChecklist.forEach(section => { section.items.forEach(item => { if (!pAnswers[item.id]) missingItems.push(item.id); }); });

        if (missingItems.length > 0) {
          const maxShow = 5;
          const missingMsg = missingItems.slice(0, maxShow).join(", ") + (missingItems.length > maxShow ? ` และอื่นๆ อีก ${missingItems.length - maxShow} ข้อ` : "");
          showPopup({ title: 'ข้อมูลไม่ครบถ้วน', message: `กรุณาประเมินให้ครบทุกข้อสำหรับ คนที่/เหตุการณ์ที่ ${pIndex + 1} ก่อนยืนยันข้อมูล\n\nยังไม่ได้ประเมินข้อ:\n${missingMsg}`, type: 'error' });
          return;
        }
        setCompletedPeople(prev => ({ ...prev, [pIndex]: true }));
        if (pIndex < numPeople - 1) setActiveTab((pIndex + 1).toString());
        else setActiveTab("summary");
      };

      const handleNewAssessment = () => {
        setAnswers({ 0: {} }); setHasSubmitted(false); setActiveTab("0");
        setNumPeople(1); setCompletedPeople({}); setDepartment(""); setOtherDepartment("");
        setEvaluateeRole(""); setOtherAssessorName(""); window.scrollTo(0, 0);
      };

      const handleTabChangeToSummary = () => {
        const confirmedCount = Object.keys(completedPeople).length;
        if (confirmedCount < numPeople) {
            showPopup({ title: 'ยังยืนยันข้อมูลไม่ครบ', message: `คุณกดยืนยันข้อมูลไปแล้ว ${confirmedCount} จาก ${numPeople} คน/เหตุการณ์\n\nแน่ใจหรือไม่ว่าต้องการดูภาพรวมหน่วยงาน?`, type: 'confirm', onConfirm: () => setActiveTab("summary") });
        } else { setActiveTab("summary"); }
      };

      const handleDeleteRecord = (recordToDelete) => {
        showPopup({
          title: 'ยืนยันการลบข้อมูล', message: `ลบประวัติการประเมินของ ${recordToDelete.department}?\n(ลบจาก Google Sheet ทันที ไม่สามารถกู้คืนได้)`, type: 'confirm',
          onConfirm: async () => {
            setIsFetchingBackup(true); 
            if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "YOUR_WEB_APP_URL_HERE") {
              try {
                const payload = { action: 'delete', id: recordToDelete.id, timestampStr: recordToDelete.timestampStr, department: recordToDelete.department };
                await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) });
                await new Promise(resolve => setTimeout(resolve, 1500));
              } catch (error) { console.error("Error deleting:", error); }
            }
            setHospitalRecords(prev => prev.filter(record => record.id !== recordToDelete.id));
            setIsFetchingBackup(false);
            showPopup({ title: 'ลบสำเร็จ', message: 'ลบข้อมูลรายการนี้ออกจากระบบเรียบร้อยแล้ว', type: 'info' });
          }
        });
      };

      const handleDeleteAllRecords = () => {
        showPopup({
          title: 'ยืนยันการล้างประวัติทั้งหมด', message: 'คำเตือน: คุณแน่ใจหรือไม่ว่าต้องการล้างประวัติทั้งหมด?\n(ข้อมูลจะถูกลบออกจาก Google Sheet ถาวร และไม่สามารถกู้คืนได้!)', type: 'confirm',
          onConfirm: async () => {
            setIsFetchingBackup(true); 
            if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "YOUR_WEB_APP_URL_HERE") {
              try {
                const payload = { action: 'deleteAll' };
                await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) });
                await new Promise(resolve => setTimeout(resolve, 1000));
              } catch (error) { console.error("Error deleting all:", error); }
            }
            setHospitalRecords([]); setIsFetchingBackup(false);
            showPopup({ title: 'ล้างข้อมูลสำเร็จ', message: 'ลบประวัติการประเมินทั้งหมดเรียบร้อยแล้ว', type: 'info' });
          }
        });
      };

      const getScoreLevelColor = (percent) => {
        const p = parseFloat(percent);
        if (isNaN(p)) return { rowBg: 'bg-gray-50 print:bg-gray-50', bar: 'bg-gray-300 print:bg-gray-300', text: 'text-gray-500' };
        if (p >= 80) return { rowBg: 'bg-[#8ab278]/10 border-l-4 border-[#8ab278] hover:bg-[#8ab278]/20 print:bg-green-50 print:border-green-500', bar: 'bg-[#8ab278]', text: 'text-[#4d6b40] print:text-green-700 font-bold' };
        if (p >= 60) return { rowBg: 'bg-[#e9c460]/10 border-l-4 border-[#e9c460] hover:bg-[#e9c460]/20 print:bg-yellow-50 print:border-yellow-400', bar: 'bg-[#e9c460]', text: 'text-[#9c750e] print:text-yellow-700 font-bold' };
        return { rowBg: 'bg-[#f1a164]/10 border-l-4 border-[#f1a164] hover:bg-[#f1a164]/20 print:bg-red-50 print:border-red-500', bar: 'bg-[#f1a164]', text: 'text-[#bd570d] print:text-red-700 font-bold' };
      };

      const handleFetchBackup = (isAuto = false, isSilent = false) => {
          const proceedFetch = async () => {
              setIsFetchingBackup(true);
              try {
                  const res = await fetch(GOOGLE_SCRIPT_URL + "?action=getData");
                  if (!res.ok) throw new Error("Status: " + res.status);
                  const result = await res.json();
                  if (result.status === 'success' && result.data) {
                      const rows = result.data;
                      if (!Array.isArray(rows) || rows.length <= 1) {
                          if (!isAuto && !isSilent) showPopup({ title: 'ไม่พบข้อมูล', message: 'ไม่มีข้อมูลใน Google Sheet', type: 'info' });
                          return;
                      }
                      const headers = rows[0].map(h => String(h).trim().toLowerCase());
                      const idxTime = headers.findIndex(h => h.includes('วัน') || h.includes('เวลา') || h.includes('timestamp'));
                      const idxType = headers.findIndex(h => h.includes('ประเภทแบบประเมิน'));
                      const idxAssessor = headers.findIndex(h => h.includes('ผู้ประเมิน'));
                      const idxDeptType = headers.findIndex(h => h.includes('ประเภทหน่วยงาน'));
                      const idxDept = headers.findIndex(h => h.includes('หน่วยงานที่รับ'));
                      const idxNumP = headers.findIndex(h => h.includes('จำนวนผู้'));
                      const idxFull = headers.findIndex(h => h.includes('คะแนนเต็ม'));
                      const idxEarn = headers.findIndex(h => h.includes('คะแนนที่ได้'));
                      const idxPerc = headers.findIndex(h => h.includes('ร้อยละ'));
                      const idxRole = headers.findIndex(h => h.includes('ตำแหน่ง'));
                      let idxJson = headers.findIndex(h => h.includes('json') || h.includes('ข้อมูลดิบ'));

                      if (idxJson === -1 && rows.length > 1) idxJson = rows[1].findIndex(c => typeof c === 'string' && c.trim().startsWith('{'));
                      if (idxJson === -1) idxJson = headers.length - 1;
                      
                      const newRecords = [];
                      for (let i = 1; i < rows.length; i++) {
                          const row = rows[i];
                          if (!row || !Array.isArray(row) || row.join("").trim() === "") continue;
                          let record = null;
                          if (idxJson >= 0 && row[idxJson]) { try { record = JSON.parse(row[idxJson]); } catch(e) {} }
                          if (!record) record = {};
                          
                          const rowTimeStr = idxTime >= 0 ? row[idxTime] : null;
                          record.id = record.id || (rowTimeStr ? new Date(rowTimeStr).getTime() : (Date.now() + i));
                          if (isNaN(record.id)) record.id = Date.now() + i;
                          record.timestampStr = rowTimeStr || new Date(record.id).toLocaleString('th-TH');
                          record.assessmentType = record.assessmentType || (idxType >= 0 ? row[idxType] : '-');
                          record.assessorName = record.assessorName || (idxAssessor >= 0 ? row[idxAssessor] : '-');
                          record.deptType = record.deptType || (idxDeptType >= 0 ? row[idxDeptType] : '-');
                          record.department = record.department || (idxDept >= 0 ? row[idxDept] : '-');
                          record.numPeople = record.numPeople || (idxNumP >= 0 ? parseInt(row[idxNumP]) : 1);
                          record.evaluateeRole = record.evaluateeRole || (idxRole >= 0 ? row[idxRole] : '');
                          
                          if (!record.overallSummaryData) {
                              record.overallSummaryData = {
                                  grandSummary: { fullScore: parseFloat(idxFull >= 0 ? row[idxFull] : 0) || 0, earnedScore: parseFloat(idxEarn >= 0 ? row[idxEarn] : 0) || 0, percentage: parseFloat(idxPerc >= 0 ? row[idxPerc] : 0) || 0, done: 0, notDone: 0, na: 0 },
                                  aggSectionScores: [], aggBundleScores: { OVERALL: { percent: parseFloat(idxPerc >= 0 ? row[idxPerc] : 0) || 0, earned: 0, total: 0 } }
                              };
                          }
                          if (record.assessmentType === '-' && record.department === '-') continue;
                          newRecords.push(record);
                      }
                      setHospitalRecords(newRecords);
                      if (!isAuto && !isSilent) showPopup({ title: 'สำเร็จ', message: `ดึงข้อมูลประวัติจำนวน ${newRecords.length} รายการ เรียบร้อยแล้ว`, type: 'info' });
                  } else {
                      if (!isAuto && !isSilent) showPopup({ title: 'เกิดข้อผิดพลาด', message: 'ดึงข้อมูลไม่สำเร็จ', type: 'error' });
                  }
              } catch(err) {
                  console.error("Fetch Backup Error:", err);
                  if (!isAuto && !isSilent) showPopup({ title: 'เชื่อมต่อล้มเหลว', message: 'ไม่สามารถดึงข้อมูลได้', type: 'error' });
              } finally { setIsFetchingBackup(false); }
          };

          if (isAuto) proceedFetch();
          else showPopup({ title: 'ดึงข้อมูลจาก Cloud', message: 'ระบบจะดึงประวัติการประเมินจาก Google Sheet ทุกแถวมาทับข้อมูลเดิมในเครื่องนี้ ต้องการดำเนินการต่อหรือไม่?', type: 'confirm', onConfirm: proceedFetch });
      };

      useEffect(() => { if (viewMode === 'hospital') handleFetchBackup(true, true); }, [viewMode]);
      useEffect(() => { if (viewMode === 'history' && isHistoryAuthenticated) handleFetchBackup(true, true); }, [viewMode, isHistoryAuthenticated]);

      const allPersonScores = useMemo(() => {
        const scoresArray = [];
        const { mapping: mappingToUse, keys: keysToUse } = getBundleMappingForType(assessmentType);

        for (let p = 0; p < numPeople; p++) {
          const pAnswers = answers[p] || {};
          const sectionScores = currentChecklist.map(section => {
            let totalQuestions = section.items.length; let earned = 0;
            section.items.forEach(item => {
              const ans = pAnswers[item.id];
              if (ans === 'DONE') earned++; else if (ans === 'NA') totalQuestions--; 
            });
            return { id: section.id, fullScore: totalQuestions, earnedScore: earned, percentage: totalQuestions > 0 ? ((earned / totalQuestions) * 100).toFixed(2) : 0 };
          });

          let totalFull = 0, totalEarned = 0;
          sectionScores.forEach(sec => { totalFull += sec.fullScore; totalEarned += sec.earnedScore; });
          const totalSummary = { fullScore: totalFull, earnedScore: totalEarned, percentage: totalFull > 0 ? ((totalEarned / totalFull) * 100).toFixed(2) : 0 };

          const bundleScores = {};
          keysToUse.forEach((key) => {
            let earned = 0, total = 0;
            mappingToUse[key].items.forEach(itemId => {
              const ans = pAnswers[itemId];
              if (ans === 'DONE') { earned++; total++; } else if (ans === 'NOT_DONE') { total++; }
            });
            bundleScores[key] = { earned, total, percent: total > 0 ? ((earned/total)*100).toFixed(0) : 0 };
          });

          const uniqueBundleItems = new Set();
          Object.values(mappingToUse).forEach(c => c.items.forEach(i => uniqueBundleItems.add(i)));
          let overallEarned = 0, overallTotal = 0;
          uniqueBundleItems.forEach(itemId => {
             const ans = pAnswers[itemId];
             if (ans === 'DONE') { overallEarned++; overallTotal++; } else if (ans === 'NOT_DONE') { overallTotal++; }
          });
          bundleScores.OVERALL = { earned: overallEarned, total: overallTotal, percent: overallTotal > 0 ? ((overallEarned/overallTotal)*100).toFixed(0) : 0 };
          scoresArray.push({ sectionScores, totalSummary, bundleScores });
        }
        return { scoresArray, mappingToUse, keysToUse };
      }, [answers, currentChecklist, numPeople, assessmentType]);

      const overallSummaryData = useMemo(() => {
        const aggSectionScores = currentChecklist.map(section => {
          let secEarned = 0, secTotal = 0;
          const itemsAgg = section.items.map(item => {
              let itemEarned = 0, itemTotal = numPeople, itemDone = 0, itemNotDone = 0, itemNA = 0;
              for(let p=0; p<numPeople; p++) {
                const ans = (answers[p] || {})[item.id];
                if (ans === 'DONE') { itemEarned++; itemDone++; }
                else if (ans === 'NOT_DONE') { itemNotDone++; }
                else if (ans === 'NA') { itemTotal--; itemNA++; } 
              }
              secEarned += itemEarned; secTotal += itemTotal;
              return { id: item.id, text: item.text, earned: itemEarned, total: itemTotal, percent: itemTotal > 0 ? ((itemEarned/itemTotal)*100).toFixed(0) : 0, done: itemDone, notDone: itemNotDone, na: itemNA };
          });
          return { id: section.id, title: section.title, fullScore: secTotal, earnedScore: secEarned, percentage: secTotal > 0 ? ((secEarned/secTotal)*100).toFixed(2) : 0, items: itemsAgg };
        });

        let grandTotalFull = 0, grandTotalEarned = 0, grandDone = 0, grandNotDone = 0, grandNA = 0;
        aggSectionScores.forEach(sec => { 
           sec.items.forEach(item => { 
               grandTotalEarned += item.done;
               grandTotalFull += (item.done + item.notDone);
               grandDone += item.done; 
               grandNotDone += item.notDone; 
               grandNA += item.na; 
           });
           sec.fullScore = sec.items.reduce((acc, item) => acc + (item.done + item.notDone), 0);
           sec.earnedScore = sec.items.reduce((acc, item) => acc + item.done, 0);
           sec.percentage = sec.fullScore > 0 ? ((sec.earnedScore / sec.fullScore) * 100).toFixed(2) : 0;
        });
        const grandSummary = { fullScore: grandTotalFull, earnedScore: grandTotalEarned, percentage: grandTotalFull > 0 ? ((grandTotalEarned/grandTotalFull)*100).toFixed(2) : 0, done: grandDone, notDone: grandNotDone, na: grandNA };

        const mappingToUse = allPersonScores.mappingToUse;
        const keysToUse = allPersonScores.keysToUse;
        const aggBundleScores = {};

        keysToUse.forEach(key => {
          let bEarned = 0, bTotal = 0;
          mappingToUse[key].items.forEach(itemId => {
              for(let p=0; p<numPeople; p++) {
                const ans = (answers[p] || {})[itemId];
                if (ans === 'DONE') { bEarned++; bTotal++; } else if (ans === 'NOT_DONE') { bTotal++; }
              }
          });
          aggBundleScores[key] = { earned: bEarned, total: bTotal, percent: bTotal > 0 ? ((bEarned/bTotal)*100).toFixed(0) : 0 };
        });

        const uniqueBundleItems = new Set();
        Object.values(mappingToUse).forEach(c => c.items.forEach(i => uniqueBundleItems.add(i)));
        let obEarned = 0, obTotal = 0;
        uniqueBundleItems.forEach(itemId => {
          for(let p=0; p<numPeople; p++) {
              const ans = (answers[p] || {})[itemId];
              if (ans === 'DONE') { obEarned++; obTotal++; } else if (ans === 'NOT_DONE') { obTotal++; }
          }
        });
        aggBundleScores.OVERALL = { earned: obEarned, total: obTotal, percent: obTotal > 0 ? ((obEarned/obTotal)*100).toFixed(0) : 0 };
        return { aggSectionScores, grandSummary, aggBundleScores };
      }, [answers, currentChecklist, numPeople, allPersonScores]);

      const handleSubmit = async () => {
        if (!assessorName) { showPopup({ title: 'ข้อมูลไม่ครบถ้วน', message: "กรุณาระบุชื่อผู้ประเมิน", type: 'error' }); return; }
        if (assessorName === 'อื่นๆ' && !otherAssessorName) { showPopup({ title: 'ข้อมูลไม่ครบถ้วน', message: "กรุณาระบุชื่อผู้ประเมินอื่นๆ", type: 'error' }); return; }
        if ((assessmentType === '5 Moment' || assessmentType === '7 Step') && !evaluateeRole) { showPopup({ title: 'ข้อมูลไม่ครบถ้วน', message: "กรุณาเลือกตำแหน่งผู้รับการประเมิน", type: 'error' }); return; }
        if (!deptType) { showPopup({ title: 'ข้อมูลไม่ครบถ้วน', message: "กรุณาเลือกประเภทหน่วยงาน", type: 'error' }); return; }
        if (!department) { showPopup({ title: 'ข้อมูลไม่ครบถ้วน', message: "กรุณาระบุหน่วยงานที่รับการประเมิน", type: 'error' }); return; }
        if (department === 'อื่นๆ' && !otherDepartment) { showPopup({ title: 'ข้อมูลไม่ครบถ้วน', message: "กรุณาระบุชื่อหน่วยงานอื่นๆ", type: 'error' }); return; }

        let missingDetails = [];
        for (let p = 0; p < numPeople; p++) {
          const pAnswers = answers[p] || {};
          currentChecklist.forEach(section => {
            section.items.forEach(item => { if (!pAnswers[item.id]) missingDetails.push(`คนที่/เหตุการณ์ที่ ${p + 1} (ข้อ ${item.id})`); });
          });
        }

        if (missingDetails.length > 0) {
          const maxShow = 5;
          const missingMsg = missingDetails.slice(0, maxShow).join("\n") + (missingDetails.length > maxShow ? `\n...และอื่นๆ อีก ${missingDetails.length - maxShow} รายการ` : "");
          showPopup({ title: 'ข้อมูลไม่ครบถ้วน', message: `กรุณาประเมินให้ครบทุกคนและทุกข้อก่อนบันทึกข้อมูล\n\nรายการที่ขาดหาย:\n${missingMsg}`, type: 'error' });
          return;
        }

        setIsSubmitting(true);
        const deptName = department === 'อื่นๆ' ? otherDepartment : department;
        const finalAssessorName = assessorName === 'อื่นๆ' ? otherAssessorName : assessorName;

        const newRecord = { id: Date.now(), assessmentType, deptType, department: deptName, numPeople, overallSummaryData, assessorName: finalAssessorName, evaluateeRole };
        const payload = {
          timestamp: new Date().toLocaleString('th-TH'), assessmentType, assessorName: finalAssessorName, evaluateeRole, deptType, department: deptName, numPeople,
          totalFullScore: overallSummaryData.grandSummary.fullScore, totalEarnedScore: overallSummaryData.grandSummary.earnedScore, percentage: overallSummaryData.grandSummary.percentage,
          fullDataJSON: JSON.stringify(newRecord), rawAnswers: JSON.stringify(answers) 
        };

        if (GOOGLE_SCRIPT_URL && GOOGLE_SCRIPT_URL !== "YOUR_WEB_APP_URL_HERE") {
          try {
            await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) });
          } catch (error) { console.error("Error saving to Google Sheet:", error); }
        } else {
           await new Promise(resolve => setTimeout(resolve, 600));
        }

        setHospitalRecords(prev => [...prev, newRecord]);
        setIsSubmitting(false); setHasSubmitted(true); setActiveTab("summary");
      };

      const PersonView = ({ pIndex }) => {
        const { sectionScores, totalSummary, bundleScores } = allPersonScores.scoresArray[pIndex];
        const isVisible = activeTab === pIndex.toString();
        if (!isVisible) return null;

        return (
          <div className="pt-4">
            {(numPeople > 1) && (
               <div className="bg-[#285c6c] text-white border-none py-3 px-5 rounded-2xl mb-6 font-bold text-xl pdf-no-break shadow-sm flex items-center justify-between print:bg-[#285c6c] print:text-white">
                  <span>ผลการประเมิน: คนที่/เหตุการณ์ที่ {pIndex + 1}</span>
               </div>
            )}

            {currentChecklist.map((section, index) => {
              const scoreStats = sectionScores.find(s => s.id === section.id);
              const colors = getSectionColor(section.id);
              return (
                <section key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6 print:border-gray-400 print:shadow-none">
                  <div className={`${colors.headerBg} px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 pdf-no-break print:bg-gray-200`}>
                    <h3 className={`text-lg md:text-xl font-bold ${colors.headerText} print:text-black`}>{section.title}</h3>
                    <div className={`flex bg-white rounded-xl shadow-sm border border-white/20 overflow-hidden text-sm print:border-gray-400 print:shadow-none`}>
                      <div className="px-4 py-2 bg-gray-50 border-r border-gray-200 text-center print:bg-gray-100 print:border-gray-300">
                        <span className="block text-xs font-bold text-gray-500 print:text-gray-600">คะแนนเต็ม</span>
                        <span className="font-black text-slate-800 text-lg print:text-black">{scoreStats.fullScore}</span>
                      </div>
                      <div className={`px-4 py-2 ${colors.bg} border-r border-white/50 text-center print:border-gray-300`}>
                        <span className={`block text-xs font-bold ${colors.text} print:text-gray-600`}>ได้</span>
                        <span className={`font-black ${colors.text} text-lg print:text-black`}>{scoreStats.earnedScore}</span>
                      </div>
                      <div className="px-4 py-2 bg-[#8ab278]/10 text-center print:bg-green-100">
                        <span className="block text-xs font-bold text-[#4d6b40] print:text-green-800">ร้อยละ</span>
                        <span className="font-black text-[#4d6b40] text-lg print:text-green-800">{scoreStats.percentage}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100 print:divide-gray-200">
                    {section.items.map((item) => (
                      <div key={item.id} className="py-4 px-5 sm:px-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 pdf-no-break print:py-2 print:hover:bg-transparent">
                        <div className="flex-1 text-base min-w-0 break-words whitespace-normal flex items-start">
                          <span className={`font-bold ${colors.itemText} w-10 shrink-0 mt-0.5 print:text-black`}>{item.id}</span>
                          <div className="shrink-0 flex flex-wrap gap-1.5 mt-0 mr-3">
                             {getBundleKeysForItem(item.id, assessmentType).map((k, idx) => (
                                <span key={idx} className={`font-bold text-[11px] text-white w-7 h-7 flex items-center justify-center rounded-full shadow-sm ${getBundleBadgeColor(k, assessmentType)}`}>{k}</span>
                             ))}
                          </div>
                          <span className="text-slate-800 font-medium flex-1 mt-0.5 print:text-black leading-relaxed text-lg">{item.text}</span>
                        </div>
                        <div className="flex gap-2.5 self-start md:self-center print:hidden">
                          <button onClick={() => handleAnswer(pIndex, item.id, 'DONE')} className={`flex flex-col items-center justify-center w-20 sm:w-24 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${((answers[pIndex]||{})[item.id] === 'DONE') ? 'bg-green-600 border-green-600 text-white shadow-md' : 'bg-white border-gray-300 text-gray-500 hover:bg-green-50 hover:border-green-500/50 hover:text-green-600'}`}><CheckCircle2 className="w-6 h-6 mb-1" /> ปฏิบัติ</button>
                          <button onClick={() => handleAnswer(pIndex, item.id, 'NOT_DONE')} className={`flex flex-col items-center justify-center w-20 sm:w-24 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${((answers[pIndex]||{})[item.id] === 'NOT_DONE') ? 'bg-red-600 border-red-600 text-white shadow-md' : 'bg-white border-gray-300 text-gray-500 hover:bg-red-50 hover:border-red-500/50 hover:text-red-600'}`}><XCircle className="w-6 h-6 mb-1" /> ไม่ปฏิบัติ</button>
                          <button onClick={() => handleAnswer(pIndex, item.id, 'NA')} className={`flex flex-col items-center justify-center w-20 sm:w-24 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${((answers[pIndex]||{})[item.id] === 'NA') ? 'bg-gray-500 border-gray-500 text-white shadow-md' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-500/50 hover:text-gray-600'}`} title="Not Applicable (ไม่นำมาคิดคะแนน)"><MinusCircle className="w-6 h-6 mb-1" /> NA</button>
                        </div>
                        <div className="hidden print:block text-base font-bold text-black">
                           {((answers[pIndex]||{})[item.id] === 'DONE') ? '✔️ ปฏิบัติ' : ((answers[pIndex]||{})[item.id] === 'NOT_DONE') ? '❌ ไม่ปฏิบัติ' : ((answers[pIndex]||{})[item.id] === 'NA') ? '- NA' : '...'}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}

            {bundleScores && (
              <section className={`bg-white rounded-3xl shadow-sm border-2 p-6 mt-5 pdf-no-break print:shadow-none print:border-gray-400 ${assessmentType==='CAUTI' ? 'border-pink-200' : assessmentType==='VAP' ? 'border-indigo-200' : assessmentType==='MDRO ควบคุมพิเศษ' || assessmentType==='MDRO (ธรรมดา)' ? 'border-cyan-200' : 'border-teal-200'}`}>
                <h2 className={`text-2xl font-black mb-6 flex items-center gap-3 border-b-2 pb-4 print:border-gray-300 ${assessmentType==='CAUTI' ? 'text-pink-900 border-pink-100' : assessmentType==='VAP' ? 'text-indigo-900 border-indigo-100' : assessmentType==='MDRO ควบคุมพิเศษ' || assessmentType==='MDRO (ธรรมดา)' ? 'text-cyan-900 border-cyan-100' : 'text-teal-900 border-teal-100'}`}>
                  <Activity className="w-8 h-8" /> สรุป Bundle: คนที่/เหตุการณ์ที่ {pIndex + 1}
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {allPersonScores.keysToUse.map(key => (
                     <BundleCard key={key} bundleKey={key} data={bundleScores[key]} config={allPersonScores.mappingToUse[key]} />
                  ))}
                </div>
                <div className="mt-6 bg-slate-50 rounded-2xl p-6 border border-gray-200 flex justify-between items-center shadow-inner print:bg-white print:border-gray-300">
                  <div>
                    <span className="font-bold text-lg block text-slate-800 print:text-black">ภาพรวม Bundle รายบุคคล/เหตุการณ์ <span className="text-sm font-medium text-slate-500 ml-2 print:text-gray-500">(รวม {getActualBundleItemsCount(allPersonScores.mappingToUse, currentChecklist)} ข้อ)</span></span>
                    <span className="text-sm font-bold text-[#c2651b] mt-2 block">ส่วนที่เหลือ (ไม่ผ่าน/NA): {100 - (parseInt(bundleScores.OVERALL.percent) || 0)}%</span>
                  </div>
                  <span className="text-5xl font-black text-slate-800 print:text-black">{bundleScores.OVERALL.percent}%</span>
                </div>
              </section>
            )}
            
            <div className="bg-[#32355c] text-white p-6 rounded-3xl shadow-xl mt-6 flex justify-between items-center pdf-no-break print:bg-gray-100 print:text-black print:border print:border-gray-400 print:shadow-none">
               <div>
                  <span className="block font-black text-2xl">ผลคะแนนรวม: คนที่/เหตุการณ์ที่ {pIndex + 1}</span>
                  <span className="text-base font-bold text-slate-300 print:text-gray-600 mt-1 block">ได้ {totalSummary.earnedScore} จาก {totalSummary.fullScore} คะแนน</span>
               </div>
               <span className="text-5xl font-black text-[#16bba6] print:text-black">{totalSummary.percentage}%</span>
            </div>

            {!hasSubmitted && (
               <div className="mt-8 flex justify-end print:hidden">
                 {completedPeople[pIndex] ? (
                     <div className="bg-[#8ab278]/20 border-2 border-[#8ab278] text-[#4d6b40] px-8 py-4 rounded-2xl font-bold text-xl flex items-center gap-3 shadow-sm">
                         <CheckCircle2 className="w-8 h-8 text-[#4d6b40]" /> ✅ บันทึกข้อมูลคนที่/เหตุการณ์ที่ {pIndex + 1} เสร็จสิ้น
                     </div>
                 ) : (
                     <button onClick={() => handleCompletePerson(pIndex)} className="bg-[#238885] hover:bg-[#16bba6] text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-lg transition-colors flex items-center gap-3 hover:shadow-xl">
                        <CheckCircle2 className="w-7 h-7" /> ยืนยันข้อมูลคนที่/เหตุการณ์ที่ {pIndex + 1}
                     </button>
                 )}
               </div>
            )}
          </div>
        );
      };

      const SummaryView = () => {
        const isVisible = activeTab === 'summary';
        const { aggSectionScores = [], grandSummary = {}, aggBundleScores = null } = overallSummaryData || {};

        if (!isVisible) return null;

        return (
          <div className="pt-8">
             <div className="bg-[#314566] text-white py-4 px-6 rounded-2xl mb-8 font-black text-3xl flex items-center gap-3 pdf-no-break shadow-lg print:bg-indigo-100 print:text-indigo-900 print:border-none print:shadow-none">
                <Users className="w-10 h-10 text-[#16bba6]"/> รายงานสรุปภาพรวมหน่วยงาน <span className="text-slate-300 font-bold text-xl ml-2 bg-slate-800/50 px-4 py-1 rounded-full">(จำนวน {numPeople} คน/เหตุการณ์)</span>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 pdf-no-break">
                <div className="bg-white p-6 rounded-3xl border-2 border-gray-200 shadow-sm text-center">
                   <span className="block text-slate-500 text-base mb-3 font-bold uppercase tracking-wide">จำนวนผู้รับการประเมิน</span>
                   <span className="text-5xl font-black text-[#32355c]">{numPeople} <span className="text-2xl font-bold text-slate-400">คน/เหตุการณ์</span></span>
                </div>
                <div className="bg-white p-6 rounded-3xl border-2 border-gray-200 shadow-sm text-center">
                   <span className="block text-slate-500 text-base mb-3 font-bold uppercase tracking-wide">คะแนนที่ได้รวม</span>
                   <span className="text-5xl font-black text-[#32355c]">{grandSummary.earnedScore}<span className="text-3xl text-gray-300 mx-2">/</span>{grandSummary.fullScore}</span>
                </div>
                <div className="bg-[#285c6c]/10 p-6 rounded-3xl border-2 border-[#285c6c]/30 shadow-sm text-center">
                   <span className="block text-[#285c6c] text-base mb-3 font-bold uppercase tracking-wide">ร้อยละรวมทั้งหน่วยงาน</span>
                   <span className="text-6xl font-black text-[#238885]">{grandSummary.percentage}%</span>
                </div>
             </div>

             <h2 className="text-2xl font-black text-[#32355c] mt-12 mb-6 flex items-center gap-3 pdf-no-break">
                <FileText className="w-8 h-8 text-[#285c6c]" /> รายละเอียดผลการประเมินภาพรวมรายข้อ
             </h2>
             {aggSectionScores.map(section => (
                 <section key={section.id} className="bg-white rounded-3xl shadow-sm border-2 border-gray-200 overflow-hidden mb-6 print:border-gray-400">
                    <div className="bg-slate-50 px-6 py-5 border-b-2 border-gray-200 flex justify-between items-center pdf-no-break print:bg-gray-100">
                       <h3 className="font-black text-[#32355c] text-lg md:text-xl print:text-black">{section.title}</h3>
                       <div className="text-base font-bold text-white bg-[#285c6c] px-5 py-2 rounded-xl shadow-md print:text-indigo-900 print:bg-transparent print:border-none">
                          เฉลี่ย {section.percentage}%
                       </div>
                    </div>
                    <div className="divide-y-2 divide-gray-100 print:divide-gray-200">
                       {section.items.map(item => {
                          const scoreColor = getScoreLevelColor(item.percent);
                          return (
                          <div key={item.id} className={`py-4 px-6 flex justify-between items-center pdf-no-break transition-colors print:border-gray-200 ${scoreColor.rowBg}`}>
                             <div className="flex-1 text-lg pr-6 min-w-0 break-words whitespace-normal flex items-start">
                                <span className="font-black text-[#32355c] w-12 shrink-0 mt-0.5">{item.id}</span>
                                <div className="shrink-0 flex flex-wrap gap-2 mt-0 mr-4">
                                   {getBundleKeysForItem(item.id, assessmentType).map((k, idx) => (
                                      <span key={idx} className={`font-black text-xs text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md ${getBundleBadgeColor(k, assessmentType)}`}>{k}</span>
                                   ))}
                                </div>
                                <div className="flex-1 mt-0.5">
                                   <span className="text-slate-800 font-bold leading-relaxed">{item.text}</span>
                                   <div className="mt-2 text-sm text-slate-500 hidden sm:block font-bold">
                                      [ผู้รับประเมิน: {item.total} คน/เหตุการณ์ | ปฏิบัติ: {item.done} | ไม่ปฏิบัติ: {item.notDone} | NA: {item.na}]
                                   </div>
                                </div>
                             </div>
                             <div className="flex flex-col items-end w-32 md:w-40 shrink-0">
                                <span className={`font-black text-3xl ${scoreColor.text}`}>{item.percent}%</span>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-2 shadow-inner print:hidden">
                                   <div className={`${scoreColor.bar} h-2.5 rounded-full`} style={{width: `${item.percent}%`, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}></div>
                                </div>
                                <span className="text-xs font-bold text-slate-500 hidden md:block">({item.earned}/{item.total} ครั้งที่ผ่าน)</span>
                             </div>
                          </div>
                       )})}
                    </div>
                 </section>
             ))}

             {aggBundleScores && (
                 <section className="bg-white rounded-3xl shadow-lg border-2 border-[#16bba6]/30 p-8 mt-10 pdf-no-break print:bg-white print:border-gray-400 print:shadow-none">
                    <h2 className="text-2xl md:text-3xl font-black text-[#238885] mb-6 flex items-center gap-3 border-b-2 border-gray-100 pb-4">
                       <Activity className="w-9 h-9 text-[#16bba6]" /> ภาพรวมการปฏิบัติตาม Bundle ({assessmentType})
                    </h2>
                    <div className="flex flex-wrap justify-center gap-5">
                       {allPersonScores.keysToUse.map(key => (
                           <BundleCard key={key} bundleKey={key} data={aggBundleScores[key]} config={allPersonScores.mappingToUse[key]} />
                       ))}
                    </div>
                    <div className="mt-8 bg-slate-50 rounded-2xl p-6 border-2 border-gray-200 flex justify-between items-center shadow-inner print:bg-white print:border-gray-300">
                       <div>
                         <span className="block font-bold text-slate-900 text-base md:text-xl">คะแนน Bundle เฉลี่ยทั้งหน่วยงาน <span className="text-sm font-medium text-slate-500 ml-2">(รวม {getActualBundleItemsCount(allPersonScores.mappingToUse, currentChecklist)} ข้อ)</span></span>
                         <span className="block text-base font-bold text-[#c2651b] mt-2">ร้อยละของส่วนที่เหลือ: {100 - (parseInt(aggBundleScores.OVERALL?.percent) || 0)}%</span>
                       </div>
                       <span className="text-6xl font-black text-[#238885]">{aggBundleScores.OVERALL.percent}%</span>
                    </div>
                 </section>
             )}

             <section className="bg-[#32355c] rounded-3xl shadow-2xl text-white p-8 mt-10 pdf-no-break print:bg-white print:text-black print:border-2 print:border-gray-400 print:shadow-none">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-5 border-b-2 border-white/20 pb-6 print:border-gray-300">
                    <div className="flex items-center gap-4">
                       <Calculator className="w-10 h-10 text-[#16bba6] print:text-black" />
                       <div>
                          <h2 className="text-3xl font-black">ผลประเมินรวมทั้งหน่วยงาน</h2>
                          <p className="text-base font-medium text-slate-300 print:text-gray-500 mt-1">รวมจากผู้รับการประเมิน {numPeople} คน/เหตุการณ์</p>
                       </div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-6 gap-5 w-full mt-6">
                    <div className="bg-white/10 rounded-2xl p-5 text-center border border-white/10 print:bg-gray-50 print:border-gray-300">
                       <span className="block text-slate-300 print:text-gray-500 text-sm font-bold mb-2 uppercase tracking-wide">คะแนนเต็มรวม</span>
                       <span className="text-4xl font-black text-white print:text-black">{grandSummary.fullScore}</span>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-5 text-center border border-white/10 print:bg-gray-50 print:border-gray-300">
                       <span className="block text-slate-300 print:text-gray-500 text-sm font-bold mb-2 uppercase tracking-wide">คะแนนที่ได้</span>
                       <span className="text-4xl font-black text-[#16bba6] print:text-teal-700">{grandSummary.earnedScore}</span>
                    </div>
                    <div className="bg-[#238885] rounded-2xl p-5 text-center border-2 border-[#16bba6] shadow-lg col-span-2 md:col-span-1 print:bg-teal-100 print:border-teal-300">
                       <span className="block text-white print:text-teal-800 text-sm font-bold mb-2 uppercase tracking-wide">ร้อยละเฉลี่ย</span>
                       <span className="text-5xl font-black text-white print:text-teal-900">{grandSummary.percentage}%</span>
                    </div>
                    
                    <div className="bg-white/10 rounded-2xl p-5 text-center border border-white/10 print:bg-gray-50 print:border-gray-300">
                       <span className="block text-[#8ab278] print:text-green-600 text-sm font-bold mb-2 uppercase tracking-wide">รวมปฏิบัติ</span>
                       <span className="text-3xl font-black text-[#8ab278] print:text-green-700">{grandSummary.done}</span>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-5 text-center border border-white/10 print:bg-gray-50 print:border-gray-300">
                       <span className="block text-[#f1a164] print:text-red-500 text-sm font-bold mb-2 uppercase tracking-wide">รวมไม่ปฏิบัติ</span>
                       <span className="text-3xl font-black text-[#f1a164] print:text-red-600">{grandSummary.notDone}</span>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-5 text-center border border-white/10 print:bg-gray-50 print:border-gray-300">
                       <span className="block text-slate-400 print:text-gray-500 text-sm font-bold mb-2 uppercase tracking-wide">รวม NA</span>
                       <span className="text-3xl font-black text-slate-400 print:text-slate-600">{grandSummary.na}</span>
                    </div>
                 </div>
             </section>
          </div>
        )
      };

      const HospitalSummaryView = () => {
         const [dashType, setDashType] = useState(""); // เริ่มต้นที่ 'ไม่เลือก' (โหมดภาพรวมทุกมาตรฐาน) เสมอ
         const [filterYear, setFilterYear] = useState("all");
         const [filterStartMonth, setFilterStartMonth] = useState("all");
         const [filterEndMonth, setFilterEndMonth] = useState("all");
         const [filterDeptType, setFilterDeptType] = useState("all");
         const [filterDept, setFilterDept] = useState("all");
         const [filterRole, setFilterRole] = useState("all"); 
         const [filterAssessor, setFilterAssessor] = useState("all");

         const filterOptions = useMemo(() => {
            const years = new Set();
            const depts = new Set();
            const roles = new Set(); 
            const assessors = new Set();
            hospitalRecords.forEach(r => {
                const d = new Date(r.id);
                if (!isNaN(d.getTime())) years.add(d.getFullYear().toString());
                if (r.department && r.department !== '-') depts.add(r.department);
                if (r.evaluateeRole) roles.add(r.evaluateeRole); 
                if (r.assessorName && r.assessorName !== '-') assessors.add(r.assessorName);
            });
            return { years: Array.from(years).sort().reverse(), depts: Array.from(depts).sort((a, b) => a.localeCompare(b, 'th')), roles: Array.from(roles).sort((a, b) => a.localeCompare(b, 'th')), assessors: Array.from(assessors).sort((a, b) => a.localeCompare(b, 'th')) };
         }, [hospitalRecords]);

         const { records, totalPeople, totalDepts, aggSections, aggBundles, grandSummary, mappingToUse, keysToUse, deptTypeAverages, deptAverages, checklist } = useMemo(() => {
            const currentRecords = hospitalRecords.filter(r => {
                if (r.assessmentType !== dashType) return false;
                if (!r.overallSummaryData || !r.overallSummaryData.aggSectionScores) return false;
                const d = new Date(r.id);
                if (isNaN(d.getTime())) return false;
                const rYear = d.getFullYear().toString();
                const rMonthInt = d.getMonth() + 1;
                if (filterYear !== "all" && rYear !== filterYear) return false;
                if (filterStartMonth !== "all" && filterEndMonth !== "all") {
                    const sM = parseInt(filterStartMonth);
                    const eM = parseInt(filterEndMonth);
                    if (rMonthInt < sM || rMonthInt > eM) return false;
                } else if (filterStartMonth !== "all") {
                    if (rMonthInt < parseInt(filterStartMonth)) return false;
                } else if (filterEndMonth !== "all") {
                    if (rMonthInt > parseInt(filterEndMonth)) return false;
                }
                if (filterDeptType !== "all" && r.deptType !== filterDeptType) return false;
                if (filterDept !== "all" && r.department !== filterDept) return false;
                if (filterRole !== "all" && r.evaluateeRole !== filterRole) return false; 
                if (filterAssessor !== "all" && r.assessorName !== filterAssessor) return false;
                return true;
            });
            
            const { mapping, keys } = getBundleMappingForType(dashType);
            const checklist = dynamicChecklists ? (dynamicChecklists[dashType] || []) : [];

            if(currentRecords.length === 0) return { records: [], totalPeople: 0, totalDepts: 0, aggSections: [], aggBundles: null, grandSummary: null, mappingToUse: mapping, keysToUse: keys, deptTypeAverages: [], deptAverages: [], checklist };

            const totalPeople = currentRecords.reduce((sum, r) => sum + r.numPeople, 0);
            const totalDepts = new Set(currentRecords.map(r => r.department).filter(d => d !== '-')).size;
            
            const aggSections = checklist.map(section => {
                let secEarned = 0, secTotal = 0;
                const items = section.items.map(item => {
                    let iEarned = 0, iTotal = 0, iDone = 0, iNotDone = 0, iNa = 0;
                    currentRecords.forEach(r => {
                        const rSec = r.overallSummaryData.aggSectionScores.find(s => s.id === section.id);
                        if(rSec) {
                            const rItem = rSec.items.find(i => i.id === item.id);
                            if(rItem) { 
                                iEarned += rItem.earned || 0; 
                                iTotal += rItem.total || 0; 
                                iDone += rItem.done !== undefined ? rItem.done : (rItem.earned || 0); 
                                iNotDone += rItem.notDone !== undefined ? rItem.notDone : ((rItem.total || 0) - (rItem.earned || 0)); 
                                iNa += rItem.na || 0; 
                            }
                        }
                    });
                    secEarned += iEarned; secTotal += iTotal;
                    return { ...item, earned: iEarned, total: iTotal, done: iDone, notDone: iNotDone, na: iNa, percent: iTotal>0 ? ((iEarned/iTotal)*100).toFixed(0) : 0 };
                });
                return { ...section, earnedScore: secEarned, fullScore: secTotal, percentage: secTotal>0 ? ((secEarned/secTotal)*100).toFixed(2) : 0, items };
            });

            const aggBundles = {};
            keys.forEach(key => {
                let bEarned = 0, bTotal = 0;
                mapping[key].items.forEach(itemId => {
                    aggSections.forEach(sec => {
                        const item = sec.items.find(i => String(i.id) === String(itemId).trim());
                        if (item) {
                            bEarned += item.done;
                            bTotal += (item.done + item.notDone);
                        }
                    });
                });
                aggBundles[key] = { earned: bEarned, total: bTotal, percent: bTotal>0 ? ((bEarned/bTotal)*100).toFixed(0) : 0 };
            });

            const uniqueBundleItems = new Set();
            Object.values(mapping).forEach(c => c.items.forEach(i => uniqueBundleItems.add(String(i).trim())));
            let obEarned = 0, obTotal = 0;
            uniqueBundleItems.forEach(itemId => {
                aggSections.forEach(sec => {
                    const item = sec.items.find(i => String(i.id) === itemId);
                    if (item) {
                        obEarned += item.done;
                        obTotal += (item.done + item.notDone);
                    }
                });
            });
            aggBundles.OVERALL = { earned: obEarned, total: obTotal, percent: obTotal>0 ? ((obEarned/obTotal)*100).toFixed(0) : 0 };

            let gFull = 0, gEarned = 0, gDone = 0, gNotDone = 0, gNa = 0;
            aggSections.forEach(sec => {
                sec.items.forEach(item => {
                    gEarned += item.done;
                    gFull += (item.done + item.notDone);
                    gDone += item.done;
                    gNotDone += item.notDone;
                    gNa += item.na;
                });
            });
            const grandSummary = { fullScore: gFull, earnedScore: gEarned, percentage: gFull>0 ? ((gEarned/gFull)*100).toFixed(2) : 0, done: gDone, notDone: gNotDone, na: gNa };

            const deptTypeStats = {};
            const deptStats = {};
            
            currentRecords.forEach(r => {
                let rEarned = 0, rFull = 0;
                if (r.overallSummaryData && r.overallSummaryData.aggSectionScores) {
                    r.overallSummaryData.aggSectionScores.forEach(sec => {
                        sec.items.forEach(item => {
                            rEarned += (item.done || 0);
                            rFull += ((item.done || 0) + (item.notDone || 0));
                        });
                    });
                }
                if (rFull === 0 && parseFloat(r.overallSummaryData?.grandSummary?.percentage || 0) > 0) {
                    rFull = 100; rEarned = parseFloat(r.overallSummaryData.grandSummary.percentage);
                }

                const numP = parseInt(r.numPeople) || 0;
                const dType = r.deptType || 'ไม่ระบุ';
                if (!deptTypeStats[dType]) deptTypeStats[dType] = { count: 0, earned: 0, full: 0, peopleCount: 0 };
                deptTypeStats[dType].count++; deptTypeStats[dType].earned += rEarned; deptTypeStats[dType].full += rFull; deptTypeStats[dType].peopleCount += numP;
                
                const dept = r.department || 'ไม่ระบุ';
                const deptKey = `${dType}_${dept}`;
                if (!deptStats[deptKey]) deptStats[deptKey] = { department: dept, deptType: dType, count: 0, earned: 0, full: 0, peopleCount: 0 };
                deptStats[deptKey].count++; deptStats[deptKey].earned += rEarned; deptStats[deptKey].full += rFull; deptStats[deptKey].peopleCount += numP;
            });

            const deptTypeAverages = Object.keys(deptTypeStats).map(key => ({
                deptType: key, count: deptTypeStats[key].count, peopleCount: deptTypeStats[key].peopleCount,
                avg: deptTypeStats[key].full > 0 ? ((deptTypeStats[key].earned / deptTypeStats[key].full) * 100).toFixed(2) : 0
            })).sort((a, b) => a.deptType.localeCompare(b.deptType, 'th'));

            const deptAverages = Object.keys(deptStats).map(key => ({
                department: deptStats[key].department, deptType: deptStats[key].deptType, count: deptStats[key].count, peopleCount: deptStats[key].peopleCount,
                avg: deptStats[key].full > 0 ? ((deptStats[key].earned / deptStats[key].full) * 100).toFixed(2) : 0
            })).sort((a, b) => {
                if (a.deptType === b.deptType) return a.department.localeCompare(b.department, 'th');
                return a.deptType.localeCompare(b.deptType, 'th');
            });

            return { records: currentRecords, totalPeople, totalDepts, aggSections, aggBundles, grandSummary, mappingToUse: mapping, keysToUse: keys, deptTypeAverages, deptAverages, checklist };
         }, [hospitalRecords, dashType, filterYear, filterStartMonth, filterEndMonth, filterDeptType, filterDept, filterRole, filterAssessor, dynamicChecklists]);

         // --- ข้อมูลสรุปจำนวนคน/เหตุการณ์ แบบตารางไขว้ (Cross Tabulation สำหรับทุกมาตรฐาน) ---
         const crossTabStats = useMemo(() => {
            const filteredForAllStandards = hospitalRecords.filter(r => {
                const d = new Date(r.id);
                if (isNaN(d.getTime())) return false;
                const rYear = d.getFullYear().toString();
                const rMonthInt = d.getMonth() + 1;
                if (filterYear !== "all" && rYear !== filterYear) return false;
                if (filterStartMonth !== "all" && filterEndMonth !== "all") {
                    const sM = parseInt(filterStartMonth);
                    const eM = parseInt(filterEndMonth);
                    if (rMonthInt < sM || rMonthInt > eM) return false;
                } else if (filterStartMonth !== "all") {
                    if (rMonthInt < parseInt(filterStartMonth)) return false;
                } else if (filterEndMonth !== "all") {
                    if (rMonthInt > parseInt(filterEndMonth)) return false;
                }
                if (filterDeptType !== "all" && r.deptType !== filterDeptType) return false;
                if (filterDept !== "all" && r.department !== filterDept) return false;
                if (filterRole !== "all" && r.evaluateeRole !== filterRole) return false;
                if (filterAssessor !== "all" && r.assessorName !== filterAssessor) return false;
                return true;
            });

            const standardsSet = new Set();
            if (dynamicChecklists) Object.keys(dynamicChecklists).forEach(k => standardsSet.add(k));
            filteredForAllStandards.forEach(r => standardsSet.add(r.assessmentType));
            
            const standards = Array.from(standardsSet).filter(s => s !== '-');
            const originalOrder = dynamicChecklists ? Object.keys(dynamicChecklists) : [];
            standards.sort((a, b) => {
                const idxA = originalOrder.indexOf(a);
                const idxB = originalOrder.indexOf(b);
                if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                if (idxA !== -1) return -1;
                if (idxB !== -1) return 1;
                return a.localeCompare(b, 'th');
            });
            
            const deptStats = {};
            const totalByStandard = {};
            standards.forEach(s => totalByStandard[s] = 0);
            let grandTotal = 0;

            filteredForAllStandards.forEach(r => {
                const dept = r.department || 'ไม่ระบุ';
                if (dept === '-') return;
                if (!deptStats[dept]) {
                    deptStats[dept] = { department: dept, total: 0 };
                    standards.forEach(s => deptStats[dept][s] = 0);
                }
                if (deptStats[dept][r.assessmentType] === undefined) {
                     deptStats[dept][r.assessmentType] = 0;
                }
                
                const count = parseInt(r.numPeople) || 0;
                deptStats[dept][r.assessmentType] += count;
                deptStats[dept].total += count;
                if(totalByStandard[r.assessmentType] !== undefined) {
                    totalByStandard[r.assessmentType] += count;
                }
                grandTotal += count;
            });

            const deptList = Object.values(deptStats).sort((a, b) => a.department.localeCompare(b.department, 'th'));
            
            return { standards, deptList, totalByStandard, grandTotal };
         }, [hospitalRecords, filterYear, filterStartMonth, filterEndMonth, filterDeptType, filterDept, filterRole, filterAssessor, dynamicChecklists]);

         // --- ข้อมูลสรุปแยกเฉพาะมาตรฐาน 16-17 (แสดงแยกตามหน่วยงานและตำแหน่ง) ---
         const roleCrossTabStats = useMemo(() => {
            const originalOrder = dynamicChecklists ? Object.keys(dynamicChecklists) : [];
            const targetStandards = [];
            // สมมติฐานว่ามาตรฐาน 16 และ 17 คือลำดับที่ 15 และ 16 ในรายการ
            if (originalOrder.length >= 16) targetStandards.push(originalOrder[15]);
            if (originalOrder.length >= 17) targetStandards.push(originalOrder[16]);

            const filteredForRoles = hospitalRecords.filter(r => {
                if (!targetStandards.includes(r.assessmentType)) return false;
                const d = new Date(r.id);
                if (isNaN(d.getTime())) return false;
                const rYear = d.getFullYear().toString();
                const rMonthInt = d.getMonth() + 1;
                if (filterYear !== "all" && rYear !== filterYear) return false;
                if (filterStartMonth !== "all" && filterEndMonth !== "all") {
                    const sM = parseInt(filterStartMonth);
                    const eM = parseInt(filterEndMonth);
                    if (rMonthInt < sM || rMonthInt > eM) return false;
                } else if (filterStartMonth !== "all" && rMonthInt < parseInt(filterStartMonth)) return false;
                else if (filterEndMonth !== "all" && rMonthInt > parseInt(filterEndMonth)) return false;

                if (filterDeptType !== "all" && r.deptType !== filterDeptType) return false;
                if (filterDept !== "all" && r.department !== filterDept) return false;
                if (filterRole !== "all" && r.evaluateeRole !== filterRole) return false;
                if (filterAssessor !== "all" && r.assessorName !== filterAssessor) return false;
                return true;
            });

            const deptRoleMap = {};
            const totalByStandard = {};
            targetStandards.forEach(s => totalByStandard[s] = 0);
            let grandTotal = 0;

            filteredForRoles.forEach(r => {
                const dept = r.department || 'ไม่ระบุ';
                const role = r.evaluateeRole || 'ไม่ระบุตำแหน่ง';
                if (dept === '-') return;

                const key = `${dept}_${role}`;
                if (!deptRoleMap[key]) {
                    deptRoleMap[key] = { department: dept, role: role, total: 0 };
                    targetStandards.forEach(s => deptRoleMap[key][s] = 0);
                }

                const count = parseInt(r.numPeople) || 0;
                deptRoleMap[key][r.assessmentType] += count;
                deptRoleMap[key].total += count;
                
                if(totalByStandard[r.assessmentType] !== undefined) {
                    totalByStandard[r.assessmentType] += count;
                }
                grandTotal += count;
            });

            // จัดเรียงตามหน่วยงาน แล้วตามด้วยตำแหน่ง
            const deptRoleList = Object.values(deptRoleMap).sort((a, b) => {
                const deptCmp = a.department.localeCompare(b.department, 'th');
                if (deptCmp !== 0) return deptCmp;
                return a.role.localeCompare(b.role, 'th');
            });

            return { standards: targetStandards, deptRoleList, totalByStandard, grandTotal };
         }, [hospitalRecords, filterYear, filterStartMonth, filterEndMonth, filterDeptType, filterDept, filterRole, filterAssessor, dynamicChecklists]);

         // --- ฟังก์ชันดึงค่าเกณฑ์ประเมิน (สามารถแก้ไขจำนวนเจ้าหน้าที่ได้ที่นี่) ---
         const getCriteriaTarget = (stdIndex) => {
            if (stdIndex >= 1 && stdIndex <= 6) return 5;
            if (stdIndex >= 7 && stdIndex <= 15) return 1;
            if (stdIndex >= 16 && stdIndex <= 17) {
                const STAFF_COUNT = 20; // ⚠️ แจ้งเปลี่ยนจำนวนเจ้าหน้าที่จริงได้ที่ตัวแปรนี้ (ปัจจุบันตั้งค่าเริ่มต้นไว้ที่ 20 คน)
                return Math.ceil(STAFF_COUNT * 0.5); 
            }
            return 0;
         };

         // --- ฟังก์ชันเตรียมข้อมูลชุดเดียวกับ Excel สำหรับหน้า Hospital ---
         const getHospitalExcelData = (isForPDF = false) => {
            const hasOverviewData = (crossTabStats && crossTabStats.deptList.length > 0) || (roleCrossTabStats && roleCrossTabStats.deptRoleList.length > 0);
            if (dashType) { if(!records || records.length === 0) return []; }
            else if (!hasOverviewData) return [];
            const wsData = [];
            wsData.push(["สรุปผลการประเมินตามมาตรฐานการควบคุมและป้องกันการติดเชื้อในโรงพยาบาล", "โรงพยาบาลศรีสังวรสุโขทัย"]);
            wsData.push([]);
            wsData.push(["วันที่/เวลาที่ออกรายงาน", new Date().toLocaleString('th-TH')]);
            wsData.push(["ประเภทแบบประเมิน", dashType || "ภาพรวมทุกมาตรฐาน"]);
            if (dashType) {
            wsData.push(["จำนวนหน่วยงานที่ประเมิน", `${totalDepts} หน่วยงาน`]);
            wsData.push(["จำนวนผู้รับการประเมินรวม", `${totalPeople} คน/เหตุการณ์`]);
            wsData.push([]);
            wsData.push(["สรุปหน่วยงานที่เข้าร่วมการประเมิน"]);
            const deptSummaryMap = {};
            records.forEach(r => {
                const d = r.department || 'ไม่ระบุ';
                if (!deptSummaryMap[d]) deptSummaryMap[d] = { department: d, count: 0, people: 0 };
                deptSummaryMap[d].count += 1;
                deptSummaryMap[d].people += (parseInt(r.numPeople) || 0);
            });
            const deptSummaryRows = Object.values(deptSummaryMap).sort((a, b) => a.department.localeCompare(b.department, 'th'));
            wsData.push(["ลำดับ", "หน่วยงาน", "จำนวนการประเมิน (ครั้ง)", "ผู้รับประเมิน (คน/เหตุการณ์)"]);
            deptSummaryRows.forEach((row, i) => wsData.push([i + 1, row.department, row.count, row.people]));
            wsData.push([`รวมทั้งหมด (${deptSummaryRows.length} หน่วยงาน)`, "", deptSummaryRows.reduce((s, x) => s + x.count, 0), deptSummaryRows.reduce((s, x) => s + x.people, 0)]);
            wsData.push([]);
            wsData.push(["สรุปคะแนนรวมระดับโรงพยาบาล", ""]);
            wsData.push(["คะแนนเต็มรวม", grandSummary?.fullScore || 0]);
            wsData.push(["คะแนนที่ได้รวม", grandSummary?.earnedScore || 0]);
            wsData.push(["คิดเป็นร้อยละเฉลี่ย", `${grandSummary?.percentage || 0}%`]);
            wsData.push(["จำนวนข้อที่ปฏิบัติ (Done)", grandSummary?.done || 0]);
            wsData.push(["จำนวนข้อที่ไม่ปฏิบัติ (Not Done)", grandSummary?.notDone || 0]);
            wsData.push(["จำนวนข้อที่ NA", grandSummary?.na || 0]);
            wsData.push([]);
            if (aggBundles && Object.keys(aggBundles).length > 0) {
                wsData.push([`สรุป Bundle รวมระดับโรงพยาบาล (${dashType})`, "ร้อยละ", "จำนวนครั้งที่ผ่าน"]);
                wsData.push(["ภาพรวม Bundle ทั้งหมด", `${aggBundles?.OVERALL?.percent || 0}%`, `${aggBundles?.OVERALL?.earned || 0}/${aggBundles?.OVERALL?.total || 0}`]);
                keysToUse.forEach(key => {
                    const config = mappingToUse[key];
                    const data = aggBundles[key];
                    wsData.push([`หมวด ${key} (${config.th})`, `${data?.percent || 0}%`, `${data?.earned || 0}/${data?.total || 0}`]);
                });
                wsData.push([]);
            }
            
            wsData.push(["สรุปผลการประเมินหัวข้อใหญ่ (รายหมวด)", "คะแนนเต็ม", "คะแนนที่ได้", "ร้อยละเฉลี่ย"]);
            aggSections.forEach(sec => {
                wsData.push([sec.title, sec.fullScore, sec.earnedScore, `${sec.percentage}%`]);
            });
            wsData.push([]);

            wsData.push(["รหัสข้อ", "หัวข้อการประเมิน", "รวมปฏิบัติ", "รวมไม่ปฏิบัติ", "รวม NA", "ร้อยละ (โรงพยาบาล)"]);
            aggSections.forEach(section => {
              wsData.push([section.title, "", "", "", "", ""]);
              section.items.forEach(item => { wsData.push([item.id, item.text, item.done, item.notDone, item.na, `${item.percent}%`]); });
            });
            if (deptAverages && deptAverages.length > 0) {
                wsData.push([]);
                wsData.push(["สรุปคะแนนเฉลี่ยรายหน่วยงาน", ""]);
                wsData.push(["ประเภท", "หน่วยงาน", "จำนวนที่ประเมิน", "ร้อยละเฉลี่ย"]);
                deptAverages.forEach(stat => {
                    wsData.push([stat.deptType, stat.department, `${stat.count} ครั้ง (${stat.peopleCount} คน)`, `${stat.avg}%`]);
                });
            }
            }

            if (!dashType && crossTabStats && crossTabStats.deptList.length > 0) {
                wsData.push([]);
                wsData.push(["สรุปจำนวนผู้รับการประเมิน (คน/เหตุการณ์) แยกตามหน่วยงานและมาตรฐาน (ทุกประเภท)"]);
                
                // สร้างกล่องสัญลักษณ์แบบรวบตึงให้อยู่ในแถวเดียวเพื่อให้ตาราง Excel/PDF จัดรูปแบบง่าย
                const legendStrings = crossTabStats.standards.map((std, i) => `${i+1}. ${std}`);
                wsData.push([`สัญลักษณ์มาตรฐาน: ${legendStrings.join(', ')}`]);
                wsData.push(["เกณฑ์การประเมิน: มาตรฐาน 1-6 (≥ 5 ครั้ง), มาตรฐาน 7-15 (≥ 1 ครั้ง), มาตรฐาน 16-17 (≥ 50% ของจำนวนเจ้าหน้าที่)"]);

                const crossHeader = ["หน่วยงาน"];
                crossTabStats.standards.forEach((std, i) => crossHeader.push(`${i+1}`));
                crossHeader.push("รวม");
                wsData.push(crossHeader);

                crossTabStats.deptList.forEach(stat => {
                    const row = [stat.department];
                    crossTabStats.standards.forEach((std, i) => {
                        const target = getCriteriaTarget(i + 1);
                        const val = stat[std] || 0;
                        const isPass = val >= target;
                        
                        let cellVal = val > 0 ? val : (target > 0 && val === 0 ? 0 : "-");
                        // หากเป็นการสร้าง PDF และไม่ผ่านเกณฑ์ จะส่งซิกแนลให้ฟังก์ชันแปลง HTML รับรู้เพื่อใส่สีแดง
                        if (isForPDF && !isPass) {
                            cellVal = "!!FAIL!!" + cellVal;
                        }
                        row.push(cellVal);
                    });
                    row.push(stat.total);
                    wsData.push(row);
                });

                const totalRow = ["รวมทุกหน่วยงาน"];
                crossTabStats.standards.forEach(std => totalRow.push(crossTabStats.totalByStandard[std] > 0 ? crossTabStats.totalByStandard[std] : "-"));
                totalRow.push(crossTabStats.grandTotal);
                wsData.push(totalRow);
            }

            if (!dashType && roleCrossTabStats && roleCrossTabStats.deptRoleList.length > 0) {
                wsData.push([]);
                wsData.push(["สรุปจำนวนผู้รับการประเมิน (คน/เหตุการณ์) แยกตามหน่วยงาน, ตำแหน่ง และมาตรฐาน (เฉพาะมาตรฐาน 16-17)"]);
                
                const legendStringsRoles = roleCrossTabStats.standards.map((std, i) => `${i+16}. ${std}`);
                wsData.push([`สัญลักษณ์มาตรฐาน: ${legendStringsRoles.join(', ')}`]);
                wsData.push(["เกณฑ์การประเมิน: มาตรฐาน 16-17 (≥ 50% ของจำนวนเจ้าหน้าที่)"]);

                const roleHeader = ["หน่วยงาน", "ตำแหน่ง"];
                roleCrossTabStats.standards.forEach((std, i) => roleHeader.push(`${i+16}`));
                roleHeader.push("รวม");
                wsData.push(roleHeader);

                roleCrossTabStats.deptRoleList.forEach(stat => {
                    const row = [stat.department, stat.role];
                    roleCrossTabStats.standards.forEach((std, i) => {
                        const target = getCriteriaTarget(i + 16);
                        const val = stat[std] || 0;
                        const isPass = val >= target;
                        
                        let cellVal = val > 0 ? val : (target > 0 && val === 0 ? 0 : "-");
                        // หากเป็นการสร้าง PDF และไม่ผ่านเกณฑ์ จะส่งซิกแนลให้ฟังก์ชันแปลง HTML รับรู้เพื่อใส่สีแดง
                        if (isForPDF && !isPass) {
                            cellVal = "!!FAIL!!" + cellVal;
                        }
                        row.push(cellVal);
                    });
                    row.push(stat.total);
                    wsData.push(row);
                });

                const totalRowRoles = ["รวม", "ทุกตำแหน่ง"];
                roleCrossTabStats.standards.forEach(std => totalRowRoles.push(roleCrossTabStats.totalByStandard[std] > 0 ? roleCrossTabStats.totalByStandard[std] : "-"));
                totalRowRoles.push(roleCrossTabStats.grandTotal);
                wsData.push(totalRowRoles);
            }

            return wsData;
         };

         const handleExportHospitalExcel = () => {
            const wsData = getHospitalExcelData(false);
            if (wsData.length === 0) return;
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, "ผลประเมินระดับโรงพยาบาล");
            XLSX.writeFile(wb, `ผลประเมินรวมโรงพยาบาล_${dashType || 'ภาพรวมทุกมาตรฐาน'}_${new Date().getTime()}.xlsx`);
         };

         const handleGenerateHospitalPDF = () => {
            const wsData = getHospitalExcelData(true);
            if (wsData.length === 0) return;
            const html = buildHTMLFromData(wsData, "<span style='font-size: 16pt; line-height: 1.3;'>สรุปผลการประเมินตามมาตรฐาน<br>การควบคุมและป้องกันการติดเชื้อในโรงพยาบาล</span>", "โรงพยาบาลศรีสังวรสุโขทัย");
            setPdfPreviewState({ 
                isOpen: true, 
                htmlContent: html, 
                filename: `ผลประเมินรวมโรงพยาบาล_${dashType || 'ภาพรวมทุกมาตรฐาน'}_${new Date().getTime()}.pdf`
            });
         };

         if (isFetchingBackup && hospitalRecords.length === 0) {
            return (
               <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-200 w-full max-w-7xl mx-auto mt-8 flex flex-col items-center justify-center px-4">
                  <Loader2 className="w-14 h-14 animate-spin text-[#238885] mb-5" />
                  <h2 className="text-3xl font-bold text-slate-800 mb-3">กำลังดึงข้อมูลจาก Cloud...</h2>
                  <p className="text-slate-500 text-lg font-medium">กรุณารอสักครู่ ระบบกำลังประมวลผลข้อมูล</p>
               </div>
            );
         }

         return (
            <div className="flex flex-col items-center w-full">
               <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 mt-8 mb-4 print:hidden w-full max-w-7xl mx-auto px-4">
                  <div className="flex items-center gap-3 mb-5 text-slate-800 font-bold text-lg border-b pb-4">
                      <FilterIcon className="w-6 h-6 text-[#16bba6]" /> ตัวกรองข้อมูล Dashboard
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5">
                      <div className="col-span-2 sm:col-span-2 lg:col-span-1"><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ชื่อแบบประเมิน</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-gray-50 transition-colors shadow-sm" value={dashType} onChange={(e) => setDashType(e.target.value)}><option value="">ไม่เลือก</option>{dynamicChecklists && Object.keys(dynamicChecklists).map((k, index) => <option key={k} value={k}>{index < 6 ? '👩‍⚕️' : '🏥'} {index + 1}. {k}</option>)}</select></div>
                      <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ปี (พ.ศ.)</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white transition-colors shadow-sm" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}><option value="all">ทุกปี</option>{filterOptions.years.map(y => <option key={y} value={y}>{parseInt(y) + 543}</option>)}</select></div>
                      <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ตั้งแต่เดือน</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white transition-colors shadow-sm" value={filterStartMonth} onChange={(e) => setFilterStartMonth(e.target.value)}><option value="all">ทุกเดือน</option><option value="1">มกราคม</option><option value="2">กุมภาพันธ์</option><option value="3">มีนาคม</option><option value="4">เมษายน</option><option value="5">พฤษภาคม</option><option value="6">มิถุนายน</option><option value="7">กรกฎาคม</option><option value="8">สิงหาคม</option><option value="9">กันยายน</option><option value="10">ตุลาคม</option><option value="11">พฤศจิกายน</option><option value="12">ธันวาคม</option></select></div>
                      <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ถึงเดือน</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white transition-colors shadow-sm" value={filterEndMonth} onChange={(e) => setFilterEndMonth(e.target.value)}><option value="all">ทุกเดือน</option><option value="1">มกราคม</option><option value="2">กุมภาพันธ์</option><option value="3">มีนาคม</option><option value="4">เมษายน</option><option value="5">พฤษภาคม</option><option value="6">มิถุนายน</option><option value="7">กรกฎาคม</option><option value="8">สิงหาคม</option><option value="9">กันยายน</option><option value="10">ตุลาคม</option><option value="11">พฤศจิกายน</option><option value="12">ธันวาคม</option></select></div>
                      <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ประเภทหน่วยงาน</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white transition-colors shadow-sm" value={filterDeptType} onChange={(e) => setFilterDeptType(e.target.value)}><option value="all">ทั้งหมด</option><option value="IPD">IPD</option><option value="OPD">OPD</option><option value="กลุ่มงานให้บริการผู้ป่วย">กลุ่มงานให้บริการฯ</option></select></div>
                      <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">หน่วยงาน</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white transition-colors shadow-sm" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}><option value="all">ทุกหน่วยงาน</option>{filterOptions.depts.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
                      <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ตำแหน่ง</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white transition-colors shadow-sm" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}><option value="all">ทุกตำแหน่ง</option>{filterOptions.roles && filterOptions.roles.map(role => <option key={role} value={role}>{role}</option>)}</select></div>
                      <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ผู้ประเมิน</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white transition-colors shadow-sm" value={filterAssessor} onChange={(e) => setFilterAssessor(e.target.value)}><option value="all">ทุกคน</option>{filterOptions.assessors && filterOptions.assessors.map(a => <option key={a} value={a}>{a}</option>)}</select></div>
                  </div>
                  <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-4">
                      <span className="text-sm font-bold text-[#285c6c] bg-[#285c6c]/10 px-4 py-2 rounded-lg border border-[#285c6c]/20">พบข้อมูล {records.length} รายการ</span>
                      <button onClick={() => { setFilterYear("all"); setFilterStartMonth("all"); setFilterEndMonth("all"); setFilterDeptType("all"); setFilterDept("all"); setFilterRole("all"); setFilterAssessor("all"); }} className="text-sm font-bold text-[#f1a164] hover:text-white hover:bg-[#f1a164] px-5 py-2 rounded-lg transition-colors border-2 border-[#f1a164]/50">ล้างตัวกรอง</button>
                  </div>
               </div>

               {(!dashType ? (crossTabStats.deptList.length === 0 && roleCrossTabStats.deptRoleList.length === 0) : records.length === 0) ? (
                  <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-200 w-full max-w-7xl mx-auto mt-6 px-4">
                     <h2 className="text-3xl font-black text-slate-800 mb-4">{dashType ? `ไม่พบข้อมูลการประเมิน ${dashType}` : 'ยังไม่มีข้อมูลการประเมินในระบบ'}</h2>
                     <p className="text-slate-500 mb-8 font-medium text-lg">{dashType ? 'ปรับเปลี่ยนตัวกรอง หรือสร้างการประเมินใหม่เพื่อให้ระบบแสดงผล' : 'เมื่อมีการบันทึกผลประเมิน ระบบจะแสดงสรุปจำนวนผู้รับการประเมินที่นี่'}</p>
                     <button onClick={() => setViewMode('department')} className="bg-[#238885] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-[#16bba6] text-lg transition-colors">ไปหน้าประเมิน</button>
                  </div>
               ) : (
                  <div id="hospital-report-content" className="w-full max-w-7xl bg-white pb-10 relative rounded-3xl shadow-sm border border-gray-200 mt-2">
                    <header className="bg-[#32355c] text-white rounded-t-3xl shadow-md print:bg-transparent print:text-black print:border-none print:shadow-none relative">
                       <div className="px-8 py-10">
                          <div className="flex items-center gap-4 mb-3"><Activity className="w-10 h-10 text-[#16bba6] print:hidden" /><h1 className="text-3xl md:text-4xl font-black">แบบประเมินและกำกับติดตามมาตรฐาน IC</h1></div>
                          <p className="text-slate-300 print:text-gray-600 text-lg font-medium">รายงานสรุปภาพรวมระดับโรงพยาบาล | โรงพยาบาลศรีสังวรสุโขทัย</p>
                          <p className="text-[#8ab278] text-sm mt-3 print:text-gray-500 flex items-center gap-1.5 font-bold"><Clock className="w-5 h-5" /> ข้อมูลอัปเดต ณ วันที่ {new Date().toLocaleString('th-TH')} น.</p>
                       </div>
                    </header>
                    <main className="px-6 py-8">
                       <div className="bg-slate-100 border-2 border-gray-200 text-[#32355c] py-5 px-6 rounded-2xl mb-8 font-black text-2xl flex flex-col md:flex-row md:items-center justify-between pdf-no-break shadow-sm print:bg-gray-100 gap-5">
                          <div className="flex items-center gap-3"><Building2 className="w-8 h-8 text-[#285c6c]"/> ภาพรวมระดับโรงพยาบาล</div>
                          <div className="text-2xl md:text-3xl bg-[#e9c460] text-[#32355c] px-8 py-2.5 rounded-xl shadow-md print:bg-white print:text-black inline-block w-max uppercase tracking-wider border-2 border-[#b48c20]/30 print:border-gray-400">{dashType ? `แบบประเมิน ${dashType}` : 'สรุปภาพรวมจำนวนผู้รับการประเมิน (ทุกมาตรฐาน)'}</div>
                       </div>
                       {dashType && (<>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 pdf-no-break">
                          <div className="bg-white p-6 rounded-3xl border-2 border-gray-200 shadow-sm text-center print:border-gray-300"><span className="block text-slate-500 text-sm mb-2 font-bold uppercase tracking-wide">จำนวนหน่วยงาน</span><span className="text-5xl font-black text-[#314566]">{totalDepts}</span></div>
                          <div className="bg-white p-6 rounded-3xl border-2 border-gray-200 shadow-sm text-center print:border-gray-300"><span className="block text-slate-500 text-sm mb-2 font-bold uppercase tracking-wide">ผู้รับประเมิน</span><span className="text-5xl font-black text-[#314566]">{totalPeople} <span className="text-xl text-slate-400">คน/เหตุการณ์</span></span></div>
                          <div className="bg-white p-6 rounded-3xl border-2 border-gray-200 shadow-sm text-center print:border-gray-300"><span className="block text-slate-500 text-sm mb-2 font-bold uppercase tracking-wide">คะแนนที่ได้รวม</span><span className="text-4xl font-black text-[#314566]">{grandSummary?.earnedScore || 0}<span className="text-2xl text-gray-300 mx-2">/</span>{grandSummary?.fullScore || 0}</span></div>
                          <div className="bg-[#285c6c]/10 p-6 rounded-3xl border-2 border-[#285c6c]/20 shadow-sm text-center print:bg-teal-50 print:border-teal-300"><span className="block text-[#285c6c] text-sm mb-2 font-bold uppercase tracking-wide">ร้อยละรวมทั้งโรงพยาบาล</span><span className="text-6xl font-black text-[#238885]">{grandSummary?.percentage || 0}%</span></div>
                       </div>
                       <div className="bg-slate-50 p-6 rounded-3xl shadow-sm border-2 border-gray-200 mb-10 pdf-no-break print:bg-white print:border-gray-300">
                          <span className="font-bold text-slate-800 block mb-4 text-xl">หน่วยงานที่เข้าร่วมการประเมิน ({records.length}):</span>
                          {(() => {
                             const deptMap = {};
                             records.forEach(r => {
                                const d = r.department || 'ไม่ระบุ';
                                if (!deptMap[d]) deptMap[d] = { department: d, count: 0, people: 0 };
                                deptMap[d].count += 1;
                                deptMap[d].people += (parseInt(r.numPeople) || 0);
                             });
                             const deptRows = Object.values(deptMap).sort((a, b) => a.department.localeCompare(b.department, 'th'));
                             const totalCount = deptRows.reduce((s, x) => s + x.count, 0);
                             const totalPeople = deptRows.reduce((s, x) => s + x.people, 0);
                             return (
                                <div className="overflow-x-auto rounded-2xl border-2 border-gray-200 print:border-gray-300">
                                   <table className="w-full text-left border-collapse min-w-[480px]">
                                      <thead>
                                         <tr className="text-slate-600 text-base bg-gray-50 border-b-2 border-gray-200 print:bg-white print:text-black">
                                            <th className="py-4 px-4 font-bold text-center w-16 border-r border-gray-200">ลำดับ</th>
                                            <th className="py-4 px-6 font-bold border-r border-gray-200">หน่วยงาน</th>
                                            <th className="py-4 px-4 font-bold text-center border-r border-gray-200">จำนวนการประเมิน (ครั้ง)</th>
                                            <th className="py-4 px-4 font-bold text-center">ผู้รับประเมิน (คน/เหตุการณ์)</th>
                                         </tr>
                                      </thead>
                                      <tbody>
                                         {deptRows.map((row, i) => (
                                            <tr key={row.department} className="border-b border-gray-100 last:border-0 hover:bg-white print:border-gray-200">
                                               <td className="py-3 px-4 text-center font-bold text-slate-500 border-r border-gray-100">{i + 1}</td>
                                               <td className="py-3 px-6 font-bold text-slate-800 border-r border-gray-100">{row.department}</td>
                                               <td className="py-3 px-4 text-center font-black text-[#285c6c] border-r border-gray-100">{row.count}</td>
                                               <td className="py-3 px-4 text-center font-bold text-[#238885]">{row.people}</td>
                                            </tr>
                                         ))}
                                         <tr className="border-t-2 border-gray-300 bg-slate-100 print:bg-gray-100">
                                            <td colSpan="2" className="py-4 px-6 font-black text-[#32355c] text-right border-r border-gray-200">รวมทั้งหมด ({deptRows.length} หน่วยงาน)</td>
                                            <td className="py-4 px-4 text-center font-black text-[#285c6c] text-lg border-r border-gray-200">{totalCount}</td>
                                            <td className="py-4 px-4 text-center font-black text-[#238885] text-lg">{totalPeople}</td>
                                         </tr>
                                      </tbody>
                                   </table>
                                </div>
                             );
                          })()}
                       </div>
                       <section className="bg-white rounded-3xl shadow-lg border-2 border-[#16bba6]/30 p-8 mt-8 pdf-no-break print:shadow-none print:border-gray-400">
                          <h2 className="text-2xl md:text-3xl font-black text-[#238885] mb-6 flex items-center gap-3 border-b-2 border-gray-100 pb-4"><Activity className="w-9 h-9 text-[#16bba6]" /> ภาพรวมการปฏิบัติตาม Bundle ระดับโรงพยาบาล</h2>
                          <div className="flex flex-wrap justify-center gap-5">
                             {keysToUse.map(key => (<BundleCard key={key} bundleKey={key} data={aggBundles[key]} config={mappingToUse[key]} />))}
                          </div>
                          <div className="mt-8 bg-slate-50 rounded-2xl p-6 border-2 border-gray-200 flex justify-between items-center shadow-inner print:bg-white print:border-gray-300 print:shadow-none">
                             <div><span className="block font-bold text-slate-900 text-base md:text-xl">คะแนน Bundle เฉลี่ยทั้งโรงพยาบาล <span className="text-sm font-medium text-slate-500 ml-2">(รวม {getActualBundleItemsCount(mappingToUse, checklist)} ข้อ)</span></span><span className="block text-sm font-bold text-[#c2651b] mt-1.5">ร้อยละของส่วนที่เหลือ: {100 - (parseInt(aggBundles?.OVERALL?.percent) || 0)}%</span></div>
                             <span className="text-6xl font-black text-[#238885]">{aggBundles?.OVERALL?.percent || 0}%</span>
                          </div>
                       </section>

                       {(aggSections?.length > 0) && (
                          <React.Fragment>
                             <h2 className="text-2xl font-black text-[#32355c] mt-12 mb-6 flex items-center gap-3 pdf-no-break"><PieChart className="w-8 h-8 text-[#285c6c]" /> สรุปผลการประเมินหัวข้อใหญ่ (รายหมวด)</h2>
                             <div className="bg-white rounded-3xl shadow-sm border-2 border-gray-200 overflow-hidden mb-8 pdf-no-break print:border-gray-400">
                                 <div className="bg-[#314566] px-6 py-5 border-b border-gray-200 font-bold text-white text-xl flex items-center gap-3 print:bg-gray-100 print:text-black"><FileText className="w-7 h-7 text-[#16bba6] print:hidden"/> คะแนนเฉลี่ยแยกตามหมวดการประเมิน</div>
                                 <div className="p-0 overflow-x-auto">
                                     <table className="w-full text-left border-collapse min-w-[600px]">
                                         <thead><tr className="text-slate-600 text-base border-b-2 border-gray-200 bg-gray-50 print:bg-white print:text-black print:border-b-gray-300"><th className="py-4 px-6 font-bold">หมวดการประเมิน</th><th className="py-4 px-6 font-bold text-center">คะแนนเต็ม</th><th className="py-4 px-6 font-bold text-center">คะแนนที่ได้</th><th className="py-4 px-6 font-bold w-[30%]">ร้อยละเฉลี่ย</th></tr></thead>
                                         <tbody>
                                             {aggSections.map(sec => {
                                                 const scoreColor = getScoreLevelColor(sec.percentage);
                                                 return (
                                                 <tr key={sec.id} className={`border-b border-gray-100 last:border-0 print:border-gray-200 ${scoreColor.rowBg}`}>
                                                     <td className="py-5 px-6 font-black text-slate-800 text-lg">{sec.title}</td><td className="py-5 px-6 text-center font-bold text-slate-600 text-lg">{sec.fullScore}</td><td className="py-5 px-6 text-center font-bold text-[#238885] text-lg">{sec.earnedScore}</td>
                                                     <td className="py-5 px-6"><div className="flex items-center gap-4"><div className="w-full bg-gray-200 rounded-full h-3.5 max-w-[200px] shadow-inner print:hidden"><div className={`h-3.5 rounded-full ${scoreColor.bar}`} style={{width: `${sec.percentage}%`, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}></div></div><span className={`font-black text-xl min-w-[60px] text-right ${scoreColor.text}`}>{sec.percentage}%</span></div></td>
                                                 </tr>
                                             )})}
                                         </tbody>
                                     </table>
                                 </div>
                             </div>
                          </React.Fragment>
                       )}

                       <h2 className="text-2xl font-black text-[#32355c] mt-12 mb-6 flex items-center gap-3 pdf-no-break"><FileText className="w-8 h-8 text-[#285c6c]" /> รายละเอียดผลการประเมินภาพรวมรายข้อ</h2>
                       {aggSections.map(section => (
                           <section key={section.id} className="bg-white rounded-3xl shadow-sm border-2 border-gray-200 overflow-hidden mb-6 print:border-gray-400">
                              <div className="bg-slate-50 px-6 py-5 border-b-2 border-gray-200 flex justify-between items-center pdf-no-break print:bg-gray-100"><h3 className="font-black text-[#32355c] text-lg md:text-xl print:text-black">{section.title}</h3><div className="text-base font-bold text-white bg-[#285c6c] px-5 py-2 rounded-xl shadow-md print:text-indigo-900 print:bg-transparent print:border-none">เฉลี่ย {section.percentage}%</div></div>
                              <div className="divide-y-2 divide-gray-100 print:divide-gray-200">
                                 {section.items.map(item => {
                                    const scoreColor = getScoreLevelColor(item.percent);
                                    return (
                                    <div key={item.id} className={`py-4 px-6 flex justify-between items-center pdf-no-break transition-colors print:border-gray-200 ${scoreColor.rowBg}`}>
                                       <div className="flex-1 text-lg pr-6 min-w-0 break-words whitespace-normal flex items-start">
                                          <span className="font-black text-[#32355c] w-12 shrink-0 mt-0.5">{item.id}</span>
                                          <div className="shrink-0 flex flex-wrap gap-2 mt-0 mr-4">{getBundleKeysForItem(item.id, dashType).map((k, idx) => (<span key={idx} className={`font-black text-xs text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md ${getBundleBadgeColor(k, dashType)}`}>{k}</span>))}</div>
                                          <div className="flex-1 mt-0.5"><span className="text-slate-800 font-bold leading-relaxed">{item.text}</span><div className="mt-2 text-sm text-slate-500 hidden sm:block font-bold">[ผู้รับประเมิน: {item.total} คน/เหตุการณ์ | ปฏิบัติ: {item.done} | ไม่ปฏิบัติ: {item.notDone} | NA: {item.na}]</div></div>
                                       </div>
                                       <div className="flex flex-col items-end w-32 md:w-40 shrink-0">
                                          <span className={`font-black text-3xl ${scoreColor.text}`}>{item.percent}%</span>
                                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-2 shadow-inner print:hidden"><div className={`${scoreColor.bar} h-2.5 rounded-full`} style={{width: `${item.percent}%`, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}></div></div>
                                          <span className="text-xs font-bold text-slate-500 hidden md:block">({item.earned}/{item.total} ครั้งที่ผ่าน)</span>
                                       </div>
                                    </div>
                                 )})}
                              </div>
                           </section>
                       ))}
                       {(deptTypeAverages?.length > 0 || deptAverages?.length > 0) && (<h2 className="text-2xl font-black text-[#32355c] mt-12 mb-6 flex items-center gap-3 pdf-no-break"><PieChart className="w-8 h-8 text-[#285c6c]" /> สรุปคะแนนเฉลี่ยเพิ่มเติม</h2>)}
                       {deptTypeAverages?.length > 0 && (
                          <div className="bg-white rounded-3xl shadow-sm border-2 border-gray-200 overflow-hidden mb-8 pdf-no-break print:border-gray-400">
                              <div className="bg-[#314566] px-6 py-5 border-b border-gray-200 font-bold text-white text-xl flex items-center gap-3 print:bg-gray-100 print:text-black"><Building2 className="w-7 h-7 text-[#16bba6] print:hidden"/> คะแนนเฉลี่ยแยกตามประเภทหน่วยงาน</div>
                              <div className="p-0 overflow-x-auto">
                                  <table className="w-full text-left border-collapse min-w-[600px]">
                                      <thead><tr className="text-slate-600 text-base border-b-2 border-gray-200 bg-gray-50 print:bg-white print:text-black print:border-b-gray-300"><th className="py-4 px-6 font-bold">ประเภทหน่วยงาน</th><th className="py-4 px-6 font-bold text-center">ประเมิน (ครั้ง)</th><th className="py-4 px-6 font-bold text-center">ผู้รับประเมิน (คน/เหตุการณ์)</th><th className="py-4 px-6 font-bold w-[45%]">ค่าเฉลี่ย และ แผนภูมิ (ร้อยละ)</th></tr></thead>
                                      <tbody>
                                          {deptTypeAverages.map(stat => {
                                              const scoreColor = getScoreLevelColor(stat.avg);
                                              return (
                                              <tr key={stat.deptType} className={`border-b-2 border-gray-50 last:border-0 print:border-gray-200 ${scoreColor.rowBg}`}>
                                                  <td className="py-5 px-6 font-black text-slate-800 text-xl">{stat.deptType}</td><td className="py-5 px-6 text-center font-bold text-slate-600 text-lg">{stat.count}</td><td className="py-5 px-6 text-center font-bold text-[#238885] text-lg">{stat.peopleCount}</td>
                                                  <td className="py-5 px-6"><div className="flex items-center gap-4"><div className="w-full bg-gray-200 rounded-full h-3.5 max-w-[250px] shadow-inner print:hidden"><div className={`h-3.5 rounded-full ${scoreColor.bar}`} style={{width: `${stat.avg}%`, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact'}}></div></div><span className={`font-black text-2xl min-w-[80px] text-right ${scoreColor.text}`}>{stat.avg}%</span></div></td>
                                              </tr>
                                          )})}
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                       )}
                       </>)}

                       {!dashType && crossTabStats && crossTabStats.deptList.length > 0 && (
                          <div className="bg-white rounded-3xl shadow-sm border-2 border-gray-200 overflow-hidden mb-8 pdf-no-break print:border-gray-400 mt-12">
                              <div className="bg-[#314566] px-6 py-5 border-b border-gray-200 font-bold text-white text-xl flex items-center gap-3 print:bg-gray-100 print:text-black">
                                  <Users className="w-7 h-7 text-[#16bba6] print:hidden"/> สรุปจำนวนผู้รับการประเมิน (คน/เหตุการณ์) แยกตามหน่วยงานและมาตรฐาน
                              </div>
                              <div className="p-5 bg-slate-50 border-b border-gray-200 text-sm font-medium text-slate-600 print:bg-white print:text-black leading-relaxed">
                                  <strong className="text-slate-800 text-base mb-2 block">สัญลักษณ์มาตรฐาน:</strong>
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                      {crossTabStats.standards.map((std, i) => (
                                          <div key={std} className="flex items-start gap-2">
                                             <span className="font-black text-white bg-[#238885] px-2 py-0.5 rounded text-xs min-w-[24px] text-center">{i+1}</span>
                                             <span className="font-bold text-sm">{std}</span>
                                          </div>
                                      ))}
                                  </div>
                                  <div className="mt-4 pt-4 border-t border-gray-200">
                                      <strong className="text-slate-800 text-base mb-2 block">เกณฑ์การประเมิน (ไฮไลท์สีแดงเมื่อไม่ผ่านเกณฑ์):</strong>
                                      <ul className="list-disc pl-5 text-sm space-y-1">
                                          <li><span className="font-bold">มาตรฐาน 1-6 :</span> ไม่น้อยกว่า 5 ครั้ง</li>
                                          <li><span className="font-bold">มาตรฐาน 7-15 :</span> ไม่น้อยกว่า 1 ครั้ง</li>
                                          <li><span className="font-bold">มาตรฐาน 16-17 :</span> ไม่น้อยกว่าร้อยละ 50 ของจำนวนเจ้าหน้าที่ <span className="text-rose-500 font-bold text-xs ml-1">(※ ปัจจุบันตั้งตัวเลขเจ้าหน้าที่จำลองไว้ที่ 20 คน สามารถแจ้งแก้ไขได้ภายหลัง)</span></li>
                                      </ul>
                                  </div>
                              </div>
                              <div className="p-0 overflow-x-auto">
                                  <table className="w-full text-left border-collapse min-w-[1000px]">
                                      <thead>
                                          <tr className="text-slate-600 text-base border-b-2 border-gray-200 bg-gray-50 print:bg-white print:text-black print:border-b-gray-300">
                                              <th className="py-4 px-6 font-bold w-[250px] border-r border-gray-200">หน่วยงาน</th>
                                              {crossTabStats.standards.map((std, i) => (
                                                  <th key={std} className="py-4 px-2 font-bold text-center border-r border-gray-200" title={std}>{i+1}</th>
                                              ))}
                                              <th className="py-4 px-4 font-bold text-center bg-[#285c6c]/10 text-[#285c6c]">รวม</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {crossTabStats.deptList.map(stat => (
                                              <tr key={stat.department} className={`border-b border-gray-100 last:border-0 print:border-gray-200 hover:bg-slate-50`}>
                                                  <td className="py-4 px-6 font-bold text-slate-800 border-r border-gray-100">{stat.department}</td>
                                                  {crossTabStats.standards.map((std, i) => {
                                                      const target = getCriteriaTarget(i + 1);
                                                      const val = stat[std] || 0;
                                                      const isPass = val >= target;
                                                      
                                                      return (
                                                          <td key={std} className="py-4 px-2 text-center text-slate-600 border-r border-gray-100">
                                                              {val > 0 ? (
                                                                  <span className={`font-bold px-2 py-1 rounded-md ${isPass ? 'text-[#238885] bg-[#16bba6]/10' : 'text-red-600 bg-red-100'}`}>
                                                                      {val}
                                                                  </span>
                                                              ) : (
                                                                  <span className={`font-bold px-2 py-1 rounded-md ${isPass ? 'text-gray-300' : 'text-red-500 bg-red-50'}`}>
                                                                      {val === 0 && target > 0 ? '0' : '-'}
                                                                  </span>
                                                              )}
                                                          </td>
                                                      );
                                                  })}
                                                  <td className="py-4 px-4 text-center font-black text-[#285c6c] bg-[#285c6c]/5">{stat.total}</td>
                                              </tr>
                                          ))}
                                          <tr className="border-t-2 border-gray-300 bg-slate-100 print:bg-gray-100">
                                              <td className="py-5 px-6 font-black text-[#32355c] text-right border-r border-gray-200">รวมทุกหน่วยงาน</td>
                                              {crossTabStats.standards.map(std => (
                                                  <td key={std} className="py-5 px-2 text-center font-black text-[#238885] border-r border-gray-200">
                                                      {crossTabStats.totalByStandard[std] > 0 ? crossTabStats.totalByStandard[std] : '-'}
                                                  </td>
                                              ))}
                                              <td className="py-5 px-4 text-center font-black text-[#285c6c] text-xl">{crossTabStats.grandTotal}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                       )}

                       {!dashType && roleCrossTabStats && roleCrossTabStats.deptRoleList.length > 0 && (
                          <div className="bg-white rounded-3xl shadow-sm border-2 border-gray-200 overflow-hidden mb-8 pdf-no-break print:border-gray-400 mt-8">
                              <div className="bg-[#285c6c] px-6 py-5 border-b border-gray-200 font-bold text-white text-xl flex items-center gap-3 print:bg-gray-100 print:text-black">
                                  <Users className="w-7 h-7 text-[#e9c460] print:hidden"/> สรุปจำนวนผู้รับการประเมิน (คน/เหตุการณ์) แยกตามหน่วยงาน, ตำแหน่ง (มาตรฐาน 16-17)
                              </div>
                              <div className="p-5 bg-slate-50 border-b border-gray-200 text-sm font-medium text-slate-600 print:bg-white print:text-black leading-relaxed">
                                  <strong className="text-slate-800 text-base mb-2 block">สัญลักษณ์มาตรฐาน:</strong>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                      {roleCrossTabStats.standards.map((std, i) => (
                                          <div key={std} className="flex items-start gap-2">
                                             <span className="font-black text-[#32355c] bg-[#e9c460] px-2 py-0.5 rounded text-xs min-w-[24px] text-center">{i+16}</span>
                                             <span className="font-bold text-sm">{std}</span>
                                          </div>
                                      ))}
                                  </div>
                                  <div className="mt-4 pt-4 border-t border-gray-200">
                                      <strong className="text-slate-800 text-base mb-2 block">เกณฑ์การประเมิน (ไฮไลท์สีแดงเมื่อไม่ผ่านเกณฑ์):</strong>
                                      <ul className="list-disc pl-5 text-sm space-y-1">
                                          <li><span className="font-bold">มาตรฐาน 16-17 :</span> ไม่น้อยกว่าร้อยละ 50 ของจำนวนเจ้าหน้าที่ <span className="text-rose-500 font-bold text-xs ml-1">(※ ปัจจุบันตั้งตัวเลขเจ้าหน้าที่จำลองไว้ที่ 20 คน สามารถแจ้งแก้ไขได้ภายหลัง)</span></li>
                                      </ul>
                                  </div>
                              </div>
                              <div className="p-0 overflow-x-auto">
                                  <table className="w-full text-left border-collapse min-w-[800px]">
                                      <thead>
                                          <tr className="text-slate-600 text-base border-b-2 border-gray-200 bg-gray-50 print:bg-white print:text-black print:border-b-gray-300">
                                              <th className="py-4 px-6 font-bold w-[200px] border-r border-gray-200">หน่วยงาน</th>
                                              <th className="py-4 px-6 font-bold w-[200px] border-r border-gray-200">ตำแหน่ง</th>
                                              {roleCrossTabStats.standards.map((std, i) => (
                                                  <th key={std} className="py-4 px-4 font-bold text-center border-r border-gray-200" title={std}>{i+16}</th>
                                              ))}
                                              <th className="py-4 px-4 font-bold text-center bg-[#285c6c]/10 text-[#285c6c]">รวม</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {roleCrossTabStats.deptRoleList.map((stat, idx) => {
                                              const isFirstOfDept = idx === 0 || roleCrossTabStats.deptRoleList[idx - 1].department !== stat.department;
                                              const rowsInDept = roleCrossTabStats.deptRoleList.filter(s => s.department === stat.department).length;

                                              return (
                                              <tr key={`${stat.department}_${stat.role}`} className={`border-b border-gray-100 last:border-0 print:border-gray-200 hover:bg-slate-50`}>
                                                  {isFirstOfDept && (
                                                      <td rowSpan={rowsInDept} className="py-4 px-6 font-bold text-slate-800 border-r border-gray-100 align-top bg-white print:bg-transparent">{stat.department}</td>
                                                  )}
                                                  <td className="py-4 px-6 font-medium text-slate-700 border-r border-gray-100">{stat.role}</td>
                                                  {roleCrossTabStats.standards.map((std, i) => {
                                                      const target = getCriteriaTarget(i + 16);
                                                      const val = stat[std] || 0;
                                                      const isPass = val >= target;
                                                      
                                                      return (
                                                          <td key={std} className="py-4 px-4 text-center text-slate-600 border-r border-gray-100">
                                                              {val > 0 ? (
                                                                  <span className={`font-bold px-3 py-1.5 rounded-md ${isPass ? 'text-[#285c6c] bg-[#285c6c]/10' : 'text-red-600 bg-red-100'}`}>
                                                                      {val}
                                                                  </span>
                                                              ) : (
                                                                  <span className={`font-bold px-3 py-1.5 rounded-md ${isPass ? 'text-gray-300' : 'text-red-500 bg-red-50'}`}>
                                                                      {val === 0 && target > 0 ? '0' : '-'}
                                                                  </span>
                                                              )}
                                                          </td>
                                                      );
                                                  })}
                                                  <td className="py-4 px-4 text-center font-black text-[#285c6c] bg-[#285c6c]/5">{stat.total}</td>
                                              </tr>
                                          )})}
                                          <tr className="border-t-2 border-gray-300 bg-slate-100 print:bg-gray-100">
                                              <td colSpan="2" className="py-5 px-6 font-black text-[#32355c] text-right border-r border-gray-200">รวมทุกหน่วยงานและตำแหน่ง</td>
                                              {roleCrossTabStats.standards.map(std => (
                                                  <td key={std} className="py-5 px-4 text-center font-black text-[#285c6c] border-r border-gray-200">
                                                      {roleCrossTabStats.totalByStandard[std] > 0 ? roleCrossTabStats.totalByStandard[std] : '-'}
                                                  </td>
                                              ))}
                                              <td className="py-5 px-4 text-center font-black text-[#285c6c] text-xl">{roleCrossTabStats.grandTotal}</td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                       )}

                    </main>
                 </div>
               )}
               {(records.length > 0 || (!dashType && (crossTabStats.deptList.length > 0 || roleCrossTabStats.deptRoleList.length > 0))) && (
                  <div className="max-w-7xl mx-auto w-full px-4 mt-8 mb-10 print:hidden flex flex-wrap justify-end gap-4">
                     <button onClick={handleExportHospitalExcel} className="flex items-center justify-center gap-2 px-8 py-3.5 bg-[#8ab278] text-white rounded-xl font-bold text-lg hover:bg-[#729c60] transition-colors shadow-md hover:shadow-lg"><Download className="w-6 h-6" /> Export Excel</button>
                     <button onClick={handleGenerateHospitalPDF} disabled={isGeneratingPDF} className={`flex items-center justify-center gap-2 px-8 py-3.5 text-white rounded-xl font-bold text-lg transition-colors shadow-md hover:shadow-lg ${isGeneratingPDF ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#f1a164] hover:bg-[#de8f55]'}`}><Loader2 className={`w-6 h-6 animate-spin ${!isGeneratingPDF && 'hidden'}`} /><FileText className={`w-6 h-6 ${isGeneratingPDF && 'hidden'}`} /> แสดงตัวอย่าง PDF</button>
                  </div>
               )}
            </div>
         );
      }

      const HistoryView = () => {
         const [loginUser, setLoginUser] = useState("");
         const [loginPass, setLoginPass] = useState("");
         const [loginErr, setLoginErr] = useState("");

         const [filterYear, setFilterYear] = useState("all");
         const [filterStartMonth, setFilterStartMonth] = useState("all");
         const [filterEndMonth, setFilterEndMonth] = useState("all");
         const [filterType, setFilterType] = useState("all");
         const [filterDeptType, setFilterDeptType] = useState("all");
         const [filterDept, setFilterDept] = useState("all");
         const [filterRole, setFilterRole] = useState("all"); 
         const [filterAssessor, setFilterAssessor] = useState("all");

         const handleLogin = (e) => {
           e.preventDefault();
           if (['icn', 'ICN', 'Icn'].includes(loginUser) && loginPass === '10725') {
             setIsHistoryAuthenticated(true); setLoginErr("");
           } else { setLoginErr("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง"); }
         };

         const filterOptions = useMemo(() => {
            const years = new Set(); const depts = new Set(); const roles = new Set(); const assessors = new Set();
            hospitalRecords.forEach(r => {
                const d = new Date(r.id);
                if (!isNaN(d.getTime())) years.add(d.getFullYear().toString());
                if (r.department && r.department !== '-') depts.add(r.department);
                if (r.evaluateeRole) roles.add(r.evaluateeRole); 
                if (r.assessorName && r.assessorName !== '-') assessors.add(r.assessorName);
            });
            return { years: Array.from(years).sort().reverse(), depts: Array.from(depts).sort((a, b) => a.localeCompare(b, 'th')), roles: Array.from(roles).sort((a, b) => a.localeCompare(b, 'th')), assessors: Array.from(assessors).sort((a, b) => a.localeCompare(b, 'th')) };
         }, [hospitalRecords]);

         const filteredRecords = useMemo(() => {
            return hospitalRecords.filter(r => {
                const d = new Date(r.id);
                const rYear = isNaN(d.getTime()) ? "" : d.getFullYear().toString();
                const rMonthInt = isNaN(d.getTime()) ? -1 : (d.getMonth() + 1);

                if (filterYear !== "all" && rYear !== filterYear) return false;
                if (filterStartMonth !== "all" && filterEndMonth !== "all") {
                    const sM = parseInt(filterStartMonth), eM = parseInt(filterEndMonth);
                    if (rMonthInt < sM || rMonthInt > eM) return false;
                } else if (filterStartMonth !== "all" && rMonthInt < parseInt(filterStartMonth)) return false;
                else if (filterEndMonth !== "all" && rMonthInt > parseInt(filterEndMonth)) return false;

                if (filterType !== "all" && r.assessmentType !== filterType) return false;
                if (filterDeptType !== "all" && r.deptType !== filterDeptType) return false;
                if (filterDept !== "all" && r.department !== filterDept) return false;
                if (filterRole !== "all" && r.evaluateeRole !== filterRole) return false; 
                if (filterAssessor !== "all" && r.assessorName !== filterAssessor) return false;
                return true; 
            });
         }, [hospitalRecords, filterYear, filterStartMonth, filterEndMonth, filterType, filterDeptType, filterDept, filterRole, filterAssessor]); 

         const summaryStats = useMemo(() => {
            if (filteredRecords.length === 0) return null;
            let totalEarned = 0, totalFull = 0; let validRecordsCount = 0; let totalPeopleCount = 0;
            const typeStats = {};
            const deptTypeByTypeStats = {};
            const deptByTypeStats = {};
            const bundleStatsByType = {};

            if (dynamicChecklists) {
               Object.keys(dynamicChecklists).forEach(t => {
                   typeStats[t] = {count:0, earned:0, full:0, peopleCount:0};
                   deptTypeByTypeStats[t] = {};
                   deptByTypeStats[t] = {};
                   bundleStatsByType[t] = {};
               });
            }

            filteredRecords.forEach(r => {
               let rEarned = 0, rFull = 0;
               if (r.overallSummaryData && r.overallSummaryData.aggSectionScores) {
                   r.overallSummaryData.aggSectionScores.forEach(sec => {
                       sec.items.forEach(item => {
                           rEarned += (item.done || 0);
                           rFull += ((item.done || 0) + (item.notDone || 0));
                       });
                   });
               }
               if (rFull === 0 && parseFloat(r.overallSummaryData?.grandSummary?.percentage || 0) > 0) {
                   rFull = 100; rEarned = parseFloat(r.overallSummaryData.grandSummary.percentage);
               }

               const numP = parseInt(r.numPeople) || 0;
               const type = r.assessmentType;
               
               if (rFull > 0 && type !== '-') {
                  totalEarned += rEarned; totalFull += rFull; validRecordsCount++; totalPeopleCount += numP;
                  if (!typeStats[type]) {
                      typeStats[type] = {count:0, earned:0, full:0, peopleCount:0};
                      deptTypeByTypeStats[type] = {};
                      deptByTypeStats[type] = {};
                      bundleStatsByType[type] = {};
                  }
                  typeStats[type].count++; typeStats[type].earned += rEarned; typeStats[type].full += rFull; typeStats[type].peopleCount += numP;
                  
                  const dType = r.deptType || 'ไม่ระบุ';
                  if (!deptTypeByTypeStats[type][dType]) deptTypeByTypeStats[type][dType] = { count: 0, earned: 0, full: 0, peopleCount: 0 };
                  deptTypeByTypeStats[type][dType].count++; deptTypeByTypeStats[type][dType].earned += rEarned; deptTypeByTypeStats[type][dType].full += rFull; deptTypeByTypeStats[type][dType].peopleCount += numP;

                  const dept = r.department || 'ไม่ระบุ';
                  const deptKey = `${dType}_${dept}`;
                  if (!deptByTypeStats[type][deptKey]) deptByTypeStats[type][deptKey] = { department: dept, deptType: dType, count: 0, earned: 0, full: 0, peopleCount: 0 };
                  deptByTypeStats[type][deptKey].count++; deptByTypeStats[type][deptKey].earned += rEarned; deptByTypeStats[type][deptKey].full += rFull; deptByTypeStats[type][deptKey].peopleCount += numP;

                  const sections = r.overallSummaryData?.aggSectionScores;
                  if (sections) {
                      const { mapping } = getBundleMappingForType(type);
                      Object.keys(mapping).forEach(bKey => {
                          mapping[bKey].items.forEach(itemId => {
                              sections.forEach(sec => {
                                  const item = sec.items.find(i => String(i.id) === String(itemId).trim());
                                  if (item) {
                                      if (!bundleStatsByType[type][bKey]) bundleStatsByType[type][bKey] = { earned: 0, total: 0 };
                                      let done = item.done !== undefined ? item.done : (item.earned || 0);
                                      let notDone = item.notDone !== undefined ? item.notDone : ((item.total || 0) - (item.earned || 0));
                                      bundleStatsByType[type][bKey].earned += done;
                                      bundleStatsByType[type][bKey].total += done + notDone;
                                  }
                              });
                          });
                      });
                      
                      const uniqueItems = new Set();
                      Object.values(mapping).forEach(c => c.items.forEach(i => uniqueItems.add(String(i).trim())));
                      uniqueItems.forEach(itemId => {
                          sections.forEach(sec => {
                              const item = sec.items.find(i => String(i.id) === itemId);
                              if (item) {
                                  if (!bundleStatsByType[type]['OVERALL']) bundleStatsByType[type]['OVERALL'] = { earned: 0, total: 0 };
                                  let done = item.done !== undefined ? item.done : (item.earned || 0);
                                  let notDone = item.notDone !== undefined ? item.notDone : ((item.total || 0) - (item.earned || 0));
                                  bundleStatsByType[type]['OVERALL'].earned += done;
                                  bundleStatsByType[type]['OVERALL'].total += done + notDone;
                              }
                          });
                      });
                  }
               }
            });

            const overallAvg = totalFull > 0 ? ((totalEarned / totalFull) * 100).toFixed(2) : 0;
            const typeAverages = Object.keys(typeStats).map(key => ({ type: key, count: typeStats[key].count, peopleCount: typeStats[key].peopleCount, avg: typeStats[key].full > 0 ? ((typeStats[key].earned / typeStats[key].full) * 100).toFixed(2) : 0 })).filter(stat => stat.count > 0);

            const deptTypeAveragesByType = {};
            Object.keys(deptTypeByTypeStats).forEach(type => {
                const dTypeArr = Object.keys(deptTypeByTypeStats[type]).map(key => ({ deptType: key, count: deptTypeByTypeStats[type][key].count, peopleCount: deptTypeByTypeStats[type][key].peopleCount, avg: deptTypeByTypeStats[type][key].full > 0 ? ((deptTypeByTypeStats[type][key].earned / deptTypeByTypeStats[type][key].full) * 100).toFixed(2) : 0 })).sort((a, b) => a.deptType.localeCompare(b.deptType, 'th'));
                if (dTypeArr.length > 0) deptTypeAveragesByType[type] = dTypeArr;
            });

            const deptAveragesByType = {};
            Object.keys(deptByTypeStats).forEach(type => {
                const deptArr = Object.keys(deptByTypeStats[type]).map(key => ({ department: deptByTypeStats[type][key].department, deptType: deptByTypeStats[type][key].deptType, count: deptByTypeStats[type][key].count, peopleCount: deptByTypeStats[type][key].peopleCount, avg: deptByTypeStats[type][key].full > 0 ? ((deptByTypeStats[type][key].earned / deptByTypeStats[type][key].full) * 100).toFixed(2) : 0 })).sort((a, b) => { if (a.deptType === b.deptType) return a.department.localeCompare(b.department, 'th'); return a.deptType.localeCompare(b.deptType, 'th'); }); 
                if (deptArr.length > 0) deptAveragesByType[type] = deptArr;
            });

            const bundleAveragesByType = {};
            Object.keys(bundleStatsByType).forEach(type => {
                if (Object.keys(bundleStatsByType[type]).length > 0) {
                    bundleAveragesByType[type] = {};
                    Object.keys(bundleStatsByType[type]).forEach(bKey => {
                        const stats = bundleStatsByType[type][bKey];
                        bundleAveragesByType[type][bKey] = { earned: stats.earned, total: stats.total, percent: stats.total > 0 ? ((stats.earned / stats.total) * 100).toFixed(0) : 0 };
                    });
                }
            });

            return { overallAvg, typeAverages, deptTypeAveragesByType, deptAveragesByType, bundleAveragesByType, totalRecords: validRecordsCount, totalPeople: totalPeopleCount };
         }, [filteredRecords, dynamicChecklists]);

         const getHistoryExcelData = () => {
             const wsData = [];
             wsData.push(["ประวัติการบันทึกการประเมินมาตรฐาน IC", "โรงพยาบาลศรีสังวรสุโขทัย"]);
             wsData.push([]);
             wsData.push(["ข้อมูลอัปเดต ณ วันที่", `${new Date().toLocaleString('th-TH')} น.`]);
             wsData.push([]);
             wsData.push(["วัน/เวลาที่บันทึก", "แบบประเมิน", "ประเภท", "หน่วยงาน", "ผู้ประเมิน", "จำนวน (คน/เหตุการณ์)", "ร้อยละเฉลี่ย"]);
             
             if (filteredRecords.length === 0) {
                 wsData.push(["ไม่พบข้อมูล", "", "", "", "", "", ""]);
             } else {
                 filteredRecords.slice().reverse().forEach(r => {
                     const dateObj = new Date(r.id); 
                     const dateStr = isNaN(dateObj.getTime()) ? '-' : dateObj.toLocaleString('th-TH');
                     wsData.push([
                         dateStr,
                         r.assessmentType,
                         r.deptType,
                         r.department,
                         r.assessorName,
                         r.numPeople,
                         `${r.overallSummaryData?.grandSummary?.percentage || '0'}%`
                     ]);
                 });
             }
             return wsData;
         };

         const handleExportHistoryExcel = () => {
            const wsData = getHistoryExcelData();
            if (wsData.length === 0) return;
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, "ประวัติการประเมิน");
            XLSX.writeFile(wb, `ประวัติการประเมิน_${new Date().getTime()}.xlsx`);
         };

         const handleGenerateHistoryPDF = () => {
            const wsData = getHistoryExcelData();
            if (wsData.length === 0) return;
            const html = buildHTMLFromData(wsData, "ประวัติการบันทึกการประเมินมาตรฐาน IC");
            setPdfPreviewState({
                isOpen: true,
                htmlContent: html,
                filename: `ประวัติการประเมิน_${new Date().getTime()}.pdf`
            });
         };

         if (!isHistoryAuthenticated) {
            return (
              <div className="flex flex-col items-center justify-center w-full min-h-[70vh] px-4">
                 <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-200 w-full max-w-md">
                    <div className="flex justify-center mb-6">
                       <div className="bg-[#16bba6]/10 p-5 rounded-full text-[#16bba6] shadow-inner">
                          <User className="w-10 h-10" />
                       </div>
                    </div>
                    <h2 className="text-3xl font-black text-center text-[#32355c] mb-2">เข้าสู่ระบบ</h2>
                    <p className="text-center text-slate-500 mb-8 font-bold">เฉพาะเจ้าหน้าที่ ICN (จัดการประวัติ)</p>
                    <form onSubmit={handleLogin} className="space-y-5">
                       <div>
                          <label className="block text-sm font-bold text-[#285c6c] mb-2">ชื่อผู้ใช้งาน (Username)</label>
                          <input type="text" className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#16bba6] outline-none bg-gray-50 text-[#32355c] text-base font-bold" value={loginUser} onChange={(e) => setLoginUser(e.target.value)} placeholder="กรอกชื่อผู้ใช้งาน..." required />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-[#285c6c] mb-2">รหัสผ่าน (Password)</label>
                          <input type="password" className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#16bba6] outline-none bg-gray-50 text-[#32355c] text-base font-bold" value={loginPass} onChange={(e) => setLoginPass(e.target.value)} placeholder="กรอกรหัสผ่าน..." required />
                       </div>
                       {loginErr && <p className="text-rose-600 text-sm font-bold text-center bg-rose-50 py-3 rounded-lg border border-rose-200">{loginErr}</p>}
                       <button type="submit" className="w-full bg-[#238885] text-white font-black text-xl py-4 rounded-xl hover:bg-[#16bba6] transition-colors mt-4 shadow-lg">เข้าสู่ระบบ</button>
                    </form>
                 </div>
              </div>
            );
         }

         return (
           <div className="flex flex-col items-center w-full min-h-[80vh]">
              <div className="w-full max-w-7xl bg-white pb-10 px-4 py-8 rounded-3xl mt-6 shadow-sm border border-gray-200">
                 
                 <div className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-gray-200 mb-10 print:hidden">
                    <div className="flex items-center gap-3 mb-5 text-slate-800 font-bold text-lg border-b pb-4"><FilterIcon className="w-6 h-6 text-[#16bba6]" /> ตัวกรองข้อมูลประวัติ</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5">
                        <div className="col-span-2 sm:col-span-2 lg:col-span-1"><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ชื่อแบบประเมิน</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white hover:bg-gray-50 transition-colors shadow-sm" value={filterType} onChange={(e) => setFilterType(e.target.value)}><option value="all">ทั้งหมด</option>{dynamicChecklists && Object.keys(dynamicChecklists).map((k, index) => <option key={k} value={k}>{index < 6 ? '👩‍⚕️' : '🏥'} {index + 1}. {k}</option>)}</select></div>
                        <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ปี (Year)</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white hover:bg-gray-50 transition-colors shadow-sm" value={filterYear} onChange={(e) => setFilterYear(e.target.value)}><option value="all">ทุกปี</option>{filterOptions.years.map(y => <option key={y} value={y}>{parseInt(y) + 543}</option>)}</select></div>
                        <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ตั้งแต่เดือน</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white hover:bg-gray-50 transition-colors shadow-sm" value={filterStartMonth} onChange={(e) => setFilterStartMonth(e.target.value)}><option value="all">ทุกเดือน</option><option value="1">มกราคม</option><option value="2">กุมภาพันธ์</option><option value="3">มีนาคม</option><option value="4">เมษายน</option><option value="5">พฤษภาคม</option><option value="6">มิถุนายน</option><option value="7">กรกฎาคม</option><option value="8">สิงหาคม</option><option value="9">กันยายน</option><option value="10">ตุลาคม</option><option value="11">พฤศจิกายน</option><option value="12">ธันวาคม</option></select></div>
                        <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ถึงเดือน</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white hover:bg-gray-50 transition-colors shadow-sm" value={filterEndMonth} onChange={(e) => setFilterEndMonth(e.target.value)}><option value="all">ทุกเดือน</option><option value="1">มกราคม</option><option value="2">กุมภาพันธ์</option><option value="3">มีนาคม</option><option value="4">เมษายน</option><option value="5">พฤษภาคม</option><option value="6">มิถุนายน</option><option value="7">กรกฎาคม</option><option value="8">สิงหาคม</option><option value="9">กันยายน</option><option value="10">ตุลาคม</option><option value="11">พฤศจิกายน</option><option value="12">ธันวาคม</option></select></div>
                        <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ประเภทหน่วยงาน</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white hover:bg-gray-50 transition-colors shadow-sm" value={filterDeptType} onChange={(e) => setFilterDeptType(e.target.value)}><option value="all">ทั้งหมด</option><option value="IPD">IPD</option><option value="OPD">OPD</option><option value="กลุ่มงานให้บริการผู้ป่วย">กลุ่มงานให้บริการฯ</option></select></div>
                        <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">หน่วยงาน</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white hover:bg-gray-50 transition-colors shadow-sm" value={filterDept} onChange={(e) => setFilterDept(e.target.value)}><option value="all">ทุกหน่วยงาน</option>{filterOptions.depts.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
                        <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ตำแหน่ง</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white hover:bg-gray-50 transition-colors shadow-sm" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}><option value="all">ทุกตำแหน่ง</option>{filterOptions.roles && filterOptions.roles.map(role => <option key={role} value={role}>{role}</option>)}</select></div>
                        <div><label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wide">ผู้ประเมิน</label><select className="w-full p-3 border-2 border-gray-200 rounded-xl text-base font-bold text-[#32355c] outline-none focus:ring-2 focus:ring-[#16bba6] bg-white hover:bg-gray-50 transition-colors shadow-sm" value={filterAssessor} onChange={(e) => setFilterAssessor(e.target.value)}><option value="all">ทุกคน</option>{filterOptions.assessors && filterOptions.assessors.map(a => <option key={a} value={a}>{a}</option>)}</select></div>
                    </div>
                    <div className="mt-6 flex justify-between items-center border-t border-gray-200 pt-4">
                        <span className="text-sm font-bold text-slate-600 bg-white px-4 py-2 rounded-xl border border-gray-300">พบข้อมูลทั้งหมด {filteredRecords.length} รายการ</span>
                        <button onClick={() => { setFilterYear("all"); setFilterStartMonth("all"); setFilterEndMonth("all"); setFilterType("all"); setFilterDeptType("all"); setFilterDept("all"); setFilterRole("all"); setFilterAssessor("all"); }} className="text-sm font-bold text-[#f1a164] hover:text-white hover:bg-[#f1a164] px-6 py-2.5 rounded-xl transition-colors border-2 border-[#f1a164]/50">ล้างตัวกรองทั้งหมด</button>
                    </div>
                 </div>

                 <div id="history-report-content" className="bg-white rounded-3xl shadow-sm border-2 border-gray-200 p-8 print:border-none print:shadow-none">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-8">
                       <h2 className="text-3xl font-black text-[#32355c] flex items-center gap-3"><Clock className="w-8 h-8 text-[#285c6c] print:hidden"/> ประวัติการบันทึกการประเมิน</h2>
                       <div className="flex gap-3 self-start md:self-auto flex-wrap print:hidden">
                           <button onClick={handleExportHistoryExcel} className="text-white bg-[#8ab278] hover:bg-[#729c60] px-5 py-3 rounded-xl text-base flex items-center justify-center gap-2 transition-colors font-bold shadow-md"><Download className="w-5 h-5"/> Export Excel</button>
                           <button onClick={handleGenerateHistoryPDF} disabled={isGeneratingPDF} className={`text-white px-5 py-3 rounded-xl text-base flex items-center justify-center gap-2 transition-colors font-bold shadow-md ${isGeneratingPDF ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#f1a164] hover:bg-[#de8f55]'}`}><Loader2 className={`w-5 h-5 animate-spin ${!isGeneratingPDF && 'hidden'}`}/><FileText className={`w-5 h-5 ${isGeneratingPDF && 'hidden'}`}/> แสดงพรีวิว PDF</button>
                           <button onClick={() => handleFetchBackup(false, false)} disabled={isFetchingBackup} className={`text-white bg-[#238885] hover:bg-[#16bba6] px-5 py-3 rounded-xl text-base flex items-center justify-center gap-2 transition-colors font-bold shadow-md ${isFetchingBackup ? 'opacity-50 cursor-not-allowed' : ''}`}><Loader2 className={`w-5 h-5 animate-spin ${!isFetchingBackup && 'hidden'}`}/><CloudDownload className={`w-5 h-5 ${isFetchingBackup && 'hidden'}`}/> {isFetchingBackup ? 'กำลังดึงข้อมูล...' : 'ดึงข้อมูลจาก Cloud'}</button>
                           <button onClick={handleDeleteAllRecords} className="text-rose-600 bg-rose-50 hover:bg-rose-600 hover:text-white px-5 py-3 rounded-xl text-base flex items-center justify-center gap-2 transition-colors border-2 border-rose-200 font-bold shadow-sm"><Trash2 className="w-5 h-5"/> ล้างประวัติทั้งหมด</button>
                           <button onClick={() => setIsHistoryAuthenticated(false)} className="text-gray-600 hover:bg-gray-100 px-5 py-3 rounded-xl text-base flex items-center justify-center gap-2 transition-colors border-2 border-gray-300 font-bold shadow-sm"><LogOut className="w-5 h-5"/> ออกจากระบบ</button>
                       </div>
                    </div>

                    <div className="hidden print:block mb-6 text-base text-gray-600 font-bold">ข้อมูลอัปเดต ณ วันที่ {new Date().toLocaleString('th-TH')} น.</div>

                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                       <table className="w-full text-left border-collapse min-w-[800px]">
                          <thead>
                             <tr className="bg-slate-100 text-slate-800 text-base border-b-2 border-gray-300 print:bg-gray-200 print:text-black">
                                <th className="p-4 border-b font-bold">วัน/เวลาที่บันทึก</th><th className="p-4 border-b font-bold">แบบประเมิน</th><th className="p-4 border-b font-bold">ประเภท</th><th className="p-4 border-b font-bold">หน่วยงาน</th><th className="p-4 border-b font-bold">ผู้ประเมิน</th><th className="p-4 border-b font-bold text-center">จำนวน (คน/เหตุการณ์)</th><th className="p-4 border-b font-bold text-right">ร้อยละเฉลี่ย</th><th className="p-4 border-b font-bold text-center print:hidden">จัดการ</th>
                             </tr>
                          </thead>
                          <tbody>
                             {filteredRecords.length === 0 ? (
                                <tr><td colSpan="8" className="p-12 text-center text-slate-500 font-medium text-lg border-b border-gray-200">ไม่พบข้อมูลประวัติตามเงื่อนไขที่เลือก</td></tr>
                             ) : (
                                filteredRecords.slice().reverse().map(r => {
                                   const dateObj = new Date(r.id); const dateStr = isNaN(dateObj.getTime()) ? '-' : dateObj.toLocaleString('th-TH');
                                   return (
                                   <tr key={r.id} className="border-b border-gray-100 hover:bg-slate-50 transition-colors text-base print:text-black print:border-gray-300">
                                      <td className="p-4 font-medium text-slate-700 print:text-black">{dateStr}</td>
                                      <td className="p-4 font-black text-[#285c6c] print:text-black">{r.assessmentType || '-'}</td>
                                      <td className="p-4 font-bold text-slate-600">{r.deptType || '-'}</td>
                                      <td className="p-4 font-black text-slate-800 print:text-black">{r.department || '-'}</td>
                                      <td className="p-4 font-medium text-slate-700 print:text-black">{r.assessorName || '-'}</td>
                                      <td className="p-4 font-black text-center text-[#238885] print:text-black">{r.numPeople || '-'}</td>
                                      <td className="p-4 font-black text-[#16bba6] text-right text-xl print:text-black">{r.overallSummaryData?.grandSummary?.percentage || '0'}%</td>
                                      <td className="p-4 text-center print:hidden"><button onClick={() => handleDeleteRecord(r)} className="text-rose-500 hover:bg-rose-100 p-2.5 rounded-xl transition-colors" title="ลบข้อมูลนี้"><Trash2 className="w-5 h-5 inline" /></button></td>
                                   </tr>
                                )})
                             )}
                          </tbody>
                       </table>
                    </div>

                    {summaryStats && summaryStats.totalRecords > 0 && (
                        <div className="mt-12 border-t-2 border-gray-200 pt-10 pdf-no-break break-inside-avoid">
                            <div className="bg-[#314566] text-white px-8 py-5 rounded-3xl shadow-md mb-8 flex items-center gap-4 print:bg-transparent print:text-black print:border-none print:px-0 print:py-0 print:shadow-none">
                                <PieChart className="w-9 h-9 text-[#16bba6] print:hidden"/> <h3 className="text-2xl font-black m-0">สรุปภาพรวมโรงพยาบาล (อ้างอิงจากข้อมูลที่กรอง)</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                                <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 flex flex-col items-center justify-center shadow-sm">
                                    <span className="text-slate-500 font-bold mb-3 text-sm text-center uppercase tracking-wide">จำนวนการประเมินทั้งหมด</span>
                                    <span className="text-6xl font-black text-[#32355c]">{summaryStats.totalRecords} <span className="text-2xl font-bold text-slate-400">ครั้ง</span></span>
                                </div>
                                <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 flex flex-col items-center justify-center shadow-sm">
                                    <span className="text-slate-500 font-bold mb-3 text-sm text-center uppercase tracking-wide">จำนวนผู้รับการประเมินรวม</span>
                                    <span className="text-6xl font-black text-[#32355c]">{summaryStats.totalPeople} <span className="text-2xl font-bold text-slate-400">คน/เหตุการณ์</span></span>
                                </div>
                                <div className="bg-[#16bba6]/10 rounded-3xl p-8 border-2 border-[#16bba6]/30 flex flex-col items-center justify-center shadow-sm print:bg-white print:border-gray-300">
                                    <span className="text-[#0d7a6c] font-bold mb-3 text-sm text-center uppercase tracking-wide print:text-gray-600">คะแนนเฉลี่ยรวมทุกประเภท</span>
                                    <div className="flex items-baseline gap-2"><span className="text-6xl font-black text-[#238885] print:text-black">{summaryStats.overallAvg}%</span></div>
                                    <div className="w-full bg-white rounded-full h-3 mt-5 max-w-[180px] print:hidden"><div className="bg-[#238885] h-3 rounded-full" style={{width: `${summaryStats.overallAvg}%`}}></div></div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-sm border-2 border-gray-200 overflow-hidden mb-10">
                                <div className="bg-slate-100 px-8 py-6 border-b-2 border-gray-200 font-black text-[#32355c] text-xl flex items-center gap-3 print:bg-gray-100 print:text-black"><Activity className="w-7 h-7 text-[#285c6c] print:hidden"/> คะแนนเฉลี่ยแยกตามประเภทแบบประเมิน</div>
                                <div className="p-0 overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[600px]">
                                        <thead>
                                            <tr className="text-slate-600 text-base border-b-2 border-gray-200 bg-gray-50 print:bg-white print:text-black print:border-b-gray-300"><th className="py-5 px-8 font-bold">ประเภทแบบประเมิน</th><th className="py-5 px-8 font-bold text-center">ประเมิน (ครั้ง)</th><th className="py-5 px-8 font-bold text-center">ผู้รับประเมิน (คน/เหตุการณ์)</th><th className="py-5 px-8 font-bold w-[45%]">ค่าเฉลี่ย และ แผนภูมิ (ร้อยละ)</th></tr>
                                        </thead>
                                        <tbody>
                                            {summaryStats.typeAverages.map(stat => {
                                                const scoreColor = getScoreLevelColor(stat.avg);
                                                return (
                                                <tr key={stat.type} className={`border-b border-gray-100 last:border-0 print:border-gray-200 ${scoreColor.rowBg}`}>
                                                    <td className="py-6 px-8 font-black text-[#32355c] text-xl">{stat.type}</td><td className="py-6 px-8 text-center font-bold text-slate-600 text-lg">{stat.count}</td><td className="py-6 px-8 text-center font-bold text-[#238885] text-lg">{stat.peopleCount}</td>
                                                    <td className="py-6 px-8"><div className="flex items-center gap-5"><div className="w-full bg-gray-200 rounded-full h-3.5 max-w-[250px] shadow-inner print:hidden"><div className={`h-3.5 rounded-full ${scoreColor.bar}`} style={{width: `${stat.avg}%`}}></div></div><span className={`font-black text-2xl min-w-[80px] text-right ${scoreColor.text}`}>{stat.avg}%</span></div></td>
                                                </tr>
                                            )})}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {summaryStats.bundleAveragesByType && Object.keys(summaryStats.bundleAveragesByType).map(type => {
                                const aggBundles = summaryStats.bundleAveragesByType[type];
                                if (!aggBundles || Object.keys(aggBundles).length === 0) return null;
                                const { mapping: mappingToUse, keys: keysToUse } = getBundleMappingForType(type);
                                const checklist = dynamicChecklists ? (dynamicChecklists[type] || []) : [];
                                const actualItemCount = getActualBundleItemsCount(mappingToUse, checklist);
                                return (
                                    <section key={`history-bundle-${type}`} className="bg-white rounded-3xl shadow-sm border-2 border-gray-200 p-8 mt-10 pdf-no-break print:shadow-none print:border-gray-400">
                                        <h2 className="text-2xl md:text-3xl font-black text-[#285c6c] mb-6 flex items-center gap-3 border-b-2 border-gray-100 pb-4 print:text-black"><Activity className="w-9 h-9 text-[#16bba6]" /> ภาพรวมการปฏิบัติตาม Bundle - {type}</h2>
                                        <div className="flex flex-wrap justify-center gap-4">
                                        {keysToUse.map(key => (
                                           <BundleCard key={key} bundleKey={key} data={aggBundles[key]} config={mappingToUse[key]} />
                                        ))}
                                        </div>
                                        <div className="mt-8 bg-slate-50 rounded-2xl p-6 border-2 border-gray-200 flex justify-between items-center shadow-inner print:bg-white print:border-gray-300">
                                        <div><span className="block font-black text-slate-800 text-lg md:text-2xl">คะแนน Bundle เฉลี่ยภาพรวม ({type}) <span className="text-base font-bold text-slate-500 ml-2">(รวม {actualItemCount} ข้อ)</span></span><span className="block text-base font-bold text-[#c2651b] mt-2">ร้อยละของส่วนที่เหลือ: {100 - (parseInt(aggBundles.OVERALL?.percent) || 0)}%</span></div>
                                        <span className="text-6xl font-black text-[#238885]">{aggBundles.OVERALL?.percent || 0}%</span>
                                        </div>
                                    </section>
                                );
                            })}

                            {summaryStats.deptTypeAveragesByType && Object.keys(summaryStats.deptTypeAveragesByType).map(type => (
                            <div key={`deptType-${type}`} className="bg-white rounded-3xl shadow-sm border-2 border-gray-200 overflow-hidden mt-10 print:border-gray-400">
                                <div className="bg-slate-100 px-8 py-6 border-b-2 border-gray-200 font-black text-[#32355c] text-xl flex items-center gap-3 print:bg-gray-100 print:text-black"><Building2 className="w-7 h-7 text-[#285c6c] print:hidden"/> คะแนนเฉลี่ยแยกตามประเภทหน่วยงาน - {type}</div>
                                <div className="p-0 overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[600px]">
                                        <thead>
                                            <tr className="text-slate-600 text-base border-b-2 border-gray-200 bg-gray-50 print:bg-white print:text-black print:border-b-gray-300"><th className="py-4 px-8 font-bold">ประเภทหน่วยงาน</th><th className="py-4 px-8 font-bold text-center">ประเมิน (ครั้ง)</th><th className="py-4 px-8 font-bold text-center">ผู้รับประเมิน (คน/เหตุการณ์)</th><th className="py-4 px-8 font-bold w-[45%]">ค่าเฉลี่ย และ แผนภูมิ (ร้อยละ)</th></tr>
                                        </thead>
                                        <tbody>
                                            {summaryStats.deptTypeAveragesByType[type].map(stat => {
                                                const scoreColor = getScoreLevelColor(stat.avg);
                                                return (
                                                <tr key={stat.deptType} className={`border-b border-gray-100 last:border-0 print:border-gray-200 ${scoreColor.rowBg}`}>
                                                    <td className="py-6 px-8 font-black text-slate-800 text-xl">{stat.deptType}</td><td className="py-6 px-8 text-center font-bold text-slate-600 text-lg">{stat.count}</td><td className="py-6 px-8 text-center font-bold text-[#238885] text-lg">{stat.peopleCount}</td>
                                                    <td className="py-6 px-8"><div className="flex items-center gap-5"><div className="w-full bg-gray-200 rounded-full h-3.5 max-w-[250px] shadow-inner print:hidden"><div className={`h-3.5 rounded-full ${scoreColor.bar}`} style={{width: `${stat.avg}%`}}></div></div><span className={`font-black text-2xl min-w-[80px] text-right ${scoreColor.text}`}>{stat.avg}%</span></div></td>
                                                </tr>
                                            )})}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            ))}

                            {summaryStats.deptAveragesByType && Object.keys(summaryStats.deptAveragesByType).map(type => (
                            <div key={type} className="bg-white rounded-3xl shadow-sm border-2 border-gray-200 overflow-hidden mt-10 print:border-gray-400">
                                <div className="bg-slate-100 px-8 py-6 border-b-2 border-gray-200 font-black text-[#32355c] text-xl flex items-center gap-3 print:bg-gray-100 print:text-black"><Building2 className="w-7 h-7 text-[#285c6c] print:hidden"/> คะแนนเฉลี่ยแยกตามหน่วยงาน - {type}</div>
                                <div className="p-0 overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[600px]">
                                        <thead>
                                            <tr className="text-slate-600 text-base border-b-2 border-gray-200 bg-gray-50 print:bg-white print:text-black print:border-b-gray-300"><th className="py-4 px-8 font-bold">ประเภท</th><th className="py-4 px-8 font-bold">หน่วยงาน</th><th className="py-4 px-8 font-bold text-center">ประเมิน (ครั้ง)</th><th className="py-4 px-8 font-bold text-center">ผู้รับประเมิน (คน/เหตุการณ์)</th><th className="py-4 px-8 font-bold w-[40%]">ค่าเฉลี่ย และ แผนภูมิ (ร้อยละ)</th></tr>
                                        </thead>
                                        <tbody>
                                            {summaryStats.deptAveragesByType[type].map(stat => {
                                                const scoreColor = getScoreLevelColor(stat.avg);
                                                return (
                                                <tr key={`${stat.deptType}_${stat.department}`} className={`border-b-2 border-gray-50 last:border-0 print:border-gray-200 ${scoreColor.rowBg}`}>
                                                    <td className="py-6 px-8 font-bold text-slate-500 text-base">{stat.deptType}</td><td className="py-6 px-8 font-black text-slate-800 text-xl">{stat.department}</td><td className="py-6 px-8 text-center font-bold text-slate-600 text-lg">{stat.count}</td><td className="py-6 px-8 text-center font-bold text-[#238885] text-lg">{stat.peopleCount}</td>
                                                    <td className="py-6 px-8"><div className="flex items-center gap-5"><div className="w-full bg-gray-200 rounded-full h-3.5 max-w-[250px] shadow-inner print:hidden"><div className={`h-3.5 rounded-full ${scoreColor.bar}`} style={{width: `${stat.avg}%`}}></div></div><span className={`font-black text-2xl min-w-[80px] text-right ${scoreColor.text}`}>{stat.avg}%</span></div></td>
                                                </tr>
                                            )})}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            ))}
                        </div>
                    )}
                 </div>
              </div>
           </div>
         );
      }

      // --- หน้าจอ Loading ระหว่างดึงข้อมูลจาก Google Sheet ---
      if (isLoadingChecklists) {
         return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-[#32355c]">
               <Loader2 className="w-16 h-16 animate-spin text-[#16bba6] mb-4" />
               <h2 className="text-2xl font-black">กำลังโหลดข้อมูลแบบประเมิน...</h2>
               <p className="text-slate-500 mt-2 font-medium">กรุณารอสักครู่ กำลังเชื่อมต่อกับ Google Sheet</p>
            </div>
         );
      }

      return (
        <div className="min-h-screen bg-slate-50 text-[#32355c] pb-24 text-lg">
           <CustomPopup {...popupConfig} onClose={closePopup} />
           
           {/* PDF Preview Modal */}
           {pdfPreviewState.isOpen && (
              <div className="fixed inset-0 z-[10000] flex flex-col bg-slate-900/90 backdrop-blur-sm p-4 sm:p-8">
                 <div className="flex justify-between items-center bg-white p-4 rounded-t-2xl max-w-5xl mx-auto w-full shadow-lg shrink-0">
                    <h3 className="text-xl font-black text-[#32355c] flex items-center gap-2"><FileText className="w-6 h-6 text-[#16bba6]"/> แสดงพรีวิว PDF ก่อนบันทึก</h3>
                    <div className="flex gap-3">
                       <button onClick={() => setPdfPreviewState(prev => ({...prev, isOpen: false}))} disabled={isGeneratingPDF} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50">ยกเลิกบันทึก</button>
                       <button onClick={() => triggerPDFDownloadFromPreview()} disabled={isGeneratingPDF} className="px-5 py-2.5 rounded-xl font-bold text-white bg-[#f1a164] hover:bg-[#de8f55] transition-colors shadow-md flex items-center gap-2">
                          {isGeneratingPDF ? <Loader2 className="w-5 h-5 animate-spin"/> : <Download className="w-5 h-5"/>}
                          {isGeneratingPDF ? 'กำลังสร้าง...' : 'บันทึก PDF'}
                       </button>
                    </div>
                 </div>
                 <div className="flex-1 w-full max-w-5xl mx-auto bg-slate-800 rounded-b-2xl p-0 flex justify-center shadow-inner overflow-y-auto">
                    <div id="pdf-preview-content" className="w-full" style={{ fontFamily: "'Sarabun', sans-serif" }}>
                        <div dangerouslySetInnerHTML={{ __html: pdfPreviewState.htmlContent }} />
                    </div>
                 </div>
              </div>
           )}

           {/* Modal เลือกแบบประเมินเพื่อพิมพ์ฟอร์มเปล่า */}
           {blankFormPickerOpen && (
              <div className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 print:hidden" onClick={() => setBlankFormPickerOpen(false)}>
                 <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-[#285c6c] text-white px-6 py-5 flex items-center gap-3 font-bold text-xl shrink-0">
                       <Printer className="w-6 h-6" /> เลือกแบบประเมินที่จะพิมพ์ฟอร์มเปล่า
                    </div>
                    <div className="p-5 overflow-y-auto">
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {dynamicChecklists && Object.keys(dynamicChecklists).map((type, index) => (
                             <button key={type} type="button" onClick={() => { setBlankFormPickerOpen(false); printBlankForm(type); }} className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-2xl text-left font-bold text-slate-700 hover:border-[#16bba6] hover:bg-[#16bba6]/5 transition-colors">
                                <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#285c6c]/10 text-[#285c6c] font-black text-sm">{index + 1}</span>
                                <span className="leading-tight">{type}</span>
                             </button>
                          ))}
                       </div>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-100 flex justify-end shrink-0">
                       <button type="button" onClick={() => setBlankFormPickerOpen(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 bg-gray-100 hover:bg-gray-200 transition-colors">ปิด</button>
                    </div>
                 </div>
              </div>
           )}

           {/* Loading Screen Overlay สำหรับ Export PDF */}
           {isGeneratingPDF && !pdfPreviewState.isOpen && (
              <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm">
                 <Loader2 className="w-20 h-20 animate-spin text-[#16bba6] mb-6" />
                 <h2 className="text-4xl font-black text-[#32355c] mb-2">กำลังสร้างเอกสาร PDF...</h2>
                 <p className="text-xl font-bold text-slate-500">กรุณารอสักครู่ ระบบกำลังจัดเตรียมหน้าเอกสารให้สมบูรณ์</p>
              </div>
           )}

           <nav className="bg-[#32355c] border-b-4 border-[#285c6c] text-white sticky top-0 z-50 shadow-xl print:hidden">
              <div className="max-w-7xl mx-auto px-6">
                 <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-4 font-black text-2xl hidden md:flex"><Activity className="w-8 h-8 text-[#16bba6]" /> ระบบกำกับติดตาม IC</div>
                    <div className="flex gap-3 w-full md:w-auto justify-center">
                       <button onClick={() => setViewMode('department')} className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-3 ${viewMode === 'department' ? 'bg-[#16bba6] text-white shadow-lg' : 'text-slate-300 hover:bg-[#285c6c] hover:text-white'}`}><FileText className="w-6 h-6" /> หน้าประเมิน</button>
                       <button onClick={() => setViewMode('hospital')} className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-3 ${viewMode === 'hospital' ? 'bg-[#e9c460] text-[#32355c] shadow-lg' : 'text-slate-300 hover:bg-[#285c6c] hover:text-white'}`}><LayoutDashboard className="w-6 h-6" /> Dashboard</button>
                       <button onClick={() => setViewMode('history')} className={`flex-1 sm:flex-none px-6 py-3 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-3 ${viewMode === 'history' ? 'bg-[#f1a164] text-white shadow-lg' : 'text-slate-300 hover:bg-[#285c6c] hover:text-white'}`}><Clock className="w-6 h-6" /> ประวัติ</button>
                    </div>
                 </div>
              </div>
           </nav>

           {viewMode === 'hospital' ? <HospitalSummaryView /> : viewMode === 'history' ? <HistoryView /> : (
              <div className="flex flex-col items-center w-full">
                <div id="report-content" className="w-full max-w-7xl bg-white pb-10 print:bg-white rounded-3xl mt-8 shadow-sm border border-gray-200">
                  <header className="bg-gradient-to-r from-[#32355c] to-[#285c6c] rounded-t-3xl text-white shadow-md print:bg-transparent print:text-black print:border-none print:shadow-none relative">
                    <div className="px-10 py-12">
                      <div className="flex items-center gap-4 mb-4"><Activity className="w-12 h-12 text-[#16bba6] print:hidden" /><h1 className="text-3xl md:text-5xl font-black tracking-tight">แบบประเมินและกำกับติดตามมาตรฐาน IC</h1></div>
                      <p className="text-slate-200 print:text-gray-600 text-lg md:text-xl font-medium mt-4">งานควบคุมและป้องกันการติดเชื้อในโรงพยาบาล (IC) | โรงพยาบาลศรีสังวรสุโขทัย</p>
                      <p className="text-[#8ab278] text-sm mt-3 print:text-gray-500 flex items-center gap-1.5 font-bold"><Clock className="w-5 h-5" /> ข้อมูล ณ วันที่ {new Date().toLocaleString('th-TH')} น.</p>
                    </div>
                  </header>

                  <main className="px-8 py-8">
                    <section className="bg-slate-50 p-8 rounded-3xl shadow-sm border-2 border-gray-200 pdf-no-break mb-10 relative z-30 print:bg-white print:border-gray-300 print:shadow-none">
                      <h2 className="text-2xl font-black text-[#285c6c] mb-6 flex items-center gap-3 border-b-2 border-gray-200 pb-4 print:text-slate-900"><Building2 className="w-8 h-8 text-[#16bba6]" /> ข้อมูลการนิเทศ</h2>
                      <div className="flex flex-col gap-6">
                        <div>
                          <label className="flex items-center gap-3 text-lg font-bold text-slate-800 mb-3 print:text-gray-800">
                             เลือกแบบประเมิน
                             {isSyncingChecklist && <span className="text-sm font-bold text-[#16bba6] flex items-center gap-1 animate-pulse print:hidden"><RefreshCw className="w-4 h-4 animate-spin" /> กำลังซิงค์ข้อมูล...</span>}
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {dynamicChecklists && Object.keys(dynamicChecklists).map((type, index) => (
                              <label key={type} className={`flex items-center gap-3 cursor-pointer p-4 border-2 rounded-2xl transition-all duration-300 text-lg font-bold shadow-sm ${assessmentType === type ? (index < 6 ? 'bg-gradient-to-r from-blue-600 to-indigo-800 border-indigo-600 text-white shadow-lg shadow-blue-500/30' : 'bg-gradient-to-r from-emerald-500 to-teal-800 border-teal-600 text-white shadow-lg shadow-emerald-500/30') : 'bg-white border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-slate-700'}`}>
                                <input type="radio" name="assessmentType" className={`w-6 h-6 shrink-0 focus:ring-offset-2 ${index < 6 ? 'text-blue-500 focus:ring-blue-500' : 'text-emerald-500 focus:ring-emerald-500'}`} checked={assessmentType === type} onChange={() => { setAssessmentType(type); handleNewAssessment(); }}/>
                                {index < 6 ? <NurseCap className={`w-7 h-7 shrink-0 ${assessmentType === type ? 'text-yellow-300' : 'text-[#f1a164]'}`} /> : <Building2 className={`w-6 h-6 shrink-0 ${assessmentType === type ? 'text-emerald-200' : 'text-[#285c6c]'}`} />}
                                <span className="whitespace-nowrap overflow-hidden text-ellipsis leading-tight">{index + 1}. {type}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        <div className="print:hidden">
                          <button type="button" onClick={() => setBlankFormPickerOpen(true)} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[#285c6c] bg-white border-2 border-[#285c6c]/40 hover:bg-[#285c6c] hover:text-white transition-colors shadow-sm">
                             <Printer className="w-5 h-5" /> พิมพ์แบบฟอร์มเปล่า (สำหรับสำรวจภาคสนาม)
                          </button>
                          <p className="text-sm text-slate-500 mt-2 font-medium">พิมพ์ฟอร์มว่างออกกระดาษเพื่อถือไปกรอกมือขณะสำรวจ แล้วค่อยนำมาบันทึกในระบบภายหลัง</p>
                        </div>

                        <div>
                          <label className="block text-lg font-bold text-slate-800 mb-3">จำนวนผู้ที่รับการประเมินหรือเหตุการณ์ <span className="text-rose-500">*</span></label>
                          <select className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#16bba6] outline-none text-lg bg-white text-slate-900 font-bold shadow-sm" value={numPeople} onChange={(e) => { const val = parseInt(e.target.value); setNumPeople(val); setCompletedPeople({}); if (activeTab !== 'summary' && parseInt(activeTab) >= val) { setActiveTab("summary"); } }}>
                            {[...Array(10)].map((_, i) => <option key={i+1} value={i+1}>{i+1} คน/เหตุการณ์</option>)}
                          </select>
                        </div>

                        {(assessmentType === '5 Moment' || assessmentType === '7 Step') && (
                          <div className="animate-in fade-in slide-in-from-top-2">
                            <label className="block text-lg font-bold text-slate-800 mb-3">ตำแหน่งผู้รับการประเมิน <span className="text-rose-500">*</span></label>
                            <select className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#16bba6] outline-none text-lg bg-white text-slate-900 font-bold shadow-sm" value={evaluateeRole} onChange={(e) => setEvaluateeRole(e.target.value)}>
                              <option value="">-- เลือกตำแหน่ง --</option>{EVALUATEE_ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                            </select>
                          </div>
                        )}

                        <div><SearchableSelect label={<><User className="w-5 h-5 inline mr-2" /> ผู้ประเมิน <span className="text-rose-500">*</span></>} placeholder="เลือก หรือพิมพ์ค้นหาชื่อผู้ประเมิน..." options={assessorList} value={assessorName} onChange={setAssessorName} /></div>

                        {assessorName === 'อื่นๆ' && (
                          <div className="animate-in fade-in slide-in-from-top-2">
                            <label className="block text-lg font-bold text-slate-800 mb-3">ระบุชื่อผู้ประเมินอื่นๆ <span className="text-rose-500">*</span></label>
                            <input type="text" placeholder="พิมพ์ชื่อ-สกุลผู้ประเมิน..." className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#16bba6] outline-none text-lg bg-white text-slate-900 font-bold shadow-sm placeholder-gray-400" value={otherAssessorName} onChange={(e) => setOtherAssessorName(e.target.value)} />
                          </div>
                        )}

                        <div>
                          <label className="block text-lg font-bold text-slate-800 mb-3">ประเภทหน่วยงาน <span className="text-rose-500">*</span></label>
                          <div className="flex flex-col sm:flex-row gap-4">
                            <label className={`flex items-center gap-3 cursor-pointer p-4 border-2 rounded-xl flex-1 transition-all text-lg font-bold shadow-sm ${deptType === 'OPD' ? 'bg-[#32355c] border-[#32355c] text-white' : 'bg-white border-gray-300 hover:bg-gray-50 text-slate-700'}`}><input type="radio" name="deptType" className="w-6 h-6 text-[#16bba6] focus:ring-[#16bba6]" checked={deptType === 'OPD'} onChange={() => { setDeptType('OPD'); setDepartment(''); }} /><span>OPD</span></label>
                            <label className={`flex items-center gap-3 cursor-pointer p-4 border-2 rounded-xl flex-1 transition-all text-lg font-bold shadow-sm ${deptType === 'IPD' ? 'bg-[#32355c] border-[#32355c] text-white' : 'bg-white border-gray-300 hover:bg-gray-50 text-slate-700'}`}><input type="radio" name="deptType" className="w-6 h-6 text-[#16bba6] focus:ring-[#16bba6]" checked={deptType === 'IPD'} onChange={() => { setDeptType('IPD'); setDepartment(''); }} /><span>IPD</span></label>
                            <label className={`flex items-center gap-3 cursor-pointer p-4 border-2 rounded-xl flex-1 transition-all text-lg font-bold shadow-sm ${deptType === 'กลุ่มงานให้บริการผู้ป่วย' ? 'bg-[#32355c] border-[#32355c] text-white' : 'bg-white border-gray-300 hover:bg-gray-50 text-slate-700'}`}><input type="radio" name="deptType" className="w-6 h-6 text-[#16bba6] focus:ring-[#16bba6]" checked={deptType === 'กลุ่มงานให้บริการผู้ป่วย'} onChange={() => { setDeptType('กลุ่มงานให้บริการผู้ป่วย'); setDepartment(''); }} /><span className="whitespace-nowrap overflow-hidden text-ellipsis leading-tight">กลุ่มงานให้บริการฯ</span></label>
                          </div>
                        </div>

                        {deptType && (
                          <div className="animate-in fade-in slide-in-from-top-2">
                            <SearchableSelect label={<>หน่วยงานที่รับการประเมิน <span className="text-rose-500">*</span></>} placeholder="เลือกหน่วยงาน หรือพิมพ์ค้นหา..." options={deptType === 'OPD' ? OPD_LIST : deptType === 'IPD' ? IPD_LIST : SERVICE_DEPT_LIST} value={department} onChange={setDepartment} />
                          </div>
                        )}

                        {department === 'อื่นๆ' && (
                          <div className="animate-in fade-in slide-in-from-top-2">
                            <label className="block text-lg font-bold text-slate-800 mb-3">ระบุหน่วยงานอื่นๆ <span className="text-rose-500">*</span></label>
                            <input type="text" placeholder="พิมพ์ชื่อหน่วยงาน..." className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#16bba6] outline-none text-lg bg-white text-slate-900 font-bold shadow-sm placeholder-gray-400" value={otherDepartment} onChange={(e) => setOtherDepartment(e.target.value)} />
                          </div>
                        )}
                      </div>
                    </section>

                    <div className="print:hidden mb-10 bg-white p-3 rounded-3xl border-2 border-gray-200 sticky top-24 z-10 shadow-md">
                      <div className="flex overflow-x-auto gap-3 pb-1 hide-scrollbar">
                          {[...Array(numPeople)].map((_, i) => (
                            <button key={i} onClick={() => setActiveTab(i.toString())} className={`px-8 py-4 whitespace-nowrap rounded-2xl font-black text-lg transition-all ${activeTab === i.toString() ? 'bg-[#285c6c] text-white shadow-lg' : 'bg-gray-50 border-2 border-gray-200 text-slate-500 hover:bg-gray-100 hover:text-slate-800 hover:border-gray-300'}`}>
                                {completedPeople[i] ? <CheckCircle2 className="inline w-6 h-6 mr-2 text-[#16bba6]" /> : null} คนที่/เหตุการณ์ที่ {i+1}
                            </button>
                          ))}
                          <div className="w-px bg-gray-300 mx-2 my-2"></div>
                          <button onClick={handleTabChangeToSummary} className={`px-8 py-4 whitespace-nowrap rounded-2xl font-black text-lg transition-all flex items-center ${activeTab === "summary" ? 'bg-[#32355c] text-white shadow-lg' : 'bg-indigo-50 border-2 border-indigo-100 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-200'}`}>
                            <Calculator className="w-6 h-6 mr-2"/> ภาพรวมหน่วยงาน
                          </button>
                      </div>
                    </div>

                    {[...Array(numPeople)].map((_, i) => (
                      <PersonView key={i} pIndex={i} />
                    ))}

                    <SummaryView />

                  </main>
                </div>
                
                <div className="w-full max-w-7xl mx-auto px-4 mt-8 print:hidden">
                  <div className="flex justify-end gap-4">
                    {!hasSubmitted ? (
                      <button className={`flex items-center gap-3 px-12 py-5 text-white rounded-3xl font-black text-xl transition-all shadow-xl ${isSubmitting ? 'bg-[#16bba6]/50 cursor-not-allowed' : 'bg-[#238885] hover:bg-[#16bba6] hover:-translate-y-1'}`} onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="w-7 h-7 animate-spin" /> : <Calculator className="w-7 h-7" />} {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกเพื่อดูสรุปผลหน่วยงาน'}
                      </button>
                    ) : (
                      <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full sm:w-auto">
                        <span className="flex items-center text-[#4d6b40] font-black sm:mr-4 bg-[#8ab278]/20 border-2 border-[#8ab278] px-8 py-4 rounded-3xl w-full sm:w-auto justify-center shadow-md text-xl"><CheckCircle2 className="w-7 h-7 mr-3 text-[#4d6b40]" /> บันทึกเรียบร้อย</span>
                        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                          <button onClick={handleNewAssessment} className="flex-1 sm:flex-none flex items-center justify-center gap-3 px-10 py-4 bg-white border-4 border-[#32355c] text-[#32355c] rounded-3xl font-black text-xl hover:bg-slate-50 transition-colors shadow-lg hover:-translate-y-1"><Building2 className="w-7 h-7"/> ประเมินตึกต่อไป</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
           )}

           <footer className="w-full max-w-7xl mx-auto px-4 mt-20 pb-12 pt-10 border-t-2 border-gray-200 text-center text-slate-500 text-base md:text-lg font-medium print:hidden">
              <p><strong>การพัฒนา:</strong> กลุ่มงานการพยาบาลด้านการควบคุมและป้องกันการติดเชื้อ กลุ่มการพยาบาล</p>
              <p className="mt-2">โรงพยาบาลศรีสังวรสุโขทัย (ปีที่พัฒนา: พ.ศ. 2569)</p>
              <p className="mt-4 font-black text-slate-400 tracking-widest text-sm">VERSION 1.0.0</p>
           </footer>

        </div>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  