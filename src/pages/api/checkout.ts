import { NextApiResponse, NextApiRequest } from 'next';
import { stripe } from '../../lib/stripe';

interface IWish {
	itemWishListId: string;
	id: string;
	name: string;
	imageUrl: string;
	price: number;
	priceFormatted: string;
	description: string;
	defaultPriceId: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const wishList = req.body.wishList as IWish[];

	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed!' });
	}

	if (wishList.length === 0) {
		return res.status(400).json({ error: 'Price not found' });
	}

	const sucessUrl = `${process.env.NEXT_URL}/sucess?session_id={CHECKOUT_SESSION_ID}`;
	const cancelUrl = `${process.env.NEXT_URL}/`;

	function formattedProductsForStripeRedirectCheckout() {
		const price_id = wishList.map((value) => value.defaultPriceId);

		return price_id.reduce((acc, item: string) => {
			if (item) {
				return [
					...acc,
					{
						price: item,
						quantity: 1,
					},
				];
			}

			return acc;
		}, []);
	}

	const checkoutSession = await stripe.checkout.sessions.create({
		success_url: sucessUrl,
		cancel_url: cancelUrl,
		mode: 'payment',
		line_items: formattedProductsForStripeRedirectCheckout(),
	});

	return res.status(201).json({ checkoutUrl: checkoutSession.url });
}
