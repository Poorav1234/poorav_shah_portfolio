import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dark: '#7C3AED',
        },
        secondary: {
          DEFAULT: '#EC4899',
          light: '#F472B6',
          dark: '#DB2777',
        },
        accent: {
          DEFAULT: '#0EA5E9',
          light: '#38BDF8',
          dark: '#0284C7',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'purple-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
        'dark-gradient': 'linear-gradient(160deg, #0F0F23 0%, #1A1A2E 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow-lg': '0 0 30px rgba(139, 92, 246, 0.7)',
        'card': '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
export default config