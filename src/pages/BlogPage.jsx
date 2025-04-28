import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { FloatingCubes } from "../components/common/FloatingCubes";
import { Button } from "../components/common/Button";
import { AnimatedSearchBar } from "../components/blog/AnimatedSearchBar";
import { BlogCard } from "../components/blog/BlogCard";
import { BlogDetail } from "../components/blog/BlogDetail";
import { LoadingSpinner } from "../components/common/LoadingSpinner";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <AnimatePresence>{isLoading && <LoadingSpinner />}</AnimatePresence>

      {!isLoading && (
        <>
          <Button />
          <FloatingCubes />

          <header className="relative pt-20 pb-16 px-4">
            <AnimatedSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </header>

          <main className="max-w-6xl mx-auto px-4 pb-20">
            <AnimatePresence>
              {selectedPost && (
                <BlogDetail onClose={() => setSelectedPost(false)} />
              )}
            </AnimatePresence>
          </main>
        </>
      )}
    </div>
  );
};

export default BlogPage;
