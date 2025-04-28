import { motion } from "framer-motion";
import { skillCategories } from "../../constants/skillsData";
import { useTheme } from "../ThemeToggle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Skills = () => {
  const { isDark } = useTheme();

  const Skill = ({ name }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="relative group w-full"
      role="listitem"
    >
      <div
        className={`relative p-2 rounded-lg border backdrop-blur-sm ${
          isDark
            ? "bg-black/80 border-indigo-500/30 text-indigo-200"
            : "bg-white/80 border-indigo-300/50 text-indigo-600"
        } text-center font-mono`}
      >
        <div
          className={`absolute -inset-0.5 bg-gradient-to-r rounded-lg blur-sm opacity-0 
          group-hover:opacity-40 transition-all duration-300 ${
            isDark
              ? "from-indigo-600/20 to-blue-600/10"
              : "from-indigo-400/30 to-blue-400/20"
          }`}
        />
        <div className="relative z-10 flex items-center justify-between px-2">
          <span
            className={`text-sm transition-colors duration-300 ${
              isDark ? "group-hover:text-white" : "group-hover:text-indigo-900"
            }`}
          >
            {name}
          </span>
          <motion.div
            className={`w-1.5 h-1.5 rounded-full ${
              isDark ? "bg-indigo-300" : "bg-indigo-400"
            }`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>
    </motion.div>
  );

  const SkillsList = ({ skills }) => (
    <div className="space-y-2">
      <div className="flex flex-col gap-2">
        {skills.map((skill) => (
          <Skill key={skill} name={skill} />
        ))}
      </div>
    </div>
  );

  return (
    <section className={`py-20 relative ${isDark ? "bg-black" : "bg-white"}`}>
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

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 relative z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-3xl font-bold text-center ${
            isDark ? "text-white" : "text-gray-900"
          } mb-16`}
        >
          Skills & Technologies
          <div
            className={`w-24 h-1 bg-gradient-to-r ${
              isDark
                ? "from-white to-gray-500"
                : "from-indigo-600 to-indigo-300"
            } mx-auto mt-4 rounded-full`}
          />
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className="relative group"
              variants={containerVariants}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />

              <div
                className={`relative p-6 rounded-lg border h-full 
                backdrop-blur-sm transition-colors duration-300 ${
                  isDark
                    ? "bg-black border-indigo-500/30 group-hover:border-indigo-400"
                    : "bg-white border-indigo-300/50 group-hover:border-indigo-500"
                }`}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`p-3 rounded-lg transition-colors duration-300 ${
                      isDark
                        ? "bg-indigo-500/10 group-hover:bg-indigo-500/20"
                        : "bg-indigo-100/50 group-hover:bg-indigo-200/70"
                    }`}
                  >
                    <category.icon
                      className={`w-6 h-6 transition-colors duration-300 ${
                        isDark
                          ? "text-indigo-400 group-hover:text-indigo-300"
                          : "text-indigo-600 group-hover:text-indigo-500"
                      }`}
                    />
                  </div>
                  <h3
                    className={`text-xl font-bold transition-colors duration-300 ml-4 ${
                      isDark
                        ? "text-white group-hover:text-indigo-400"
                        : "text-gray-900 group-hover:text-indigo-600"
                    }`}
                  >
                    {category.title}
                  </h3>
                </div>

                {category.description && (
                  <p
                    className={`text-sm mb-4 ${
                      isDark ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {category.description}
                  </p>
                )}

                <SkillsList skills={category.skills} />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
