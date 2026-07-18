/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			colors: {
				neo: {
					50: '#f5f0ff',
					100: '#ede5ff',
					200: '#d9ccff',
					300: '#bfa3ff',
					400: '#9d6bff',
					500: '#7c3aed',
					600: '#5b18ee',
					700: '#4a0fc7',
					800: '#3b0a9e',
					900: '#2a0670',
					950: '#1a0447',
				},
			},
			boxShadow: {
				neo: '0 4px 24px -4px rgba(91, 24, 238, 0.18)',
				'neo-lg': '0 12px 40px -8px rgba(91, 24, 238, 0.25)',
				'neo-glow': '0 0 24px rgba(91, 24, 238, 0.35)',
				card: '0 1px 3px rgba(15, 23, 42, 0.04), 0 8px 24px -6px rgba(91, 24, 238, 0.08)',
				'card-hover':
					'0 4px 12px rgba(15, 23, 42, 0.06), 0 16px 40px -8px rgba(91, 24, 238, 0.18)',
			},
			backgroundImage: {
				'neo-gradient': 'linear-gradient(135deg, #5b18ee 0%, #7c3aed 50%, #9d6bff 100%)',
				'neo-gradient-dark':
					'linear-gradient(160deg, #1a0447 0%, #2a0670 40%, #3b0a9e 100%)',
				'neo-mesh':
					'radial-gradient(ellipse 80% 60% at 10% 0%, rgba(91, 24, 238, 0.12) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(124, 58, 237, 0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 50% 100%, rgba(157, 107, 255, 0.06) 0%, transparent 50%)',
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-out',
				'slide-up': 'slideUp 0.5s ease-out',
				'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
				shimmer: 'shimmer 2.5s linear infinite',
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideUp: {
					'0%': { opacity: '0', transform: 'translateY(12px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				pulseSoft: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
			},
		},
	},
	plugins: [],
};
