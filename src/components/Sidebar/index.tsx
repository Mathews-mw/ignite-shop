/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import { X } from 'phosphor-react';

import {
	Container,
	ContainerContent,
	Header,
	ProductContainer,
	ImageContainer,
	Footer,
	EmptyCartContainer,
	ScrollAreaRoot,
	ScrollAreaViewport,
	ScrollAreaCorner,
	ScrollAreaScrollbar,
	ScrollAreaThumb,
} from './styles';

import EmptyBag from '../../assets/empty_bag.png';
import { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { OrderContext } from '../../context/OrderContext';
import { GetStaticProps } from 'next';
import { stripe } from '../../lib/stripe';
import Stripe from 'stripe';

interface Props {
	closeOnClick: () => void;
}

export function Sidebar({ closeOnClick }: Props) {
	const { isFallback } = useRouter();
	const { wishList, removeItemFromWishList } = useContext(OrderContext);

	const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		if (wishList.length > 0) {
			const sumPrices = wishList.reduce((total, item) => {
				return (total += item.price);
			}, 0);

			setTotalPrice(sumPrices);
		}
	}, [wishList]);

	async function handleBuyProduct() {
		try {
			setIsCreatingCheckoutSession(true);

			const response = await axios.post('/api/checkout', {
				wishList,
			});

			const { checkoutUrl } = response.data;

			window.location.href = checkoutUrl;
		} catch (error) {
			setIsCreatingCheckoutSession(false);
			console.log(error);
			alert('Falha ao redirecionar para o checkout!');
		}
	}

	if (isFallback) {
		return <p>loading...</p>;
	}

	return (
		<Container tabIndex={0}>
			<Header>
				<button onClick={closeOnClick}>
					<X size={24} />
				</button>
			</Header>

			<ContainerContent>
				<h4>Sacola de compras</h4>

				<ScrollAreaRoot>
					<ScrollAreaViewport>
						<div className='productsList'>
							{wishList.length > 0 ? (
								wishList.map((item) => {
									return (
										<ProductContainer key={item.itemWishListId}>
											<ImageContainer>
												<img src={item.imageUrl} width={94} />
											</ImageContainer>

											<div className='productsInfos'>
												<p>{item.name}</p>

												<span>{item.priceFormatted}</span>

												<button onClick={() => removeItemFromWishList(item.itemWishListId)}>Remover</button>
											</div>
										</ProductContainer>
									);
								})
							) : (
								<EmptyCartContainer>
									<Image src={EmptyBag} width={120} alt='empty cart' />
									<strong>Sacola vazia :/</strong>
									<span>Parece que você não adicionou nenhuma compra ainda</span>
								</EmptyCartContainer>
							)}
						</div>
					</ScrollAreaViewport>
					<ScrollAreaScrollbar orientation='vertical'>
						<ScrollAreaThumb />
					</ScrollAreaScrollbar>
					<ScrollAreaScrollbar orientation='horizontal'>
						<ScrollAreaThumb />
					</ScrollAreaScrollbar>
					<ScrollAreaCorner />
				</ScrollAreaRoot>
			</ContainerContent>

			<Footer>
				<div className='itensDescription'>
					<span>Quantidade</span>
					<strong>
						{wishList.length} {wishList.length === 1 ? 'item' : wishList.length > 1 ? 'itens' : ''}
					</strong>
				</div>

				<div className='itensPrice'>
					<span>Valor total</span>
					<span>
						{wishList.length > 0
							? new Intl.NumberFormat('pt-BR', {
									style: 'currency',
									currency: 'BRL',
							  }).format(totalPrice / 100)
							: 'R$ 0'}
					</span>
				</div>

				<button disabled={isCreatingCheckoutSession} onClick={() => handleBuyProduct()}>
					Finalizar compra
				</button>
			</Footer>
		</Container>
	);
}
