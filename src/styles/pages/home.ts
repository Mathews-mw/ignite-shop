import { styled } from '..';

export const HomeContainer = styled('main', {
	display: 'flex',
	width: '100%',
	maxWidth: 'calc(100vw - ((100vw - 1080px) / 2))',
	marginLeft: 'auto',
	minHeight: 656,
});

export const Product = styled('div', {
	background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
	borderRadius: 8,
	cursor: 'pointer',
	position: 'relative',
	overflow: 'hidden',
	textDecoration: 'none',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	img: {
		objectFit: 'cover',
	},

	footer: {
		position: 'absolute',
		bottom: '0.25rem',
		left: '0.25rem',
		right: '0.25rem',
		padding: '2rem',

		borderRadius: 6,

		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',

		backgroundColor: 'rgba(0, 0, 0, 0.6)',

		transform: 'translateY(110%)',
		opacity: 0,
		transition: 'all 0.2s ease-in-out',

		strong: {
			fontSize: '$lg',
			color: '$gray100',
		},

		span: {
			fontSize: '$xl',
			fontWeight: 'bold',
			color: '$green300',
		},
	},

	'&:hover': {
		footer: {
			transform: 'translateY(0%)',
			opacity: 1,
		},
	},

	'.InfoProductGroup': {
		display: 'flex',
		flexDirection: 'column',
		gap: '0.5rem',
	},

	'footer strong': {
		fontSize: '$md',
	},
});

export const IconContainer = styled('span', {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	width: 56,
	height: 56,
	borderRadius: 6,

	background: '$green500',

	svg: {
		color: '$gray100',
	},
});
