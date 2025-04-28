import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  Award,
  ExternalLink,
  Calendar,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Code,
  Shield,
  Layout,
  Server,
  Database,
  Star,
  Sparkles,
  Medal,
  Check,
} from "lucide-react";
import { useTheme } from "../ThemeToggle";
import { certificatesData } from "../../constants/certificatesData";

const CertificateDetail = ({ certificate, onClose, isDark }) => {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
          duration: 0.2,
        }}
        className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl my-2 mx-auto"
        onClick={handleModalClick}
      >
        <div
          className={`absolute -inset-6 sm:-inset-10 ${certificate.bgColor} rounded-full blur-3xl opacity-30`}
        />

        <motion.div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
          <div
            className={`absolute -inset-0.5 rounded-xl sm:rounded-2xl bg-gradient-to-r ${certificate.borderGradient}`}
          />

          <div
            className={`relative rounded-xl sm:rounded-2xl overflow-hidden border shadow-xl backdrop-filter
                           ${
                             isDark
                               ? "bg-black/95 border-gray-800 shadow-black/60"
                               : "bg-white/95 border-gray-200 shadow-indigo-500/10"
                           }`}
          >
            <div className="hidden sm:block">
              {["top-left", "top-right", "bottom-left", "bottom-right"].map(
                (position, idx) => {
                  const positionClasses = {
                    "top-left": "-top-2 -left-2",
                    "top-right": "-top-2 -right-2",
                    "bottom-left": "-bottom-2 -left-2",
                    "bottom-right": "-bottom-2 -right-2",
                  }[position];

                  const Icon =
                    position === "top-left"
                      ? Star
                      : position === "top-right"
                      ? Sparkles
                      : position === "bottom-left"
                      ? Medal
                      : Award;

                  return (
                    <div
                      key={position}
                      className={`absolute w-4 h-4 ${positionClasses}`}
                    >
                      <div
                        className={`absolute inset-0 ${certificate.bgColor} blur-sm rounded-full opacity-60`}
                      ></div>
                      <div
                        className={`absolute inset-0 ${certificate.iconColor}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            <div
              className={`p-4 sm:p-6 bg-gradient-to-r ${certificate.backgroundGradient} relative overflow-hidden`}
            >
              <div className="absolute inset-0 opacity-10">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="grid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 0 10 L 20 10 M 10 0 L 10 20"
                        stroke={isDark ? "white" : "black"}
                        strokeWidth="0.5"
                        fill="none"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3 sm:gap-4">
                  <motion.div
                    className={`p-2 sm:p-3 rounded-full ${
                      isDark ? "bg-black/40" : "bg-white/40"
                    } relative`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <certificate.icon
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${certificate.iconColor} relative z-10`}
                    />

                    <motion.div
                      className={`absolute inset-0 rounded-full border-2 border-dashed ${certificate.iconColor}`}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </motion.div>

                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-bold truncate max-w-[180px] sm:max-w-full ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {certificate.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm ${
                        isDark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {certificate.organization}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={`p-2 rounded-full ${
                    isDark
                      ? "bg-black/20 text-white hover:bg-black/40"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>

            <div
              className={`pt-6 sm:pt-8 px-4 sm:px-8 text-center ${
                isDark ? "bg-black" : "bg-white"
              } relative`}
            >
              <div className="relative inline-block ring-4 ring-indigo-500/40 shadow-xl rounded-lg">
                <img
                  src={certificate.logo}
                  alt={`${certificate.organization} logo`}
                  className="h-16 sm:h-20 mx-auto object-contain rounded-lg"
                />
              </div>

            </div>

            <div className={`p-4 sm:p-8 ${isDark ? "bg-black" : "bg-white"}`}>
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`p-2 rounded-lg relative overflow-hidden
                               ${isDark ? "bg-gray-900" : "bg-gray-100"}`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="absolute inset-0 opacity-30"></div>
                    <Calendar
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${certificate.iconColor} relative z-10`}
                    />
                  </motion.div>

                  <div>
                    <p
                      className={`text-xs uppercase font-medium ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Issued
                    </p>
                    <p
                      className={`text-sm sm:text-base font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {certificate.date}
                    </p>
                  </div>
                </div>

                <div>
                  <p
                    className={`text-xs sm:text-sm font-medium mb-2 sm:mb-3 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {certificate.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 0 8px rgba(99, 102, 241, 0.4)",
                        }}
                        className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm
                                ${
                                  isDark
                                    ? "bg-gray-900 text-gray-300 border border-gray-800"
                                    : "bg-gray-100 text-gray-700 border border-gray-200"
                                } relative overflow-hidden`}
                      >

                        <Check
                          className={`w-3 h-3 mr-1 ${certificate.iconColor}`}
                        />
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 sm:pt-4">
                  <motion.a
                    href={certificate.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm overflow-hidden group"
                  >
                    <div
                      className={`absolute inset-0 rounded-lg opacity-80 bg-gradient-to-r ${certificate.borderGradient}`}
                    ></div>


                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        repeatDelay: 1,
                      }}
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-white relative z-10" />
                    </motion.div>
                    <span className="text-white relative z-10">
                      View Credential
                    </span>
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const CertificateCard = ({ certificate, onClick, isDark, index, isNewlyAdded }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group/cert relative p-1"
      initial={{ opacity: 0, y: 50 }}
      animate={
        isInView || isNewlyAdded
          ? {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 250,
                damping: 20,
                delay: isNewlyAdded ? 0.05 : Math.min(index * 0.08, 0.3),
              },
            }
          : {}
      }
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className={`absolute -top-7 -right-7 w-14 h-14 rounded-full 
                    ${certificate.bgColor} blur-xl
                    opacity-0 group-hover/cert:opacity-30 transition-opacity duration-500`}
        animate={{
          y: [0, -10, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`absolute -bottom-5 -left-5 w-10 h-10 rounded-full 
                    ${certificate.bgColor} blur-lg
                    opacity-0 group-hover/cert:opacity-30 transition-opacity duration-500`}
        animate={{
          y: [0, 8, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <motion.div
        className="absolute -inset-0.5 rounded-xl blur-sm opacity-70 group-hover/cert:opacity-100 transition-opacity duration-500 overflow-hidden"
        animate={{
          background: [
            `linear-gradient(45deg, ${
              certificate.borderGradient.includes("from-blue")
                ? "#3b82f6"
                : certificate.borderGradient.includes("from-green")
                ? "#10b981"
                : certificate.borderGradient.includes("from-cyan")
                ? "#06b6d4"
                : certificate.borderGradient.includes("from-purple")
                ? "#8b5cf6"
                : certificate.borderGradient.includes("from-indigo")
                ? "#6366f1"
                : "#6366f1"
            } 0%, ${
              certificate.borderGradient.includes("to-indigo")
                ? "#6366f1"
                : certificate.borderGradient.includes("to-blue")
                ? "#3b82f6"
                : certificate.borderGradient.includes("to-teal")
                ? "#14b8a6"
                : certificate.borderGradient.includes("to-purple")
                ? "#8b5cf6"
                : "#6366f1"
            } 100%)`,
            `linear-gradient(225deg, ${
              certificate.borderGradient.includes("from-blue")
                ? "#3b82f6"
                : certificate.borderGradient.includes("from-green")
                ? "#10b981"
                : certificate.borderGradient.includes("from-cyan")
                ? "#06b6d4"
                : certificate.borderGradient.includes("from-purple")
                ? "#8b5cf6"
                : certificate.borderGradient.includes("from-indigo")
                ? "#6366f1"
                : "#6366f1"
            } 0%, ${
              certificate.borderGradient.includes("to-indigo")
                ? "#6366f1"
                : certificate.borderGradient.includes("to-blue")
                ? "#3b82f6"
                : certificate.borderGradient.includes("to-teal")
                ? "#14b8a6"
                : certificate.borderGradient.includes("to-purple")
                ? "#8b5cf6"
                : "#6366f1"
            } 100%)`,
          ],
          backgroundSize: ["200% 200%"],
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
        }}
      >
      </motion.div>

      <motion.div
        className={`relative h-full overflow-hidden rounded-xl p-5 transition-all duration-300 
                   border backdrop-filter backdrop-blur-sm shadow-xl
                   ${
                     isDark
                       ? "bg-black/90 border-indigo-500/30 group-hover/cert:border-indigo-400"
                       : "bg-white/90 border-indigo-300/50 group-hover/cert:border-indigo-500"
                   }`}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          boxShadow: isDark
            ? "0 10px 30px -10px rgba(0, 0, 0, 0.8)"
            : "0 10px 30px -10px rgba(99, 102, 241, 0.2)",
        }}
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id={`grid-${certificate.id}`}
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 0 10 L 20 10 M 10 0 L 10 20"
                  stroke={isDark ? "white" : "black"}
                  strokeWidth="0.5"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill={`url(#grid-${certificate.id})`}
            />
          </svg>
        </div>

        <motion.div
          className={`absolute top-0 left-0 right-0 h-1/2 rounded-t-xl bg-gradient-to-b ${
            isDark
              ? "from-white/5 to-transparent"
              : "from-white/40 to-transparent"
          } opacity-0 group-hover/cert:opacity-100 transition-opacity duration-500`}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(1px)",
          }}
        />

        <div
          className="flex flex-col h-full justify-between relative z-10"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="flex items-start gap-4 mb-4">
            <motion.div
              className={`relative p-3 rounded-lg overflow-hidden ${certificate.backgroundGradient}`}
              whileHover={{
                rotate: 360,
                scale: 1.1,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
            >
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    `radial-gradient(circle at center, ${
                      certificate.borderGradient.includes("from-blue")
                        ? "rgba(59, 130, 246, 0.6)"
                        : certificate.borderGradient.includes("from-green")
                        ? "rgba(16, 185, 129, 0.6)"
                        : certificate.borderGradient.includes("from-cyan")
                        ? "rgba(6, 182, 212, 0.6)"
                        : certificate.borderGradient.includes("from-purple")
                        ? "rgba(139, 92, 246, 0.6)"
                        : "rgba(99, 102, 241, 0.6)"
                    } 0%, transparent 70%)`,
                    `radial-gradient(circle at center, ${
                      certificate.borderGradient.includes("from-blue")
                        ? "rgba(59, 130, 246, 0.9)"
                        : certificate.borderGradient.includes("from-green")
                        ? "rgba(16, 185, 129, 0.9)"
                        : certificate.borderGradient.includes("from-cyan")
                        ? "rgba(6, 182, 212, 0.9)"
                        : certificate.borderGradient.includes("from-purple")
                        ? "rgba(139, 92, 246, 0.9)"
                        : "rgba(99, 102, 241, 0.9)"
                    } 0%, transparent 70%)`,
                    `radial-gradient(circle at center, ${
                      certificate.borderGradient.includes("from-blue")
                        ? "rgba(59, 130, 246, 0.6)"
                        : certificate.borderGradient.includes("from-green")
                        ? "rgba(16, 185, 129, 0.6)"
                        : certificate.borderGradient.includes("from-cyan")
                        ? "rgba(6, 182, 212, 0.6)"
                        : certificate.borderGradient.includes("from-purple")
                        ? "rgba(139, 92, 246, 0.6)"
                        : "rgba(99, 102, 241, 0.6)"
                    } 0%, transparent 70%)`,
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <certificate.icon
                className={`w-5 h-5 ${certificate.iconColor} relative z-10`}
              />

              <motion.div
                className={`absolute inset-0 rounded-lg ${certificate.backgroundGradient} opacity-0`}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <div>
              <motion.h3
                className={`font-bold transition-colors ${
                  isDark
                    ? "text-white group-hover/cert:text-indigo-300"
                    : "text-gray-900 group-hover/cert:text-indigo-600"
                }`}
                whileHover={{
                  x: 3,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                {certificate.title}
              </motion.h3>
              <p
                className={`text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {certificate.organization}
              </p>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex flex-wrap gap-1 mb-3">
              {certificate.skills.slice(0, 2).map((skill, index) => (
                <motion.span
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow: `0 4px 6px -1px ${
                      certificate.borderGradient.includes("from-blue")
                        ? "rgba(59, 130, 246, 0.2)"
                        : certificate.borderGradient.includes("from-green")
                        ? "rgba(16, 185, 129, 0.2)"
                        : certificate.borderGradient.includes("from-cyan")
                        ? "rgba(6, 182, 212, 0.2)"
                        : certificate.borderGradient.includes("from-purple")
                        ? "rgba(139, 92, 246, 0.2)"
                        : "rgba(99, 102, 241, 0.2)"
                    }`,
                  }}
                  className={`inline-block px-2 py-1 text-xs rounded-full relative
                  ${
                    isDark
                      ? "bg-gray-800/80 text-gray-300"
                      : "bg-gray-100 text-gray-700"
                  } overflow-hidden`}
                >
                  <motion.div
                    className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10"
                    animate={{ x: ["200%", "-200%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: index * 0.3,
                      ease: "easeInOut",
                    }}
                  />

                  <span className="relative z-10">{skill}</span>
                </motion.span>
              ))}
              {certificate.skills.length > 2 && (
                <motion.span
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`inline-block px-2 py-1 text-xs rounded-full
                  ${
                    isDark
                      ? "bg-gray-800/80 text-gray-400"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  +{certificate.skills.length - 2}
                </motion.span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs">
                <Calendar
                  className={`w-3 h-3 mr-1 ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <span className={isDark ? "text-gray-400" : "text-gray-500"}>
                  {certificate.date}
                </span>
              </div>
              <motion.span
                className={`text-xs flex items-center
                ${
                  isDark
                    ? "text-indigo-400 group-hover/cert:text-indigo-300"
                    : "text-indigo-600 group-hover/cert:text-indigo-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View
                <motion.div
                  animate={{
                    x: [0, 3, 0],
                    y: [0, -3, 0],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror",
                  }}
                >
                  <ExternalLink className="w-3 h-3 ml-1" />
                </motion.div>
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Certificates = () => {
  const { isDark } = useTheme();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [previouslyShown, setPreviouslyShown] = useState(3);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const displayedCertificates = isExpanded
    ? certificatesData
    : certificatesData.slice(0, 3);

  useEffect(() => {
    if (isExpanded) {
      setPreviouslyShown(3);
    }
  }, [isExpanded]);

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <section
      ref={sectionRef}
      className={`py-20 relative overflow-hidden z-0 ${
        isDark ? "bg-black" : "bg-white"
      }`}
      id="certificates"
    >
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
          className={`text-3xl font-bold text-center ${
            isDark ? "text-white" : "text-gray-900"
          } mb-16`}
        >
          Certificates & Achievements
          <div
            className={`w-24 h-1 bg-gradient-to-r ${
              isDark
                ? "from-white to-gray-500"
                : "from-indigo-600 to-indigo-300"
            } mx-auto mt-4 rounded-full`}
          />
        </motion.h2>

        <div className="relative overflow-hidden">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            initial={{ opacity: 0 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    transition: { duration: 0.5 },
                  }
                : {}
            }
          >
            {displayedCertificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                onClick={() => handleCertificateClick(certificate)}
                isDark={isDark}
                index={index}
                isNewlyAdded={isExpanded && index >= previouslyShown}
              />
            ))}
          </motion.div>

          {certificatesData.length > 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mt-10 mb-10"
            >
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium
                  border transition-all duration-200 ${
                    isDark
                      ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                      : "border-indigo-300/50 bg-indigo-100/50 text-indigo-600 hover:bg-indigo-200/70"
                  }`}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span>Show Less</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span>Show More</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {selectedCertificate && (
            <CertificateDetail
              certificate={selectedCertificate}
              onClose={closeModal}
              isDark={isDark}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Certificates;
