import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        header_gray: "var(--header-gray)",
        box_border: "var(--box-border)",
        black: "var(--black)",
        white: "var(--white)",
        light_black: "var(--light-black)",
        checkbox_gray: "var(--checkbox-gray)",
        pagination_gray: "var(--pagination-gray)",
      },
    },
  },
  plugins: [],
} satisfies Config;
