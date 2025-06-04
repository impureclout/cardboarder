/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./cardboarder/index.html",
    "./cardboarder/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        heading: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'cb-purple': '#A78BFA',
        'cb-orange': '#FDBA74',
        'cb-blue': '#93C5FD',
        'cb-red': '#FCA5A5',
        'cb-yellow': '#FDE047',
        'cb-white': '#FFFFFF',
        'cb-grey': '#D1D5DB',
        'cb-black': '#1F2937',
      },
      transitionProperty: {
        ...defaultTheme.transitionProperty,
        'height': 'height',
        'spacing': 'margin, padding',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color, rgba(0,0,0,0.5))',
        DEFAULT: '0 2px 4px var(--tw-shadow-color, rgba(0,0,0,0.5))',
        md: '0 3px 6px var(--tw-shadow-color, rgba(0,0,0,0.5))',
        lg: '0 5px 10px var(--tw-shadow-color, rgba(0,0,0,0.5))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function({ addUtilities, theme, e }) {
      const newUtilities = {};
      Object.entries(theme('textShadow')).forEach(([key, value]) => {
        newUtilities[`.${e(`text-shadow${key === 'DEFAULT' ? '' : `-${key}`}`)}`] = {
          textShadow: value,
        };
      });
      addUtilities(newUtilities);
    }),
  ],
} 