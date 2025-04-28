import { motion } from "framer-motion";
import { Search } from "lucide-react";

export const AnimatedSearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="relative max-w-xl w-full justify-center mx-auto mb-12">
    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut",
        }}
      >
        <Search className="w-5 h-5 text-indigo-400" />
      </motion.div>
    </div>
    <input
      type="text"
      placeholder="Search articles..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-12 pr-4 py-3 rounded-lg bg-indigo-500/10 
                 border border-indigo-500/30 text-white placeholder-indigo-400 
                 focus:outline-none focus:border-indigo-400 transition-colors"
    />
  </div>
);
