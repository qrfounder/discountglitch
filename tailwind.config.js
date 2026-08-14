/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Apple Store–inspired tokens (mapped to dg-* for existing classnames) */
        dg: {
          navy: "#1D1D1F",
          "navy-soft": "#2D2D2F",
          blue: "#0071E3",
          "blue-hover": "#0077ED",
          gold: "#BF4800",
          "gold-soft": "#F5E6DC",
          green: "#34C759",
          surface: "#F5F5F7",
          canvas: "#F5F5F7",
          text: "#1D1D1F",
          muted: "#6E6E73",
          border: "#D2D2D7",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        app: "22px",
        icon: "22.5%",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        wordmark: ["var(--font-wordmark)", "sans-serif"],
      },
      boxShadow: {
        premium: "0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
        "premium-lg": "0 4px 16px rgba(0,0,0,0.06), 0 16px 40px rgba(0,0,0,0.08)",
        app: "0 4px 24px rgba(0,0,0,0.08)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(0.92)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "dg-feed-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "dg-feed-row-in": {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "dg-unlock-flash": {
          "0%": { backgroundColor: "rgba(52, 199, 89, 0.16)" },
          "100%": { backgroundColor: "transparent" },
        },
        "dg-featured-in": {
          from: { opacity: "0", transform: "scale(1.04)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 1.6s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "dg-feed-in": "dg-feed-in 0.45s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
