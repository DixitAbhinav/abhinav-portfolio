import { motion } from "framer-motion";
import { ArrowLeft, Loader } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { useTheme } from "../ThemeToggle";

export const Button = ({
  text = "Back",
  path = "/",
  className = "",
  loadingDuration = 200,
  showOnlyOnNonRootPath = true,
  onBeforeNavigate = () => Promise.resolve(),
  shape = "pill", // New prop: 'pill', 'rounded', 'square'
  size = "medium", // New prop: 'small', 'medium', 'large'
  variant = "gradient", // New prop: 'gradient', 'solid', 'outline', 'ghost'
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const { isDark } = useTheme();

  useEffect(() => {
    if (showOnlyOnNonRootPath) {
      setIsVisible(location.pathname !== "/");
    }
  }, [location.pathname, showOnlyOnNonRootPath]);

  useEffect(() => {
    const handlePopState = () => {
      if (!isLoading) {
        handleBack();
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isLoading]);

  const handleBack = useCallback(async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      await onBeforeNavigate();
      await new Promise((resolve) => setTimeout(resolve, loadingDuration));
      navigate(path);
    } catch (error) {
      console.error("Navigation failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, navigate, path, loadingDuration, onBeforeNavigate]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Backspace" && (e.metaKey || e.altKey)) {
        handleBack();
      }
    },
    [handleBack]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!isVisible) return null;

  // Shape styles
  const shapeStyles = {
    pill: "rounded-full",
    rounded: "rounded-lg",
    square: "rounded-none",
  };

  // Size styles
  const sizeStyles = {
    small: "px-4 py-1.5 text-sm",
    medium: "px-6 py-2.5 text-base",
    large: "px-8 py-3 text-lg",
  };

  // Determine background styles based on variant and theme
  const getBackgroundStyles = () => {
    if (variant === "gradient") {
      return isDark
        ? "bg-gradient-to-r from-indigo-600/20 to-indigo-400/10 border-indigo-500/40"
        : "bg-gradient-to-r from-indigo-100 to-indigo-50 border-indigo-300/60";
    } else if (variant === "solid") {
      return isDark
        ? "bg-indigo-600 border-indigo-500"
        : "bg-indigo-500 border-indigo-400";
    } else if (variant === "outline") {
      return isDark
        ? "bg-transparent border-indigo-500/70"
        : "bg-transparent border-indigo-500";
    } else if (variant === "ghost") {
      return isDark
        ? "bg-transparent border-transparent"
        : "bg-transparent border-transparent";
    }
  };

  // Text color styles based on variant and theme
  const getTextColorStyles = () => {
    if (variant === "solid") {
      return "text-white";
    } else if (variant === "outline" || variant === "ghost") {
      return isDark ? "text-indigo-300" : "text-indigo-600";
    } else {
      // gradient
      return isDark ? "text-indigo-300" : "text-indigo-600";
    }
  };

  // Hover styles based on variant and theme
  const getHoverStyles = () => {
    if (isLoading) return "";

    if (variant === "gradient") {
      return isDark
        ? "hover:text-white hover:border-indigo-400/80 hover:from-indigo-600/30 hover:to-indigo-400/20"
        : "hover:text-indigo-900 hover:border-indigo-500 hover:from-indigo-200 hover:to-indigo-100";
    } else if (variant === "solid") {
      return isDark
        ? "hover:bg-indigo-500 hover:border-indigo-400"
        : "hover:bg-indigo-600 hover:border-indigo-500";
    } else if (variant === "outline") {
      return isDark
        ? "hover:bg-indigo-600/20 hover:border-indigo-400/80"
        : "hover:bg-indigo-50 hover:border-indigo-600";
    } else if (variant === "ghost") {
      return isDark ? "hover:bg-indigo-600/10" : "hover:bg-indigo-50";
    }
  };

  // Apply motion variants based on size
  const motionSettings = {
    small: {
      hover: { x: -2 },
      tap: { scale: 0.97 },
    },
    medium: {
      hover: { x: -3 },
      tap: { scale: 0.97 },
    },
    large: {
      hover: { x: -4 },
      tap: { scale: 0.96 },
    },
  };

  // Focus styles
  const focusStyles = isDark
    ? "focus:ring-indigo-500 focus:ring-offset-gray-900"
    : "focus:ring-indigo-400 focus:ring-offset-white";

  // Loading state color
  const loadingColor = isDark ? "text-indigo-400/70" : "text-indigo-600/70";

  // Determine icon size based on button size
  const iconSize = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6",
  };

  return (
    <motion.button
      onClick={handleBack}
      disabled={isLoading}
      aria-label={isLoading ? "Loading..." : `Navigate ${text}`}
      title={`Go ${text}`}
      className={`
        fixed top-6 left-6 z-50
        flex items-center gap-3
        backdrop-blur-sm border shadow-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
        transition-all duration-300 group
        ${shapeStyles[shape]}
        ${sizeStyles[size]}
        ${getBackgroundStyles()}
        ${getTextColorStyles()}
        ${getHoverStyles()}
        ${focusStyles}
        cursor-${isLoading ? "not-allowed" : "pointer"}
        ${className}
      `}
      whileHover={motionSettings[size].hover}
      whileTap={motionSettings[size].tap}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
    >
      <div className="relative">
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            className="relative"
          >
            <Loader className={iconSize[size]} />
          </motion.div>
        ) : (
          <>
            {/* Pulse effect for the icon */}
            {variant !== "solid" && (
              <motion.div
                className={`absolute inset-0 rounded-full blur-md ${
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
            )}
            <ArrowLeft
              className={`${iconSize[size]} relative z-10 group-hover:-translate-x-1 transition-transform duration-300`}
            />
          </>
        )}
      </div>
      <span
        className={`font-semibold tracking-wide relative pr-1 ${
          size === "small" ? "text-sm" : ""
        }`}
      >
        {isLoading ? "Loading..." : text}
      </span>

      {/* Add a subtle background effect */}
      {!isLoading && variant !== "solid" && (
        <motion.div
          className={`absolute inset-0 ${
            shapeStyles[shape]
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isDark
              ? "bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)]"
              : "bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_70%)]"
          }`}
        />
      )}
    </motion.button>
  );
};
