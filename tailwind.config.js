/** @type {import('tailwindcss').Config} */
export default {
  content: ['./resources/**/*.edge', './src/**/*.{js,jsx,ts,tsx,edge}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=light]'],
          'primary': '#9D2D88',
          'base-100': '#e5e7eb',
          'secondary': '#9D2D88',
          'primary-focus': 'mediumblue',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=dark]'],
          'primary': '#9D2D88',
          'base-100': '#1f2937',
          'secondary': '#9D2D88',
          'primary-focus': 'darkblue',
        },
      },
    ],
  },
}
