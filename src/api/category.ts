import fs from 'fs';
import path from 'path';
import { ProductsDataApiResponse } from '@src/interfaces/product';

// Определяем тип ответа, возвращаемого функцией.
// Поле `data` содержит список продуктов (array), которые соответствуют категории.
// Поле `status` показывает результат операции: 200 (успех) или 404 (категория не найдена).
type Response = {
	data: ProductsDataApiResponse['list']; // Используем список продуктов из интерфейса.
	status: 200 | 404; // HTTP коды статуса.
};

export const getCategoryData = (name: string) => {
	return new Promise<Response>((resolve, reject) => {
		// Путь к файлу product.json
		const filePath = path.join(__dirname, 'services/database/data/product.json');

		// Чтение JSON файла
		fs.readFile(filePath, 'utf-8', (err, data) => {
			if (err) {
				console.error('Error reading the file:', err);
				reject({ data: [], status: 500 }); // Возвращаем ошибку при чтении файла
				return;
			}

			try {
				// Преобразуем данные из JSON в объект
				const productsData = JSON.parse(data);

				if (!Array.isArray(productsData)) {
					throw new Error('Data is not in expected array format');
				}

				// Фильтруем массив продуктов, чтобы выбрать только те, которые принадлежат указанной категории.
				const products: Response['data'] = productsData.filter((product) => product.category === name);

				// Формируем успешный ответ, если данные найдены.
				const result: Response = {
					data: products, // Список продуктов выбранной категории.
					status: 200, // Успех.
				};

				// Завершаем Promise, возвращая результат.
				resolve(result);
			} catch (parseError) {
				console.error('Error parsing JSON:', parseError);
				reject({ data: [], status: 500 }); // Ошибка парсинга JSON
			}
		});
	});
};
