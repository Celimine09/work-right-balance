import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const W = 1920;

// ลำดับรูปที่จะเปลี่ยนเวลากดปุ่มสลับงาน (มุมขวาบนของสมอง)
const JOB_IMAGES = [
  "/figma-assets/multi/ขับรถ.png",
  "/figma-assets/multi/ทรศ.png",
  "/figma-assets/multi/คิดงาน.png",
  "/figma-assets/multi/กินข้าว.png",
  "/figma-assets/multi/เมล.png",
] as const;

function useScale() {
  const [scale, setScale] = useState(1);
  const onResize = useCallback(() => {
    setScale(Math.min(1, window.innerWidth / W));
  }, []);
  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);
  return scale;
}

export function MultitaskingPage() {
  const scale = useScale();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [jobStep, setJobStep] = useState(0);
  const [chatPhase, setChatPhase] = useState(0);
  const navigate = useNavigate();

  // ตรวจจับการเลื่อนจอลงมาเพื่อรันแอนิเมชันแชท
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      // เลื่อนลงมาถึงระยะ ~600px จะเริ่มรันแชทหัวหน้า
      if (el.scrollTop > 600 && chatPhase === 0) {
        setChatPhase(1);
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [chatPhase]);

  // ตั้งเวลาเด้งข้อความแชทอัตโนมัติ (หน่วงเวลา 1 วินาที)
  useEffect(() => {
    // 1=รูปหัวหน้า, 2=ข้อความหัวหน้า, 4=รูปแม่, 5=ข้อความแม่, 6=โอเคจ้า
    if ([1, 2, 4, 5, 6].includes(chatPhase)) {
      const timer = setTimeout(() => {
        setChatPhase((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [chatPhase]);

  const handleNextPage = () => {
    navigate("/game1");
  };

  return (
    <div ref={scrollRef} className="h-screen w-full overflow-y-auto overflow-x-hidden bg-[#d3d3d3] smooth-scroll">
      <div
        className="relative mx-auto"
        style={{ width: W * scale, height: 2158 * scale }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: W, height: 2158, transform: `scale(${scale})` }}
        >
          <section className="relative h-[2158px] w-[1920px] overflow-hidden bg-white">
            
            {/* ======================================================== */}
            {/* ท่อนบน: พื้นหลังสีขาว (สมอง + ข้อความต่างๆ + ปุ่มสลับงาน) */}
            {/* ======================================================== */}
            <div className="absolute left-0 top-0 h-[1116px] w-[1920px] bg-white">
              
              {/* รูปหัวข้อ */}
              <img src="/figma-assets/multi/multitasking.png" alt="" className="absolute left-[150px] top-[80px] h-[180px] w-auto object-contain z-10" />

              {/* รูปสมอง */}
              <img src="/figma-assets/multi/สมอง.png" alt="สมอง" className="absolute left-[450px] top-[150px] h-[750px] w-auto object-contain" />

              {/* ข้อความรอบๆ สมอง */}
              <img src="/figma-assets/multi/คือ.png" alt="คือ การจัดการงาน" className="absolute left-[120px] top-[250px] h-[150px] w-auto object-contain" />
              <img src="/figma-assets/multi/หลายอย่าง.png" alt="หลายอย่าง หลายอย่าง" className="absolute left-[100px] top-[600px] h-[120px] w-auto object-contain" />
              <img src="/figma-assets/multi/หลายๆอย่างพร้อมกัน.png" alt="หลายอย่างพร้อมๆกัน โดยระบบสมอง" className="absolute left-[580px] top-[850px] h-[100px] w-auto object-contain" />
              
              <img src="/figma-assets/multi/จะทำการ.png" alt="จะทำการสลับงาน" className="absolute left-[1400px] top-[750px] h-[50px] w-auto object-contain" />
              <img src="/figma-assets/multi/ไปมา.png" alt="ไปมาอย่างรวดเร็ว" className="absolute left-[1550px] top-[820px] h-[40px] w-auto object-contain" />
              <img src="/figma-assets/multi/สลับงาน.gif" alt="cursor" className="absolute left-[1550px] top-[708px] w-[100px] scale-[2.5] origin-top-left drop-shadow-md" />
              {/* ปุ่มสลับงานมุมขวาบน (ปรับตำแหน่งเลื่อนขวามาที่ left-[1450px]) */}
              <button
                type="button"
                onClick={() => setJobStep((v) => (v + 1) % JOB_IMAGES.length)}
                className="absolute left-[1450px] top-[300px] z-50 cursor-pointer border-0 bg-transparent p-0 transition-transform hover:scale-105 active:scale-95"
              >
                <img src={JOB_IMAGES[jobStep]} alt="ปุ่มสลับงาน" className="h-[200px] w-auto object-contain drop-shadow-lg" />
              </button>
            </div>


            {/* ======================================================== */}
            {/* ท่อนล่าง: พื้นหลังสีเหลือง + แชท */}
            {/* ======================================================== */}
            <div className="absolute left-0 top-[1116px] h-[1042px] w-[1920px] bg-[#f5f580] overflow-hidden">
              
              {/* รูปดอกไม้พื้นหลัง */}
              <img
                src="/figma-assets/multi/ดอกไม้.png"
                alt="flower background"
                className="absolute left-0 top-0 h-full w-full object-cover mix-blend-multiply opacity-50"
              />

              {/* --- 1. หัวหน้าส่งรูป (เพิ่มใหม่ มุมขวาบน) --- */}
              <div className={`absolute left-[1000px] top-[150px] w-[650px] transition-all duration-700 ease-out ${chatPhase >= 1 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                <img src="/figma-assets/multi/หัวหน้าส่งรูป.png" alt="หัวหน้าส่งรูป" className="w-full h-auto object-contain drop-shadow-xl" />
              </div>

              {/* --- 2. ข้อความหัวหน้า (เลื่อนลงมาอยู่ใต้รูประหว่างรอโนติแม่) --- */}
              <div className={`absolute left-[1100px] top-[500px] w-[500px] transition-all duration-700 ease-out ${chatPhase >= 2 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                <img src="/figma-assets/multi/ข้อความหัวหน้า.png" alt="แชทหัวหน้า" className="w-full h-auto object-contain drop-shadow-md" />
              </div>

              {/* --- 3. โนติแม่ (ตรงกลาง เป็นปุ่มให้กด) --- */}
              <button 
                onClick={() => { if (chatPhase === 3) setChatPhase(4); }}
                className={`absolute left-[700px] top-[400px] w-[450px] z-50 transition-all duration-500 hover:scale-105 active:scale-95 ${chatPhase >= 3 && chatPhase < 4 ? "scale-100 opacity-100 animate-bounce cursor-pointer" : chatPhase >= 4 ? "scale-90 opacity-0 pointer-events-none" : "scale-50 opacity-0 pointer-events-none"}`}
              >
                <img src="/figma-assets/multi/โนติแม่.png" alt="โนติแม่" className="w-full h-auto drop-shadow-2xl" />
                <img src="/figma-assets/multi/คลิ๊กอนิเมชั่น.png" alt="cursor" className="absolute -bottom-10 right-0 h-[60px] w-auto" />
              </button>

              {/* --- 4. แม่ส่งรูป (มุมซ้ายล่าง) --- */}
              <div className={`absolute left-[150px] top-[400px] w-[650px] transition-all duration-700 ease-out ${chatPhase >= 4 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                <img src="/figma-assets/multi/แม่ส่งรูป.png" alt="แม่ส่งรูป" className="w-full h-auto object-contain drop-shadow-xl" />
              </div>

              {/* --- 5. ข้อความแม่ (มุมซ้ายล่างสุด) --- */}
              <div className={`absolute left-[250px] top-[750px] w-[400px] transition-all duration-700 ease-out ${chatPhase >= 5 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                <img src="/figma-assets/multi/ข้อความแม่.png" alt="ข้อความแม่" className="w-full h-auto object-contain drop-shadow-md" />
              </div>

              {/* --- 6. โอเคจ้า (ตรงกลางล่าง) --- */}
              <div className={`absolute left-[700px] top-[780px] w-[1000px] transition-all duration-700 ease-out ${chatPhase >= 6 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                <img src="/figma-assets/multi/โอเค.gif" alt="โอเคจ้า" className="w-[500px] h-auto object-contain" />
              </div>

              {/* --- 7. ปุ่มส่ง (ขวาล่างสุด) --- */}
              <button 
                onClick={handleNextPage}
                className={`absolute left-[1500px] top-[760px] w-[200px] z-10 cursor-pointer transition-all duration-700 ease-out hover:scale-110 active:scale-95 ${chatPhase >= 7 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}`}
              >
                <img src="/figma-assets/multi/ปุ่มส่ง.png" alt="ปุ่มส่ง" className="w-full h-auto drop-shadow-lg" />
                <img src="/figma-assets/multi/คลิ๊กอนิเมชั่น.png" alt="cursor" className="absolute -bottom-5 -right-5 h-[60px] w-auto" />
              </button>

            </div>

          </section>
        </div>
      </div>
    </div>
  );
}