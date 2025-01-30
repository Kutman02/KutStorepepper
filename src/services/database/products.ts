/* eslint-disable no-unused-vars */
import { StaticImageData } from 'next/image';

// Интерфейс для типизации данных продукта из WordPress API
interface IWordPressProduct {
	id: number;
	acf: {
		id: string;
		title: string;
		price: number;
		score: number;
		images: number; // ID изображения в WordPress
		category: number; // ID категории в WordPress
		summery: string;
		description: string;
	};
	'product-categories': number[];
}

// Интерфейс для нашего приложения
interface IProduct {
	id: string;
	title: string;
	price: number;
	score: number;
	images: string[];
	category: string;
	summery: string;
	description: {
		title: string;
		content: string;
	}[];
}

// Функция для получения продуктов из WordPress API
export async function getProductsData(): Promise<IProduct[]> {
	try {
		console.log('Fetching products from WordPress API...');
		const response = await fetch('http://a1079622.xsph.ru/wp-json/wp/v2/products');

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const wpProducts: IWordPressProduct[] = await response.json();
		console.log('Received WordPress products:', wpProducts);

		if (!Array.isArray(wpProducts)) {
			console.error('WordPress response is not an array:', wpProducts);
			return [];
		}

		const products: IProduct[] = wpProducts
			.map((product) => {
				try {
					if (!product.acf) {
						console.error('Product missing ACF fields:', product);
						return null;
					}

					return {
						id: product.acf.id,
						title: product.acf.title,
						price: product.acf.price,
						score: product.acf.score,
						images: [
							`/images/products/${product.acf.title.replace(' ', '-')}1.png`,
							`/images/products/${product.acf.title.replace(' ', '-')}2.png`,
						],
						category: getCategoryName(product['product-categories'][0]),
						summery: product.acf.summery,
						description: [
							{
								title: 'Description',
								content: product.acf.description,
							},
						],
					};
				} catch (error) {
					console.error('Error processing product:', product, error);
					return null;
				}
			})
			.filter(Boolean) as IProduct[];

		console.log('Processed products:', products);
		return products;
	} catch (error) {
		console.error('Error in getProductsData:', error);
		return [];
	}
}

// Функция для получения имени категории по ID
function getCategoryName(categoryId: number): string {
	const categories: { [key: number]: string } = {
		2: 'masalas',
		3: 'chat-masalas',
		4: 'pepper-powder',
		5: 'cooking-essentials',
	};
	return categories[categoryId] || 'masalas';
}

// Временное решение для совместимости со старым кодом
export const productsData: IProduct[] = [];
