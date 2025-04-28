import { motion } from "framer-motion";

export const BlogCard = ({ onClick }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    whileHover={{ scale: 1.02 }}
    className="relative group h-full cursor-pointer"
    onClick={onClick}
  >
    <div className="absolute -inset-0.5 bg-gradient-to-br from-indigo-500 
                    via-purple-500 to-blue-500 rounded-lg blur opacity-30 
                    group-hover:opacity-50 transition duration-300" />
    <div className="relative h-full p-6 bg-black rounded-lg border 
                    border-indigo-500/30 backdrop-blur-sm 
                    group-hover:border-indigo-400 transition-all">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 
                       transition-colors">
          Writing
        </h2>
        <span className="text-sm text-indigo-400">-- min</span>
      </div>
      <p className="text-gray-400 mb-4">
        This blog post will be available soon.
      </p>
      <div className="flex justify-between items-center mt-auto">
        <div className="flex gap-2">
          <span className="px-3 py-1 text-sm rounded-full bg-indigo-500/10 
                          border border-indigo-500/30 text-indigo-400">
            coming-soon
          </span>
        </div>
        <span className="text-sm text-gray-500">--/--/----</span>
      </div>
    </div>
  </motion.article>
);