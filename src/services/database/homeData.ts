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

import homeDataJson from './data/homeData.json';

type BannerType = {
	link: StaticImageData;
	alt: string;
	width: number;
	height: number;
};

// Обновляем данные из JSON и добавляем список продуктов
const homeData = {
	...homeDataJson,
	sliderProducts: {
		bestOffer: {
			...homeDataJson.sliderProducts.bestOffer,
			list: productsData,
		},
	},
};

export { homeData };
