/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                lora: ["Lora", "serif"],
                saira: ["Saira Semi Condensed", "sans-serif"]
            }
        },
    },
    plugins: [],
};
