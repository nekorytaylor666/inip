const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} \*/
module.exports = {
    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)", ...fontFamily.sans],
                display: ["var(--font-bad-russian)", ...fontFamily.serif],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
