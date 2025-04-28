import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, RefreshCcw, Timer, Trophy, ArrowLeft } from "lucide-react";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { useTheme } from "../../../components/ThemeToggle";

const GRID_SIZE = 4;

const createInitialBoard = () => {
  const numbers = Array.from(
    { length: GRID_SIZE * GRID_SIZE - 1 },
    (_, i) => i + 1
  );
  numbers.push(null);

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
};

const isSolved = (board) => {
  for (let i = 0; i < board.length - 1; i++) {
    if (board[i] !== i + 1) return false;
  }
  return board[board.length - 1] === null;
};

export const SlidingPuzzle = () => {
  const { isDark } = useTheme();
  const [board, setBoard] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      startNewGame();
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const startNewGame = () => {
    setBoard(createInitialBoard());
    setMoves(0);
    setTimer(0);
    setIsActive(true);
    setShowSuccess(false);
  };

  const handleTileClick = (index) => {
    if (!isActive) return;

    const emptyIndex = board.indexOf(null);
    const row = Math.floor(index / GRID_SIZE);
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
    const col = index % GRID_SIZE;
    const emptyCol = emptyIndex % GRID_SIZE;

    if (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    ) {
      const newBoard = [...board];
      [newBoard[index], newBoard[emptyIndex]] = [
        newBoard[emptyIndex],
        newBoard[index],
      ];
      setBoard(newBoard);
      setMoves((moves) => moves + 1);

      if (isSolved(newBoard)) {
        setIsActive(false);
        setShowSuccess(true);
      }
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
          <Grid className="w-8 h-8" />
          Sliding Puzzle
        </h1>

        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <Timer className={isDark ? "text-indigo-400" : "text-indigo-600"} />
            <span
              className={`font-mono text-xl ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy
              className={isDark ? "text-yellow-500" : "text-yellow-600"}
            />
            <span
              className={`font-mono text-xl ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {moves} moves
            </span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto mb-8">
          {board.map((number, index) => (
            <motion.button
              key={number || "empty"}
              onClick={() => handleTileClick(index)}
              className={`w-full aspect-square rounded-lg text-2xl font-bold
                ${
                  number
                    ? isDark
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-indigo-500 hover:bg-indigo-600 text-white"
                    : isDark
                    ? "bg-gray-900"
                    : "bg-gray-100"
                } transition-colors`}
              whileHover={{ scale: number ? 1.05 : 1 }}
              whileTap={{ scale: number ? 0.95 : 1 }}
            >
              {number}
            </motion.button>
          ))}
        </div>

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

        <AnimatePresence>
          {showSuccess && (
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
                  Puzzle Solved!
                </h2>
                <p
                  className={`text-xl mb-2 ${
                    isDark ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  Time: {Math.floor(timer / 60)}:
                  {String(timer % 60).padStart(2, "0")}
                </p>
                <p
                  className={`text-xl mb-6 ${
                    isDark ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  Moves: {moves}
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
                  Play Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SlidingPuzzle;
