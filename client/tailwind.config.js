/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#d2b455", // Golden
                secondary: "#ba9829", // Dark Golden
                accent: "#18202f", // Navy Blue
                background: "#f1f2f3", // Light Grey/White
                surface: "#ffffff", // White for cards
                golden: {
                    50: '#fbf8eb',
                    100: '#f6efcd',
                    200: '#eddca0',
                    300: '#e3c26b',
                    400: '#d9a73e',
                    500: '#d2b455',
                    600: '#b68b25',
                    700: '#92661e',
                    800: '#78501e',
                    900: '#64411d',
                    950: '#39230e',
                },
                text: {
                    main: "#18202f", // Navy Blue
                    muted: "#6b7280", // Grey
                }
            },
            fontFamily: {
                sans: ['Oswald', 'sans-serif'],
                heading: ['Oswald', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
