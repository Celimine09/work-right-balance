import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  imgBoss,
  imgBoss2,
  imgBoss3,
  imgFoldedShirts,
  imgLaptop,
  imgMusicPlayerAlbumArt,
  imgMusicPlayerAlbumArt2,
  imgMusicPlayerPanel,
  imgMusicPlayerPlayIcon,
  imgMusicPlayerScrubber,
  imgMusicPlayerSkipIcon,
  imgMusicPlayerSpeakerIcon,
  imgNotificationAvatar,
  imgNotificationCardBackground,
  imgNotificationMessageText,
  imgNotificationTitleText,
  imgPattern,
  imgRepeatSamLarge,
  imgRepeatSamMedium,
  imgRepeatSamSmall,
  imgRepeatSamTiny1,
  imgRepeatSamTiny2,
  imgSoapBar,
  imgTextKueIs,
  imgThaiTypographySpritesheet,
  imgTitleAutomaticActivity,
  imgToothbrush,
  imgBossCorrect,
  imgBossWrong,
  imgNotificationHover,
  imgMusicPlayerPause,
  imgMaiWhai,
  imgMaiWhai2,
  imgListenMusic,
  imgListenNoMusic,
  imgCanDo,
  imgHeadphone,
} from "./game2Assets";

const W = 1920;
const H = 4320;

function useGame2Scale() {
  const [scale, setScale] = useState(1);
  const update = useCallback(() => {
    setScale(Math.min(1, window.innerWidth / W));
  }, []);
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);
  return scale;
}

function PiroteNotificationCard({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${className ?? "relative h-[160.06px] w-[540.14px]"} transition-transform duration-200 hover:scale-[1.02] cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {isHovered ? (
        <img
          alt="Notification Hover"
          className="absolute block size-full max-w-none"
          src={imgNotificationHover}
        />
      ) : (
        <>
          <img
            alt="Notification Background"
            className="absolute block size-full max-w-none"
            src={imgNotificationCardBackground}
          />
          <div className="absolute inset-[57.29%_3.76%_18.12%_25.37%]">
            <img
              alt="Message"
              className="absolute block size-full max-w-none"
              src={imgNotificationMessageText}
            />
          </div>
          <div className="absolute inset-[24.05%_49.53%_55.6%_25.47%]">
            <img
              alt="Title"
              className="absolute block size-full max-w-none"
              src={imgNotificationTitleText}
            />
          </div>
          <div className="absolute inset-[7.16%_76.22%_13.5%_3.04%] flex items-center justify-center overflow-hidden rounded-[20px]">
            <div className="flex h-[126.99px] w-[112.05px] flex-none -scale-y-100 rotate-180 items-center justify-center">
              <div className="relative size-full">
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <img
                    alt="Avatar"
                    className="absolute left-0 top-0 size-full max-w-none"
                    src={imgNotificationAvatar}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Game2Artboard() {
  const tf = {
    "--transform-inner-width": "1200",
    "--transform-inner-height": "19",
  } as CSSProperties;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isNextSong, setIsNextSong] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // สร้าง Audio object ครั้งแรก
  useEffect(() => {
    audioRef.current = new Audio("/happy-sound.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // เปลี่ยนเพลงเมื่อ isNextSong เปลี่ยน
  useEffect(() => {
    if (!audioRef.current) return;
    const wasPlaying = isPlaying;
    audioRef.current.pause();
    audioRef.current.src = isNextSong ? "/sad-sound.mp3" : "/happy-sound.mp3";
    audioRef.current.volume = 0.2;
    audioRef.current.load();
    if (wasPlaying) {
      audioRef.current.play().catch(() => {});
    }
  }, [isNextSong]);
  const [inputValue, setInputValue] = useState("");
  const [feedbackState, setFeedbackState] = useState<
    "correct" | "wrong" | null
  >(null);

  const [currentStep, setCurrentStep] = useState(1);

  // State สำหรับสลับภาพ imgMaiWhai และ imgMaiWhai2
  const [blinkMaiWhai, setBlinkMaiWhai] = useState(false);

  // Effect สำหรับตั้งเวลาสลับภาพทุกๆ 500ms (0.5 วินาที) เมื่อมาถึง Step 4
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (currentStep === 4) {
      interval = setInterval(() => {
        setBlinkMaiWhai((prev) => !prev);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [currentStep]);

  const currentAnswer =
    currentStep === 1
      ? "สะดวกมากครับ"
      : currentStep === 2
        ? "ไหวชิวครับ"
        : "สะบายครับ";

  const handleTogglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSkipSong = () => {
    setIsNextSong((prev) => !prev);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputValue.trim() === currentAnswer) {
      setFeedbackState("correct");
    } else {
      setFeedbackState("wrong");
    }
  };

  const handleFeedbackClick = () => {
    if (feedbackState === "correct") {
      setInputValue("");

      if (currentStep === 1) {
        setCurrentStep(2);
      } else if (currentStep === 2) {
        setCurrentStep(3);
      } else if (currentStep === 3) {
        setIsClicked(false);
        setCurrentStep(4);
      }
    } else {
      setInputValue("");
    }
    setFeedbackState(null);
  };

  // ฟังก์ชันสำหรับกดไปหน้าต่อไป
  const handleNavigateNext = () => {
    // เปลี่ยน URL ตรงนี้ให้เป็นหน้าที่คุณต้องการให้ไป
    window.location.href = "/game3";
  };

  return (
    <section
      className="relative h-[4320px] w-[1920px] overflow-hidden bg-[#7ec3ef] text-left"
      data-name="เกม1.2"
    >
      <div className="absolute contents left-0 top-0" data-name="bg">
        <div
          className="absolute left-0 top-0 h-[4320px] w-[1920px] bg-[#7ec3ef]"
          data-name="พื้นหลังฟ้า"
        />
        <div className="absolute contents left-0 top-[2160px]" data-name="ขาว">
          <div className="absolute contents left-[1420px] top-[2160px]">
            <div className="absolute left-[1729px] top-[2295px] h-[52px] w-[191px] bg-white" />
            <div className="absolute left-[1612px] top-[2345px] h-[50px] w-[117px] bg-white" />
            <div className="absolute left-[1617px] top-[2201px] h-[57px] w-[146px] bg-white" />
            <div className="absolute left-[1545px] top-[2160px] h-[30px] w-[58px] bg-white" />
            <div className="absolute left-[1859px] top-[2220px] h-[59px] w-[61px] bg-white" />
            <div className="absolute left-[1522px] top-[2313px] h-[16px] w-[55px] bg-white" />
            <div className="absolute left-[1420px] top-[2356px] h-[31px] w-[52px] bg-white" />
          </div>
          <div className="absolute contents left-0 top-[2560px]">
            <div className="absolute left-0 top-[2608px] flex h-[52px] w-[191px] items-center justify-center">
              <div className="flex-none rotate-180">
                <div className="h-[52px] w-[191px] bg-white" />
              </div>
            </div>
            <div className="absolute left-[191px] top-[2560px] flex h-[50px] w-[117px] items-center justify-center">
              <div className="flex-none rotate-180">
                <div className="h-[50px] w-[117px] bg-white" />
              </div>
            </div>
            <div className="absolute left-[157px] top-[2697px] flex h-[57px] w-[146px] items-center justify-center">
              <div className="flex-none rotate-180">
                <div className="h-[57px] w-[146px] bg-white" />
              </div>
            </div>
            <div className="absolute left-[317px] top-[2765px] flex h-[30px] w-[58px] items-center justify-center">
              <div className="flex-none rotate-180">
                <div className="h-[30px] w-[58px] bg-white" />
              </div>
            </div>
            <div className="absolute left-0 top-[2676px] flex h-[59px] w-[61px] items-center justify-center">
              <div className="flex-none rotate-180">
                <div className="h-[59px] w-[61px] bg-white" />
              </div>
            </div>
            <div className="absolute left-[343px] top-[2626px] flex h-[16px] w-[55px] items-center justify-center">
              <div className="flex-none rotate-180">
                <div className="h-[16px] w-[55px] bg-white" />
              </div>
            </div>
            <div className="absolute left-[448px] top-[2568px] flex h-[31px] w-[52px] items-center justify-center">
              <div className="flex-none rotate-180">
                <div className="h-[31px] w-[52px] bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-[8.19%_-10.68%_70.31%_39.38%]"
        data-name="เสื้อ"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            alt=""
            className="absolute left-0 top-0 size-full max-w-none"
            src={imgFoldedShirts}
          />
        </div>
      </div>

      <div
        className="absolute left-[-449px] top-[704px] flex h-[1123.446px] w-[1162.158px] items-center justify-center"
        style={tf}
      >
        <div className="flex-none rotate-[49.06deg]">
          <div
            className="relative h-[1003.201px] w-[617.04px]"
            data-name="แปรง"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <img
                alt=""
                className="absolute -left-[92.55%] -top-[5.4%] h-[109.98%] w-[317.88%] max-w-none"
                src={imgToothbrush}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute contents left-[129px] top-[82px]"
        data-name="กิจกรรมอัตโน...ชำนาญ"
      >
        <div className="absolute inset-[2.66%_56.81%_92.71%_6.72%] flex items-center justify-center">
          <div className="h-[127.36px] w-[690.717px] flex-none rotate-[-6.08deg]">
            <div className="relative size-full" data-name="กิจกรรมอัตโนมัติ">
              <div className="absolute inset-[-1.11%_-0.21%_-1.18%_-0.21%]">
                <img
                  alt=""
                  className="block size-full max-w-none"
                  src={imgTitleAutomaticActivity}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute left-[853px] top-[82px] h-[272px] w-[314px]"
          data-name="คือ"
        >
          <img
            alt=""
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            src={imgTextKueIs}
          />
        </div>
        <div
          className="absolute contents left-[829px] top-[383px]"
          data-name="สิ่งที่ทำหรือ"
        >
          <div className="absolute left-[829px] top-[383px] h-[63px] w-[326px]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <img
                alt=""
                className="absolute left-0 top-[-0.02%] h-[344.49%] w-[159.2%] max-w-none"
                src={imgThaiTypographySpritesheet}
              />
            </div>
          </div>
          <div className="absolute left-[1135px] top-[402px] h-[120px] w-[272px]">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <img
                alt=""
                className="absolute left-[-227.97%] top-[-0.02%] h-[344.49%] w-[362.94%] max-w-none"
                src={imgThaiTypographySpritesheet}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute contents left-[221px] top-[939px]"
        data-name="สิ่งที่คาดเดา...ซ้ำๆ"
      >
        <div className="absolute left-[221px] top-[1098px] h-[79px] w-[281px]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              alt=""
              className="absolute left-0 top-[-77.23%] h-[274.72%] w-[184.7%] max-w-none"
              src={imgThaiTypographySpritesheet}
            />
          </div>
        </div>
        <div className="absolute left-[272px] top-[1148px] h-[127px] w-[370px]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              alt=""
              className="absolute left-[-125.65%] top-[-77.23%] h-[274.72%] w-[225.65%] max-w-none"
              src={imgThaiTypographySpritesheet}
            />
          </div>
        </div>
        <div
          className="absolute contents inset-[21.74%_43.43%_65.91%_21.46%]"
          data-name="ซ้ำๆ"
        >
          <div className="absolute inset-[27.96%_43.43%_65.91%_36.68%]">
            <img
              alt=""
              className="absolute block size-full max-w-none"
              src={imgRepeatSamLarge}
            />
          </div>
          <div className="absolute inset-[28.11%_64.55%_68.96%_25.91%]">
            <img
              alt=""
              className="absolute block size-full max-w-none"
              src={imgRepeatSamMedium}
            />
          </div>
          <div className="absolute inset-[24.55%_61.17%_73.07%_31.11%]">
            <img
              alt=""
              className="absolute block size-full max-w-none"
              src={imgRepeatSamSmall}
            />
          </div>
          <div className="absolute inset-[21.74%_69.42%_76.42%_24.59%]">
            <img
              alt=""
              className="absolute block size-full max-w-none"
              src={imgRepeatSamTiny1}
            />
          </div>
          <div className="absolute inset-[23.13%_74.17%_75.52%_21.46%]">
            <img
              alt=""
              className="absolute block size-full max-w-none"
              src={imgRepeatSamTiny2}
            />
          </div>
        </div>
      </div>

      <div
        className="absolute left-[75px] top-[1342px] h-[342px] w-[670px] overflow-clip"
        data-name="สบู่"
      >
        <div className="absolute inset-[0_0.52%_0.52%_0]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <img
              alt=""
              className="absolute left-0 top-0 size-full max-w-none"
              src={imgSoapBar}
            />
          </div>
        </div>
      </div>

      <div
        className="absolute contents left-[779px] top-[1538px]"
        data-name="หรือเป็นแพทเทิร์น"
      >
        <div className="absolute left-[1150px] top-[1538px] w-[700px]">
          <img
            alt="รูปภาพแพทเทิร์น"
            className="block size-full max-w-none object-contain"
            src={imgPattern}
          />
        </div>
      </div>

      <div
        className="absolute left-[331px] top-[3181px] h-[161.06px] w-[541.14px] z-10"
        data-name="เพลง"
      >
        <div className="absolute inset-0 contents">
          <img
            alt=""
            className="absolute block size-full max-w-none"
            src={imgMusicPlayerPanel}
          />
          <div className="absolute inset-[14.11%_48%_64.5%_6.96%] flex items-center">
            <img
              alt="Album Art"
              className="block size-full max-w-none object-contain object-left"
              src={
                isNextSong ? imgMusicPlayerAlbumArt2 : imgMusicPlayerAlbumArt
              }
            />
          </div>
          <div className="absolute inset-[43.28%_9.19%_56.1%_6.96%]">
            <img
              alt=""
              className="absolute block size-full max-w-none"
              src={imgMusicPlayerScrubber}
            />
          </div>
          <div className="absolute inset-[37.58%_92.78%_50.41%_6.7%]">
            <img
              alt=""
              className="absolute block size-full max-w-none"
              src={imgMusicPlayerSpeakerIcon}
            />
          </div>

          <button
            type="button"
            className="absolute inset-[41%_82%_23.55%_7.29%] block cursor-pointer transition-transform hover:scale-105 active:scale-95 z-10"
            onClick={handleTogglePlay}
          >
            <img
              alt={isPlaying ? "Pause" : "Play"}
              className="absolute block size-full max-w-none"
              src={isPlaying ? imgMusicPlayerPause : imgMusicPlayerPlayIcon}
            />
          </button>
        </div>
        <button
          type="button"
          className="absolute inset-[64.08%_75.74%_21.51%_20.29%] block cursor-pointer transition-transform hover:scale-105 active:scale-95"
          onClick={handleSkipSong}
        >
          <img
            alt="Skip"
            className="absolute block size-full max-w-none"
            src={imgMusicPlayerSkipIcon}
          />
        </button>
      </div>

      {currentStep < 4 &&
        (isClicked ? (
          <div className="absolute left-[1015px] top-[2588px] z-10">
            <div className="relative h-full w-full">
              <img
                alt="Boss"
                className="absolute left-[-100px] top-[-4px] block w-[300px] max-w-none"
                src={
                  currentStep === 1
                    ? imgBoss
                    : currentStep === 2
                      ? imgBoss2
                      : imgBoss3
                }
              />
            </div>

            <div className="absolute left-[0px] top-[150px] w-[540px] bg-white rounded-[10px] shadow-lg border-2 border-black overflow-hidden flex flex-col font-sans">
              <div className="p-[30px] pb-[40px] text-gray-800 text-[16px] leading-relaxed h-[300px] overflow-y-auto">
                {currentStep === 1 ? (
                  <>
                    <p className="font-bold mb-4">ถึงบริษัท งานไม่จำกัด</p>
                    <p>
                      สวัสดีค่ะ ทางเรากำลังมองหาบริษัทที่สนใจรับงาน
                      <br />
                      ที่รองรับงานหลากหลายรูปแบบ ไม่จำกัดขอบเขตประเภทงาน
                      <br />
                      ไม่จำกัดเวลาในการทำงาน ไม่จำกัดงบประมาณ
                      <br />
                      และสามารถพูดคุยปรับรายละเอียดตามความเหมาะสมได้
                      <br />
                      จึงขอสอบถามว่าทางบริษัท สะดวกร่วมงานลักษณะนี้ไหมคะ
                    </p>
                  </>
                ) : currentStep === 2 ? (
                  <>
                    <p className="font-bold mb-4">ถึงบริษัท งานไม่จำกัด</p>
                    <p>
                      สวัสดีครับ โปรเจกต์ของเรามีความทับซ้อนทางด้านคอนเซป
                      <br />
                      ที่ต่อเนื่องกัน จึงต้องมีการจัดงานหลายงานพร้อมๆกัน
                      <br />
                      และมีระยะเวลาที่ค่อนข้างกระชับ ทางเราจึงอยากสอบถามว่า
                      <br />
                      ทางบริษัท สามารถทำงานลักษณะนี้ไหวไหมครับ
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-bold mb-4">ถึงบริษัท งานไม่จำกัด</p>
                    <p>
                      สวัสดีค่ะ ทางเรากำลังมองหาทีมที่สามารถดูแลโปรเจกต์
                      <br />
                      หลายส่วนได้พร้อมกันในช่วงเวลาเดียวกัน โดยครอบคลุม
                      <br />
                      ทั้งงานครีเอทีฟ งานออกแบบ งานคอนเทนต์ ภายใต้ระยะเวลา
                      <br />
                      ไม่เกิน 2 เดือน จึงอยากสอบถามว่าทางบริษัทงานไม่จำกัด
                      <br />
                      สามารถดำเนินงานหลายส่วนควบคู่กันได้ไหมคะ
                    </p>
                  </>
                )}
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex bg-[#d11181] border-t-2 border-black h-[70px]"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="พิมพ์สิ่งที่หัวหน้าบอก"
                  className="flex-1 bg-transparent text-white placeholder-white/80 px-6 outline-none text-[18px]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-[90px] bg-[#eefb20] border-l-2 border-black flex items-center justify-center hover:bg-[#d5e01a] transition-colors cursor-pointer"
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="white"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="absolute left-[1063px] top-[2578px] z-10">
            <PiroteNotificationCard
              className="block h-[160.06px] w-[540.14px]"
              onClick={() => setIsClicked(true)}
            />
          </div>
        ))}

      {/* ----------------- ฉากจบ (Phase 2 - Step 4) ----------------- */}
      {currentStep === 4 && (
        <div className="absolute left-0 top-0 h-full w-full z-20 pointer-events-none">
          {/* ฟังเพลง */}
          <img
            src={imgListenMusic}
            alt="ฟังเพลง"
            className="absolute left-[1320px] top-[2900px] w-[360px] object-contain drop-shadow-md z-20"
          />

          {/* แบบไม่มีเนื้อร้อง */}
          <img
            src={imgListenNoMusic}
            alt="แบบไม่มีเนื้อร้อง"
            className="absolute left-[400px] top-[2550px] w-[700px] object-contain drop-shadow-md"
          />

          {/* สามารถทำได้... */}
          <img
            src={imgCanDo}
            alt="สามารถทำได้..."
            className="absolute left-[700px] top-[3050px] w-[750px] object-contain"
          />

          {/* หูฟัง (อยู่ขอบจอขวา) */}
          <img
            src={imgHeadphone}
            alt="หูฟัง"
            className="absolute left-[1325px] top-[2400px] w-[500px] object-contain z-19"
          />

          {/* ไหวไม่ไหว ก็ไปกันต่อ (แก้ไขให้กดได้และเปลี่ยนหน้า) */}
          {/* เพิ่ม pointer-events-auto ให้รับการคลิกได้แม้ตัวครอบจะเป็น none */}
          <div
            className="absolute left-[610px] top-[3450px] w-[760px] flex flex-col items-center justify-center cursor-pointer pointer-events-auto transition-transform hover:scale-105 active:scale-95"
            onClick={handleNavigateNext} // ฟังก์ชันสำหรับเปลี่ยนหน้า
          >
            <img
              src={blinkMaiWhai ? imgMaiWhai2 : imgMaiWhai}
              alt="ไหวไม่ไหว ก็ไปกันต่อ"
              className="w-full object-contain drop-shadow-lg transition-opacity duration-100"
            />
          </div>
        </div>
      )}

      {/* ----------------- ป๊อปอัปผลลัพธ์ (ถูก/ผิด) ----------------- */}
      {feedbackState && (
        <div
          className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm cursor-pointer pointer-events-auto"
          onClick={handleFeedbackClick}
        >
          <img
            src={feedbackState === "correct" ? imgBossCorrect : imgBossWrong}
            alt={feedbackState === "correct" ? "Correct!" : "Wrong!"}
            className="absolute left-1/2 top-[3000px] -translate-x-1/2 -translate-y-1/2 w-[1200px] object-contain transition-transform hover:scale-105"
          />
        </div>
      )}

      {/* ----------------- รูปแล็ปท็อปพื้นหลัง ----------------- */}
      <div
        className="absolute left-[114.5px] top-[2505px] h-[1109.97px] w-[1690.47px]"
        data-name="คอม"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            alt="Laptop"
            className="absolute left-0 top-0 size-full max-w-none"
            src={imgLaptop}
          />
        </div>
      </div>
    </section>
  );
}

export function Game2Page() {
  const scale = useGame2Scale();

  return (
    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto bg-[#0d0d0d]">
      <div
        className="relative mx-auto shrink-0"
        style={{
          width: W * scale,
          height: H * scale,
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left will-change-transform"
          style={{
            width: W,
            height: H,
            transform: `scale(${scale})`,
          }}
        >
          <Game2Artboard />
        </div>
      </div>
    </div>
  );
}
