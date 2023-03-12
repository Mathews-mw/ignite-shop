import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';

interface OrderContextProviderProps {
	children: ReactNode;
}

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

interface OrderContextType {
	loading: boolean;
	wishList: IWish[];
	addNewOrder: (data: IWish) => void;
	removeItemFromWishList: (wishId: string) => void;
}

export const OrderContext = createContext({} as OrderContextType);

export function OrderContextProvider({ children }: OrderContextProviderProps) {
	const [loading, setLoading] = useState(false);
	const [wishList, setWishList] = useState<IWish[]>([]);

	console.log('wishList: ', wishList);

	useEffect(() => {
		if (wishList.length > 0) {
			setCookie(undefined, 'wishList', JSON.stringify(wishList), {
				maxAge: 60 * 60 * 24 * 30, // 30 days
				path: '/',
			});
		}
	}, [wishList]);

	useEffect(() => {
		const cookies = parseCookies();

		const wishListCookies = cookies['wishList'];

		if (wishListCookies) {
			setLoading(true);
			const wishListParse = JSON.parse(wishListCookies);

			setWishList(wishListParse);
			setLoading(false);
		}
	}, []);

	function addNewOrder({ itemWishListId, defaultPriceId, id, name, price, priceFormatted, description, imageUrl }: IWish) {
		setLoading(true);

		setWishList((state) => [{ itemWishListId, defaultPriceId, id, name, price, priceFormatted, description, imageUrl }, ...state]);

		setCookie(undefined, 'wishList', JSON.stringify(wishList), {
			maxAge: 60 * 60 * 24 * 30, // 30 days
			path: '/',
		});

		setLoading(false);
	}

	function removeItemFromWishList(wishId: string) {
		const itemToRemove = wishList.find((item) => item.itemWishListId === wishId);
		const wishListWithoutDeletedOne = wishList.filter((wish) => wish !== itemToRemove);

		setWishList(wishListWithoutDeletedOne);
	}

	return <OrderContext.Provider value={{ loading, wishList, addNewOrder, removeItemFromWishList }}>{children}</OrderContext.Provider>;
}
