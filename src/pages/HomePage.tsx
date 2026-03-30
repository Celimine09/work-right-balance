import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ASSETS = {
  logo: "/figma-assets/33c7d2e2c62875abaea189f90233e30dbd9874c4.png",
  ribbon: "/figma-assets/2b0225de649b71d497c9317379aac37ca395cc29.png",
  pencilGif: "/figma-assets/5560cc52c277b4f56cf3d04b203247ecb541077a.png",
  paper: "/figma-assets/dd8fef6c6a3b5d5bd305a275e924317dd55a3600.png",
  postIt: "/figma-assets/cc806199bad2839b775ec422dd5e0ba39e5b4855.png",
  spray: "/figma-assets/744c5a4ee818171c9d2ce749538c694537a9bb52.png",
  bounceBg: "/figma-assets/3804c3391c0b72ec06400ad1c5bb3a863f919ff2.png",
  startBtn: "/figma-assets/518d74d5b0b7df8580fb7d294a9f4da2933f9c97.png",
} as const;

function useStageScale() {
  const [scale, setScale] = useState(1);
  const update = useCallback(() => {
    setScale(
      Math.min(window.innerWidth / 1920, window.innerHeight / 1080, 1),
    );
  }, []);
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);
  return scale;
}

function CyanScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative isolate m-0 block h-[1080px] w-[1920px] overflow-hidden bg-transparent text-left">
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[#00b3dc]/85"
        aria-hidden
      />
      <div className="pointer-events-none absolute z-[2] -left-[1.46%] top-[47.13%] right-[61.51%] bottom-[-16.34%] flex items-center justify-center">
        <div className="h-[502.626px] w-[584.029px] shrink-0 rotate-[35.23deg]">
          <div className="pointer-events-none relative h-full w-full overflow-hidden">
            <img
              src={ASSETS.ribbon}
              alt=""
              className="absolute left-0 top-0 h-full w-full max-w-none object-fill"
            />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute z-[2] left-[31px] top-[675px] h-[281px] w-[532px]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={ASSETS.pencilGif}
            alt=""
            className="absolute -left-[118.96%] -top-[133.11%] h-[364.86%] w-[343.47%] max-w-none"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute z-[2] -top-[102px] left-[114.82px] flex h-[497.595px] w-[640.372px] items-center justify-center">
        <div className="shrink-0 -rotate-[17.1deg]">
          <div className="pointer-events-none relative h-[347.38px] w-[563.127px] overflow-hidden">
            <img
              src={ASSETS.paper}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-cover"
            />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute z-[2] left-[1225px] top-[27px] h-[774px] w-[936px]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={ASSETS.postIt}
            alt=""
            className="absolute -left-[38.67%] -top-[9.17%] h-[119.34%] w-[175.5%] max-w-none"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute z-[2] left-[1401px] top-[602px] flex h-[730.589px] w-[672.866px] items-center justify-center">
        <div className="shrink-0 rotate-[19.55deg]">
          <div className="pointer-events-none relative h-[597px] w-[502px] overflow-hidden">
            <img
              src={ASSETS.spray}
              alt=""
              className="absolute -left-[141.83%] -top-[41.21%] h-[180.9%] w-[382.47%] max-w-none"
            />
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute z-[2] left-[calc(50%+0.5px)] top-[calc(50%+0.5px)] h-[351px] w-[827px] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={ASSETS.logo}
            alt=""
            className="absolute -left-[66.38%] -top-[103.13%] h-[307.69%] w-[232.16%] max-w-none"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-[3]">
        <img
          src={ASSETS.bounceBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <button
        type="button"
        className="absolute z-[4] left-[834px] top-[816px] m-0 block h-[212px] w-[636.849px] cursor-pointer border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[4px] focus-visible:outline-white"
        onClick={onStart}
        aria-label="เริ่มเกม"
      >
        <img
          src={ASSETS.startBtn}
          alt=""
          className="pointer-events-none block h-full w-full object-cover"
        />
      </button>
    </div>
  );
}

export function HomePage() {
  const scale = useStageScale();
  const navigate = useNavigate();

  const handleStart = useCallback(() => {
    navigate("/intro");
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[#0d0d0d]">
      <div
        className="relative shrink-0 overflow-hidden"
        style={{
          width: 1920 * scale,
          height: 1080 * scale,
        }}
      >
        <div
          className="absolute left-0 top-0 h-[1080px] w-[1920px] origin-top-left"
          style={{
            transform: `scale(${scale})`,
          }}
        >
          <CyanScreen onStart={handleStart} />
        </div>
      </div>
    </div>
  );
}
