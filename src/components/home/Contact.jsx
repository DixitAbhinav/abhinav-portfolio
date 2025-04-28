import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Mail,
  GithubIcon,
  LinkedinIcon,
  Loader,
  Calendar,
} from "lucide-react";
import { useTheme } from "../ThemeToggle";

const NotificationToast = ({ message, type }) => {
  const { isDark } = useTheme();

  const styles = {
    success: {
      background: isDark
        ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20"
        : "bg-gradient-to-r from-green-500/10 to-emerald-500/10",
      border: isDark ? "border-green-500/30" : "border-green-400/30",
      text: isDark ? "text-green-400" : "text-green-600",
    },
    error: {
      background: isDark
        ? "bg-gradient-to-r from-red-500/20 to-rose-500/20"
        : "bg-gradient-to-r from-red-500/10 to-rose-500/10",
      border: isDark ? "border-red-500/30" : "border-red-400/30",
      text: isDark ? "text-red-400" : "text-red-600",
    },
  };

  const { background, border, text } = styles[type];

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50
                px-6 py-3 rounded-lg backdrop-blur-sm
                border ${border} ${background} ${
        isDark ? "bg-black/50" : "bg-white/50"
      }
                flex items-center gap-2 shadow-lg`}
    >
      <span className={`text-sm font-medium ${text}`}>{message}</span>
    </motion.div>
  );
};

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const { isDark } = useTheme();

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEmailClick = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const subject = "Collaboration Opportunity";
      const bodyLines = [
        "Hi Abhinav,",
        "",
        "I hope you're doing well!",
        "I recently reviewed your portfolio and was impressed by your innovative UI work, especially the interactive components and animations.",
        "I'm currently working on [brief description of your project], and I believe your expertise could greatly enhance the outcome.",
        "Would you be available for a quick call to explore potential collaboration?",
        "",
        "Looking forward to connecting.",
        "",
        "Best regards,",
        "[Your Name]",
        "[Your Position/Company]"
      ];
      const mailtoUrl = `mailto:dixitabhinav2004@gmail.com`
        + `?subject=${subject.replace(/ /g, "+")}`
        + `&body=${bodyLines.join("%0A")}`;

      window.location.href = mailtoUrl;
      showNotification("Opening your email client...", "success");
    } catch (error) {
      showNotification(
        "Could not open email client. Please try again.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScheduleCall = () => {
    window.open("https://calendly.com/dixitabhinav2004/30min", "_blank");
    showNotification("Opening scheduling calendar...", "success");
  };

  return (
    <section
      className={`py-20 relative overflow-hidden ${
        isDark ? "bg-black" : "bg-white"
      }`}
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
            ? "bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.1),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_50%)]"
        }`}
      />

      <div className="max-w-4xl mx-auto px-4 text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-3xl font-bold text-center ${
            isDark ? "text-white" : "text-gray-900"
          } mb-16`}
        >
          Let's Connect
          <div
            className={`w-24 h-1 bg-gradient-to-r ${
              isDark
                ? "from-white to-gray-500"
                : "from-indigo-600 to-indigo-300"
            } mx-auto mt-4 rounded-full`}
          />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          {/* Animated gradient background */}
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl blur opacity-30 
                     group-hover:opacity-50 transition duration-300"
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div
            className={`relative rounded-xl p-8 backdrop-blur-sm 
                     border transition-all duration-300
                     hover:shadow-[0_0_30px_-5px] ${
                       isDark
                         ? "bg-black border-indigo-500/30 group-hover:border-indigo-400 hover:shadow-indigo-500/20"
                         : "bg-white border-indigo-300/50 group-hover:border-indigo-500 hover:shadow-indigo-400/20"
                     }`}
          >
            <div
              className={`p-3 mx-auto mb-4 w-fit rounded-lg transition-colors duration-300 ${
                isDark
                  ? "bg-indigo-500/10 group-hover:bg-indigo-500/20"
                  : "bg-indigo-100/50 group-hover:bg-indigo-200/70"
              }`}
            >
              <MessageCircle
                className={`w-8 h-8 transition-colors duration-300 ${
                  isDark
                    ? "text-indigo-400 group-hover:text-indigo-300"
                    : "text-indigo-600 group-hover:text-indigo-500"
                }`}
              />
            </div>
            <p
              className={`text-xl ${
                isDark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Ready to collaborate or chat about tech? Let's create something
              amazing together!
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 mb-6 max-w-md mx-auto">
          {/* Send Email Button */}
          <motion.button
            onClick={handleEmailClick}
            disabled={isSubmitting}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.3)",
            }}
            className={`w-full px-6 py-3 rounded-lg font-semibold
                       disabled:opacity-50 transition-all duration-300 
                       disabled:cursor-not-allowed flex items-center gap-2 
                       justify-center shadow-md ${
                         isDark
                           ? "bg-gradient-to-r from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 text-indigo-700 border border-indigo-100 hover:border-indigo-200 hover:text-indigo-800 hover:shadow-indigo-100/20"
                           : "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white border border-transparent hover:shadow-indigo-500/20"
                       }`}
            aria-label="Send Email"
          >
            {isSubmitting ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Mail className="w-5 h-5" />
            )}
            Send Email
          </motion.button>

          {/* Schedule Call Button */}
          <motion.button
            onClick={handleScheduleCall}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full px-6 py-3 rounded-lg
                       border flex items-center gap-2 justify-center
                       transition-colors duration-200 ${
                         isDark
                           ? "bg-transparent text-gray-300 border-gray-700 hover:bg-gray-900"
                           : "bg-transparent text-gray-600 border-gray-300 hover:bg-gray-50"
                       }`}
            aria-label="Schedule Call"
          >
            <Calendar className="w-5 h-5" />
            <span>Schedule Call</span>
          </motion.button>
        </div>

        <div
          className={`p-1.5 border rounded-lg backdrop-blur-sm inline-block ${
            isDark
              ? "bg-black/80 border-indigo-500/10"
              : "bg-white/80 border-indigo-300/10"
          }`}
        >
          <div className="flex justify-center gap-4">
            {[
              { icon: GithubIcon, href: "https://github.com/DixitAbhinav" },
              {
                icon: LinkedinIcon,
                href: "https://www.linkedin.com/in/abhinav-dixit-81851b252",
              },
            ].map(({ icon: Icon, href }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-md transition-all duration-300 ${
                  isDark
                    ? "bg-indigo-500/10 text-indigo-400 hover:text-white hover:bg-indigo-500/20"
                    : "bg-indigo-100/50 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-200/70"
                }`}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {notification && (
          <NotificationToast
            message={notification.message}
            type={notification.type}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
