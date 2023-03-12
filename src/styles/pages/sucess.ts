import { styled } from '..';
import * as Collapsible from '@radix-ui/react-collapsible';

export const SucessContainer = styled('main', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	margin: '0 auto',
	height: 656,

	h1: {
		fontSize: '$2xl',
		color: '$gray100',
	},

	p: {
		fontSize: '$xl',
		color: '$gray300',
		maxWidth: 560,
		textAlign: 'center',
		marginTop: '2rem',
		lineHeight: 1.4,
	},

	a: {
		display: 'block',
		marginTop: '5rem',
		fontSize: '$lg',
		color: '$green500',
		textDecoration: 'none',
		fontWeight: 'bold',

		'&:hover': {
			color: '$green300',
		},
	},
});

export const ImagesGroup = styled('div', {
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, 85px)',
	width: '100%',
	justifyContent: 'center',
	alignItems: 'center',
});

export const ImageContainer = styled('div', {
	width: 140,
	maxWidth: 140,
	height: 140,
	background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
	boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',
	borderRadius: '100%',
	marginTop: '4rem',

	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	img: {
		objectFit: 'cover',
	},
});

export const CollapsibleRoot = styled(Collapsible.Root, {
	minWidth: 300,
});

export const CollapsibleContent = styled(Collapsible.Content, {
	display: 'flex',
	flexDirection: 'column',
});

export const IconButton = styled('button', {
	all: 'unset',
	fontFamily: 'inherit',
	borderRadius: '100%',
	height: 25,
	width: 25,
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: 'white',
	'&[data-state="closed"]': { backgroundColor: '$green500' },
	'&[data-state="open"]': { backgroundColor: '$green300' },
	'&:hover': { backgroundColor: '$green300' },
	'&:focus': { boxShadow: `0 0 0 2px #7465d4` },
});

export const Flex = styled('div', { display: 'flex' });

export const Title = styled('span', {
	color: '$gray300',
	fontSize: 18,
	fontWeight: 'bold',
	lineHeight: '25px',
});

export const Text = styled('span', {
	color: '$gray300',
	fontSize: 15,
	lineHeight: '25px',
});

export const ContentContainer = styled('div', {
	backgroundColor: '$gray800',
	borderRadius: 4,
	margin: '10px 0',
	padding: 10,
});
