import { useState } from 'react';

const bgPaper = '/figma-assets/game3/Bg.png';
const bgBlue = '/figma-assets/game3/bgฟ้า.png';
const imgBossStatic = '/figma-assets/game3/หัวหน้า.png';
const imgElements = '/figma-assets/game3/เอเลเม้น.png';
const imgHeartGif = '/figma-assets/game3/หัวใจ.gif';

// New Content Assets
const imgBossGif = '/figma-assets/game3/หัวหน้า.gif';
const imgCalendar = '/figma-assets/game3/ปฎิทิน.png';
const imgCallButton = '/figma-assets/game3/ผมโทร.png';
const imgRemember = '/figma-assets/game3/จำไปลง.png';
const imgImportant = '/figma-assets/game3/สำคัญ.png';
const imgStartGame = '/figma-assets/game3/เริ่มเกม.png';

// Speech Assets
const imgSpeech1 = '/figma-assets/game3/คำพูด1.png';
const imgSpeech2 = '/figma-assets/game3/คำพูด2.png';
const imgSpeech3 = '/figma-assets/game3/คำพูด3.png';
const imgSpeech4 = '/figma-assets/game3/คำพูด4.png';

// Mom Speech Assets
const imgMomSpeech1 = '/figma-assets/game3/แม่พูด1.png';
const imgMomSpeech2 = '/figma-assets/game3/แม่พูด2.png';
const imgMomSpeech3 = '/figma-assets/game3/แม่พูด3.png';
const imgMomSpeech4 = '/figma-assets/game3/แม่พูด4.png';

// Animation Assets
const imgMomDoctorGif = '/figma-assets/game3/แม่คุยกับหมอ.gif';

// Insert Scene Assets
const imgBgInsert = '/figma-assets/game3/bg แทรก.png';
const imgUrgent = '/figma-assets/game3/ด่วน.png';
const imgHelpMom = '/figma-assets/game3/ช่วยแม่.png';
const imgMomGif = '/figma-assets/game3/แม่.gif';
const imgMomCalendar = '/figma-assets/game3/ปฎิทินแม่.png';

// Mini Game Assets
const imgMomQ = ['/figma-assets/game3/โจทแม่1.png', '/figma-assets/game3/โจทแม่2.png', '/figma-assets/game3/โจทแม่3.png'];
const imgBossQ = ['/figma-assets/game3/โจทหัวหน้า1.png', '/figma-assets/game3/โจทหัวหน้า2.png', '/figma-assets/game3/โจทหัวหน้า3.png'];
const imgMomCorrect = '/figma-assets/game3/แม่ถูก.gif';
const imgMomWrong = '/figma-assets/game3/แม่ผิด.gif';
const imgBossCorrect = '/figma-assets/game3/หัวหน้าถูก.gif';
const imgBossWrong = '/figma-assets/game3/หัวหน้าผิด.gif';

// Ending Scene Assets (New)
const imgAiya = '/figma-assets/game3/อั้ยยะ.png';
const imgWait = '/figma-assets/game3/รอไร.png';
const imgOkay = '/figma-assets/game3/โอเคครับ.png';

// Slide Component Assets
const imgSlideBar = '/figma-assets/game3/slide-bar.png';
const imgSlideButton = '/figma-assets/game3/ปุ่ม.png';
const imgSlideText = '/figma-assets/game3/Text.png';

export function Game3Page() {
  const [isHidden, setIsHidden] = useState(false);
  const [step, setStep] = useState(0);

  const [showImportant, setShowImportant] = useState(false);
  const [showSpeech2, setShowSpeech2] = useState(false);
  const [showSpeech3, setShowSpeech3] = useState(false);
  const [showSpeech4, setShowSpeech4] = useState(false);
  const [showUrgent, setShowUrgent] = useState(false);
  const [showMomSpeech2, setShowMomSpeech2] = useState(false);
  const [showMomSpeech3, setShowMomSpeech3] = useState(false);
  const [showMomSpeech4, setShowMomSpeech4] = useState(false);

  // Mini Game States
  const [currentMomStep, setCurrentMomStep] = useState(0);
  const [currentBossStep, setCurrentBossStep] = useState(0);
  const [feedback, setFeedback] = useState<null | 'mom_ok' | 'mom_no' | 'boss_ok' | 'boss_no'>(null);

  // ข้อมูลพิกัดและขนาดของปุ่มที่ถูกต้องแต่ละข้อ (left, top, width, height เป็น %)
  const momCorrectButtons = [
    { left: '44%', top: '48%', w: '13%', h: '13%' }, // วันที่ 15
    { left: '30%', top: '64%', w: '13%', h: '13%' }, // วันที่ 21
    { left: '30%', top: '80%', w: '13%', h: '13%' }, // วันที่ 28
  ];
  
  const bossCorrectButtons = [
    { left: '28%', top: '57%', w: '14%', h: '17%' }, // วันที่ 21
    { left: '83%', top: '57%', w: '14%', h: '17%' }, // วันที่ 25
    { left: '14%', top: '77%', w: '14%', h: '17%' }, // วันที่ 27
  ];

  const handleScreenClick = () => {
    if (step >= 5) return;
    
    if (step === 0) {
      setStep(1);
      setTimeout(() => setShowImportant(true), 1500);
    } else if (step === 1) {
      setStep(2);
      setTimeout(() => setShowSpeech2(true), 1000);
      setTimeout(() => setShowSpeech3(true), 2000);
      setTimeout(() => setShowSpeech4(true), 3000);
    } else if (step === 2) {
      setStep(3);
      setTimeout(() => setShowUrgent(true), 1000);
    } else if (step === 3) {
      setStep(4);
      setTimeout(() => setShowMomSpeech2(true), 1000);
      setTimeout(() => setShowMomSpeech3(true), 2000);
      setTimeout(() => setShowMomSpeech4(true), 3000);
    } else if (step === 4) {
      setStep(5);
    }
  };

  const handleAnswer = (side: 'mom' | 'boss', isCorrect: boolean) => {
    if (feedback || step !== 6) return;

    if (side === 'mom') {
      setFeedback(isCorrect ? 'mom_ok' : 'mom_no');
    } else if (side === 'boss') {
      setFeedback(isCorrect ? 'boss_ok' : 'boss_no');
    }
  };

  const nextQuestion = () => {
    if (feedback === 'mom_ok') setCurrentMomStep((prev) => prev + 1);
    if (feedback === 'boss_ok') setCurrentBossStep((prev) => prev + 1);
    
    setFeedback(null);

    if (currentMomStep + currentBossStep >= 5 && (feedback === 'mom_ok' || feedback === 'boss_ok')) {
      setStep(7);
    }
  };

  const NewContent = () => (
    <div 
      className="relative z-20 h-[520px] w-full overflow-hidden px-6 cursor-pointer"
      onClick={handleScreenClick}
    >
      {/* ===================== ปฏิทินและตัวละคร (ซ่อนตอนจบเกม Step 7) ===================== */}
      {step <= 6 && (
        <>
          <img src={imgCalendar} alt="Calendar" className="absolute right-[60px] top-[100px] w-[400px] object-contain" />
          {step >= 2 && step <= 4 && (
            <img
              src={imgMomDoctorGif}
              alt="Mom talking to Doctor"
              className="absolute w-[600px] right-[60px] top-[220px] object-contain drop-shadow-md z-[31]"
            />
          )}
        </>
      )}

      {/* ===================== STEP 0-4 (ฉากเนื้อเรื่อง) ===================== */}
      {step === 0 && <img src={imgCallButton} alt="Call Button" className="absolute left-[900px] top-[300px] w-[250px] object-contain" />}

      {step === 1 && (
        <div className="absolute left-[900px] top-[250px] flex flex-col items-center">
          <img src={imgRemember} alt="Remember" className="w-[300px] object-contain animate-in fade-in duration-500" />
          {showImportant && <img src={imgImportant} alt="Important" className="mt-4 w-[250px] object-contain animate-bounce" />}
        </div>
      )}

      {(step >= 2 && step <= 4) && (
        <div className="relative z-50">
          <img src={imgSpeech1} alt="Speech 1" className="absolute left-[980px] top-[350px] w-[250px] object-contain animate-in fade-in duration-500" />
          {showSpeech2 && <img src={imgSpeech2} alt="Speech 2" className="absolute left-[750px] top-[290px] w-[400px] object-contain animate-in fade-in duration-500" />}
          {showSpeech3 && <img src={imgSpeech3} alt="Speech 3" className="absolute left-[1050px] top-[150px] w-[350px] object-contain animate-in fade-in duration-500" />}
          {showSpeech4 && <img src={imgSpeech4} alt="Speech 4" className="absolute left-[1000px] top-[110px] w-[200px] object-contain animate-in fade-in duration-500" />}
        </div>
      )}

      {/* ฉากแทรกแม่ (ซ่อนตอนจบเกม Step 7) */}
      {(step >= 3 && step <= 6) && (
        <div className="absolute left-0 top-0 h-full w-[60%] overflow-hidden z-40 animate-in slide-in-from-left duration-500">
          <img src={imgBgInsert} alt="Insert Scene Background" className="absolute inset-0 h-full w-full object-cover" />
          <img src={imgMomCalendar} alt="Mom Calendar" className="absolute left-[100px] top-[200px] w-[300px] object-contain drop-shadow-xl" />
          <img src={imgMomGif} alt="Mom" className="absolute left-[28px] top-[85px] w-[150px] object-contain drop-shadow-xl" />

          {step === 3 && (
            <>
              <img src={imgHelpMom} alt="Help Mom" className="absolute left-[180px] top-[96px] w-[250px] object-contain drop-shadow-lg" />
              {showUrgent && <img src={imgUrgent} alt="Urgent" className="absolute left-[500px] top-[14px] w-[185px] object-contain drop-shadow-lg animate-in zoom-in duration-300" />}
            </>
          )}

          {step === 4 && (
            <div className="absolute inset-0 z-50">
              <img src={imgMomSpeech1} alt="Mom Speech 1" className="absolute left-[170px] top-[78px] w-[250px] object-contain animate-in fade-in duration-500" />
              {showMomSpeech2 && <img src={imgMomSpeech2} alt="Mom Speech 2" className="absolute left-[235px] top-[130px] w-[250px] object-contain animate-in fade-in duration-500" />}
              {showMomSpeech3 && <img src={imgMomSpeech3} alt="Mom Speech 3" className="absolute left-[80px] top-[360px] w-[250px] object-contain animate-in fade-in duration-500" />}
              {showMomSpeech4 && <img src={imgMomSpeech4} alt="Mom Speech 4" className="absolute left-[160px] top-[410px] w-[250px] object-contain animate-in fade-in duration-500" />}
            </div>
          )}
        </div>
      )}

      {/* ===================== STEP 5: โชว์ปุ่มเริ่มเกม ===================== */}
      {step === 5 && (
        <img
          src={imgStartGame}
          alt="Start Game"
          onClick={(e) => {
            e.stopPropagation();
            setStep(6);
          }}
          className="absolute right-[40px] top-[20px] w-[300px] object-contain z-[60] hover:scale-110 transition-transform cursor-pointer animate-pulse"
        />
      )}

      {/* ===================== STEP 6: โหมด Mini Game ===================== */}
      {step === 6 && (
        <div className="absolute inset-0 z-50">
          
          {/* --- ฝั่งแม่ --- */}
          <div className="absolute left-[100px] top-[200px] w-[300px] h-full z-50">
             {currentMomStep < 3 ? (
                <img src={imgMomQ[currentMomStep]} alt="Mom Question" className="absolute left-[100px] top-[-90px] w-[200px] object-contain animate-in zoom-in" />
              ) : (
                <div className="absolute left-[90px] top-[-80px] bg-white px-4 py-2 rounded font-bold text-green-600">เสร็จสิ้น</div>
              )}
              {currentMomStep < 3 && (
                <div className="absolute inset-0 w-full h-[47%]">
                  <button className="absolute inset-0 w-full h-full bg-red-500/0 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleAnswer('mom', false); }} />
                  <button 
                    className="absolute bg-green-500/0 cursor-pointer z-10" 
                    style={{
                      left: momCorrectButtons[currentMomStep].left,
                      top: momCorrectButtons[currentMomStep].top,
                      width: momCorrectButtons[currentMomStep].w,
                      height: momCorrectButtons[currentMomStep].h,
                    }}
                    onClick={(e) => { e.stopPropagation(); handleAnswer('mom', true); }} 
                  />
                </div>
              )}
          </div>

          {/* --- ฝั่งหัวหน้า --- */}
          <div className="absolute right-[60px] top-[100px] w-[400px] h-full z-50">
              {currentBossStep < 3 ? (
                <img src={imgBossQ[currentBossStep]} alt="Boss Question" className="absolute right-[130px] top-[280px] w-[150px] object-contain animate-in zoom-in" />
              ) : (
                <div className="absolute right-[130px] top-[290px] bg-white px-4 py-2 rounded font-bold text-green-600">เสร็จสิ้น</div>
              )}
              {currentBossStep < 3 && (
                <div className="absolute inset-0 w-full h-[45%] mt-[12%]">
                  <button className="absolute inset-0 w-full h-full bg-red-500/0 cursor-pointer" onClick={(e) => { e.stopPropagation(); handleAnswer('boss', false); }} />
                  <button 
                    className="absolute bg-green-500/0 cursor-pointer z-10" 
                    style={{
                      left: bossCorrectButtons[currentBossStep].left,
                      top: bossCorrectButtons[currentBossStep].top,
                      width: bossCorrectButtons[currentBossStep].w,
                      height: bossCorrectButtons[currentBossStep].h,
                    }}
                    onClick={(e) => { e.stopPropagation(); handleAnswer('boss', true); }} 
                  />
                </div>
              )}
          </div>

          {/* Overlay Feedback ตอบถูก/ผิด */}
          {feedback && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 cursor-pointer backdrop-blur-sm" onClick={(e) => { e.stopPropagation(); nextQuestion(); }}>
              <img 
                src={feedback === 'mom_ok' ? imgMomCorrect : feedback === 'mom_no' ? imgMomWrong : feedback === 'boss_ok' ? imgBossCorrect : imgBossWrong} 
                className="w-[80%] max-w-[500px] object-contain animate-in zoom-in duration-300 drop-shadow-2xl" 
                alt="Feedback"
              />
            </div>
          )}
        </div>
      )}

      {/* ===================== STEP 7 (ฉากจบ) ===================== */}
      {step === 7 && (
        <div className="absolute inset-0 z-[100] animate-in fade-in duration-500">
          {/* พื้นหลังแทรกสีเหลือง (กว้าง 60% เพื่อให้ฝั่งขวาโชว์สีฟ้า) */}
          <div className="absolute left-0 top-0 h-full w-[60%] overflow-hidden">
            <img src={imgBgInsert} alt="Insert Scene Background" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          
          {/* อั้ยยะ (ซ้ายบน) */}
          <img 
            src={imgAiya} 
            alt="Aiya" 
            className="absolute left-[8%] top-[10%] w-[35%] max-w-[350px] object-contain drop-shadow-xl animate-in slide-in-from-left duration-700" 
          />
          
          {/* โอเคครับ (ขวาล่าง) */}
          <img 
            src={imgOkay} 
            alt="Okay" 
            className="absolute right-[10%] bottom-[15%] w-[50%] max-w-[400px] object-contain drop-shadow-xl animate-in slide-in-from-right duration-700" 
          />
          
          {/* รอไร ไปต่อ (ปุ่มตรงกลาง) */}
          <img 
            src={imgWait} 
            alt="Wait Next" 
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = '/game4'; // พาไปหน้าเกม 4
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-[600px] object-contain drop-shadow-2xl cursor-pointer hover:scale-110 active:scale-95 transition-transform z-50" 
          />
        </div>
      )}

      {/* หัวหน้า GIF มุมขวาล่าง - อยู่ยงคงกระพันจนถึงแค่ Step 6 */}
      {step <= 6 && (
        <img src={imgBossGif} alt="Boss Animation" className="absolute bottom-[50px] right-[15px] w-[200px] object-contain z-30 pointer-events-none" />
      )}
    </div>
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-y-auto overflow-x-hidden bg-white font-sans">
      <div className="relative z-10 w-full flex-shrink-0">
        <img src={bgPaper} alt="background" className="absolute inset-0 h-full w-full object-cover" />
        <div className="relative z-20 flex w-full justify-center p-10 pt-16 pb-12">
          <div className="relative w-full min-w-[600px] md:w-4/5">
            <img src={imgElements} alt="main content" className="w-full object-contain" />
            <img src={imgHeartGif} alt="Heart Animation" className="absolute top-[58%] left-[8%] w-[30%] h-auto object-contain" />
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full flex-shrink-0 min-h-[500px]">
        <img src={bgBlue} alt="blue background" className="absolute inset-0 h-full w-full object-cover" />
        {isHidden ? <NewContent /> : (
          <div className="relative z-20 flex w-full flex-col items-center justify-center pt-20 pb-32 space-y-12 px-6">
            <img src={imgBossStatic} alt="Boss Static" className="w-[500px] object-contain" />
            <div className="relative w-[85%] max-w-[400px] flex items-center justify-center">
              <img src={imgSlideBar} alt="Slide bar" className="w-full object-contain" />
              <img src={imgSlideText} alt="Slide text" className="absolute w-[60%] object-contain left-[100px] top-[25px]" />
              <img src={imgSlideButton} alt="Slide button" onClick={() => setIsHidden(true)} className="absolute left-[20px] w-[60px] h-[60px] cursor-pointer hover:scale-110 active:scale-95 transition-transform" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}