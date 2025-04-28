import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Maximize, Minimize } from "lucide-react";
import { useTheme } from "../ThemeToggle";

export const VideoPlayer = ({ videoUrl, title, isOpen, onClose }) => {
  const { isDark } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Parse video ID from YouTube URL
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  // Handle orientation change
  useEffect(() => {
    const handleOrientationChange = () => {
      // Force re-render on orientation change
      setIsFullscreen(isFullscreen);
    };
    
    window.addEventListener("orientationchange", handleOrientationChange);
    
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, [isFullscreen]);
  
  const videoId = getYoutubeVideoId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : null;
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 flex items-center justify-center 
                   ${isDark ? "bg-black/90" : "bg-gray-800/80"} backdrop-blur-md
                   overflow-y-auto overflow-x-hidden`}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`relative w-full mx-auto my-2 sm:my-4 
                     ${isFullscreen ? 'h-[85vh] max-h-[85vh]' : 'max-w-4xl'} 
                     rounded-lg shadow-2xl overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header bar */}
          <div 
            className={`flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 
                      ${isDark ? 'bg-gray-900' : 'bg-gray-100'} border-b 
                      ${isDark ? 'border-gray-700' : 'border-gray-300'}`}
          >
            <div className="flex items-center max-w-[60%]">
              <h3 className={`font-semibold truncate text-sm sm:text-base
                            ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {title || "Project Demo"}
              </h3>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={toggleFullscreen}
                className={`p-1.5 sm:p-2 rounded-full transition-colors 
                          ${isDark 
                            ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                            : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'}`}
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
              
              {videoUrl && (
                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-1.5 sm:p-2 rounded-full transition-colors 
                            ${isDark 
                              ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                              : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'}`}
                  aria-label="Open in new tab"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={16} />
                </a>
              )}
              
              <button
                onClick={onClose}
                className={`p-1.5 sm:p-2 rounded-full transition-colors 
                          ${isDark 
                            ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                            : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'}`}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {/* Video container */}
          <div 
            className={`${isFullscreen ? 'h-full w-full' : 'aspect-video'} 
                       ${isDark ? 'bg-black' : 'bg-gray-900'} 
                       relative overflow-hidden`}
          >
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={title || "Project Demo"}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              ></iframe>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-300'}`}>
                  Invalid video URL or format
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoPlayer;
