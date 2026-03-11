import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primaryPink: '#fde2f3',
        primaryPurple: '#6b21a8',
        softPurple: '#8b5cf6',
      },
    },
  },
  plugins: [],
};

export default config;