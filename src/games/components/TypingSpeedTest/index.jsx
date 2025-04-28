import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, Award, RefreshCcw, Keyboard, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { useTheme } from "../../../components/ThemeToggle";

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold; often have you heard that told.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
];

export const TypingSpeedTest = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [timer, setTimer] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      startNewGame();
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      calculateResults();
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const startNewGame = () => {
    const randomText =
      sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setText(randomText);
    setInput("");
    setTimer(30);
    setIsActive(false);
    setWpm(0);
    setAccuracy(100);
    setShowResults(false);
  };

  const calculateResults = () => {
    const words = input.trim().split(" ").length;
    const minutes = (30 - timer) / 60;
    const calculatedWPM = Math.round(words / minutes);
    setWpm(calculatedWPM);

    const correctChars = input
      .split("")
      .filter((char, index) => char === text[index]).length;
    const calculatedAccuracy = Math.round((correctChars / input.length) * 100);
    setAccuracy(calculatedAccuracy);

    setShowResults(true);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (!isActive && value.length === 1) {
      setIsActive(true);
    }
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
          className={`text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3
          ${isDark ? "text-white" : "text-gray-900"}`}
        >
          <Keyboard className="w-8 h-8" />
          Typing Speed Test
        </h1>

        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <Timer className={isDark ? "text-indigo-400" : "text-indigo-600"} />
            <span
              className={`font-mono text-xl ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {timer}s
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Award className={isDark ? "text-yellow-500" : "text-yellow-600"} />
            <span
              className={`font-mono text-xl ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {wpm} WPM
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`font-mono text-xl ${
                accuracy >= 90
                  ? isDark
                    ? "text-green-500"
                    : "text-green-600"
                  : isDark
                  ? "text-red-500"
                  : "text-red-600"
              }`}
            >
              {accuracy}%
            </span>
            <span className={isDark ? "text-white" : "text-gray-900"}>
              Accuracy
            </span>
          </div>
        </div>

        <div
          className={`p-6 rounded-lg mb-8 ${
            isDark ? "bg-gray-900/50" : "bg-gray-100"
          }`}
        >
          <p
            className={`font-mono text-lg leading-relaxed ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {text.split("").map((char, index) => (
              <span
                key={index}
                className={
                  input[index] === undefined
                    ? ""
                    : input[index] === char
                    ? isDark
                      ? "text-green-500"
                      : "text-green-600"
                    : isDark
                    ? "text-red-500"
                    : "text-red-600"
                }
              >
                {char}
              </span>
            ))}
          </p>
        </div>

        <div className="space-y-6">
          <textarea
            value={input}
            onChange={handleInputChange}
            disabled={timer === 0}
            className={`w-full h-32 p-4 rounded-lg
                     border focus:ring-1 outline-none
                     font-mono resize-none transition-colors
                     ${
                       isDark
                         ? "bg-gray-900 text-white border-indigo-500/30 focus:border-indigo-500 focus:ring-indigo-500"
                         : "bg-white text-gray-900 border-indigo-300/50 focus:border-indigo-600 focus:ring-indigo-600"
                     }`}
            placeholder="Start typing here..."
          />

          <div className="flex justify-center">
            <button
              onClick={startNewGame}
              className={`px-6 py-3 text-white rounded-lg
                       transition-colors flex items-center gap-2
                       ${
                         isDark
                           ? "bg-indigo-600 hover:bg-indigo-700"
                           : "bg-indigo-500 hover:bg-indigo-600"
                       }`}
            >
              <RefreshCcw size={18} />
              New Game
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`fixed inset-0 backdrop-blur-sm
                       flex items-center justify-center
                       ${isDark ? "bg-black/80" : "bg-gray-500/20"}`}
            >
              <div
                className={`p-8 rounded-lg text-center ${
                  isDark ? "bg-gray-900" : "bg-white"
                }`}
              >
                <h2
                  className={`text-2xl font-bold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Results
                </h2>
                <p
                  className={`text-xl mb-2 ${
                    isDark ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  Words per minute: {wpm}
                </p>
                <p
                  className={`text-xl mb-6 ${
                    isDark ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  Accuracy: {accuracy}%
                </p>
                <button
                  onClick={startNewGame}
                  className={`px-6 py-3 text-white rounded-lg
                           transition-colors
                           ${
                             isDark
                               ? "bg-indigo-600 hover:bg-indigo-700"
                               : "bg-indigo-500 hover:bg-indigo-600"
                           }`}
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TypingSpeedTest;
