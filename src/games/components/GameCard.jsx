import { motion } from "framer-motion";
import { useTheme } from "../../components/ThemeToggle";
import { ArrowRight } from "lucide-react";

// Text highlighting function similar to what we added to ProjectCard
const highlightText = (text, isDark) => {
  return text.split(" ").map((word, i) => {
    const key = `${text.substring(0, 10)}-${i}-${word}`;

    // Game-related important terms (highlighted in indigo)
    if (
      word.match(
        /(Challenge|Test|Improve|Practice|Classic|Race|Match|Track|View|Skills|Time|Progress|Performance|Puzzle|Logic|Strategy|Memory|Pattern|Focus|Recognition)/i
      )
    ) {
      return (
        <span
          key={key}
          className={`font-semibold ${
            isDark ? "text-indigo-400" : "text-indigo-600"
          }`}
        >
          {word}{" "}
        </span>
      );
    }
    // Technical terms (highlighted in blue)
    else if (
      word.match(
        /(RGB|Color|Theory|Reaction|Speed|WPM|Accuracy|Statistics|Sliding|Tile|Spatial|Reasoning|Metrics|Passages)/i
      )
    ) {
      return (
        <span
          key={key}
          className={`font-mono ${
            isDark ? "text-blue-400" : "text-blue-600"
          }`}
        >
          {word}{" "}
        </span>
      );
    }

    return <span key={key}>{word} </span>;
  });
};

export const GameCard = ({ game, onClick }) => {
  const { isDark } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative group cursor-pointer"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur opacity-30 
                   group-hover:opacity-70 transition duration-300"
      />

      <div
        className={`relative p-6 rounded-lg border h-full 
                   backdrop-blur-sm transition-all duration-300 ${
                     isDark
                       ? "bg-black/90 border-indigo-500/30 group-hover:border-indigo-400"
                       : "bg-white/90 border-indigo-300/50 group-hover:border-indigo-500"
                   }`}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className={`p-3 rounded-lg transition-colors duration-300 ${
                isDark
                  ? "bg-indigo-500/10 group-hover:bg-indigo-500/20"
                  : "bg-indigo-100/50 group-hover:bg-indigo-200/70"
              }`}
            >
              <game.icon
                className={`w-8 h-8 transition-colors duration-300 ${
                  isDark
                    ? "text-indigo-400 group-hover:text-indigo-300"
                    : "text-indigo-600 group-hover:text-indigo-500"
                }`}
              />
            </motion.div>
            <h3
              className={`ml-4 text-2xl font-extrabold font-['Inter'] tracking-tight transition-colors duration-300 ${
                isDark
                  ? "text-white group-hover:text-indigo-400"
                  : "text-gray-900 group-hover:text-indigo-600"
              }`}
            >
              {game.title}
            </h3>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {game.description.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-start ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <div
                className={`flex-shrink-0 p-1 rounded-md mr-2
                ${isDark ? "bg-indigo-600/20" : "bg-indigo-100"}`}
              >
                <ArrowRight
                  className={`w-3 h-3 ${
                    isDark ? "text-indigo-400" : "text-indigo-600"
                  }`}
                />
              </div>
              
              <p className="flex-1 text-sm sm:text-base font-['Inter'] font-normal leading-relaxed">
                {highlightText(item, isDark)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {game.tech.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className={`px-3 py-1 text-xs font-['Inter'] font-medium border rounded-full transition-all ${
                isDark
                  ? "text-indigo-400 border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20"
                  : "text-indigo-600 border-indigo-300/50 bg-indigo-100/50 hover:bg-indigo-200/70"
              }`}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Original Play Now button preserved exactly as it was */}
        <motion.div className="mt-6 relative group/button">
          <motion.div
            className={`absolute -inset-1 bg-gradient-to-r rounded-xl blur opacity-30 
                              group-hover/button:opacity-50 transition duration-300 ${
                                isDark
                                  ? "from-indigo-400 via-indigo-400 to-indigo-500"
                                  : "from-indigo-300 via-indigo-400 to-indigo-500"
                              }`}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative w-full py-3 rounded-xl
                     border transition-all duration-300
                     flex items-center justify-center gap-2 ${
                       isDark
                         ? "bg-black border-indigo-500/30 text-indigo-400 group-hover/button:border-indigo-400"
                         : "bg-white border-indigo-300/50 text-indigo-600 group-hover/button:border-indigo-500"
                     }`}
          >
            <span className="font-medium">Play Now</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              <motion.div
                className={`absolute -inset-1 rounded-full blur opacity-30 ${
                  isDark ? "bg-indigo-500" : "bg-indigo-400"
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="relative">→</span>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};
