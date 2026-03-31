import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EndPage() {
  const navigate = useNavigate();
  const [showWindow, setShowWindow] = useState(false);

  return (
    <main className="w-full overflow-y-auto bg-slate-100">
      <div className="relative w-full">
        {/* Background */}
        <img
          src="/figma-assets/end/bg.png"
          alt="Background"
          className="block w-full h-auto"
        />

        {/* file.png — กดแล้วเปิด window */}
        <button
          onClick={() => setShowWindow(true)}
          className="absolute z-10 hover:scale-105 active:scale-95 transition-transform duration-150"
          style={{
            width: "400px",
            height: "400px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <img
            src="/figma-assets/end/file.png"
            alt="File"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </button>

        {/* click.png — กดแล้วกลับหน้าแรก */}
        <button
          onClick={() => navigate("/")}
          className="absolute z-10 hover:scale-105 active:scale-95 transition-transform duration-150"
          style={{
            width: "400px",
            left: "50%",
            bottom: "80px",
            transform: "translateX(-50%)",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <img
            src="/figma-assets/end/click.png"
            alt="Click"
            style={{ width: "100%", height: "auto", objectFit: "contain" }}
          />
        </button>

        {/* Window Popup */}
        {showWindow && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ animation: "fadeInScale 0.25s ease-out forwards" }}
          >
            {/* Backdrop กดแล้วปิดได้ด้วย */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowWindow(false)}
            />

            {/* Window รูป — ปรับขนาดได้ที่ width ด้านล่าง */}
            <div
              className="relative z-10"
              style={{ width: "600px" }} /* ← ปรับขนาด window ที่นี่ */
            >
              <img
                src="/figma-assets/end/window.png"
                alt="Window"
                style={{ width: "100%", height: "auto", objectFit: "contain" }}
              />

              {/*
                ปุ่มกากบาท — วางทับบนรูป window
                ปรับ top / right ให้ตรงกับตำแหน่งกากบาทในรูปจริง
              */}
              <button
                onClick={() => setShowWindow(false)}
                aria-label="ปิด"
                style={{
                  position: "absolute",
                  top: "4%" /* ← ปรับให้ตรงกากบาท */,
                  right: "4%" /* ← ปรับให้ตรงกากบาท */,
                  width: "6%",
                  aspectRatio: "1",
                  borderRadius: "4px",
                  cursor: "pointer",
                  outline: "none",
                }}
              />
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}
