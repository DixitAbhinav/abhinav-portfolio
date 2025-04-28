import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Play,
  ArrowRight,
  Gamepad2,
  Palette,
  Keyboard,
  ArrowRight as ArrowRightIcon,
} from "lucide-react";
import { games } from "../../constants/gamesData";
import { useTheme } from "../ThemeToggle";

const ICON_SIZES = {
  large: "w-5 h-5 sm:w-6 sm:h-6",
  medium: "w-5 h-5 sm:w-7 sm:h-7",
  small: "w-4 h-4 sm:w-5 sm:h-5",
  extrasmall: "w-3 h-3 sm:w-4 sm:h-4",
};

export const GamesShowcase = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const getGameIcon = (index) => {
    const iconClass = isDark ? "text-indigo-400" : "text-indigo-600";
    switch (index) {
      case 0:
        return <Palette className={`${ICON_SIZES.medium} ${iconClass}`} />;
      case 1:
        return <Keyboard className={`${ICON_SIZES.medium} ${iconClass}`} />;
      default:
        return <Gamepad2 className={`${ICON_SIZES.medium} ${iconClass}`} />;
    }
  };

  return (
    <section className={`py-12 sm:py-20 relative ${isDark ? "bg-black" : "bg-white"}`}>
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          isDark
            ? "from-indigo-900/1 via-black to-black"
            : "from-indigo-100/50 via-white to-white"
        }`}
      />
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_50%)]"
            : "bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-2xl sm:text-3xl md:text-4xl font-extrabold font-['Inter'] text-center tracking-tight ${
            isDark ? "text-white" : "text-gray-900"
          } mb-8 sm:mb-16`}
        >
          Interactive Games
          <div
            className={`w-16 md:w-24 h-1 bg-gradient-to-r ${
              isDark
                ? "from-white to-gray-500"
                : "from-indigo-600 to-indigo-300"
            } mx-auto mt-3 sm:mt-4 rounded-full`}
          />
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
          {games.slice(0, 2).map((game, index) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
              whileHover={{ y: -5 }}
            >
              <div
                className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur opacity-30 
                           group-hover:opacity-70 transition duration-300"
              />

              <div
                className={`relative p-4 sm:p-6 rounded-lg border h-full 
                           backdrop-blur-sm transition-all duration-300
                           hover:shadow-[0_0_30px_-5px] ${
                             isDark
                               ? "bg-black/90 border-indigo-500/30 group-hover:border-indigo-400 hover:shadow-indigo-500/20"
                               : "bg-white/90 border-indigo-300/50 group-hover:border-indigo-500 hover:shadow-indigo-400/20"
                           }`}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <motion.div
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
                        isDark
                          ? "bg-indigo-500/10 group-hover:bg-indigo-500/20"
                          : "bg-indigo-100/50 group-hover:bg-indigo-200/70"
                      }`}
                    >
                      {getGameIcon(index)}
                    </motion.div>
                    <h3
                      className={`text-lg sm:text-xl font-extrabold font-['Inter'] tracking-tight transition-colors duration-300 flex items-center ${
                        isDark
                          ? "text-white group-hover:text-indigo-400"
                          : "text-gray-900 group-hover:text-indigo-600"
                      }`}
                    >
                      {game.title}
                    </h3>
                  </div>

                  <motion.button
                    onClick={() => navigate(game.path)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-1.5 sm:p-2.5 border rounded-lg transition-all duration-300 group/play ${
                      isDark
                        ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 hover:border-indigo-400"
                        : "bg-indigo-100/50 border-indigo-300/50 text-indigo-600 hover:bg-indigo-200/70 hover:border-indigo-500"
                    }`}
                  >
                    <Play className={ICON_SIZES.small} />
                    <motion.div
                      className={`absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                                 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded opacity-0 group-hover/play:opacity-100
                                 border transition-opacity duration-300 ${
                                   isDark
                                     ? "bg-black/80 border-indigo-500/30 text-indigo-400"
                                     : "bg-white/80 border-indigo-300/50 text-indigo-600"
                                 }`}
                    >
                      Play Now
                    </motion.div>
                  </motion.button>
                </div>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6 px-2 sm:px-3">
                  {game.description.map((desc, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <div
                        className={`flex-shrink-0 p-0.5 sm:p-1 rounded-md mt-0.5
                        ${isDark ? "bg-indigo-600/20" : "bg-indigo-100"}`}
                      >
                        <ArrowRightIcon
                          className={`${ICON_SIZES.extrasmall} ${
                            isDark ? "text-indigo-400" : "text-indigo-600"
                          }`}
                        />
                      </div>
                      <p
                        className={`transition-colors duration-300 text-xs sm:text-sm md:text-base font-['Inter'] font-normal leading-relaxed ${
                          isDark
                            ? "text-gray-300 group-hover:text-gray-200"
                            : "text-gray-600 group-hover:text-gray-900"
                        }`}
                      >
                        {desc}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-1.5 sm:gap-2"
                >
                  {game.tech.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-['Inter'] font-medium border rounded-full 
                               transition-all duration-300 cursor-default
                               flex items-center gap-1 sm:gap-1.5 ${
                                 isDark
                                   ? "text-indigo-400 border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 hover:border-indigo-400"
                                   : "text-indigo-600 border-indigo-300/50 bg-indigo-100/50 hover:bg-indigo-200/70 hover:border-indigo-500"
                               }`}
                    >
                      {index === 0 ? (
                        <Palette
                          className={`${ICON_SIZES.extrasmall} sm:${ICON_SIZES.small} ${
                            isDark ? "text-indigo-400" : "text-indigo-600"
                          }`}
                        />
                      ) : (
                        <Keyboard
                          className={`${ICON_SIZES.extrasmall} sm:${ICON_SIZES.small} ${
                            isDark ? "text-indigo-400" : "text-indigo-600"
                          }`}
                        />
                      )}
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            onClick={() => navigate("/games")}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            className={`relative px-5 sm:px-8 py-1.5 sm:py-2 backdrop-blur-sm 
               border rounded-xl shadow-lg
               transition-all duration-300
               inline-flex items-center gap-2 sm:gap-3 group ${
                 isDark
                   ? "bg-gradient-to-r from-indigo-600/20 to-indigo-400/10 border-indigo-500/40 text-indigo-300 hover:text-white hover:border-indigo-400/80 hover:from-indigo-600/30 hover:to-indigo-400/20"
                   : "bg-gradient-to-r from-indigo-100 to-indigo-50 border-indigo-300/60 text-indigo-600 hover:text-indigo-900 hover:border-indigo-500 hover:from-indigo-200 hover:to-indigo-100"
               }`}
          >
            <span className="font-semibold tracking-wide font-['Inter'] text-sm sm:text-base">
              View More
            </span>
            <div className="relative">
              <motion.div
                className={`absolute inset-0 rounded-md blur-md ${
                  isDark ? "bg-indigo-500/30" : "bg-indigo-400/30"
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <ArrowRight
                className={`w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300`}
              />
            </div>

            {/* Add a subtle background effect */}
            <motion.div
              className={`absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDark
                  ? "bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)]"
                  : "bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_70%)]"
              }`}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default GamesShowcase;
