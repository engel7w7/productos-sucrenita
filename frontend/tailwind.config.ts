import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta pastel elegante y armoniosa para Productos Sucreñita
        pastel: {
          cream: '#FFFDF9',
          sand: '#FAF6F0',
          sandDark: '#F2ECE1',
          peach: '#FDF2EB',
          peachBorder: '#F9DFD1',
          peachText: '#B86A45',
          amber: '#FEF8ED',
          amberBorder: '#FDE6C4',
          amberText: '#9A631E',
          sage: '#F1F6F3',
          sageBorder: '#D8E5DC',
          sageText: '#376952',
          rose: '#FCF3F3',
          roseBorder: '#F7D7D7',
          roseText: '#A84B4B',
        },
        sucrenita: {
          50: '#FAF7F2',
          100: '#F4EFE6',
          200: '#E8DFD1',
          300: '#D5C4B0',
          400: '#B89379',
          500: '#9E6D50',
          600: '#80523A',
          700: '#643C28',
          800: '#43291B',
          900: '#2A180E',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(138, 98, 70, 0.06), 0 2px 6px -1px rgba(138, 98, 70, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(138, 98, 70, 0.09), 0 4px 10px -2px rgba(138, 98, 70, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
