import type { Config } from "tailwindcss";

// v4 "risk note": information-led, rule-based editorial system. No panel/card
// language. Token NAMES are kept stable so chart code and utilities don't churn;
// the semantics shift (borders are rules, panel bg is only for recessed wells).
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#0B0C0F", // page
          secondary: "#0E0F13", // recessed well
        },
        panel: {
          DEFAULT: "#0E0F13",
          header: "#111217",
          elevated: "#15171C",
        },
        // "border" == rules
        border: {
          DEFAULT: "#2C2F35", // major rule
          soft: "#1B1D22", // minor rule
        },
        text: {
          primary: "#EAEAE6",
          secondary: "#9A9CA1",
          muted: "#64676D",
          faint: "#44464B",
        },
        accent: {
          cyan: "#8AA0C8", // restrained slate accent (active nav / focus / key)
          blue: "#7488B8",
          teal: "#5AA8A0", // secondary data series
          amber: "#C39A3C", // warning
          red: "#D2574F", // loss
          green: "#4CAF6E", // gain
          purple: "#9487C0", // ES marker
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        DEFAULT: "2px",
        sm: "1px",
        md: "3px",
        lg: "3px",
        xl: "4px",
        "2xl": "4px",
      },
      letterSpacing: {
        label: "0.16em",
      },
      transitionTimingFunction: {
        "out-quart": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
