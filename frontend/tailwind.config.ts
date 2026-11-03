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
        pastel: {
          cream: '#FCFAF7',
          sand: '#F7F4EE',
          sandDark: '#EAE3D6',
          peach: '#F8F2EC',
          peachBorder: '#E6D7CB',
          peachText: '#874C37',
          amber: '#F8F3EA',
          amberBorder: '#E6DCB8',
          amberText: '#7C5B28',
          sage: '#F2F5F2',
          sageBorder: '#D4DDD6',
          sageText: '#3B5745',
          rose: '#F8F2F2',
          roseBorder: '#E8D6D6',
          roseText: '#834242',
        },
        sucrenita: {
          50: '#FAF8F5',
          100: '#F4EFE7',
          200: '#E8DFC8',
          300: '#D5C3B0',
          400: '#B28E77',
          500: '#92674E',
          600: '#754E38',
          700: '#5A3A27',
          800: '#3F271A',
          900: '#26170E',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(117, 78, 56, 0.04), 0 2px 6px -1px rgba(117, 78, 56, 0.02)',
        'soft-lg': '0 10px 30px -4px rgba(117, 78, 56, 0.07), 0 4px 10px -2px rgba(117, 78, 56, 0.03)',
      },
    },
  },
  plugins: [],
};

export default config;
