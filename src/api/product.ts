// Импортируем интерфейс для данных о продукте и базу данных продуктов.
import { ProductDataApiResponse } from '@src/interfaces/product';
import { productsData } from '@src/services/database/products';

// Определяем тип ответа для функции.
// Поле `data` содержит данные продукта, если он найден, или пустой объект, если нет.
// Поле `status` указывает на успешность операции: 200 (успех) или 404 (не найдено).
type Response = {
	data: ProductDataApiResponse | {}; // Либо данные продукта, либо пустой объект.
	status: 200 | 404; // HTTP статус ответа.
};

// Функция для получения данных о продукте по его `id`.
// Возвращает Promise с объектом типа `Response`.
export const getProductData = (id: string) => {
	return new Promise<Response>((resolve) => {
		// Ищем продукт в локальной базе данных по идентификатору `id`.
		const product: Response['data'] = productsData.find((product) => product.id === id) || {};

		// Проверяем, найден ли продукт.
		if (Object.keys(product).length !== 0) {
			// Если продукт найден, формируем успешный ответ.
			const result: Response = {
				data: product, // Данные найденного продукта.
				status: 200, // Успех.
			};

			resolve(result);
		} else {
			// Если продукт не найден, возвращаем пустой объект и статус 404.
			const result: Response = {
				data: {}, // Пустые данные.
				status: 404, // Не найдено.
			};

			resolve(result);
		}
	});
};
