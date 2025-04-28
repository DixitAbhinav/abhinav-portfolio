import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowRight,
  Play,
  Globe,
  Box,
  BookOpen,
  Clock,
  X,
  Code,
  Info,
  Layers,
} from "lucide-react";
import {
  containerVariants,
  cardVariants,
  fadeInUpVariants,
} from "../../animations/variants";
import { useTheme } from "../ThemeToggle";
import { twMerge } from "tailwind-merge";
import { projects } from "../../constants/projectData";

// Moved highlightText function outside components to be shared
const highlightText = (text, isDark) => {
  return text.split(" ").map((word, i) => {
    const key = `${text.substring(0, 10)}-${i}-${word}`;

    // Important descriptive terms (highlighted in indigo)
    if (
      word.match(
        /(featured|robust|dynamic|custom|responsive|feature-rich|advanced|real-time|interactive|secure|scalable|comprehensive|full-featured|full-stack|seamless|efficient|optimized|dual)/i
      )
    ) {
      return (
        <span
          key={key}
          className={`font-semibold ${
            isDark ? "text-indigo-400" : "text-indigo-600"
          }`}
        >
          {word}{" "}
        </span>
      );
    }
    // Technical terms and technologies (highlighted in blue)
    else if (
      word.match(
        /(MERN|React|Express|MongoDB|Node\.js|TailwindCSS|Framer|JWT|authentication|Recharts|Nodemailer|AWS|S3|OAuth|Time|tracking|visualization|workflow|Cloudinary|Mongoose|Golang|Gin|GORM|PostgreSQL|RESTful|APIs|backend|frontend|rich-text|bcrypt|encryption|architecture|integration|database)/i
      )
    ) {
      return (
        <span
          key={key}
          className={`font-mono ${
            isDark ? "text-blue-400" : "text-blue-600"
          }`}
        >
          {word}{" "}
        </span>
      );
    }

    return <span key={key}>{word} </span>;
  });
};

const InPlaceVideoPlayer = ({ videoUrl, isDark }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Parse video ID from YouTube URL
  const getYoutubeVideoId = (url) => {
    if (!url) return null;

    // Handle different YouTube URL formats
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYoutubeVideoId(videoUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1`
    : null;

  if (!videoUrl) return null;

  return (
    <div className="pt-2 sm:pt-4">
      {!isPlaying ? (
        <div className="relative overflow-hidden rounded-lg group">
          <div
            className={`aspect-video rounded-lg flex items-center justify-center cursor-pointer
            relative overflow-hidden group
            ${isDark ? "bg-gray-800/80" : "bg-gray-100"}`}
            onClick={() => setIsPlaying(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

            <motion.div
              className="flex flex-col items-center justify-center z-10"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`p-2 sm:p-4 rounded-full mb-1 sm:mb-2
                ${isDark ? "bg-white/10" : "bg-indigo-100/80"}`}
              >
                <Play
                  size={16}
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${isDark ? "text-indigo-300" : "text-indigo-600"}`}
                />
              </div>
              <span
                className={`text-xs sm:text-base font-medium ${
                  isDark ? "text-indigo-300" : "text-indigo-600"
                }`}
              >
                Watch Demo Video
              </span>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="aspect-video rounded-lg overflow-hidden">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title="YouTube video player"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center ${
                  isDark ? "bg-gray-800" : "bg-gray-200"
                }`}
              >
                <p>Invalid video URL</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsPlaying(false)}
            className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full z-10 ${
              isDark
                ? "bg-gray-900/80 text-white hover:bg-gray-800"
                : "bg-white/80 text-gray-800 hover:bg-gray-100"
            }`}
          >
            <X size={14} className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

const ProjectCard = ({ project, isDark, onClick }) => {
  const tagColors = useMemo(() => {
    const keyTechs = {
      React: {
        dark: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        light: "bg-blue-100/80 text-blue-700 border-blue-300/70",
      },
    };

    return project.tech.map((tech) => {
      for (const [key, colors] of Object.entries(keyTechs)) {
        if (tech.includes(key)) return colors;
      }
      return {
        dark: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
        light: "bg-indigo-100/80 text-indigo-600 border-indigo-300/70",
      };
    });
  }, [project.tech]);

  return (
    <motion.div
      variants={cardVariants}
      className="relative group cursor-pointer"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-300" />

      <div
        className={`relative p-4 sm:p-6 rounded-lg border h-full backdrop-blur-sm transition-all duration-300 ${
          isDark
            ? "bg-black/90 border-indigo-500/30 group-hover:border-indigo-400"
            : "bg-white/90 border-indigo-300/50 group-hover:border-indigo-500"
        }`}
      >
        <div className="relative mb-3 sm:mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className={`p-2 sm:p-3 rounded-lg transition-colors duration-300 ${
                isDark
                  ? "bg-indigo-500/10 group-hover:bg-indigo-500/20"
                  : "bg-indigo-100/50 group-hover:bg-indigo-200/70"
              }`}
            >
              <project.icon
                className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-300 ${
                  isDark
                    ? "text-indigo-400 group-hover:text-indigo-300"
                    : "text-indigo-600 group-hover:text-indigo-500"
                }`}
              />
            </motion.div>
            <h3
              className={`ml-3 sm:ml-4 text-lg sm:text-xl font-extrabold font-['Inter'] tracking-tight transition-colors duration-300 ${
                isDark
                  ? "text-white group-hover:text-indigo-400"
                  : "text-gray-900 group-hover:text-indigo-600"
              }`}
            >
              {project.title}
            </h3>
          </div>
          
          {/* View Details button - ONLY visible on desktop */}
          <motion.button
            whileHover={{ x: 3 }}
            className={`hidden sm:flex items-center space-x-1 text-sm font-medium font-['Inter'] mt-3 sm:mt-0 ${
              isDark
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-indigo-600 hover:text-indigo-800"
            }`}
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Updated to use highlightText */}
        <p
          className={`mb-3 sm:mb-4 text-sm sm:text-base font-['Inter'] font-normal leading-relaxed ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {highlightText(project.description[0], isDark)}
        </p>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {project.tech.slice(0, 3).map((tech, i) => (
            <motion.span
              key={tech}
              variants={fadeInUpVariants}
              transition={{ delay: i * 0.05 + 0.3 }}
              className={twMerge(
                `px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-['Inter'] font-medium border rounded-full transition-all`,
                isDark ? tagColors[i].dark : tagColors[i].light
              )}
            >
              {tech}
            </motion.span>
          ))}
          {project.tech.length > 3 && (
            <motion.span
              variants={fadeInUpVariants}
              transition={{ delay: 0.5 }}
              className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-['Inter'] font-medium rounded-full transition-all
                ${
                  isDark
                    ? "bg-gray-800 text-gray-300"
                    : "bg-gray-100 text-gray-800"
                }`}
            >
              +{project.tech.length - 3} more
            </motion.span>
          )}
        </div>
        
        {/* View Details button - ONLY visible on mobile */}
        <div className="sm:hidden flex justify-center mt-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`flex items-center space-x-1 text-sm font-medium font-['Inter'] px-3 py-1.5 rounded-md ${
              isDark
                ? "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
            }`}
          >
            <span>View Details</span>
            <ArrowRight size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Detail modal component
const DetailModal = ({ project, isOpen, onClose, isDark }) => {
  const [activeTab, setActiveTab] = useState("info");

  const tabs = [
    { id: "info", label: "Overview", icon: Info },
    { id: "tech", label: "Technologies", icon: Code },
    { id: "details", label: "Features", icon: Layers },
  ];

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`w-full max-w-3xl max-h-[95vh] sm:max-h-[80vh] rounded-xl shadow-2xl overflow-hidden flex flex-col
              ${
                isDark
                  ? "bg-black border border-indigo-500/30"
                  : "bg-white border border-indigo-200"
              }`}
            >
              {/* Header with close button */}
              <div
                className={`flex items-center justify-between p-3 sm:p-6 border-b
                ${isDark ? "border-gray-800" : "border-gray-200"}`}
              >
                <h2
                  className={`text-lg sm:text-2xl font-bold font-['Inter'] pr-2 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {project.title}
                </h2>
                <button
                  onClick={onClose}
                  className={`p-1.5 sm:p-2 rounded-full transition-colors ${
                    isDark
                      ? "hover:bg-gray-800 text-gray-400 hover:text-white"
                      : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <X size={18} className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Tab Navigation */}
              <div
                className={`flex flex-wrap border-b ${
                  isDark ? "border-gray-800" : "border-gray-200"
                }`}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-6 py-2 sm:py-3 font-medium transition-colors ${
                      activeTab === tab.id
                        ? `text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 ${
                            isDark ? "bg-indigo-900/10" : "bg-indigo-50/80"
                          } font-mono`
                        : `${
                            isDark
                              ? "text-gray-400 hover:text-gray-200"
                              : "text-gray-600 hover:text-gray-900"
                          } font-sans`
                    }`}
                  >
                    <tab.icon size={14} className="flex-shrink-0 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div
                className={`p-3 sm:p-6 overflow-y-auto ${
                  isDark ? "text-gray-300" : "text-gray-600"
                } font-['Inter']`}
                style={{ maxHeight: "calc(95vh - 180px)", minHeight: "200px" }}
              >
                {/* Info Tab */}
                {activeTab === "info" && (
                  <div className="space-y-3 sm:space-y-6">
                    <div>
                      <h3
                        className={`text-base sm:text-lg font-semibold mb-2 sm:mb-4 font-['Inter'] ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Description
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        {project.description.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 1 }}
                            whileHover={{
                              x: 5,
                              backgroundColor: isDark
                                ? "rgba(79, 70, 229, 0.08)"
                                : "rgba(79, 70, 229, 0.06)",
                            }}
                            className={`flex items-start p-2 sm:p-3 rounded-lg transition-colors duration-300 
                              ${
                                isDark
                                  ? "hover:bg-indigo-600/10"
                                  : "hover:bg-indigo-100/30"
                              }`}
                          >
                            <div
                              className={`flex-shrink-0 p-1 sm:p-1.5 rounded-md mr-2 sm:mr-3
                              ${isDark ? "bg-indigo-600/20" : "bg-indigo-100"}`}
                            >
                              <ArrowRight
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                  isDark ? "text-indigo-400" : "text-indigo-600"
                                }`}
                              />
                            </div>
                            <span className="flex-1 text-xs sm:text-sm md:text-base font-light">
                              {highlightText(item, isDark)}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {project.video && (
                      <InPlaceVideoPlayer
                        videoUrl={project.video}
                        isDark={isDark}
                      />
                    )}
                  </div>
                )}

                {/* Tech Tab */}
                {activeTab === "tech" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-wrap gap-1.5 sm:gap-3">
                      {project.tech.map((tech, i) => (
                        <div
                          key={tech}
                          className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-2 rounded-lg ${
                            isDark ? "bg-gray-800/50" : "bg-gray-50"
                          }`}
                        >
                          <div
                            className={`p-0.5 sm:p-1.5 rounded-md ${
                              isDark ? "bg-indigo-900/50" : "bg-indigo-100"
                            }`}
                          >
                            <Code
                              className={`w-2.5 h-2.5 sm:w-4 sm:h-4 ${
                                isDark ? "text-indigo-400" : "text-indigo-600"
                              }`}
                            />
                          </div>
                          <span
                            className={`font-mono text-xs sm:text-sm ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {tech}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Details/Features Tab */}
                {activeTab === "details" && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {project.description.map((feature, i) => {
                        // Determine icon and colors based on index
                        let IconComponent;
                        let colorClass;
                        let bgColorClass;

                        switch (i % 6) {
                          case 0:
                            IconComponent = Layers;
                            colorClass = isDark
                              ? "text-pink-400"
                              : "text-pink-600";
                            bgColorClass = isDark
                              ? "bg-pink-400/10"
                              : "bg-pink-100";
                            break;
                          case 1:
                            IconComponent = Code;
                            colorClass = isDark
                              ? "text-blue-400"
                              : "text-blue-600";
                            bgColorClass = isDark
                              ? "bg-blue-400/10"
                              : "bg-blue-100";
                            break;
                          case 2:
                            IconComponent = Clock;
                            colorClass = isDark
                              ? "text-green-400"
                              : "text-green-600";
                            bgColorClass = isDark
                              ? "bg-green-400/10"
                              : "bg-green-100";
                            break;
                          case 3:
                            IconComponent = Globe;
                            colorClass = isDark
                              ? "text-orange-400"
                              : "text-orange-600";
                            bgColorClass = isDark
                              ? "bg-orange-400/10"
                              : "bg-orange-100";
                            break;
                          case 4:
                            IconComponent = Box;
                            colorClass = isDark
                              ? "text-purple-400"
                              : "text-purple-600";
                            bgColorClass = isDark
                              ? "bg-purple-400/10"
                              : "bg-purple-100";
                            break;
                          default:
                            IconComponent = BookOpen;
                            colorClass = isDark
                              ? "text-indigo-400"
                              : "text-indigo-600";
                            bgColorClass = isDark
                              ? "bg-indigo-400/10"
                              : "bg-indigo-100";
                        }

                        return (
                          <motion.div
                            key={i}
                            whileHover={{
                              y: -4,
                              boxShadow: isDark
                                ? "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3)"
                                : "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
                            }}
                            className={`overflow-hidden rounded-xl border shadow-sm transition-all duration-300 ${
                              isDark
                                ? "bg-gray-900/80 border-gray-800 backdrop-blur-sm"
                                : "bg-white border-gray-200"
                            }`}
                          >
                            <div className="p-3 sm:p-6">
                              {/* Icon with circular background */}
                              <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                                <div
                                  className={`flex-shrink-0 inline-flex items-center justify-center p-2 sm:p-3 rounded-full
                                  ${bgColorClass}`}
                                >
                                  <IconComponent
                                    size={16}
                                    className={`${colorClass} w-3.5 h-3.5 sm:w-5 sm:h-5`}
                                  />
                                </div>
                                <h4 className={`text-sm sm:text-base font-medium ${colorClass}`}>
                                  Feature {i + 1}
                                </h4>
                              </div>

                              {/* Feature content */}
                              <p
                                className={`text-xs sm:text-sm md:text-base font-['Inter'] ${
                                  isDark ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {highlightText(feature, isDark)}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer with action buttons */}
              <div
                className={`p-3 sm:p-6 border-t ${
                  isDark ? "border-gray-800" : "border-gray-200"
                }
                flex flex-wrap justify-center items-center mt-auto gap-2 sm:gap-3`}
              >
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg transition-colors text-xs sm:text-base font-medium
                      ${
                        isDark
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-indigo-600 hover:bg-indigo-700 text-white"
                      }`}
                  >
                    <Github size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>GitHub</span>
                  </a>

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg transition-colors text-xs sm:text-base font-medium
                        ${
                          isDark
                            ? "bg-indigo-900/50 text-indigo-300 hover:bg-indigo-800/70"
                            : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                        }`}
                    >
                      <ExternalLink size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const Projects = () => {
  const { isDark } = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);

  const openProjectDetail = (project) => {
    setSelectedProject(project);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  return (
    <section className={`py-16 sm:py-20 relative ${isDark ? "bg-black" : "bg-white"}`}>
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
        <motion.h2
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-extrabold font-['Inter'] text-center tracking-tight ${
            isDark ? "text-white" : "text-gray-900"
          } mb-12 md:mb-16`}
        >
          Projects
          <div
            className={`w-16 md:w-24 h-1 bg-gradient-to-r ${
              isDark
                ? "from-white to-gray-500"
                : "from-indigo-600 to-indigo-300"
            } mx-auto mt-3 sm:mt-4 rounded-full`}
          />
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              isDark={isDark}
              onClick={() => openProjectDetail(project)}
            />
          ))}
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <DetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={closeProjectDetail}
        isDark={isDark}
      />
    </section>
  );
};

export default Projects;
