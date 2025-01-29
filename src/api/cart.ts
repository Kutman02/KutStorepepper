// Импортируем функцию для получения данных о продукте из файла 'product'.
import { getProductData } from './product';

// Тип ответа для изменения корзины.
// Поле `cartTotal` указывает общее количество элементов в корзине (опционально).
// Поле `status` показывает результат операции: 200 (успех) или 422 (ошибка).
type CartChangeResponse = {
	cartTotal?: number;
	status: 200 | 422;
};

// Тип для элемента корзины. Здесь только `id` продукта.
type CartListType = {
	id: string;
};

// Функция для изменения корзины.
// Она принимает идентификатор продукта (`id`) и количество (`total`), которое нужно добавить или удалить.
export const postCartChange = (id: string, total: number) => {
	return new Promise<CartChangeResponse>((resolve) => {
		try {
			// Проверяем, указан ли `id` и является ли `total` числом.
			if (id && typeof total === 'number') {
				// Получаем текущую корзину из локального хранилища браузера.
				const cartListLocalStorage = localStorage.getItem('cartList') || '[]';
				const cartList = JSON.parse(cartListLocalStorage) || [];

				// Ищем индекс элемента с указанным `id` в корзине.
				const index = cartList.findIndex((item: CartListType) => item.id === id);

				if (index !== -1) {
					// Если продукт уже есть в корзине.
					if (total === 0) {
						// Если `total` равен 0, удаляем продукт из корзины.
						cartList.splice(index, 1);
					} else {
						// Добавляем или уменьшаем количество продукта.
						const totalFinal = cartList[index].total + total;

						if (totalFinal <= 0) {
							// Если итоговое количество <= 0, удаляем продукт.
							cartList.splice(index, 1);
						} else {
							// Иначе обновляем количество.
							cartList[index].total = totalFinal;
						}
					}
				} else {
					// Если продукта нет в корзине и `total >= 1`, добавляем новый элемент.
					if (total >= 1) {
						cartList.push({ id, total });
					}
				}

				// Сохраняем обновленную корзину в локальное хранилище.
				localStorage.setItem('cartList', JSON.stringify(cartList));

				// Формируем успешный ответ с общим количеством элементов в корзине.
				const result: CartChangeResponse = {
					cartTotal: cartList.length,
					status: 200,
				};

				resolve(result);
			}
		} catch (error) {
			// Если возникает ошибка, возвращаем ответ с кодом 422 (ошибка).
			const result: CartChangeResponse = {
				status: 422,
			};

			resolve(result);
		}
	});
};

// Тип ответа для получения списка корзины.
// Поле `data` содержит массив элементов корзины.
// Поле `status` указывает результат операции: 200 (успех) или 403 (ошибка).
type CartListResponse = {
	data: [];
	status: 200 | 403;
};

// Функция для получения списка корзины.
export const getCartList = () => {
	return new Promise<CartListResponse>((resolve) => {
		try {
			// Получаем текущую корзину из локального хранилища.
			const cartListLocalStorage = localStorage.getItem('cartList') || '[]';
			const cartList = JSON.parse(cartListLocalStorage) || [];

			// Для каждого элемента корзины загружаем данные о продукте.
			cartList.forEach(async (item: CartListType, index: number) => {
				const response = await getProductData(item.id);
				// Обновляем данные корзины, добавляя информацию о продукте.
				cartList[index] = { ...response.data, ...cartList[index] };
			});

			// Формируем успешный ответ с обновленным списком корзины.
			const result: CartListResponse = {
				data: cartList,
				status: 200,
			};

			resolve(result);
		} catch (error) {
			// Если возникает ошибка, возвращаем пустой список и код 403.
			const result: CartListResponse = {
				data: [],
				status: 403,
			};

			resolve(result);
		}
	});
};
