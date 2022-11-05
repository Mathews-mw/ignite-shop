import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Stripe from 'stripe';
import { stripe } from '../../lib/stripe';
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product';

interface ProductsProps {
	product: {
		id: string;
		name: string;
		imageUrl: string;
		price: string;
		description: string;
		defaultPriceId: string;
	};
}

export default function Product({ product }: ProductsProps) {
	const { isFallback } = useRouter();
	const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

	if (isFallback) {
		return <p>loading...</p>;
	}

	async function handleBuyProduct() {
		try {
			setIsCreatingCheckoutSession(true);

			const response = await axios.post('/api/checkout', {
				priceId: product.defaultPriceId,
			});

			const { checkoutUrl } = response.data;

			window.location.href = checkoutUrl;
		} catch (error) {
			setIsCreatingCheckoutSession(false);
			console.log(error);
			alert('Falha ao redirecionar para o checkout!');
		}
	}

	return (
		<>
			<Head>
				<title>{product.name} | Ignite Shop</title>
			</Head>

			<ProductContainer>
				<ImageContainer>
					<Image src={product.imageUrl} width={520} height={480} alt='Camiseta' />
				</ImageContainer>

				<ProductDetails>
					<h1>{product.name}</h1>
					<span>{product.price}</span>

					<p>{product.description}</p>

					<button disabled={isCreatingCheckoutSession} onClick={() => handleBuyProduct()}>
						Comprar agora
					</button>
				</ProductDetails>
			</ProductContainer>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [
			{
				params: { id: 'prod_Mi2MqXpreY9Jcc' },
			},
		],
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
	const productId = params.id;

	if (!params) {
		return {
			notFound: true, // Caso não exista parametros, retorna um status error 404
		};
	}

	const product = await stripe.products.retrieve(productId, {
		expand: ['default_price'],
	});

	const price = product.default_price as Stripe.Price;

	return {
		props: {
			product: {
				id: product.id,
				name: product.name,
				imageUrl: product.images[0],
				price: new Intl.NumberFormat('pt-BR', {
					style: 'currency',
					currency: 'BRL',
					//@ts-ignore
				}).format(price.unit_amount / 100),
				description: product.description,
				defaultPriceId: price.id,
			},
		},
		revalidate: 60 * 60 * 1, // 1 hora
	};
};
