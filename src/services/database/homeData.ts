// Импортируем изображения баннеров с указанного пути
import banner1 from '@public/images/baner1.png'; // Главное изображение слайдера
import banner2 from '@public/images/baner2.png'; // Баннер в центре
import banner3 from '@public/images/baner3.png'; // Маленький баннер внизу
import banner4 from '@public/images/baner4.png'; // Маленький баннер внизу
import banner5 from '@public/images/baner5.png'; // Средний баннер внизу

// Проверяем импорты
console.log('Banner imports:', { banner1, banner2, banner3, banner4, banner5 });

// Импортируем данные о продуктах из файла products
import { productsData } from './products';

import { StaticImageData } from 'next/image';

type BannerType = {
	link: StaticImageData;
	alt: string;
	width: number;
	height: number;
};

// Экспортируем объект homeData только с нужными данными
export const homeData = {
	sliderProducts: {
		bestOffer: {
			title: 'Все товары',
			list: productsData, // Показываем все товары вместо выборочных
		},
	},
};
