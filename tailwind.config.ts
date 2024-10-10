import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "logo-icon": "url('/ui/logo_icon.svg')",
        toVillage: "url('/ui/tovillage.svg')",
        "login-login-1": "url('/ui/login_login_1.svg')",
        "login-login-2": "url('/ui/login_login_2.svg')",
        "login-main": "url('/ui/login_main.svg')",
        "login-email-1": "url('/ui/login_email_1.svg')",
        "login-email-2": "url('/ui/login_email_2.svg')",
        "login-sns-1": "url('/ui/login_sns_2.svg')",
        "login-sns-2": "url('/ui/login_sns_2.svg')",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT:
          " -0px -1px 0 var(--tw-shadow-color), -0px 1px 0 var(--tw-shadow-color), -1px 0px 0 var(--tw-shadow-color), 1px 0px 0 var(--tw-shadow-color), -1px -1px 0 var(--tw-shadow-color), -1px 1px 0 var(--tw-shadow-color), 1px -1px 0 var(--tw-shadow-color), 1px 1px 0 var(--tw-shadow-color)",
        lg: " -2px -2px 0 var(--tw-shadow-color), 2px -2px 0 var(--tw-shadow-color), -2px 2px 0 var(--tw-shadow-color), 2px 2px 0 var(--tw-shadow-color);",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
export default config;
