import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  GithubIcon,
  LinkedinIcon,
  Mail,
  Calendar,
} from "lucide-react";
import ResumeDownloadButton from "../layout/ResumeDownloadButton";
import { useTheme } from "../ThemeToggle";

const ImprovedCallButton = ({ onClick, isDark }) => {
  return (
    <motion.button
      className="group relative my-3 sm:my-5 w-full max-w-xs"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {/* Improved animated gradient border */}
      <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 blur-[3px] group-hover:opacity-100 group-hover:blur-sm transition-all duration-300"></div>

      {/* Main button content */}
      <div
        className={`relative z-10 flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl overflow-hidden transition-all duration-300 ${
          isDark
            ? "bg-black/90 shadow-[5px_5px_15px_#0a0a0a,-5px_-5px_15px_#1a1a1a]"
            : "bg-white/90 shadow-[5px_5px_15px_#d1d1d1,-5px_-5px_15px_#fff]"
        }`}
      >
        <Calendar
          className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 ${
            isDark ? "text-indigo-400" : "text-indigo-600"
          }`}
        />
        <span
          className={`font-semibold text-sm md:text-base tracking-wide font-['Inter'] ${
            isDark ? "text-white" : "text-gray-800"
          }`}
        >
          Schedule a Call
        </span>
      </div>

      {/* Inner press effect */}
      <div
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 opacity-0 group-active:opacity-100 ${
          isDark
            ? "shadow-[inset_3px_3px_7px_#000,inset_-3px_-3px_7px_#1a1a1a]"
            : "shadow-[inset_3px_3px_7px_#d1d1d1,inset_-3px_-3px_7px_#fff]"
        }`}
      ></div>
    </motion.button>
  );
};

export const Hero = () => {
  const { isDark } = useTheme();
  const [typedText, setTypedText] = useState("");
  const fullText = "< Aspiring Data Scientist />";
  const name = {
    first: "Abhinav",
    last: "Dixit",
  };
  const gradientClass = isDark
    ? "bg-gradient-to-r from-indigo-500 via-indigo-300 to-indigo-500"
    : "bg-gradient-to-r from-indigo-400 via-indigo-200 to-indigo-400";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleScheduleCall = () => {
    window.open("https://calendly.com/dixitabhinav2004/30min", "_blank");
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.3,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cellVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 10 },
    },
  };

  const socialLinkVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.2,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const leftContentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const nameLetterVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    }),
    hover: {
      y: -8,
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div
      className={`relative min-h-screen flex flex-col md:flex-row ${
        isDark ? "bg-black" : "bg-white"
      } overflow-hidden`}
    >
      <ResumeDownloadButton />
      {/* Background grid for left side only */}
      <motion.div
        className="absolute inset-0 md:right-1/2 grid grid-cols-8 grid-rows-6 gap-4 p-8 z-0"
        variants={gridVariants}
        initial="hidden"
        animate="visible"
      >
        {[...Array(48)].map((_, i) => (
          <motion.div
            key={i}
            variants={cellVariants}
            className={`w-full h-full rounded-lg ${
              isDark
                ? "bg-indigo-500/5 border-indigo-500/10"
                : "bg-indigo-200/5 border-indigo-300/10"
            } border`}
          />
        ))}
      </motion.div>

      {/* Left Side Content */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 flex flex-col justify-center items-center px-4 sm:px-8 py-20 md:py-0"
        variants={leftContentVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-md mx-auto w-full">
          {/* Terminal Icon */}
          <motion.div
            variants={childVariants}
            className="mb-8 md:mb-10"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto relative group">
              <motion.div
                className="absolute inset-0 border-4 rounded-[2rem] shadow-xl shadow-indigo-500/50"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.15, 1],
                  borderColor: ["#6366F1", "#4338CA", "#3B82F6", "#4F46E5"],
                  boxShadow: isDark
                    ? [
                        "0 0 15px rgba(99,102,241,0.8), 0 0 30px rgba(168,85,247,0.7)",
                        "0 0 25px rgba(124,58,237,0.7), 0 0 45px rgba(99,102,241,0.6)",
                        "0 0 15px rgba(99,102,241,0.8), 0 0 30px rgba(168,85,247,0.7)",
                      ]
                    : [
                        "0 0 15px rgba(147,197,253,0.7), 0 0 30px rgba(253,230,138,0.5)",
                        "0 0 25px rgba(249,168,212,0.5), 0 0 45px rgba(147,197,253,0.4)",
                        "0 0 15px rgba(147,197,253,0.7), 0 0 30px rgba(253,230,138,0.5)",
                      ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop",
                }}
              />
              <Terminal
                className={`w-full h-full relative z-10 p-4 transition-colors duration-500 ${
                  isDark
                    ? "text-indigo-400 group-hover:text-purple-300"
                    : "text-indigo-600 group-hover:text-purple-500"
                }`}
              />
            </div>
          </motion.div>

          {/* Name with animated letters */}
          <motion.div
            variants={childVariants}
            className="relative mb-6 md:mb-8"
          >
            <div className="flex flex-col items-center">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-2"
                style={{
                  fontFamily: "'Righteous', cursive",
                  color: isDark ? "#a5b4fc" : "#6366f1",
                  textShadow: isDark
                    ? "3px 3px 0px #312e81"
                    : "3px 3px 0px #4338ca",
                  letterSpacing: "0.05em",
                }}
              >
                {name.first.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    variants={nameLetterVariants}
                    custom={i}
                    whileHover="hover"
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>

              <h1
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-center"
                style={{
                  fontFamily: "'Righteous', cursive",
                  color: isDark ? "#6366f1" : "#4f46e5",
                  textShadow: isDark
                    ? "3px 3px 0px #312e81"
                    : "3px 3px 0px #4338ca",
                  letterSpacing: "0.05em",
                }}
              >
                {name.last.split("").map((letter, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    variants={nameLetterVariants}
                    custom={i + name.first.length}
                    whileHover="hover"
                  >
                    {letter}
                  </motion.span>
                ))}
              </h1>

              <div className="absolute -bottom-3 md:-bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 flex gap-1">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`${gradientClass} h-1 flex-1`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Developer title with typing effect */}
          <motion.div
            variants={childVariants}
            className={`text-base sm:text-xl md:text-2xl font-['Inter'] mb-8 h-8 sm:h-10 flex justify-center items-center
              ${isDark ? "text-indigo-400" : "text-indigo-600"}`}
          >
            <span className="relative">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {typedText}
              </motion.span>
              <motion.span
                animate={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="ml-1 inline-block"
              >
                |
              </motion.span>
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={childVariants}
            className="flex justify-center space-x-4 sm:space-x-6 mb-8"
          >
            {[
              {
                Icon: GithubIcon,
                href: "https://github.com/DixitAbhinav",
                color: isDark
                  ? "bg-gray-900/20 hover:bg-gray-900/40 text-gray-200 hover:text-white border-gray-800 hover:border-gray-700 shadow-[0_4px_6px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_8px_rgba(0,0,0,0.4)]"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800 hover:text-black border-gray-200 hover:border-gray-300 shadow-[0_4px_6px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_8px_rgba(0,0,0,0.15)]",
              },
              {
                Icon: LinkedinIcon,
                href: "https://www.linkedin.com/in/abhinav-dixit-81851b252",
                color: isDark
                  ? "bg-blue-900/20 hover:bg-blue-900/40 text-blue-300 hover:text-blue-200 border-blue-800 hover:border-blue-700 shadow-[0_4px_6px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_8px_rgba(59,130,246,0.4)]"
                  : "bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 border-blue-100 hover:border-blue-200 shadow-[0_4px_6px_rgba(59,130,246,0.1)] hover:shadow-[0_6px_8px_rgba(59,130,246,0.15)]",
              },
              {
                Icon: Mail,
                href: "mailto:dixitabhinav2004@gmail.com",
                color: isDark
                  ? "bg-red-900/20 hover:bg-red-900/40 text-red-300 hover:text-red-200 border-red-800 hover:border-red-700 shadow-[0_4px_6px_rgba(220,38,38,0.3)] hover:shadow-[0_6px_8px_rgba(220,38,38,0.4)]"
                  : "bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border-red-100 hover:border-red-200 shadow-[0_4px_6px_rgba(220,38,38,0.1)] hover:shadow-[0_6px_8px_rgba(220,38,38,0.15)]",
              },
            ].map(({ Icon, href, color }, i) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={socialLinkVariants}
                custom={i}
                whileHover="hover"
                className={`p-3 sm:p-4 rounded-xl transition-all duration-300 font-['Inter']
                  border ${color} ${
                  isDark ? "border-gray-800" : "border-gray-200"
                }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
              </motion.a>
            ))}
          </motion.div>

          {/* Improved Button for Schedule Call */}
          <motion.div variants={childVariants} className="flex justify-center">
            <ImprovedCallButton onClick={handleScheduleCall} isDark={isDark} />
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Full Height Image */}
      <motion.div
        className="relative w-full md:w-1/2 min-h-[50vh] md:min-h-screen"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-transparent z-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />

        {/* Border effect on left side */}
        <motion.div
          className={`absolute left-0 top-0 bottom-0 w-1 md:w-2 ${gradientClass}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        />

        {/* Profile image container */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Replace with your actual image */}
          <img
            src="../../public/person.jpeg"
            alt="Abhinav Dixit"
            className="w-48 h-48 object-cover"
          />
        </div>

        {/* Optional: Image overlay for better text contrast if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent md:hidden"></div>
      </motion.div>
    </div>
  );
};

export default Hero;