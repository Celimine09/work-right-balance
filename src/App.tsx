import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { IntroLayout } from "./pages/IntroLayout";
import { MultitaskingPage } from "./pages/MultitaskingPage";
import { Game1Page } from "./pages/Game1Page";
import { Game2Page } from "./pages/Game2Page";
import { Game3Page } from "./pages/Game3Page";

export default function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/intro" element={<IntroLayout />} />
        <Route path="/multitasking" element={<MultitaskingPage />} />
        <Route path="/game1" element={<Game1Page />} />
        <Route path="/game2" element={<Game2Page />} />
        <Route path="/game3" element={<Game3Page />} />
      </Routes>
    </div>
  );
}
