// tailwind.config.js

module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
    "./src/context/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        primary: "#1C1C1E",
        primaryLight: "#2A2A2E",
        // primary: "#3674B5",
        // primaryLight: "#578FCA",
        accentAqua: "#A1E3F9",
        surfaceMint: "#D1F8EF",
        textMain: "#1F2937",
        textMuted: "#6B7280",
      },
    },
  },
  plugins: [],
};
