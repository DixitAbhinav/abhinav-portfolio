import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FloatingCubes } from "../components/common/FloatingCubes";
import { GameCard } from "./components/GameCard";
import { games } from "../constants/gamesData";
import { useTheme } from "../components/ThemeToggle";
import GameCardsLoader from "./components/GameCardsLoader.jsx";
import { ArrowLeft } from "lucide-react";

const InteractiveGames = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        // Simulate API fetch
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setGameData(games);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return (
    <div
      className={`min-h-screen overflow-hidden ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <FloatingCubes />
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-4xl font-bold text-center ${
            isDark ? "text-white" : "text-gray-900"
          } mb-16`}
        >
          Interactive Games
          <div
            className={`w-24 h-1 bg-gradient-to-r ${
              isDark
                ? "from-white to-gray-500"
                : "from-indigo-600 to-indigo-300"
            } mx-auto mt-4 rounded-full`}
          />
        </motion.h1>

        {loading ? (
          <GameCardsLoader />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: -20 }, // Start off above the screen (optional)
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1, // This staggers the animation of each child
                },
              },
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {gameData.map((game) => (
              <motion.div
                key={game.title}
                initial={{ opacity: 0, y: -20 }} // Start from above
                animate={{ opacity: 1, y: 0 }} // Move to normal position
                transition={{ duration: 0.5 }} // Smooth transition
              >
                <GameCard game={game} onClick={() => navigate(game.path)} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InteractiveGames;
