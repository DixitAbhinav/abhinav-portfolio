import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { useTheme } from "../ThemeToggle";

export const VideoTooltip = ({ isVisible, text = "Watch Demo Video" }) => {
  const { isDark } = useTheme();
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className={`absolute -bottom-10 left-1/2 transform -translate-x-1/2 
                       px-3 py-1.5 rounded-md whitespace-nowrap text-xs font-medium
                       flex items-center gap-1.5 z-10
                       ${
                         isDark
                           ? "bg-black border border-indigo-500/30 text-indigo-400 shadow-lg shadow-black/30"
                           : "bg-white border border-indigo-300/50 text-indigo-600 shadow-lg shadow-gray-200/60"
                       }`}
        >
          <Play className="w-3 h-3" />
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoTooltip;
