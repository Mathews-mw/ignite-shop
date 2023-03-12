import { styled } from '../../styles/index';
import * as ScrollArea from '@radix-ui/react-scroll-area';

export const Container = styled('div', {
	display: 'grid',
	gridTemplateRows: '1.875rem 1fr 11.875rem',
	gap: 10,

	maxWidth: '30rem',
	padding: '1rem',

	backgroundColor: '$gray800',
	boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
	color: '$gray100',
});

export const Header = styled('div', {
	display: 'flex',
	justifyContent: 'flex-end',

	[`> button`]: {
		background: 'none',
		color: '$gray300',
		border: 'none',
		outline: 'none',

		cursor: 'pointer',

		'&:hover': {
			color: '$gray100',
		},
	},
});

export const ContainerContent = styled('div', {
	padding: '2rem',

	// overflow: 'auto',

	h4: {
		marginBottom: '2rem',
	},

	'.productsList': {
		display: 'flex',
		flexDirection: 'column',
		gap: '1rem',
	},
});

export const ProductContainer = styled('div', {
	display: 'flex',
	gap: '20px',

	'.productsInfos': {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',

		padding: '6px 0',

		[`> p`]: {
			color: '$gray300',
		},

		[`> span`]: {
			fontWeight: 700,
		},

		[`> button`]: {
			background: 'none',
			color: '$green500',
			border: 'none',
			outline: 'none',

			display: 'flex',
			width: '65px',

			fontSize: '16px',
			fontWeight: 700,

			cursor: 'pointer',

			'&:hover': {
				color: '$green300',
			},
		},
	},
});

export const ImageContainer = styled('div', {
	width: '100%',
	maxWidth: 100,
	height: 90,
	background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
	borderRadius: 8,
	padding: '0.25rem',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	img: {
		objectFit: 'cover',
	},
});

export const Footer = styled('div', {
	display: 'flex',
	flexDirection: 'column',

	// padding: '2rem',
	gap: '8px',

	'.itensDescription': {
		display: 'flex',
		justifyContent: 'space-between',

		color: '$gray300',
		fontSize: 16,
	},

	'.itensPrice': {
		display: 'flex',
		justifyContent: 'space-between',

		fontSize: 18,
		fontWeight: 700,
	},

	button: {
		marginTop: '2rem',
		backgroundColor: '$green500',
		border: 0,
		color: 'white',
		borderRadius: 8,
		padding: '1.25rem',
		cursor: 'pointer',
		fontWeight: 'bold',
		fontSize: '$md',
	},

	'button:disabled': {
		opacity: 0.6,
		cursor: 'not-allowed',
	},

	'button:not(:disabled):hover': {
		backgroundColor: '$green300',
	},
});

export const EmptyCartContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	gap: '1rem',

	color: '$gray300',
	textAlign: 'center',
});

const SCROLLBAR_SIZE = 8;

export const ScrollAreaRoot = styled(ScrollArea.Root, {
	height: 'calc(100vh - 22rem)',
	borderRadius: 4,
	overflow: 'hidden',
	boxShadow: '0 2px 10px $gray800',
});

export const ScrollAreaViewport = styled(ScrollArea.Viewport, {
	width: '100%',
	height: '100%',
	borderRadius: 'inherit',
});

export const ScrollAreaScrollbar = styled(ScrollArea.Scrollbar, {
	display: 'flex',
	// ensures no selection
	userSelect: 'none',
	// disable browser handling of all panning and zooming gestures on touch devices
	touchAction: 'none',
	padding: 2,
	background: '$gray800',
	transition: 'background 160ms ease-out',
	'&:hover': { background: '$gray800' },
	'&[data-orientation="vertical"]': { width: SCROLLBAR_SIZE },
	'&[data-orientation="horizontal"]': {
		flexDirection: 'column',
		height: SCROLLBAR_SIZE,
	},
});

export const ScrollAreaThumb = styled(ScrollArea.Thumb, {
	flex: 1,
	background: '$green500',
	borderRadius: 6,
	// increase target size for touch devices https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
	position: 'relative',
	'&::before': {
		content: '""',
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '100%',
		height: '100%',
		minWidth: 44,
		minHeight: 44,
	},
});

export const ScrollAreaCorner = styled(ScrollArea.Corner, {
	background: '$gray800',
});
