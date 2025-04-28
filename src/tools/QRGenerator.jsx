import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  QrCode,
  Download,
  Copy,
  Check,
  Link,
  Mail,
  Phone,
  User,
  ArrowLeft,
} from "lucide-react";
import { useTheme } from "../components/ThemeToggle";
import { Button } from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { FloatingCubes } from "../components/common/FloatingCubes";

const QRGenerator = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState("url");
  const [qrContent, setQrContent] = useState("");
  const [qrSize, setQrSize] = useState(300);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const tabs = [
    {
      id: "url",
      label: "URL",
      icon: Link,
      placeholder: "Enter URL (e.g., https://example.com)",
    },
    {
      id: "email",
      label: "Email",
      icon: Mail,
      placeholder: "Enter email address",
    },
    {
      id: "phone",
      label: "Phone",
      icon: Phone,
      placeholder: "Enter phone number",
    },
    { id: "text", label: "Text", icon: User, placeholder: "Enter your text" },
  ];

  const getQRCodeUrl = useCallback(() => {
    if (!qrContent) return "";
    let content = qrContent;

    switch (activeTab) {
      case "email":
        content = `mailto:${qrContent}`;
        break;
      case "phone":
        content = `tel:${qrContent}`;
        break;
      default:
        break;
    }

    return `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(
      content
    )}`;
  }, [qrContent, qrSize, activeTab]);

  const handleDownload = async () => {
    try {
      const response = await fetch(getQRCodeUrl());
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading QR code:", error);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(getQRCodeUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      className={`py-20 relative min-h-svh ${isDark ? "bg-black" : "bg-white"}`}
    >
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
            ? "from-indigo-900/1 via-black to-black"
            : "from-indigo-100/50 via-white to-white"
        }`}
      />
      <FloatingCubes />
      <div
        className={`absolute inset-0 ${
          isDark
            ? "bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1),transparent_50%)]"
            : "bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]"
        }`}
      />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-3xl font-bold text-center ${
            isDark ? "text-white" : "text-gray-900"
          } mb-16`}
        >
          QR Code Generator
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
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300" />

            <div
              className={`relative p-6 rounded-lg border backdrop-blur-sm transition-colors duration-300 ${
                isDark
                  ? "bg-black border-indigo-500/30 group-hover:border-indigo-400"
                  : "bg-white border-indigo-300/50 group-hover:border-indigo-500"
              }`}
            >
              {/* Tab Navigation */}
              <div className="flex space-x-2 mb-6 justify-center flex-wrap">
                {tabs.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === id
                        ? isDark
                          ? "bg-indigo-500/20 text-indigo-400"
                          : "bg-indigo-100 text-indigo-600"
                        : isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-4 h-4 " />
                    {label}
                  </button>
                ))}
              </div>

              {/* Input Section */}
              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={qrContent}
                    onChange={(e) => setQrContent(e.target.value)}
                    placeholder={
                      tabs.find((t) => t.id === activeTab)?.placeholder
                    }
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                      isDark
                        ? "bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:border-indigo-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500"
                    }`}
                  />
                </div>

                {/* Size Slider */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Size ({qrSize}px)
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="1000"
                    value={qrSize}
                    onChange={(e) => setQrSize(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(90deg, #4f46e5 ${
                        (qrSize - 100) / 9
                      }%, #e5e7eb ${100 - (qrSize - 100) / 9}%)`,
                    }}
                  />
                </div>

                {/* QR Code Preview */}
                {qrContent && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-6 rounded-lg border ${
                      isDark
                        ? "border-gray-800 bg-gray-900/30"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex justify-center mb-6">
                      <div
                        className={`p-4 rounded-lg ${
                          isDark ? "bg-white" : "bg-white"
                        }`}
                      >
                        <img
                          src={getQRCodeUrl()}
                          alt="QR Code"
                          className="max-w-full"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4">
                      <motion.button
                        onClick={handleDownload}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${
                          isDark
                            ? "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30"
                            : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </motion.button>

                      <motion.button
                        onClick={handleCopyUrl}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${
                          isDark
                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        {copied ? "Copied!" : "Copy URL"}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default QRGenerator;
