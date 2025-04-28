// src/components/common/Scoreboard.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, Award } from "lucide-react";

export const Scoreboard = ({
  gameId,
  currentScore,
  onClose,
  metric = "points",
  isHigherBetter = true,
}) => {
  const [scores, setScores] = useState([]);
  const [newHighScore, setNewHighScore] = useState(false);

  useEffect(() => {
    // Load scores from localStorage
    const savedScores = JSON.parse(
      localStorage.getItem(`${gameId}_scores`) || "[]"
    );
    setScores(savedScores);

    // Check if current score is a high score
    if (currentScore) {
      const isHighScore = isHigherBetter
        ? currentScore > (savedScores[0]?.score || 0)
        : currentScore < (savedScores[0]?.score || Infinity);

      if (isHighScore) {
        setNewHighScore(true);
        const newScores = [
          { score: currentScore, date: new Date().toISOString() },
          ...savedScores,
        ].slice(0, 10); // Keep top 10 scores

        setScores(newScores);
        localStorage.setItem(`${gameId}_scores`, JSON.stringify(newScores));
      }
    }
  }, [gameId, currentScore, isHigherBetter]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Trophy className="text-yellow-500" />
              High Scores
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ×
            </button>
          </div>

          {newHighScore && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-indigo-500/20 border border-indigo-500/30 rounded-lg p-4 mb-6 text-center"
            >
              <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
              <p className="text-white font-bold">New High Score!</p>
              <p className="text-indigo-400">
                {currentScore} {metric}
              </p>
            </motion.div>
          )}

          <div className="space-y-3">
            {scores.map((score, index) => (
              <motion.div
                key={`${score.date}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-3 rounded-lg
                  ${
                    index === 0
                      ? "bg-indigo-500/20 border border-indigo-500/30"
                      : "bg-gray-800"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 font-mono w-6">
                    #{index + 1}
                  </span>
                  <span className="text-white font-bold">
                    {score.score} {metric}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(score.date).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}

            {scores.length === 0 && (
              <div className="text-center text-gray-400 py-8">
                No scores yet. Start playing to set some records!
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg
                       hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Scoreboard;
