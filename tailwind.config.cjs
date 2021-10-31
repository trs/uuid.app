const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss/defaultConfig').} */
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'media',
	variants: {
		extend: {
			ringWidth: ['hover', 'active'],
		}
	},
	theme: {
		screens: {
      'xs': '475px',
      ...defaultTheme.screens,
		},
		extend: {
			colors: {
				'black': {
					'50': '#f4f4f5',
					'100': '#eaeaeb',
					'200': '#c9cacc',
					'300': '#a9abae',
					'400': '#696b71',
					'500': '#282c34',
					'600': '#24282f',
					'700': '#1e2127',
					'800': '#181a1f',
					'900': '#141619'
				}
			},
			keyframes: {
				'spin-start': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(-20deg)'
					}
				},
				'spin-fast': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'80%': {
						transform: 'rotate(380deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'nudge-start': {
					'0%': {
						transform: 'translateX(0px)'
					},
					'100%': {
						transform: 'translateX(2px)'
					}
				},
				'nudge-left': {
					'0%': {
						transform: 'translateX(0px)'
					},
					'60%': {
						transform: 'translateX(-3px)'
					},
					'90%': {
						transform: 'translateX(1px)'
					},
					'100%': {
						transform: 'translateX(0px)'
					}
				}
			},
			animation: {
				'spin-start': 'spin-start 100ms ease forwards',
				'spin-fast': 'spin-fast 250ms ease-out infinite',
				'nudge-start': 'nudge-start 100ms ease forwards',
				'nudge-left': 'nudge-left 250ms ease-out infinite',
			},

		}
	}
};
