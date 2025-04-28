import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Image,
  ArrowRight,
  ScanLine,
} from "lucide-react";
import { useTheme } from "../ThemeToggle";

const ToolCard = ({ icon: Icon, title, description, path }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleLaunch = useCallback(
    (e) => {
      e.stopPropagation();
      navigate(path);
    },
    [navigate, path]
  );

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="relative group cursor-pointer"
      onClick={handleLaunch}
    >
      {/* Gradient background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-300" />

      {/* Card content */}
      <div
        className={`relative p-4 sm:p-6 rounded-xl border backdrop-blur-sm transition-colors duration-300 h-full
        ${
          isDark
            ? "bg-black/90 border-indigo-500/30 group-hover:border-indigo-400"
            : "bg-white/90 border-indigo-300/50 group-hover:border-indigo-500"
        }`}
      >
        {/* Top section with title and icon */}
        <div className="flex items-start mb-3 sm:mb-6">
          <div className="flex items-center">
            {/* Icon container */}
            <div
              className={`p-2 sm:p-3 rounded-lg w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center transition-colors
              ${isDark 
                ? "bg-indigo-500/10 group-hover:bg-indigo-500/20" 
                : "bg-indigo-100/50 group-hover:bg-indigo-200/70"}`}
            >
              <Icon
                className={`w-5 h-5 sm:w-7 sm:h-7 ${
                  isDark ? "text-indigo-400" : "text-indigo-600"
                }`}
              />
            </div>
            
            {/* Title */}
            <h3
              className={`ml-3 sm:ml-4 text-lg sm:text-xl font-extrabold font-['Inter'] tracking-tight transition-colors duration-300
              ${isDark 
                ? "text-white group-hover:text-indigo-400" 
                : "text-gray-900 group-hover:text-indigo-600"}`}
            >
              {title}
            </h3>
          </div>

          {/* Launch Button - Desktop only */}
          <button
            onClick={handleLaunch}
            aria-label={`Launch ${title} tool`}
            className={`
            hidden sm:flex items-center text-xs sm:text-sm font-medium group/btn font-['Inter']
            transition-all duration-300 ease-in-out
            py-1.5 sm:py-2 px-2.5 sm:px-3
            rounded-lg shadow-sm
            ml-auto
            ${
              isDark
                ? "text-indigo-400 bg-gray-800/80 hover:bg-indigo-500/20 active:bg-indigo-500/30"
                : "text-indigo-600 bg-gray-100 hover:bg-indigo-600/10 active:bg-indigo-600/20"
            }
            focus:outline-none focus:ring-2 
            ${isDark ? "focus:ring-indigo-500/50" : "focus:ring-indigo-500/30"}
          `}
          >
            <span className="transition-transform group-hover/btn:translate-x-1">
              Launch
            </span>
            <ArrowRight
              className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-300 
            group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 
            group-active:translate-x-2"
            />
          </button>
        </div>

        {/* Description */}
        <p
          className={`text-xs sm:text-sm font-['Inter'] font-normal leading-relaxed
          ${isDark ? "text-gray-300" : "text-gray-600"}`}
        >
          {description}
        </p>
        
        {/* Same Launch Button - Mobile only (at bottom) */}
        <div className="flex sm:hidden justify-start mt-4">
          <button
            onClick={handleLaunch}
            aria-label={`Launch ${title} tool`}
            className={`
            flex items-center text-xs font-medium group/btn font-['Inter']
            transition-all duration-300 ease-in-out
            py-1.5 px-2.5
            rounded-lg shadow-sm
            ${
              isDark
                ? "text-indigo-400 bg-gray-800/80 hover:bg-indigo-500/20 active:bg-indigo-500/30"
                : "text-indigo-600 bg-gray-100 hover:bg-indigo-600/10 active:bg-indigo-600/20"
            }
            focus:outline-none focus:ring-2 
            ${isDark ? "focus:ring-indigo-500/50" : "focus:ring-indigo-500/30"}
          `}
          >
            <span className="transition-transform group-hover/btn:translate-x-1">
              Launch
            </span>
            <ArrowRight
              className="w-3 h-3 ml-1 transition-transform duration-300 
            group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 
            group-active:translate-x-2"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ToolsShowcase = () => {
  const { isDark } = useTheme();

  const tools = [
    {
      icon: Image,
      title: "Image Compressor",
      description:
        "Compress and optimize your images while maintaining quality. Supports JPG, PNG, and WebP formats.",
      path: "/tools/image-compressor",
    },
    {
      icon: ScanLine,
      title: "QR Code Generator",
      description:
        "Generate QR codes for URLs, text, contact information, and more with customizable styles.",
      path: "/tools/qr-generator",
    },
  ];

  return (
    <section className={`py-12 sm:py-20 relative ${isDark ? "bg-black" : "bg-white"}`}>
      {/* Background effects */}
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <h2
              className={`text-2xl sm:text-3xl font-extrabold font-['Inter'] tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Quick Tools
            </h2>
          </div>

          <div
            className={`w-16 sm:w-24 h-1 bg-gradient-to-r 
            ${
              isDark
                ? "from-white to-gray-500"
                : "from-indigo-600 to-indigo-300"
            } 
            mx-auto mt-3 sm:mt-4 rounded-full`}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto"
        >
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              path={tool.path}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsShowcase;
