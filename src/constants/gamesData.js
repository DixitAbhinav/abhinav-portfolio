// src/constants/gamesData.js 
import { Palette, Keyboard, Grid, Brain } from "lucide-react";

export const games = [
  {
    title: "Color Match Challenge",
    description: [
      "Test your color perception skills",
      "Match RGB values in real-time",
      "Track your high scores and progress",
    ],
    icon: Palette,
    path: "/games/color-match",
    tech: ["RGB", "Color Theory", "Reaction Time"],
  },
  {
    title: "Typing Speed Test",
    description: [
      "Improve your typing accuracy and speed",
      "Practice with random text passages",
      "View detailed performance metrics",
    ],
    icon: Keyboard,
    path: "/games/typing-test",
    tech: ["WPM", "Accuracy", "Statistics"],
  },
  {
    title: "Sliding Puzzle",
    description: [
      "Classic sliding tile puzzle game",
      "Race against time to solve the puzzle",
      "Challenge yourself with move counting",
    ],
    icon: Grid,
    path: "/games/sliding-puzzle",
    tech: ["Logic", "Strategy", "Spatial Reasoning"],
  },
  {
    title: "Memory Match",
    description: [
      "Test and improve your memory",
      "Match pairs of cards quickly",
      "Track your time and moves",
    ],
    icon: Brain,
    path: "/games/memory-match",
    tech: ["Memory", "Pattern Recognition", "Focus"],
  },
];