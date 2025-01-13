const { green, grass } = require('@radix-ui/colors')

/** @type {import('tailwindcss').Config} */
export default {
    content: ["assets/**", "entrypoints/**", "components/**"],
    theme: {
        extend: {
            colors: {
                ...green,
                ...grass,
            },
        },
    },
    plugins: [],
};