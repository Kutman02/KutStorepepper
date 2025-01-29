// Импортируем типы и компоненты для настройки приложения Next.js
import type { AppProps } from 'next/app'; // Типизация для пропсов приложения
import { Provider } from 'react-redux';
import { store } from '@src/store';
import MainLayout from '@src/layouts/mainLayout';
import '@src/styles/globals.css'; // Импортируем глобальные стили
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	if (Component.displayName === 'LoginPage') {
		return (
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		);
	}

	return (
		<Provider store={store}>
			<MainLayout>
				<Component {...pageProps} />
			</MainLayout>
		</Provider>
	);
}

export default MyApp;
