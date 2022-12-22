const { fontFamily } = require("tailwindcss/defaultTheme");
/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"],
    content: [
        "./node_modules/flowbite-react/**/*.js",
        "./pages/**/*.{ts,tsx}",
        "./public/**/*.html",
    ],
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
                "brand-orange": "#df5000",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("flowbite/plugin")],
};
