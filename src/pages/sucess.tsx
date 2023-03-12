import Stripe from 'stripe';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { destroyCookie } from 'nookies';
import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import * as Collapsible from '@radix-ui/react-collapsible';

import { stripe } from '../lib/stripe';

import { CornersIn, CornersOut } from 'phosphor-react';
import {
	ImageContainer,
	SucessContainer,
	ImagesGroup,
	Flex,
	IconButton,
	ContentContainer,
	Text,
	Title,
	CollapsibleRoot,
	CollapsibleContent,
} from '../styles/pages/sucess';

interface SucessProps {
	customerName: string;
	products: {
		id: string;
		name: string;
		amount: number;
		image: string;
	}[];
}

export default function Sucess({ customerName, products }: SucessProps) {
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		if (customerName) {
			destroyCookie(undefined, 'wishList');
		}
	}, []);

	const totalCheckout = products.reduce((total, value) => {
		return (total += value.amount);
	}, 0);

	const totalCheckoutFormatted = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(totalCheckout / 100);

	return (
		<>
			<Head>
				<title>Compra efetuada | Ignite Shop</title>

				<meta name='robots' content='noindex' />
			</Head>

			<SucessContainer>
				<h1>Compra efetuada!</h1>

				<ImagesGroup>
					{products.map((product) => {
						return <ImageContainer key={product.id}>{<Image src={product.image} width={120} height={110} alt='' />}</ImageContainer>;
					})}
				</ImagesGroup>

				<p style={{ marginBottom: '1rem' }}>
					Uhuul, <strong>{customerName}</strong>, sua compra de <strong>{products.length}</strong> camisetas já está a caminho.
				</p>

				<CollapsibleRoot open={open} onOpenChange={setOpen}>
					<Flex css={{ alignItems: 'center', justifyContent: 'space-between' }}>
						<Collapsible.Trigger asChild>
							<IconButton>{open ? <CornersIn weight='fill' /> : <CornersOut weight='fill' />}</IconButton>
						</Collapsible.Trigger>
					</Flex>
					<ContentContainer>
						<Title>Detalhes do seu pedido</Title>
						<CollapsibleContent>
							{products.map((product) => {
								return (
									<Text key={product.id}>
										{product.name} -{' '}
										{new Intl.NumberFormat('pt-BR', {
											style: 'currency',
											currency: 'BRL',
										}).format(product.amount / 100)}
									</Text>
								);
							})}
							<Text>
								Total do pedido: <strong>{totalCheckoutFormatted}</strong>
							</Text>
						</CollapsibleContent>
					</ContentContainer>
				</CollapsibleRoot>

				<Link href='/'>Voltar ao catálogo</Link>
			</SucessContainer>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	if (!query.session_id) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const sessionId = String(query.session_id);

	const session = await stripe.checkout.sessions.retrieve(sessionId, {
		expand: ['line_items', 'line_items.data.price.product'],
	});

	const customerName = session.customer_details.name;
	const products = session.line_items.data.map((item) => {
		const product = item.price.product as Stripe.Product;

		return {
			id: item.id,
			name: product.name as string,
			amount: item.amount_total,
			image: product.images[0],
		};
	}) as Partial<Stripe.LineItem>;

	return {
		props: {
			customerName,
			products,
		},
	};
};
