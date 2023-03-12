import Image from 'next/image';
import { useContext } from 'react';
import { Bag } from 'phosphor-react';
import { OrderContext } from '../../context/OrderContext';
import { HeaderContainer, BadgeContainer, ButtonCheckOut } from './styles';

import logoImg from '../../assets/logo.svg';
import Link from 'next/link';

interface HeaderProps {
	handleOpen: () => void;
}

export function Header({ handleOpen }: HeaderProps) {
	const { wishList } = useContext(OrderContext);

	return (
		<HeaderContainer>
			<Link href='/'>
				<Image src={logoImg} alt='logo' height={70} />
			</Link>

			{wishList?.length > 0 ? (
				<BadgeContainer>
					<div className='indicator'>
						<div className='noti_count'>{wishList.length}</div>
					</div>
					<ButtonCheckOut onClick={() => handleOpen()}>
						<Bag size={24} />
					</ButtonCheckOut>
				</BadgeContainer>
			) : (
				<ButtonCheckOut onClick={() => handleOpen()}>
					<Bag size={24} />
				</ButtonCheckOut>
			)}
		</HeaderContainer>
	);
}
