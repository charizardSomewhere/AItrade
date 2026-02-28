/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'monospace'],
            },
            colors: {
                arena: {
                    bg: '#0a0a0f',
                    surface: '#12121a',
                    border: '#1e1e2e',
                    muted: '#2a2a3e',
                }
            }
        },
    },
    plugins: [],
}
