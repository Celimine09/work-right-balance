import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bgImg from "/figma-assets/game4/bg.png";
import comImg from "/figma-assets/game4/คอม.png";
import notiImg from "/figma-assets/game4/โนติ.png";
import bossMsgImg from "/figma-assets/game4/ข้อความหัวหน้า.png";
import bgInsertImg from "/figma-assets/game4/bg แทรก.png";
import momGif from "/figma-assets/game4/แม่.gif";
import helpTextImg from "/figma-assets/game4/ช่วยด้วย.png";
import prepare from "/figma-assets/game4/เตรียมนะครับ.png";
import boxImg from "/figma-assets/game4/พัสดุ.png";
import waitingImg from "/figma-assets/game4/เขารออยู่.png";
import labelImg from "/figma-assets/game4/ป้ายพัสดุ.png";
import sendBtnImg from "/figma-assets/game4/ปุ่มส่ง.png";
import writeLabelImg from "/figma-assets/game4/รีบเขียน.png";

// Import รูป GIF ผลลัพธ์
import momCorrectGif from "/figma-assets/game4/แม่ถูก.gif";
import momWrongGif from "/figma-assets/game4/แม่ผิด.gif";
import bossCorrectGif from "/figma-assets/game4/หัวหน้าถูก.gif";
import bossWrongGif from "/figma-assets/game4/หัวหน้าผิด.gif";

// 🚨 Import รูปสรุปจบเกม
import warningImg from "/figma-assets/game4/ระวัง.png";
import resultTextImg from "/figma-assets/game4/ทำได้ไม่เท่า.png";
import helpBtnImg from "/figma-assets/game4/มาช่วย.png";

const BOSS_TARGET_NUMBER = "0828262862";
const MOM_TARGET_NUMBER = "0844041441";

export default function Game4Page() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(0);
  const [showWriteLabel, setShowWriteLabel] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false); // 🚨 State จบเกม
  const [showSummaryImages, setShowSummaryImages] = useState<boolean>(false); // 🚨 State แสดงรูปสรุป

  const [chatInput, setChatInput] = useState<string>("");
  const [parcelInput, setParcelInput] = useState<string>("");

  const [currentTurn, setCurrentTurn] = useState<number>(0);
  const [bossResult, setBossResult] = useState<"correct" | "wrong" | null>(
    null,
  );
  const [momResult, setMomResult] = useState<"correct" | "wrong" | null>(null);

  const [showBossGif, setShowBossGif] = useState<boolean>(false);
  const [showMomGif, setShowMomGif] = useState<boolean>(false);

  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout>;
    let timer2: ReturnType<typeof setTimeout>;
    let timer3: ReturnType<typeof setTimeout>;
    let timer4: ReturnType<typeof setTimeout>;
    let timer5: ReturnType<typeof setTimeout>;
    let timer6: ReturnType<typeof setTimeout>;

    if (step === 1) timer1 = setTimeout(() => setStep(2), 1000);
    if (step === 2) timer2 = setTimeout(() => setStep(3), 2000);
    if (step === 3) timer3 = setTimeout(() => setStep(4), 2000);
    if (step === 4) timer4 = setTimeout(() => setShowWriteLabel(true), 1500);
    if (step === 5) timer5 = setTimeout(() => setStep(6), 2500);
    if (step === 6 && currentTurn < 20) {
      timer6 = setTimeout(() => setCurrentTurn((prev) => prev + 1), 1000);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [step, currentTurn]);

  const isBossTurn = step === 6 && currentTurn < 20 && currentTurn % 2 === 0;
  const isMomTurn = step === 6 && currentTurn < 20 && currentTurn % 2 === 1;

  const currentBossDigit = isBossTurn
    ? BOSS_TARGET_NUMBER[Math.floor(currentTurn / 2)]
    : null;
  const currentMomDigit = isMomTurn
    ? MOM_TARGET_NUMBER[Math.floor(currentTurn / 2)]
    : null;

  // 🚨 ตรวจสอบการจบเกม
  useEffect(() => {
    if (bossResult !== null && momResult !== null) {
      setTimeout(() => {
        setIsGameOver(true); // 🚨 เข้าสู่โหมดจบเกม (แสดง warning และ result ทันที)
      }, 3000);
      // 🚨 ดีเลย์ 4.5 วินาทีรวม (3 + 1.5) ก่อนแสดงปุ่มมาช่วย
      setTimeout(() => {
        setShowSummaryImages(true);
      }, 4500);
    }
  }, [bossResult, momResult]);

  const handleBossSubmit = () => {
    if (!chatInput.trim() || bossResult !== null || isGameOver) return;
    setBossResult(chatInput === BOSS_TARGET_NUMBER ? "correct" : "wrong");
    setShowBossGif(true);
    setTimeout(() => setShowBossGif(false), 2500);
  };

  const handleMomSubmit = () => {
    if (!parcelInput.trim() || momResult !== null || isGameOver) return;
    setMomResult(parcelInput === MOM_TARGET_NUMBER ? "correct" : "wrong");
    setShowMomGif(true);
    setTimeout(() => setShowMomGif(false), 2500);
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-center bg-cover"
      style={{ backgroundImage: `url(${bgImg})` }}
      onClick={() => {
        if (step === 4 && showWriteLabel) {
          setShowWriteLabel(false);
          setStep(5);
        }
      }}
    >
      {/* 🚨 Overlay ผลลัพธ์ GIF */}
      <div className="fixed inset-0 z-[99999] pointer-events-none">
        {showMomGif && (
          <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2">
            <img
              src={momResult === "correct" ? momCorrectGif : momWrongGif}
              alt="ผลลัพธ์แม่"
              className="w-[1200px] max-w-none object-contain animate-fade-in"
            />
          </div>
        )}
        {showBossGif && (
          <div className="absolute top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2">
            <img
              src={bossResult === "correct" ? bossCorrectGif : bossWrongGif}
              alt="ผลลัพธ์หัวหน้า"
              className="w-[1200px] max-w-none object-contain animate-fade-in"
            />
          </div>
        )}
      </div>

      {/* ---------------- โซนฝั่งซ้าย (แม่ / ผี / พัสดุ) ---------------- */}
      {step >= 3 && (
        <>
          <div
            className="absolute top-0 left-[-600px] w-full h-full bg-cover bg-right z-1 transition-opacity duration-700 animate-fade-in"
            style={{ backgroundImage: `url(${bgInsertImg})` }}
          />
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* 🚨 ซ่อน แม่.gif เมื่อจบเกม */}
            {!isGameOver && (
              <img
                src={momGif}
                alt="แม่"
                className="absolute bottom-10 left-1 w-[200px] object-contain drop-shadow-2xl"
              />
            )}
            {step === 3 && (
              <img
                src={helpTextImg}
                alt="ช่วยด้วย"
                className="absolute bottom-[90px] left-[200px] w-[300px] object-contain"
              />
            )}
            {step === 4 && showWriteLabel && (
              <img
                src={writeLabelImg}
                alt="รีบเขียน"
                className="absolute bottom-[90px] left-[200px] w-[300px] object-contain animate-fade-in"
              />
            )}
          </div>
        </>
      )}

      {step >= 4 && (
        <div className="absolute inset-0 z-30 animate-fade-in pointer-events-none">
          <img
            src={boxImg}
            alt="พัสดุ"
            className="absolute top-[0px] left-[-50px] w-[45vw] max-w-[700px] drop-shadow-2xl"
          />
          {/* 🚨 ซ่อน เขารออยู่.png เมื่อจบเกม */}
          {!isGameOver && (
            <img
              src={waitingImg}
              alt="เขารออยู่"
              className="absolute top-[6%] left-[34%] w-[16vw] max-w-[240px] drop-shadow-xl z-40"
            />
          )}

          {currentMomDigit !== null && !isGameOver && (
            <img
              src={`/figma-assets/game4/${currentMomDigit}-mom.png`}
              alt="Mom Digit"
              className="absolute top-[680px] left-[230px] w-[75px] z-50 animate-fade-in"
            />
          )}

          <div className="absolute top-[185px] left-[90px] w-[36vw] max-w-[500px] z-40 pointer-events-auto">
            <img src={labelImg} alt="ป้ายพัสดุ" className="w-full" />
            <input
              type="text"
              className="absolute bottom-[10%] left-[16%] w-[60%] h-[20%] bg-transparent outline-none border-2 border-red-500 rounded text-red-700 px-2 text-xl font-medium"
              placeholder="พิมพ์เบอร์แม่บอก..."
              value={parcelInput}
              onChange={(e) => setParcelInput(e.target.value)}
              disabled={momResult !== null || isGameOver} // 🚨 Disabled เมื่อจบเกม
            />
            <img
              src={sendBtnImg}
              alt="ส่ง"
              onClick={handleMomSubmit}
              className={`absolute -bottom-[5%] left-[380px] w-[25%] z-40 transition-transform ${momResult !== null || isGameOver ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105 active:scale-95"}`}
            />
          </div>

          {/* 🚨 แสดงรูป ระวัง.png ฝั่งซ้ายเมื่อจบเกม */}
          {isGameOver && (
            <img
              src={warningImg}
              alt="ระวังสะติแตก"
              className="absolute top-[530px] left-[25%] -translate-x-1/2 -translate-y-1/2 w-[400px] z-[50] drop-shadow-2xl animate-fade-in"
            />
          )}
          {/* 🚨 ปุ่มมาช่วย.png (ดีเลย์ 1.5 วินาที) */}
          {showSummaryImages && (
            <button
              onClick={() => navigate("/game5")}
              className="absolute top-[50px] left-[350px] z-[60] pointer-events-auto transition-transform duration-200 hover:scale-110 active:scale-95 drop-shadow-xl animate-fade-in outline-none"
            >
              <img
                src={helpBtnImg}
                alt="มาช่วย"
                className="w-[500px] cursor-pointer"
              />
            </button>
          )}
        </div>
      )}

      {/* ---------------- โซนฝั่งขวา (คอมพิวเตอร์ / หัวหน้า) ---------------- */}
      <div className="absolute top-[60px] left-[750px] w-[90vw] max-w-[1150px] z-5">
        <img src={comImg} alt="Laptop" className="w-full h-auto block" />
        {step === 0 && (
          <img
            src={notiImg}
            alt="Notification"
            className="absolute top-[10%] left-[15%] w-[45%] cursor-pointer"
            onClick={() => setStep(1)}
          />
        )}

        {step >= 1 && (
          <>
            {/* 🚨 ซ่อน ข้อความหัวหน้า.png เมื่อจบเกม */}
            {!isGameOver && (
              <img
                src={bossMsgImg}
                alt="Boss Message"
                className={`absolute top-[5%] left-[12%] w-[20%] transition-opacity ${step < 2 ? "opacity-0" : "opacity-100"}`}
              />
            )}

            {step >= 2 && step < 5 && (
              <img
                src={prepare}
                alt="Prepare"
                className="absolute top-[18%] left-[25%] w-[15%] animate-fade-in"
              />
            )}
            {currentBossDigit !== null && !isGameOver && (
              <img
                src={`/figma-assets/game4/${currentBossDigit}-boss.png`}
                alt="Boss Digit"
                className="absolute top-[100px] left-[300px] w-[75px] z-50 animate-fade-in"
              />
            )}

            {/* 🚨 แสดงรูป ทำได้ไม่เท่า.png บนจอคอมเมื่อจบเกม */}
            {isGameOver && (
              <img
                src={resultTextImg}
                alt="ทำได้ไม่เท่ากับดี"
                className="absolute top-[10%] left-[15%] w-[450px] z-[50] animate-fade-in"
              />
            )}

            <div className="absolute top-[48%] left-[15%] w-[40%] bg-white rounded-xl border-2 border-black flex flex-col shadow-2xl z-10">
              <div className="p-5 pb-8 flex flex-col gap-2 text-black font-bold">
                <h2>ที่อยู่ นายสมเหตุ ไร้ผล</h2>
                <p>คอนโดทวีสุข 89/8 ซอย สุวินทวงศ์ 8 ห้อง 188</p>
                <p>โทร : </p>
              </div>
              <div className="flex border-t-2 border-black h-16">
                <input
                  type="text"
                  className="flex-1 bg-[#B93289] text-white px-4 outline-none"
                  placeholder="พิมพ์เบอร์หัวหน้าบอก..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleBossSubmit()}
                  disabled={bossResult !== null || isGameOver} // 🚨 Disabled เมื่อจบเกม
                />
                <button
                  onClick={handleBossSubmit}
                  disabled={bossResult !== null || isGameOver}
                  className={`w-20 border-l-4 border-black flex items-center justify-center ${bossResult !== null || isGameOver ? "bg-gray-400 cursor-not-allowed" : "bg-[#EAFA35]"}`}
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
