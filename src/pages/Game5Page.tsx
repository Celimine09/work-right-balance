import { CSSProperties, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Game5Page() {
  const navigate = useNavigate();

  const platePosition = {
    wrapper: "relative w-[450px] h-[450px] lg:w-[550px] lg:h-[550px]",
    image:
      "absolute top-0 left-[-600px] w-full h-full object-contain select-none",
  };

  const handPosition = {
    base: "absolute -bottom-1 left-[-250px] w-[250px] outline-none focus:outline-none",
    moveLeft: "-translate-x-10 -translate-y-5 -rotate-12",
    moveRight: "translate-x-6 translate-y-2 rotate-6",
    idle: "translate-x-0 translate-y-0 rotate-0 hover:scale-105 active:scale-95",
  };

  const instructionPosition = {
    wrapper: "absolute top-[45%] right-[15%] flex flex-col gap-5 animate-pulse",
    image: "w-64",
  };

  const notificationStyles: Record<number, CSSProperties> = {
    1: { top: "12%", left: "55%", width: "22%" },
    2: { top: "15%", left: "75%", width: "22%" },
    3: { top: "35%", left: "50%", width: "22%" },
    4: { top: "48%", left: "65%", width: "25%" },
    5: { top: "72%", left: "58%", width: "32%" },
  };

  const [plateIndex, setPlateIndex] = useState(1);
  const [hasStarted, setHasStarted] = useState(false);
  const [notificationIndices, setNotificationIndices] = useState<number[]>([]);
  const [handSpongeState, setHandSpongeState] = useState(0);
  const [showLukPai, setShowLukPai] = useState(false);
  const [showKhobKhun, setShowKhobKhun] = useState(false);
  const [showRewardScreen, setShowRewardScreen] = useState(false);

  // State สำหรับ index ข้อความ (1-5)
  const [msgIndex, setMsgIndex] = useState(1);

  // State สำหรับปุ่มบนปฏิทินวันที่ 13
  const [calendarClicked, setCalendarClicked] = useState(false);

  const isCompleted = notificationIndices.length >= 5;

  // เมื่อเข้า reward screen ให้สลับข้อความทุก 1.8 วินาที จาก 1→4
  useEffect(() => {
    if (!showRewardScreen) return;

    const interval = setInterval(() => {
      setMsgIndex((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          return 4;
        }
        return prev + 1;
      });
    }, 1800);

    return () => clearInterval(interval);
  }, [showRewardScreen]);

  const handleWash = () => {
    if (isCompleted) {
      setShowLukPai(true);
      setTimeout(() => {
        setShowKhobKhun(true);
      }, 1500);
      return;
    }

    if (!hasStarted) {
      setHasStarted(true);
    }

    if (plateIndex < 10) {
      setPlateIndex((prev) => prev + 1);
    }

    if (notificationIndices.length < 5) {
      setNotificationIndices((prev) => [...prev, prev.length + 1]);
    }

    setHandSpongeState(1);
    setTimeout(() => setHandSpongeState(2), 100);
    setTimeout(() => setHandSpongeState(0), 200);
  };

  const handleKhobKhunClick = () => {
    setShowRewardScreen(true);
  };

  // กดวันที่ 13 บนปฏิทิน → เปลี่ยนเป็นข้อความ5 → รอ 2 วิ → ไป /end
  const handleCalendarDay13 = () => {
    if (calendarClicked) return;
    setCalendarClicked(true);
    setMsgIndex(5);
    setTimeout(() => {
      navigate("/end");
    }, 2000);
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-100 font-sans">
      {/* 1. Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/figma-assets/game5/bg.png"
          alt="Water background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Main Game Layer */}
      <div className="relative z-10 w-full h-full max-w-7xl flex items-center justify-center p-8">
        {/* Left Section: Plate & Hand Interaction */}
        <div className="relative flex-1 flex items-center justify-end pr-20">
          <div className={platePosition.wrapper}>
            <img
              src={`/figma-assets/game5/จาน${plateIndex}.png`}
              alt="Current Plate"
              className={platePosition.image}
            />

            {/* มือและฟองน้ำ - ซ่อนเมื่อขึ้น reward screen */}
            {!showRewardScreen && (
              <button
                onClick={handleWash}
                className={`${handPosition.base} transition-transform duration-100
                  ${handSpongeState === 1 ? handPosition.moveLeft : ""}
                  ${handSpongeState === 2 ? handPosition.moveRight : ""}
                  ${handSpongeState === 0 ? handPosition.idle : ""}
                `}
              >
                <img
                  src="/figma-assets/game5/มือ.png"
                  alt="Hand"
                  className="w-full h-auto select-none"
                />
              </button>
            )}
          </div>
        </div>

        {/* Overlay layer — pointer-events-none ทั้งหมด */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {!hasStarted && (
            <div className={instructionPosition.wrapper}>
              <img
                src="/figma-assets/game5/กดคลิก.png"
                alt="Instruction 1"
                className={instructionPosition.image}
              />
              <img
                src="/figma-assets/game5/เพื่อล้างจาน.png"
                alt="Instruction 2"
                className={instructionPosition.image}
              />
            </div>
          )}

          {hasStarted &&
            notificationIndices.map((id) => {
              const isLatest =
                id === notificationIndices[notificationIndices.length - 1];
              return (
                <div
                  key={id}
                  className="absolute transition-all duration-500 ease-out"
                  style={{
                    ...notificationStyles[id],
                    filter: isLatest ? "none" : "brightness(0.4) opacity(0.7)",
                  }}
                >
                  <img
                    src={`/figma-assets/game5/โนติ${id}.png`}
                    alt={`Notification ${id}`}
                    className="w-full object-contain drop-shadow-xl"
                  />
                </div>
              );
            })}

          {/* ลูกไป.png */}
          {showLukPai && (
            <div
              className="absolute"
              style={{
                top: "20%",
                left: "-5%",
                width: "30%",
                animation: "fadeInScale 0.6s ease-out forwards",
              }}
            >
              <img
                src="/figma-assets/game5/ลูกไป.png"
                alt="ลูกไป"
                className="w-full object-contain drop-shadow-2xl"
              />
            </div>
          )}
        </div>

        {/* ปุ่มขอบคุณ — แยกออกมานอก pointer-events-none layer เพื่อให้กดได้ */}
        {showKhobKhun && !showRewardScreen && (
          <button
            onClick={handleKhobKhunClick}
            className="absolute z-30 hover:scale-105 active:scale-95 transition-transform duration-150"
            style={{
              bottom: "-5%",
              left: "35%",
              transform: "translateX(-50%)",
              width: "28%",
              animation: "fadeInScale 0.6s ease-out forwards",
              outline: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <img
              src="/figma-assets/game5/ขอบคุณ.png"
              alt="ขอบคุณ"
              className="w-full object-contain drop-shadow-2xl"
            />
          </button>
        )}
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes msgFade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* 3. Reward Screen */}
      {showRewardScreen && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center"
          style={{ animation: "fadeIn 0.5s ease-out forwards" }}
        >
          {/* พื้นหลังสีฟ้า */}
          <div className="absolute inset-0">
            <img
              src="/figma-assets/game5/bg-blue.png"
              alt="Blue background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ปฏิทิน + ปุ่มล่องหนวันที่ 13 */}
          <div
            className="absolute"
            style={{
              top: "20%",
              left: "30%",
              transform: "translateX(-50%)",
              width: "35%",
              animation: "fadeInScale 0.6s ease-out forwards",
            }}
          >
            <div className="relative w-full">
              <img
                src="/figma-assets/game5/ปฏิทิน.png"
                alt="ปฏิทิน"
                className="w-full object-contain drop-shadow-2xl"
              />

              {/*
                ปุ่มล่องหนบนวันที่ 13
                ปรับ top / left / width / height ให้ตรงกับตำแหน่งวันที่ 13 บนรูปปฏิทินจริง
                ตอนนี้ตั้งค่าให้จางๆ (opacity-10) เพื่อให้มองเห็นตำแหน่งขณะปรับ
              */}
              <button
                onClick={handleCalendarDay13}
                disabled={calendarClicked}
                aria-label="วันที่ 13"
                style={{
                  position: "absolute",
                  top: "50%" /* ← ปรับให้ตรงวันที่ 13 */,
                  left: "14%" /* ← ปรับให้ตรงวันที่ 13 */,
                  width: "14%",
                  height: "14%",
                  aspectRatio: "1",
                  background:
                    "rgba(0, 0, 0, 0)" /* จางๆ เปลี่ยนเป็น 0 เมื่อพอใจ */,
                  borderRadius: "4px",
                  cursor: calendarClicked ? "default" : "pointer",
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* หัวหน้า.gif */}
          <div
            className="absolute"
            style={{
              top: "65%",
              left: "55%",
              transform: "translateX(-50%)",
              width: "12%",
              animation: "fadeInScale 0.6s 0.2s ease-out both",
            }}
          >
            <img
              src="/figma-assets/game5/หัวหน้า.gif"
              alt="หัวหน้า"
              className="w-full object-contain drop-shadow-xl"
            />
          </div>

          {/* ข้อความสลับ 1→4 (และ 5 เมื่อกดวันที่ 13) */}
          <div
            className="absolute"
            style={{
              top: "70%",
              left: "45%",
              transform: "translateX(-50%)",
              width: "20%",
            }}
          >
            <img
              key={msgIndex}
              src={`/figma-assets/game5/ข้อความ${msgIndex}.png`}
              alt={`ข้อความ ${msgIndex}`}
              className="w-full object-contain drop-shadow-xl"
              style={{ animation: "msgFade 0.4s ease-out forwards" }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
