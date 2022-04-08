module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                purista: ["purista-web", "sans-serif"],
            },
            gridTemplateRows: {
                'posts': '225px 1fr',
                'explore-tabs': '210px 1fr',
            },
        },
    },
    plugins: [],
}
