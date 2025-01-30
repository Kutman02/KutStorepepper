import { getProductsData } from './products';
import { StaticImageData } from 'next/image';

import homeDataJson from './data/homeData.json';

type BannerType = {
	link: StaticImageData;
	alt: string;
	width: number;
	height: number;
};

// Функция для получения данных для домашней страницы
export async function getHomeData() {
	const products = await getProductsData();

	return {
		sliderProducts: {
			bestOffer: {
				title: 'Все товары',
				list: products,
			},
		},
	};
}

// Временное решение для совместимости со старым кодом
export const homeData = {
	sliderProducts: {
		bestOffer: {
			title: 'Все товары',
			list: [],
		},
	},
};
