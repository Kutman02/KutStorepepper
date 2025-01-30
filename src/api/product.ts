import { ProductDataApiResponse, Product } from '@src/interfaces/product';
import { getProductsData } from '@src/services/database/products';

type Response = {
	data: ProductDataApiResponse;
	status: 200 | 404;
};

// Функция для получения данных о продукте по его `id` из WordPress API
export const getProductData = async (id: string): Promise<Response> => {
	try {
		const res = await fetch(`http://a1079622.xsph.ru/wp-json/wp/v2/products/${id}`);
		if (!res.ok) {
			return { data: {} as ProductDataApiResponse, status: 404 };
		}

		const product = await res.json();

		// Формируем объект в нужном формате, извлекая ACF-данные
		const formattedProduct: ProductDataApiResponse = {
			id: product.id,
			title: product.acf.title,
			images: [`http://a1079622.xsph.ru/wp-json/wp/v2/media/${product.acf.images}`],
			price: product.acf.price,
			score: product.acf.score,
			category: product.acf.category,
			summary: product.acf.summery,
			description: product.acf.description,
		};

		return { data: formattedProduct, status: 200 };
	} catch (error) {
		console.error('Ошибка при получении данных:', error);
		return { data: {} as ProductDataApiResponse, status: 404 };
	}
};

export async function getProducts(): Promise<Product[]> {
	try {
		const products = await getProductsData();
		return products;
	} catch (error) {
		console.error('Error in getProducts:', error);
		return [];
	}
}

export async function getProduct(id: string): Promise<Product | null> {
	try {
		const products = await getProductsData();
		return products.find((product) => product.id === id) || null;
	} catch (error) {
		console.error('Error in getProduct:', error);
		return null;
	}
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
	try {
		const products = await getProductsData();
		return products.filter((product) => product.category === category);
	} catch (error) {
		console.error('Error in getProductsByCategory:', error);
		return [];
	}
}
