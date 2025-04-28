import React, { useState, useCallback, useEffect } from "react";
import {
  Upload,
  ImageIcon,
  Download,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useTheme } from "../components/ThemeToggle";
import { Button } from "../components/common/Button";
import { FloatingCubes } from "../components/common//FloatingCubes";

const ImagePreviewModal = ({ isOpen, onClose, images, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, onClose]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="relative max-w-6xl w-full mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative aspect-video bg-black/50 rounded-lg overflow-hidden">
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].label}
            className="w-full h-full object-contain"
          />

          {images.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white/80 hover:bg-black/70 hover:text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-white text-sm font-medium">
              {images[currentIndex].label}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageCompressor = () => {
  // State declarations
  const [image, setImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [quality, setQuality] = useState(0.7);
  const [scale, setScale] = useState(70);
  const [stats, setStats] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialIndex, setModalInitialIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isDark } = useTheme();

  // Helper functions
  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getPreviewImages = () => {
    if (!image || !compressedImage) return [];
    return [
      { url: image, label: "Original Image" },
      { url: compressedImage, label: "Compressed Image" },
    ];
  };

  // Event handlers
  const handlePreviewClick = (index) => {
    setModalInitialIndex(index);
    setIsModalOpen(true);
  };

  const handleDownload = () => {
    if (compressedImage) {
      const link = document.createElement("a");
      link.href = compressedImage;
      link.download = "compressed-image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleReset = () => {
    setImage(null);
    setCompressedImage(null);
    setOriginalFile(null);
    setStats(null);
    setQuality(0.7);
    setScale(70);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setOriginalFile(file);
      handleCompression(file);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setOriginalFile(file);
      handleCompression(file);
    }
  };

  // Complex operations with hooks
  const compressImage = useCallback(
    (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const scaleFactor = scale / 100;
            const width = Math.round(img.width * scaleFactor);
            const height = Math.round(img.height * scaleFactor);

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
              (blob) => {
                resolve({
                  blob,
                  originalWidth: img.width,
                  originalHeight: img.height,
                  newWidth: width,
                  newHeight: height,
                });
              },
              "image/jpeg",
              quality
            );
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    },
    [quality, scale]
  );

  const handleCompression = async (file) => {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    try {
      const { blob, originalWidth, originalHeight, newWidth, newHeight } =
        await compressImage(file);
      const compressedUrl = URL.createObjectURL(blob);
      setCompressedImage(compressedUrl);

      const originalSize = file.size;
      const compressedSize = blob.size;
      const savedBytes = originalSize - compressedSize;
      const savedPercentage = ((savedBytes / originalSize) * 100).toFixed(1);

      setStats({
        originalSize: formatBytes(originalSize),
        compressedSize: formatBytes(compressedSize),
        savedSize: formatBytes(savedBytes),
        savedPercentage,
        originalDimensions: `${originalWidth}×${originalHeight}`,
        newDimensions: `${newWidth}×${newHeight}`,
        originalType: file.type,
        compressedType: "image/jpeg",
      });
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  };

  // Effects
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (originalFile) {
      handleCompression(originalFile);
    }
  }, [quality, scale, originalFile, compressImage]);

  if (isLoading) {
    return (
      <div
        className={`fixed inset-0 ${
          isDark ? "bg-black" : "bg-white"
        } flex items-center justify-center`}
      >
        <LoadingSpinner text="Loading..." />
      </div>
    );
  }

  return (
    <section
      className={`py-20 relative min-h-screen ${
        isDark ? "bg-black" : "bg-white"
      }`}
    >
      <FloatingCubes />
      <button
        onClick={() => window.history.back()}
        className="fixed top-6 left-5 p-2 rounded-full z-50 
    focus:outline-none shadow-md
    bg-white text-blue-600
    transition-all duration-300 hover:bg-blue-50 hover:shadow-lg
    outline outline-1 outline-gray-300"
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          isDark
            ? "from-indigo-900/10 via-black to-black"
            : "from-indigo-100/50 via-white to-white"
        }`}
      />

      <FloatingCubes />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Image Compressor
          </h2>
          <div
            className={`w-24 h-1 bg-gradient-to-r ${
              isDark
                ? "from-white to-gray-500"
                : "from-indigo-600 to-indigo-300"
            } mx-auto mt-4 rounded-full`}
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />

            <div
              className={`relative p-6 rounded-lg border backdrop-blur-sm transition-colors duration-300 ${
                isDark
                  ? "bg-black/80 border-indigo-500/30 group-hover:border-indigo-400"
                  : "bg-white/90 border-indigo-300/50 group-hover:border-indigo-500"
              }`}
            >
              {!image ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-300 ${
                    isDark
                      ? "border-indigo-500/30 hover:border-indigo-400"
                      : "border-indigo-300/50 hover:border-indigo-500"
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="imageInput"
                  />
                  <label htmlFor="imageInput" className="cursor-pointer block">
                    <Upload
                      className={`w-12 h-12 mx-auto mb-4 ${
                        isDark ? "text-indigo-400" : "text-indigo-600"
                      }`}
                    />
                    <p
                      className={`text-lg font-medium ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Drop your image here or click to upload
                    </p>
                    <p
                      className={`mt-2 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Supports: JPG, PNG, WebP
                    </p>
                  </label>
                </div>
              ) : (
                <div className="space-y-6">
                  <button
                    onClick={handleReset}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Upload
                  </button>
                  {/* Stats Section */}
                  {stats && (
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-300" />

                      <div
                        className={`relative rounded-lg overflow-hidden ${
                          isDark ? "bg-black/80" : "bg-white/90"
                        }`}
                      >
                        <div
                          className={`px-6 py-3 border-b ${
                            isDark ? "border-gray-800" : "border-gray-200"
                          }`}
                        >
                          <h4
                            className={`text-sm font-semibold ${
                              isDark ? "text-white" : "text-gray-900"
                            }`}
                          >
                            Compression Results
                          </h4>
                        </div>

                        <div className="grid grid-cols-2 gap-4 p-6">
                          {/* Original Stats */}
                          <div className="space-y-3">
                            <div
                              className={`flex items-center gap-2 ${
                                isDark ? "text-indigo-400" : "text-indigo-600"
                              }`}
                            >
                              <ImageIcon className="w-4 h-4" />
                              <span className="text-xs font-semibold">
                                Original
                              </span>
                            </div>
                            <div
                              className={`space-y-2 ${
                                isDark ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              <div className="flex justify-between text-sm">
                                <span>Size:</span>
                                <span className="font-medium">
                                  {stats.originalSize}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Dimensions:</span>
                                <span className="font-medium">
                                  {stats.originalDimensions}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Compressed Stats */}
                          <div className="space-y-3">
                            <div
                              className={`flex items-center gap-2 ${
                                isDark ? "text-green-400" : "text-green-600"
                              }`}
                            >
                              <Download className="w-4 h-4" />
                              <span className="text-xs font-semibold">
                                Compressed
                              </span>
                            </div>
                            <div
                              className={`space-y-2 ${
                                isDark ? "text-gray-300" : "text-gray-600"
                              }`}
                            >
                              <div className="flex justify-between text-sm">
                                <span>Size:</span>
                                <span className="font-medium">
                                  {stats.compressedSize}
                                </span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Dimensions:</span>
                                <span className="font-medium">
                                  {stats.newDimensions}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Savings Banner */}
                        <div
                          className={`p-3 ${
                            isDark
                              ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20"
                              : "bg-gradient-to-r from-green-100 to-emerald-100"
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            <span
                              className={`text-sm font-medium ${
                                isDark ? "text-green-400" : "text-green-600"
                              }`}
                            >
                              Saved {stats.savedSize} ({stats.savedPercentage}%
                              reduction)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-3 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Quality ({(quality * 100).toFixed(0)}%)
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={quality * 100}
                          onChange={(e) =>
                            setQuality(Number(e.target.value) / 100)
                          }
                          className={`w-full h-3 rounded-lg appearance-none cursor-pointer ${
                            isDark
                              ? "focus:ring-indigo-500 dark:focus:ring-indigo-400"
                              : "focus:ring-blue-500 focus:ring-offset-2"
                          }`}
                          style={{
                            background: `linear-gradient(90deg, ${
                              isDark ? "#6366f1" : "#3b82f6"
                            } ${quality * 100}%, ${
                              isDark ? "#1f2937" : "#e5e7eb"
                            } ${100 - quality * 100}%)`,
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium mb-3 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Scale ({scale}%)
                      </label>
                      <div className="relative">
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={scale}
                          onChange={(e) => setScale(Number(e.target.value))}
                          className={`w-full h-3 rounded-lg appearance-none cursor-pointer ${
                            isDark
                              ? "focus:ring-indigo-500 dark:focus:ring-indigo-400"
                              : "focus:ring-blue-500 focus:ring-offset-2"
                          }`}
                          style={{
                            background: `linear-gradient(90deg, ${
                              isDark ? "#6366f1" : "#3b82f6"
                            } ${scale}%, ${isDark ? "#1f2937" : "#e5e7eb"} ${
                              100 - scale
                            }%)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image Previews */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p
                        className={`text-sm font-medium mb-2 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Original
                      </p>
                      <div
                        className="relative group rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => handlePreviewClick(0)}
                      >
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                        <img
                          src={image}
                          alt="Original"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium mb-2 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Compressed
                      </p>
                      <div
                        className="relative group rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => handlePreviewClick(1)}
                      >
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                        <img
                          src={compressedImage}
                          alt="Compressed"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="relative group w-48 mx-auto">
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500 via-indigo-500 to-indigo-500 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300" />
                    <div className="absolute inset-[1px] bg-gradient-to-r from-white/20 to-transparent rounded-lg opacity-20 group-hover:opacity-30" />

                    <button
                      onClick={handleDownload}
                      disabled={!compressedImage}
                      className={`relative w-full px-4 py-2 rounded-lg font-medium text-sm
                        disabled:opacity-50 transition-all duration-300 
                        disabled:cursor-not-allowed flex items-center gap-2 
                        justify-center shadow-md backdrop-blur-sm
                        ${
                          isDark
                            ? "bg-black/80 text-white border border-indigo-500/30 hover:border-indigo-400"
                            : "bg-white/90 text-indigo-700 border border-indigo-300/50 hover:border-indigo-500"
                        }
                        ${
                          !compressedImage && isDark
                            ? "opacity-50 cursor-not-allowed border-gray-700 text-gray-400"
                            : ""
                        }
                        ${
                          !compressedImage && !isDark
                            ? "opacity-50 cursor-not-allowed border-gray-300 text-gray-500"
                            : ""
                        }`}
                    >
                      {!compressedImage ? (
                        <ImageIcon className="w-4 h-4 opacity-50" />
                      ) : (
                        <Download className="w-4 h-4 group-hover:animate-bounce" />
                      )}
                      <span className="text-xs font-semibold tracking-wide">
                        {!compressedImage ? "No Image" : "Download"}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ImagePreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={getPreviewImages()}
        initialIndex={modalInitialIndex}
      />
    </section>
  );
};

export default ImageCompressor;
