import React, { useState } from "react";
import { motion } from "framer-motion";
import { Timer, Bell, Check, ArrowLeft } from "lucide-react";
import { FloatingCubes } from "./FloatingCubes";
import { useTheme } from "../ThemeToggle";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <div
      className={`min-h-screen overflow-hidden flex flex-col items-center justify-center relative px-4 
      ${isDark ? "bg-black" : "bg-white"}`}
    >
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

      <FloatingCubes />

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-8 relative w-48 h-48 mx-auto"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            className="w-full h-full"
          >
            <defs>
              <linearGradient
                id="cardGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  style={{
                    stopColor: isDark ? "#4f46e5" : "#6366f1",
                    stopOpacity: 1,
                  }}
                />
                <stop
                  offset="100%"
                  style={{
                    stopColor: isDark ? "#6366f1" : "#818cf8",
                    stopOpacity: 0.8,
                  }}
                />
              </linearGradient>
            </defs>

            {/* Main Card */}
            <rect
              x="40"
              y="40"
              width="120"
              height="120"
              rx="8"
              fill="url(#cardGradient)"
              filter={
                isDark
                  ? "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
                  : "drop-shadow(0 4px 6px rgba(99, 102, 241, 0.1))"
              }
            >
              <animate
                attributeName="y"
                values="42;38;42"
                dur="3s"
                repeatCount="indefinite"
              />
            </rect>

            {/* Content Lines */}
            <g fill={isDark ? "#fff" : "#6366f1"} opacity="0.9">
              {/* Header */}
              <rect x="55" y="60" width="60" height="8" rx="4">
                <animate
                  attributeName="width"
                  values="60;65;60"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </rect>

              {/* Content Lines */}
              {[0, 1, 2].map((i) => (
                <rect
                  key={i}
                  x="55"
                  y={80 + i * 16}
                  width={90 - i * 10}
                  height="6"
                  rx="3"
                  opacity="0.7"
                >
                  <animate
                    attributeName="width"
                    values={`${90 - i * 10};${95 - i * 10};${90 - i * 10}`}
                    dur="3s"
                    repeatCount="indefinite"
                    begin={`${i * 0.2}s`}
                  />
                </rect>
              ))}
            </g>

            {/* Decorative Elements */}
            <g>
              {/* Top Right Corner */}
              <circle
                cx="145"
                cy="55"
                r="3"
                fill={isDark ? "#fff" : "#6366f1"}
                opacity="0.5"
              >
                <animate
                  attributeName="opacity"
                  values="0.5;0.8;0.5"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Bottom Left Corner */}
              <circle
                cx="55"
                cy="145"
                r="3"
                fill={isDark ? "#fff" : "#6366f1"}
                opacity="0.5"
              >
                <animate
                  attributeName="opacity"
                  values="0.5;0.8;0.5"
                  dur="2s"
                  repeatCount="indefinite"
                  begin="1s"
                />
              </circle>
            </g>

            {/* Floating Elements */}
            <g>
              {[...Array(3)].map((_, i) => (
                <rect
                  key={i}
                  x={160}
                  y={70 + i * 25}
                  width="4"
                  height="4"
                  rx="1"
                  fill={isDark ? "#fff" : "#6366f1"}
                  opacity="0.6"
                >
                  <animate
                    attributeName="x"
                    values="160;165;160"
                    dur="3s"
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.6;0.9;0.6"
                    dur="3s"
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </rect>
              ))}
            </g>
          </svg>
        </motion.div>

        <div className="space-y-6">
          <motion.h1
            className={`text-4xl md:text-5xl font-bold bg-gradient-to-r text-transparent bg-clip-text ${
              isDark
                ? "from-indigo-400 via-indigo-300 to-indigo-400"
                : "from-indigo-600 via-indigo-500 to-indigo-600"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Blog Coming Soon
          </motion.h1>

          <motion.p
            className={`text-lg max-w-md mx-auto ${
              isDark ? "text-indigo-300/80" : "text-indigo-600/80"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Sharing my journey, experiences, and insights in software
            development and design. Stay tuned!
          </motion.p>
        </div>

        <motion.div
          className={`mt-12 w-64 h-1 mx-auto rounded-full overflow-hidden ${
            isDark ? "bg-indigo-950" : "bg-indigo-100"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div
            className={`h-full bg-gradient-to-r ${
              isDark
                ? "from-indigo-500 to-indigo-400"
                : "from-indigo-600 to-indigo-500"
            }`}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.div
          className={isDark ? "text-indigo-400/60" : "text-indigo-600/60"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Timer className="w-6 h-6 mx-auto m-4" />
        </motion.div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-32 h-32 rounded-full ${
                isDark ? "bg-indigo-500/5" : "bg-indigo-400/5"
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
