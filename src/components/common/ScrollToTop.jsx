import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useTheme } from "../ThemeToggle";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
    hover: {
      y: -5,
      scale: 1.1,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          className={`fixed bottom-9 right-5 z-50 p-2 md:p-3 rounded-full
            backdrop-blur-sm focus:outline-none focus:ring-2
            ${
              isDark
                ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400 focus:ring-indigo-500/20"
                : "bg-indigo-400/20 border-indigo-400/30 text-indigo-600 focus:ring-indigo-400/20"
            } border`}
          onClick={scrollToTop}
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover="hover"
          whileTap="tap"
          aria-label="Scroll to top"
        >
          <div className="relative">
            <motion.div
              className={`absolute inset-0 rounded-full blur-md opacity-30
                ${isDark ? "bg-indigo-500" : "bg-indigo-400"}`}
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
            <ChevronUp className="w-5 h-5 md:w-6 md:h-6 relative z-10" />
            <motion.div
              className={`absolute inset-0 border-2 rounded-full
                ${isDark ? "border-indigo-500/50" : "border-indigo-400/50"}`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
