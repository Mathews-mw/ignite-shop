import { styled } from '../../styles';

export const HeaderContainer = styled('header', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',

	padding: '2rem 0',
	width: '100%',
	maxWidth: 1180,
	margin: '0 auto',
});

export const BadgeContainer = styled('div', {
	width: 72,
	height: 72,
	border: '1px solid transparent',
	borderRadius: '50%',
	position: 'relative',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	'.indicator': {
		position: 'absolute',
		top: '0%',
		right: '0%',
		left: '60%',
		bottom: '60%',
		backgroundColor: '$green500',
		border: '3px solid $gray900',
		borderRadius: '50%',

		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},

	'.noti_count': {
		fontWeight: 700,
	},
});

export const ButtonCheckOut = styled('button', {
	color: '$gray300',
	backgroundColor: '$gray800',

	width: '48px',
	height: '48px',

	border: 'none',
	outline: 'none',

	borderRadius: '6px',

	cursor: 'pointer',
});
