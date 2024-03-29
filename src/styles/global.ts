import { globalCss } from '.';

export const globalStyles = globalCss({
	'*': {
		margin: 0,
		padding: 0,
	},

	body: {
		'-webkit-font-smoothing': 'antialised',
		backgroundColor: '$gray900',
		color: '$gray100',
		boxSizing: 'border-box',
	},

	'body, input, textarea, button': {
		fontFamily: 'Roboto',
		fontWeight: 400,
	},

	'::-webkit-scrollbar-thumb': {
		backgroundColor: 'darkgrey',
		outline: '1px solid slategrey',
	},
});
