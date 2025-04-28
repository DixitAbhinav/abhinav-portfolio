import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RefreshCcw, ArrowLeft, Palette } from "lucide-react";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { useTheme } from "../../../components/ThemeToggle";

const ColorBox = ({ color, label, isDark }) => (
  <div className="flex flex-col items-center gap-2">
    <motion.div
      className={`w-32 h-32 rounded-lg shadow-lg border-2 ${
        isDark ? "border-indigo-500/30" : "border-indigo-400/30"
      }`}
      style={{
        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
      }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    />
    <span
      className={`text-sm font-mono ${
        isDark ? "text-gray-300" : "text-gray-600"
      }`}
    >
      {label}
    </span>
  </div>
);

const Slider = ({ color, value, onChange, isDark }) => (
  <div className="flex items-center gap-4">
    <span
      className={`uppercase w-8 font-mono ${
        isDark ? "text-gray-300" : "text-gray-600"
      }`}
    >
      {color}
    </span>
    <input
      type="range"
      min="0"
      max="255"
      value={value}
      onChange={(e) => onChange(color, e.target.value)}
      className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
        isDark ? "bg-gray-800" : "bg-gray-200"
      }`}
    />
    <span
      className={`w-12 font-mono text-right ${
        isDark ? "text-gray-300" : "text-gray-600"
      }`}
    >
      {value}
    </span>
  </div>
);

export const ColorMatchGame = () => {
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [targetColor, setTargetColor] = useState({ r: 0, g: 0, b: 0 });
  const [playerColor, setPlayerColor] = useState({ r: 128, g: 128, b: 128 });
  const [score, setScore] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      startNewGame();
      setIsLoading(false);
    }, 500);
  }, []);

  const startNewGame = () => {
    setTargetColor({
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256),
    });
    setPlayerColor({ r: 128, g: 128, b: 128 });
  };

  const handleSubmit = () => {
    const diffR = Math.abs(targetColor.r - playerColor.r);
    const diffG = Math.abs(targetColor.g - playerColor.g);
    const diffB = Math.abs(targetColor.b - playerColor.b);
    const totalDiff = diffR + diffG + diffB;
    const matchPercentage = Math.max(0, 100 - totalDiff / 7.65);
    const roundScore = Math.round(matchPercentage);

    setScore((prevScore) => prevScore + roundScore);
    setToastMessage(`Match Score: ${roundScore}%`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    setTimeout(startNewGame, 1500);
  };

  if (isLoading) {
    return (
      <div
        className={`fixed inset-0 ${
          isDark ? "bg-black" : "bg-white"
        } flex items-center justify-center`}
      >
        <LoadingSpinner text="Loading..." />
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-8 ${isDark ? "bg-black" : "bg-white"}`}>
      <button
        onClick={() => window.history.back()}
        className="fixed top-6 left-5 p-2 rounded-full z-50 
          focus:outline-none shadow-md
          bg-white text-blue-600
          transition-all duration-300 hover:bg-blue-50 hover:shadow-lg
          outline outline-1 outline-gray-300"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      
      <div className="max-w-4xl mx-auto pt-20">
        <h1
          className={`text-4xl font-bold text-center mb-12 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Color Match Challenge
        </h1>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <ColorBox color={targetColor} label="Target Color" isDark={isDark} />
          <ColorBox color={playerColor} label="Your Color" isDark={isDark} />
        </div>

        <div
          className={`space-y-6 p-8 rounded-lg border transition-colors ${
            isDark
              ? "bg-black/50 border-indigo-500/30"
              : "bg-gray-50/50 border-indigo-300/30"
          }`}
        >
          <Slider
            color="r"
            value={playerColor.r}
            onChange={(_, value) =>
              setPlayerColor((prev) => ({ ...prev, r: parseInt(value) }))
            }
            isDark={isDark}
          />
          <Slider
            color="g"
            value={playerColor.g}
            onChange={(_, value) =>
              setPlayerColor((prev) => ({ ...prev, g: parseInt(value) }))
            }
            isDark={isDark}
          />
          <Slider
            color="b"
            value={playerColor.b}
            onChange={(_, value) =>
              setPlayerColor((prev) => ({ ...prev, b: parseInt(value) }))
            }
            isDark={isDark}
          />

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className={`px-6 py-3 text-white rounded-lg transition-colors
                ${
                  isDark
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-indigo-500 hover:bg-indigo-600"
                }`}
            >
              Submit
            </button>
            <button
              onClick={startNewGame}
              className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2
                ${
                  isDark
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              <RefreshCcw size={18} />
              New Color
            </button>
          </div>
        </div>

        <div className="fixed top-6 right-6 flex items-center gap-2">
          <Trophy className={isDark ? "text-yellow-500" : "text-yellow-600"} />
          <span
            className={`font-mono text-xl ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {score}
          </span>
        </div>

        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`fixed top-6 left-1/2 -translate-x-1/2 
                px-6 py-3 rounded-lg border ${
                  isDark
                    ? "bg-indigo-500/20 border-indigo-500/30 text-white"
                    : "bg-indigo-100/50 border-indigo-300/30 text-indigo-900"
                }`}
            >
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ColorMatchGame;
