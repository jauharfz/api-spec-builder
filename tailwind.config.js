/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "media",
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "'Segoe UI'",
                    "sans-serif",
                ],
                mono: [
                    "'SF Mono'",
                    "'Fira Code'",
                    "'Cascadia Code'",
                    "monospace",
                ],
            },
            colors: {
                success: {
                    bg: "#eaf3de",
                    text: "#3b6d11",
                    border: "#c0dd97",
                },
                info: {
                    bg: "#e6f1fb",
                    text: "#185fa5",
                    border: "#b5d4f4",
                },
                warning: {
                    bg: "#faeeda",
                    text: "#854f0b",
                    border: "#fac775",
                },
                danger: {
                    bg: "#fcebeb",
                    text: "#a32d2d",
                    border: "#f7c1c1",
                },
                purple: {
                    bg: "#f1eefc",
                    text: "#534ab7",
                    border: "#c9c2f5",
                },
            },
        },
    },
    plugins: [],
};