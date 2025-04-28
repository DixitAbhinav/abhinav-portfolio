import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../ThemeToggle";

export const BlogNavLink = () => {
  const navigate = useNavigate();
  const [isCompact, setIsCompact] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setIsCompact(window.scrollY > heroHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.button
        onClick={() => navigate("/blog")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative group flex items-center gap-2 sm:gap-3
          ${
            isDark
              ? "bg-black/95 border-indigo-950 shadow-indigo-950/20 hover:shadow-indigo-900/30 hover:border-indigo-900/60"
              : "bg-white/95 border-indigo-200 shadow-indigo-200/20 hover:shadow-indigo-300/30 hover:border-indigo-300"
          } border backdrop-blur-md shadow-lg
          transition-all duration-300 overflow-hidden
          ${
            isCompact
              ? "p-2 sm:p-2.5 rounded-lg sm:rounded-[1.2rem]"
              : "px-4 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-[1.2rem]"
          }`}
      >
        {/* Decorative shapes background */}
        <div className="absolute inset-0 overflow-hidden opacity-20 sm:opacity-30">
          <motion.div
            className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-1 sm:w-2 h-1 sm:h-2 rounded-full ${
                  isDark ? "bg-indigo-600/30" : "bg-indigo-400/30"
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Diamond shapes on hover */}
        <motion.div
          className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300
            ${
              isCompact
                ? "rounded-lg sm:rounded-[1.2rem]"
                : "rounded-lg sm:rounded-[1.2rem]"
            }`}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: [45, 405],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-3 sm:w-4 h-3 sm:h-4 border ${
                  isDark ? "border-indigo-500/40" : "border-indigo-400/40"
                }`}
                style={{
                  top: `${(i < 3 ? 20 : 25) * Math.sin((i * Math.PI) / 2)}%`,
                  left: `${(i < 3 ? 20 : 25) * Math.cos((i * Math.PI) / 2)}%`,
                  transform: "rotate(45deg)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Icon with pulse effect */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <MessageCircle
            className={`w-4 sm:w-5 h-4 sm:h-5 transition-colors ${
              isDark
                ? "text-indigo-400 group-hover:text-indigo-300"
                : "text-indigo-600 group-hover:text-indigo-500"
            }`}
          />
        </motion.div>

        {!isCompact && (
          <>
            {/* Text */}
            <span
              className={`relative text-sm sm:text-base font-medium
              transition-colors duration-300 ${
                isDark
                  ? "text-indigo-300 group-hover:text-indigo-200"
                  : "text-indigo-600 group-hover:text-indigo-700"
              }`}
            >
              Read Blog
            </span>

            {/* Animated dots */}
            <div className="flex gap-1 sm:gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="relative w-1 sm:w-1.5 h-1 sm:h-1.5"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <div
                    className={`absolute inset-0 shadow-sm sm:shadow-lg rounded-full 
                    transition-colors duration-300 ${
                      isDark
                        ? "bg-indigo-700 group-hover:bg-indigo-500 shadow-indigo-900/50"
                        : "bg-indigo-500 group-hover:bg-indigo-600 shadow-indigo-300/50"
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default BlogNavLink;
