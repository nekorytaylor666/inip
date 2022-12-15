const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} \*/
module.exports = {
    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    darkMode: false, // or 'media' or 'class'
    mode: "jit",
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", ...fontFamily.sans],
                display: ["var(--font-bad-russian)", ...fontFamily.serif],
            },
            colors: {
                "brand-black": "#1A1A1A",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
