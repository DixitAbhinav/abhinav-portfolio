import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import InteractiveGames from "@/games/InteractiveGames";
import ColorMatchGame from "@/games/components/ColorMatchGame/index";
import TypingSpeedTest from "@/games/components/TypingSpeedTest/index";
import FirstLoading from "@/components/common/FirstLoading";
import SlidingPuzzle from "@/games/components/SlidingPuzzle/SlidingPuzzle";
import MemoryMatch from "@/games/components/MemoryMatch/MemoryMatch";
import ComingSoon from "@/components/common/ComingSoon";
import ImageCompressor from "./tools/Image";
import QRGenerator from "./tools/QRGenerator";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTimeout(() => setIsLoading(false), 1500);
    } else {
      setIsLoading(false);
    }
  }, [location]);

  return (
    <>
      {isLoading && <FirstLoading />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<ComingSoon />} />
        <Route path="/games" element={<InteractiveGames />} />
        <Route path="/games/color-match" element={<ColorMatchGame />} />
        <Route path="/games/typing-test" element={<TypingSpeedTest />} />
        <Route path="/games/sliding-puzzle" element={<SlidingPuzzle />} />
        <Route path="/games/memory-match" element={<MemoryMatch />} />
        <Route path="tools/image-compressor" element={<ImageCompressor />} />
        <Route path="tools/qr-generator" element={<QRGenerator />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
