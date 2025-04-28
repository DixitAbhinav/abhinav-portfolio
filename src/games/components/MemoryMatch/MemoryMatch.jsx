import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, RefreshCcw, Timer, Trophy, ArrowLeft } from "lucide-react";
import LoadingSpinner from "../../../components/common/LoadingSpinner";
import { useTheme } from "../../../components/ThemeToggle";

const GRID_SIZE = 16;
const SYMBOLS = ["🎮", "🎲", "🎯", "🎪", "🎨", "🎭", "🎪", "🎸"];

const createInitialCards = () => {
  const symbols = [...SYMBOLS, ...SYMBOLS];
  return symbols
    .sort(() => Math.random() - 0.5)
    .map((symbol, index) => ({
      id: index,
      symbol,
      isFlipped: false,
      isMatched: false,
    }));
};

export const MemoryMatch = () => {
  const { isDark } = useTheme();
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
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

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].symbol === cards[second].symbol) {
        setCards((prevCards) =>
          prevCards.map((card, index) =>
            index === first || index === second
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatches((m) => m + 1);
        setFlippedCards([]);

        if (matches + 1 === GRID_SIZE / 2) {
          setIsActive(false);
          setShowSuccess(true);
        }
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card, index) =>
              index === first || index === second
                ? { ...card, isFlipped: false }
                : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
      setMoves((m) => m + 1);
    }
  }, [flippedCards, cards, matches]);

  const startNewGame = () => {
    setCards(createInitialCards());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setTimer(0);
    setIsActive(true);
    setShowSuccess(false);
  };

  const handleCardClick = (index) => {
    if (
      !isActive ||
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      cards[index].isMatched ||
      cards[index].isFlipped
    )
      return;

    setCards((prevCards) =>
      prevCards.map((card, i) =>
        i === index ? { ...card, isFlipped: true } : card
      )
    );
    setFlippedCards((prev) => [...prev, index]);
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
          <Brain className="w-8 h-8" />
          Memory Match
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

        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-8">
          {cards.map((card, index) => (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`w-full aspect-square rounded-lg text-3xl transition-colors
                ${
                  card.isFlipped || card.isMatched
                    ? isDark
                      ? "bg-indigo-600"
                      : "bg-indigo-500"
                    : isDark
                    ? "bg-gray-900"
                    : "bg-gray-200"
                }`}
              whileHover={{
                scale: !card.isMatched && !card.isFlipped ? 1.05 : 1,
              }}
              whileTap={{
                scale: !card.isMatched && !card.isFlipped ? 0.95 : 1,
              }}
            >
              {(card.isFlipped || card.isMatched) && card.symbol}
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
                  All Matches Found!
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
                    transition-colors ${
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

export default MemoryMatch;
