import 'react-modern-drawer/dist/index.css';
import { globalStyles } from '../styles/global';

import { useState } from 'react';
import type { AppProps } from 'next/app';
import Drawer from 'react-modern-drawer';

import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { OrderContextProvider } from '../context/OrderContext';

import { Container } from '../styles/pages/app';

globalStyles();
export default function App({ Component, pageProps }: AppProps) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

	return (
		<OrderContextProvider>
			<Container>
				<Header handleOpen={toggleDrawer} />

				<Component {...pageProps} />

				<Drawer open={isOpen} onClose={toggleDrawer} direction='right' size={480}>
					<Sidebar closeOnClick={() => setIsOpen(false)} />
				</Drawer>
			</Container>
		</OrderContextProvider>
	);
}
