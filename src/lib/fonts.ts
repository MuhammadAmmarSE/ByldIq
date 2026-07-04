import { JetBrains_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";

/**
 * The only three typefaces the design system permits:
 * Plus Jakarta Sans (display/headings), Inter (body), JetBrains Mono (code).
 */
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const fontVariables = [
  plusJakartaSans.variable,
  inter.variable,
  jetbrainsMono.variable,
].join(" ");
