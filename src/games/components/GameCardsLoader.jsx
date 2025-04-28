import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../components/ThemeToggle";

const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "linear",
  },
};

const GameCardSkeleton = () => {
  const { isDark } = useTheme();

  return (
    <div className="relative group">
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-blue-500/30 rounded-lg blur opacity-30`}
      />
      <div
        className={`relative p-6 rounded-lg border h-full backdrop-blur-sm ${
          isDark
            ? "bg-black/80 border-indigo-500/30"
            : "bg-white/80 border-indigo-300/50"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.div
              className={`w-12 h-12 rounded-lg ${
                isDark ? "bg-indigo-500/20" : "bg-indigo-100"
              }`}
              {...shimmer}
            />
            <motion.div
              className={`h-8 w-48 rounded-lg ${
                isDark ? "bg-indigo-500/20" : "bg-indigo-100"
              }`}
              {...shimmer}
            />
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`h-4 rounded-lg ${
                isDark ? "bg-indigo-500/20" : "bg-indigo-100"
              }`}
              style={{ width: `${85 - i * 10}%` }}
              {...shimmer}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className={`w-16 h-6 rounded-full ${
                isDark ? "bg-indigo-500/20" : "bg-indigo-100"
              }`}
              {...shimmer}
            />
          ))}
        </div>

        <motion.div
          className={`w-full h-12 rounded-xl ${
            isDark ? "bg-indigo-500/20" : "bg-indigo-100"
          }`}
          {...shimmer}
        />
      </div>
    </div>
  );
};

const GameCardsLoader = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[1, 2, 3, 4].map((i) => (
        <GameCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default GameCardsLoader;
