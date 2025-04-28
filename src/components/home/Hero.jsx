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
      className="group relative mx-auto my-3 sm:my-5"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {/* Shiny animated gradient border */}
      <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-border-shine group-hover:opacity-100 transition-opacity opacity-60 blur-sm"></div>

      {/* Main button content */}
      <div
        className={`relative z-10 flex items-center gap-1.5 sm:gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl overflow-hidden transition-all duration-300 ${
          isDark
            ? "bg-black shadow-[5px_5px_10px_#0a0a0a,-5px_-5px_10px_#1a1a1a]"
            : "bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,-5px_-5px_10px_#fff]"
        }`}
      >
        <Calendar
          className={`w-5 h-5 sm:w-5 sm:h-5 shrink-0 ${
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
            ? "shadow-[inset_2px_2px_5px_#000,inset_-2px_-2px_5px_#1a1a1a]"
            : "shadow-[inset_2px_2px_5px_#d1d1d1,inset_-2px_-2px_5px_#fff]"
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

  const mobileNameVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div
      className={`relative min-h-screen pt-16 ${
        isDark ? "bg-black" : "bg-white"
      } overflow-hidden`}
    >
      <ResumeDownloadButton />
      
      {/* Background grid animation */}
      <motion.div
        className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-4 p-8"
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

      {/* Main content container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-[calc(100vh-4rem)] flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <div className="order-2 md:order-1 flex flex-col items-center md:items-start text-center md:text-left">
            {/* Name with animated characters */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 
                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                style={{
                  fontFamily: "'Righteous', cursive",
                }}
              >
                <div className="flex flex-wrap justify-center md:justify-start">
                  {name.first.split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: i * 0.07,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      whileHover={{
                        y: -10,
                        color: isDark ? "#a5b4fc" : "#6366f1",
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                      style={{
                        color: isDark ? "#a5b4fc" : "#4f46e5",
                        textShadow: isDark
                          ? "2px 2px 0px #312e81"
                          : "2px 2px 0px #4338ca",
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start mt-1">
                  {name.last.split("").map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: i * 0.07 + 0.3,
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                      whileHover={{
                        y: -10,
                        color: isDark ? "#818cf8" : "#4f46e5",
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                      style={{
                        color: isDark ? "#6366f1" : "#3730a3",
                        textShadow: isDark
                          ? "2px 2px 0px #312e81"
                          : "2px 2px 0px #4338ca",
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </h1>
              
              {/* Animated underline */}
              <div className="mt-2 w-4/5 mx-auto md:mx-0 flex gap-1.5">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`${gradientClass} h-1.5 flex-1 rounded-full`}
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
            </motion.div>
            
            {/* Developer title with typing effect */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className={`text-lg sm:text-xl lg:text-2xl font-mono ${
                isDark ? "text-indigo-300" : "text-indigo-600"
              }`}>
                <span>
                  <motion.span>{typedText}</motion.span>
                  <motion.span
                    animate={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="ml-1 inline-block"
                  >
                    |
                  </motion.span>
                </span>
              </div>
            </motion.div>
            
            {/* Terminal Icon */}
            <motion.div
              className="hidden md:flex mb-6"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1.2,
              }}
            >
              <div className="relative group">
                <motion.div
                  className={`absolute inset-0 rounded-full blur-lg opacity-70 ${
                    isDark ? "bg-indigo-500/50" : "bg-indigo-300/50"
                  }`}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <div className="relative p-4 rounded-full bg-opacity-10 backdrop-blur-sm bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                  <Terminal
                    className={`w-10 h-10 transition-colors duration-500 ${
                      isDark
                        ? "text-indigo-400 group-hover:text-purple-300"
                        : "text-indigo-600 group-hover:text-purple-500"
                    }`}
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              className="flex space-x-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
            >
              {[
                {
                  Icon: GithubIcon,
                  href: "https://github.com/DixitAbhinav",
                  color: isDark
                    ? "bg-gray-900/20 hover:bg-gray-900/40 text-gray-200 hover:text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800 hover:text-black",
                },
                {
                  Icon: LinkedinIcon,
                  href: "https://www.linkedin.com/in/abhinav-dixit-81851b252",
                  color: isDark
                    ? "bg-blue-900/20 hover:bg-blue-900/40 text-blue-300 hover:text-blue-200"
                    : "bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700",
                },
                {
                  Icon: Mail,
                  href: "mailto:dixitabhinav2004@gmail.com",
                  color: isDark
                    ? "bg-red-900/20 hover:bg-red-900/40 text-red-300 hover:text-red-200"
                    : "bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700",
                },
              ].map(({ Icon, href, color }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialLinkVariants}
                  custom={i}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  className={`p-3 rounded-xl transition-all duration-300 border ${color} ${
                    isDark ? "border-gray-800" : "border-gray-200"
                  } shadow-lg`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </motion.div>
            
            {/* Call to Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <ImprovedCallButton onClick={handleScheduleCall} isDark={isDark} />
            </motion.div>
          </div>
          
          {/* Right Column - Image */}
          <motion.div 
            className="order-1 md:order-2 flex justify-center items-center"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative max-w-sm">
              {/* Decorative glow effect */}
              <div className={`absolute inset-0 rounded-full blur-2xl opacity-30 ${
                isDark ? "bg-indigo-500" : "bg-indigo-300"
              }`}></div>
              
              {/* Image with border */}
              <motion.div 
                className={`relative rounded-2xl overflow-hidden border-4 ${
                  isDark ? "border-indigo-600/30" : "border-indigo-500/30"
                } shadow-2xl`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src="/person.jpeg" 
                  alt="Abhinav Dixit" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Subtle overlay gradient */}
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-t ${
                  isDark ? "from-indigo-900" : "from-indigo-200"
                } to-transparent`}></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
