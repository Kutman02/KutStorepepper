// Импортируем типы данных, используемых для работы с продуктами.
import { ProductsDataApiResponse } from '@src/interfaces/product';
import { productsData } from '@src/services/database/products';

// Определяем тип ответа, возвращаемого функцией.
// Поле `data` содержит список продуктов (array), которые соответствуют категории.
// Поле `status` показывает результат операции: 200 (успех) или 404 (категория не найдена).
type Response = {
	data: ProductsDataApiResponse['list']; // Используем список продуктов из интерфейса.
	status: 200 | 404; // HTTP коды статуса.
};

// Функция для получения данных о продуктах по категории.
// Принимает название категории (`name`) в качестве аргумента.
export const getCategoryData = (name: string) => {
	return new Promise<Response>((resolve) => {
		// Фильтруем массив продуктов, чтобы выбрать только те, которые принадлежат указанной категории.
		const products: Response['data'] = productsData.filter((product) => product.category === name);

		// Формируем успешный ответ, если данные найдены.
		const result: Response = {
			data: products, // Список продуктов выбранной категории.
			status: 200, // Успех.
		};

		// Завершаем Promise, возвращая результат.
		resolve(result);
	});
};
