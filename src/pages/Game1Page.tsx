import { useCallback, useEffect, useState, useRef, useMemo } from "react";

const W = 1920;
const H = 1080;

// === Asset URLs ===
const HAND_IMAGE_SRC = "/figma-assets/game1/มือ.png";
const MOTHER_MASK_IMAGE_SRC = "/figma-assets/game1/แม่มาสก.png";
const TABLE_IMAGE_SRC = "/figma-assets/game1/ลงตาราง.png";
const REMEMBER_IMAGE_SRC = "/figma-assets/game1/จำด้วยนะ.png";

const WATBUN_IMAGE_SRC = "/figma-assets/game1/วัดบุญรอด.png"; 
const WATSONG_IMAGE_SRC = "/figma-assets/game1/วัดบุญส่ง.png"; 
const EY_IMAGE_SRC = "/figma-assets/game1/เอ้ย.png"; 
const WATLOD_IMAGE_SRC = "/figma-assets/game1/วัดลอดบุญ.png"; 
const READY_IMAGE_SRC = "/figma-assets/game1/พร้อมยัง.png"; 
const CALENDAR_IMAGE_SRC = "/figma-assets/game1/ปฎิทิน.png"; 

const BUNSONG_REPLY_SRC = "/figma-assets/game1/บุญส่งตอบ29.png"; 
const WATLOD_REPLY_SRC = "/figma-assets/game1/บุญลอดตอบ9.png"; 
const WATBUN_REPLY_SRC = "/figma-assets/game1/บุญรอดตอบ19.png"; 

const END_CAT_GIF_SRC = "/figma-assets/game1/แมวจบ.gif"; 

// Assets สำหรับตอนจบ
const PETTING_CAT_TITLE_SRC = "/figma-assets/game1/การลูบแมว.png"; 
const AUTOMATIC_ACTIVITY_TITLE_SRC = "/figma-assets/game1/กิจกรรมอัตโนมัติ.png"; 
const CONSIDERED_AS_TEXT_SRC = "/figma-assets/game1/ถือเป็น.png"; 
const CAN_BE_WELL_DONE_TEXT_SRC = "/figma-assets/game1/ซึ่งสามารถได้ดี.png"; 
const FINAL_HEART_GIF_SRC = "/figma-assets/game1/หัวใจ.gif"; 

const CORRECT_GIF_SRC = "/figma-assets/game1/แม่ถูก.gif"; 
const WRONG_GIF_SRC = "/figma-assets/game1/แม่ผิด.gif"; 

const HEART1_IMAGE_SRC = "/figma-assets/game1/หัวใจ 1.png"; 
const HEART2_IMAGE_SRC = "/figma-assets/game1/หัวใจ 2.png"; 
const HEART3_IMAGE_SRC = "/figma-assets/game1/หัวใจ 3.png"; 
const HEART4_IMAGE_SRC = "/figma-assets/game1/หัวใจ 4.png"; 
const HEART5_IMAGE_SRC = "/figma-assets/game1/หัวใจ 5.png"; 
const HEART6_IMAGE_SRC = "/figma-assets/game1/หัวใจ 6.png"; 
const HEART7_IMAGE_SRC = "/figma-assets/game1/หัวใจ 7.png"; 
const HEART8_IMAGE_SRC = "/figma-assets/game1/หัวใจ 8.png"; 

// === Configuration ===
const TEXT_FADE_START = 0;
const TEXT_FADE_END = 400; 
const MAX_VIRTUAL_SCROLL = 500; 
const HAND_PET_START_X = 1600; 
const HAND_PET_Y = 500;
const MAX_HAND_OFFSET_X = 300; 
const SWEEP_DURATION = 300; 

function useScale() {
  const [scale, setScale] = useState(1);
  const onResize = useCallback(() => {
    setScale(Math.min(1, window.innerWidth / W, window.innerHeight / H));
  }, []);
  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);
  return scale;
}

export function Game1Page() {
  const scale = useScale();
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  
  const [virtualScroll, setVirtualScroll] = useState(0);
  const [pettingStarted, setPettingStarted] = useState(false); 
  const [isAnimatingHand, setIsAnimatingHand] = useState(false); 
  const [petClickCount, setPetClickCount] = useState(0); 
  const [isFinalPetClicked, setIsFinalPetClicked] = useState(false); 

  const [calendarResult, setCalendarResult] = useState<'none' | 'correct' | 'wrong'>('none');
  const [gifTimestamp, setGifTimestamp] = useState(Date.now());
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); 

  const getReloadableGifUrl = (baseSrc: string) => `${baseSrc}?t=${gifTimestamp}`;

  const handleWrongDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGifTimestamp(Date.now());
    setCalendarResult('wrong');
  };

  const handleCorrectDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setGifTimestamp(Date.now());
    setCalendarResult('correct');
  };

  const dismissGifHandler = () => {
    if (calendarResult === 'correct') {
      setCorrectAnswersCount(prev => prev + 1);
    }
    setCalendarResult('none'); 
  };

  const textOpacityProgress = useMemo(() => Math.min(
    1,
    Math.max(0, (virtualScroll - TEXT_FADE_START) / (TEXT_FADE_END - TEXT_FADE_START))
  ), [virtualScroll]);
  
  const textOpacity = useMemo(() => 1 - textOpacityProgress, [textOpacityProgress]);
  const isHandVisible = useMemo(() => textOpacityProgress >= 1, [textOpacityProgress]);
  
  let currentReplySrc = BUNSONG_REPLY_SRC; 
  if (correctAnswersCount === 1) currentReplySrc = WATLOD_REPLY_SRC; 
  if (correctAnswersCount >= 2) currentReplySrc = WATBUN_REPLY_SRC; 

  let currentHeartSrc = HEART4_IMAGE_SRC; 
  if (petClickCount === 7) currentHeartSrc = HEART5_IMAGE_SRC; 
  if (petClickCount >= 8) { 
    if (correctAnswersCount === 0) currentHeartSrc = HEART6_IMAGE_SRC; 
    if (correctAnswersCount === 1) currentHeartSrc = HEART7_IMAGE_SRC; 
    if (correctAnswersCount === 2) currentHeartSrc = HEART8_IMAGE_SRC; 
    if (correctAnswersCount >= 3 && isFinalPetClicked) currentHeartSrc = FINAL_HEART_GIF_SRC; 
  }

  const handleHandClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isHandVisible || isAnimatingHand) return; 
    e.stopPropagation(); 

    setPetClickCount((count) => count + 1);
    setPettingStarted(true); 
    setIsAnimatingHand(true); 

    if (correctAnswersCount >= 3) {
      setIsFinalPetClicked(true);
    }
  };

  useEffect(() => {
    if (isAnimatingHand) {
      const timer = setTimeout(() => setIsAnimatingHand(false), SWEEP_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isAnimatingHand]);

  const handleWheel = (e: React.WheelEvent) => {
    if (pettingStarted) return;
    setVirtualScroll((prev) => Math.min(Math.max(0, prev + e.deltaY), MAX_VIRTUAL_SCROLL));
  };

  const handleTouchStartScroll = (e: React.TouchEvent) => {
    if (pettingStarted) return;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMoveScroll = (e: React.TouchEvent) => {
    if (pettingStarted) return;
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartY.current - currentY;
    touchStartY.current = currentY;
    setVirtualScroll((prev) => Math.min(Math.max(0, prev + deltaY), MAX_VIRTUAL_SCROLL));
  };

  return (
    <div 
      ref={rootRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#f5f580]"
      onWheel={handleWheel}
      onTouchStart={handleTouchStartScroll}
      onTouchMove={handleTouchMoveScroll}
    >
      <img src="/figma-assets/game1/ดอกไม้.png" alt="BG" className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-75 pointer-events-none z-0" />

      <div className="relative shrink-0 z-10" style={{ width: W * scale, height: H * scale }}>
        <div className="absolute left-0 top-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
          <section className="relative h-[1080px] w-[1920px] overflow-hidden bg-transparent">
            
            <img src={correctAnswersCount >= 3 ? END_CAT_GIF_SRC : "/figma-assets/game1/แมว.png"} alt="Cat" className="absolute left-[820px] top-[234px] h-[758px] w-[1334px] rotate-[31.14deg] object-contain pointer-events-none" />

            <div className="absolute z-10" onClick={handleHandClick} 
                 style={{ left: `${HAND_PET_START_X}px`, top: `${HAND_PET_Y}px`, width: '300px', height: '300px', opacity: isHandVisible ? 1 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `translateX(${isAnimatingHand ? -MAX_HAND_OFFSET_X : 0}px)`, transition: 'opacity 0.2s, transform 0.3s', pointerEvents: isHandVisible && !isAnimatingHand ? 'auto' : 'none' }}>
              <img src={HAND_IMAGE_SRC} alt="Hand" className="h-full w-full object-contain" style={{ cursor: isAnimatingHand ? 'default' : isHandVisible ? 'grab' : 'default' }} />
            </div>

            <div className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{ opacity: textOpacity }}>
              <img src="/figma-assets/game1/เลื่อน.png" alt="เลื่อน" className="absolute left-[130px] top-[320px] h-[180px] w-auto object-contain -rotate-2 drop-shadow-sm" />
              <img src="/figma-assets/game1/เมาส์.png" alt="เมาส์" className="absolute left-[380px] top-[270px] h-[180px] w-auto object-contain rotate-3 drop-shadow-sm" />
              <img src="/figma-assets/game1/ซ้าย.png" alt="ซ้าย" className="absolute left-[290px] top-[450px] h-[180px] w-auto object-contain rotate-1 drop-shadow-sm" />
              <img src="/figma-assets/game1/-.png" alt="-" className="absolute left-[490px] top-[440px] h-[180px] w-auto object-contain -rotate-6 drop-shadow-sm" />
              <img src="/figma-assets/game1/ขวา.png" alt="ขวา" className="absolute left-[550px] top-[440px] h-[150px] w-auto object-contain -rotate-2 drop-shadow-sm" />
              <img src="/figma-assets/game1/เพื่อลูบ.png" alt="เพื่อลูบ" className="absolute left-[260px] top-[620px] h-[150px] w-auto object-contain -rotate-2 drop-shadow-sm" />
              <img src="/figma-assets/game1/บราวนี่.png" alt="บราวนี่" className="absolute left-[520px] top-[660px] h-[150px] w-auto object-contain rotate-3 drop-shadow-sm" />
            </div>

            <img src={MOTHER_MASK_IMAGE_SRC} alt="Mom" className="absolute z-20 pointer-events-none drop-shadow-lg" style={{ left: '100px', top: '100px', width: '300px', opacity: pettingStarted && correctAnswersCount < 3 ? 1 : 0, transition: 'opacity 0.3s' }} />
            <img src={TABLE_IMAGE_SRC} alt="Table" className="absolute z-20 pointer-events-none drop-shadow-lg" style={{ left: '400px', top: '150px', width: '350px', opacity: pettingStarted && petClickCount < 3 ? 1 : 0, transition: 'opacity 0.3s' }} />
            <img src={HEART1_IMAGE_SRC} alt="H1" className="absolute z-20 pointer-events-none drop-shadow-lg" style={{ left: '1500px', top: '200px', width: '200px', opacity: pettingStarted && petClickCount < 4 ? 1 : 0, transition: 'opacity 0.3s' }} />
            <img src={REMEMBER_IMAGE_SRC} alt="Rem" className="absolute z-20 pointer-events-none drop-shadow-lg" style={{ left: '400px', top: '280px', width: '350px', opacity: petClickCount >= 2 && petClickCount < 3 ? 1 : 0, transition: 'opacity 0.3s' }} />
            <img src={WATBUN_IMAGE_SRC} alt="Wat1" className="absolute z-20 pointer-events-none drop-shadow-lg" style={{ left: '400px', top: '150px', width: '350px', opacity: petClickCount >= 3 && petClickCount < 4 ? 1 : 0 }} />
            <img src={WATSONG_IMAGE_SRC} alt="Wat2" className="absolute z-20 pointer-events-none drop-shadow-lg" style={{ left: '400px', top: '150px', width: '350px', opacity: petClickCount >= 4 && petClickCount < 5 ? 1 : 0 }} />
            <img src={HEART2_IMAGE_SRC} alt="H2" className="absolute z-20 pointer-events-none drop-shadow-lg" style={{ left: '1500px', top: '200px', width: '200px', opacity: petClickCount === 4 ? 1 : 0 }} />
            <img src={EY_IMAGE_SRC} alt="Ey" className="absolute z-20 pointer-events-none drop-shadow-lg" style={{ left: '400px', top: '150px', width: '350px', opacity: petClickCount === 5 ? 1 : 0 }} />
            <img src={HEART3_IMAGE_SRC} alt="H3" className="absolute z-20 pointer-events-none drop-shadow-lg" style={{ left: '1500px', top: '200px', width: '200px', opacity: petClickCount === 5 ? 1 : 0 }} />
            <img src={WATLOD_IMAGE_SRC} alt="Wat3" className="absolute z-20 pointer-events-none drop-shadow-lg" style={{ left: '400px', top: '150px', width: '350px', opacity: petClickCount === 6 ? 1 : 0 }} />
            <img src={READY_IMAGE_SRC} alt="Ready" className="absolute z-20 pointer-events-none drop-shadow-lg" style={{ left: '400px', top: '150px', width: '350px', opacity: petClickCount === 7 ? 1 : 0 }} />

            {/* ส่วนแสดงหัวใจที่ขยายใหญ่ขึ้น */}
            <img src={currentHeartSrc} alt="StepHeart" className="absolute z-20 pointer-events-none drop-shadow-lg" style={{ left: '1500px', top: '170px', width: '200px', opacity: petClickCount >= 6 ? 1 : 0, transition: 'opacity 0.1s' }} />

            <img src={currentReplySrc} alt="Reply" className="absolute z-20 pointer-events-none drop-shadow-lg" style={{ left: '400px', top: '150px', width: '350px', opacity: petClickCount >= 8 && correctAnswersCount < 3 ? 1 : 0 }} />

            <div className="absolute z-20" style={{ left: '400px', top: '280px', width: '350px', height: '240px', opacity: petClickCount >= 8 && correctAnswersCount < 3 ? 1 : 0, pointerEvents: petClickCount >= 8 && correctAnswersCount < 3 ? 'auto' : 'none' }}>
              <img src={CALENDAR_IMAGE_SRC} alt="Cal" onClick={handleWrongDate} className="w-full h-full object-contain cursor-pointer" />
              <button onClick={handleCorrectDate} className="absolute cursor-pointer" style={correctAnswersCount === 0 ? { left: '155px', top: '190px', width: '40px', height: '40px' } : correctAnswersCount === 1 ? { left: '195px', top: '70px', width: '40px', height: '40px' } : { left: '32px', top: '150px', width: '40px', height: '40px' }} />
            </div>

            {/* === ช่วงจบเกม === */}
            {correctAnswersCount >= 3 && (
              <>
                <img src={PETTING_CAT_TITLE_SRC} alt="FinalTitle" className="absolute z-20 pointer-events-none drop-shadow-lg"
                     style={{ left: '100px', top: '250px', width: '450px', height: 'auto', opacity: 1, transition: 'opacity 0.5s' }} />

                <img src={CONSIDERED_AS_TEXT_SRC} alt="T1" className="absolute z-20 pointer-events-none drop-shadow-lg"
                     style={{ left: '140px', top: '530px', width: '180px', opacity: isFinalPetClicked ? 1 : 0, transition: 'opacity 0.5s 0.2s' }} />
                
                {/* ปุ่ม Link ไปยังหน้า game2 */}
                <a 
                  href="/game2" 
                  className={`absolute z-30 drop-shadow-lg transition-all duration-500 ease-in-out ${isFinalPetClicked ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  style={{ 
                    left: '250px', 
                    top: '650px', 
                    width: '450px',
                    transitionDelay: '0.4s',
                    cursor: 'pointer'
                  }}
                >
                  <img 
                    src={AUTOMATIC_ACTIVITY_TITLE_SRC} 
                    alt="T2 - Link to Game 2" 
                    className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300" 
                  />
                </a>
                
                <img src={CAN_BE_WELL_DONE_TEXT_SRC} alt="T3" className="absolute z-20 pointer-events-none drop-shadow-lg"
                     style={{ left: '90px', top: '750px', width: '480px', opacity: isFinalPetClicked ? 1 : 0, transition: 'opacity 0.5s 0.6s' }} />
              </>
            )}

          </section>
        </div>
      </div>

      <div onClick={dismissGifHandler} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 transition-opacity duration-300" style={{ opacity: calendarResult !== 'none' ? 1 : 0, pointerEvents: calendarResult !== 'none' ? 'auto' : 'none' }}>
        <div style={{ transform: `scale(${scale})` }} className="flex items-center justify-center">
          <div className="w-[800px] h-[600px] flex items-center justify-center">
            {calendarResult === 'correct' && <img key={`c-${gifTimestamp}`} src={getReloadableGifUrl(CORRECT_GIF_SRC)} alt="Correct" className="max-w-full max-h-full object-contain" />}
            {calendarResult === 'wrong' && <img key={`w-${gifTimestamp}`} src={getReloadableGifUrl(WRONG_GIF_SRC)} alt="Wrong" className="max-w-full max-h-full object-contain" />}
          </div>
        </div>
      </div>
    </div>
  );
}