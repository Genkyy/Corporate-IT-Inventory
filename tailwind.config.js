import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Gabarito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                background: '#FFFDF8',
                foreground: '#1a1a1a',
                primary: '#1D3D2F',
                secondary: '#E6EBE0',
                accent: '#FF5C00',
                muted: '#f0ede6',
                'muted-foreground': '#6b6b6b',
                card: '#ffffff',
                warning: '#FFD23F', // Yellow Badge
                success: '#A3C95A', // Lime Badge
            },
        },
    },

    plugins: [forms],
};
