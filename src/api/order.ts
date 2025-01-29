// Импортируем необходимые интерфейсы и функции.
import { ListProducts } from '@src/interfaces/listProducts';
import { getProductData } from './product';

// Тип ответа для изменения корзины или создания нового заказа.
// Поле `status` указывает на успешность операции: 201 (создано) или 422 (ошибка).
type CartChangeResponse = {
	status: 201 | 422;
};

// Функция для создания нового заказа.
// Принимает страну (`country`), штат или регион (`state`) и почтовый индекс (`postalCode`).
export const postNewOrder = (country: string | number, state: string | number, postalCode: string | number) => {
	return new Promise<CartChangeResponse>((resolve) => {
		try {
			// Проверяем, что все данные переданы.
			if (country && state && postalCode) {
				// Получаем текущую корзину из локального хранилища.
				const productsLocalStorage = localStorage.getItem('cartList') || '[]';
				const products = JSON.parse(productsLocalStorage) || [];

				// Получаем текущие заказы из локального хранилища.
				const myOrdersLocalStorage = localStorage.getItem('myOrders') || '[]';
				const myOrders = JSON.parse(myOrdersLocalStorage) || [];

				// Добавляем новый заказ в список заказов.
				myOrders.push({ products, country, state, postalCode });

				// Сохраняем обновленный список заказов.
				localStorage.setItem('myOrders', JSON.stringify(myOrders));

				// Очищаем корзину после оформления заказа.
				localStorage.setItem('cartList', JSON.stringify([]));

				// Формируем успешный ответ.
				const result: CartChangeResponse = {
					status: 201, // Успех.
				};

				resolve(result);
			}
		} catch (error) {
			// Если произошла ошибка, возвращаем код 422 (ошибка).
			const result: CartChangeResponse = {
				status: 422,
			};

			resolve(result);
		}
	});
};

// Тип ответа для получения списка заказов.
// Поле `data` содержит массив заказов, а `status` указывает успешность операции.
type CartListResponse = {
	data: [];
	status: 200 | 403;
};

// Тип данных для заказа.
type CartListType = {
	country: string; // Страна.
	postalCode: string; // Почтовый индекс.
	products: []; // Список продуктов.
	state: string; // Штат или регион.
};

// Функция для получения списка всех заказов.
export const getMyOrders = () => {
	return new Promise<CartListResponse>((resolve) => {
		try {
			// Получаем список заказов из локального хранилища.
			const cartListLocalStorage = localStorage.getItem('myOrders') || '[]';
			const cartList = JSON.parse(cartListLocalStorage) || [];

			// Для каждого заказа обновляем данные о продуктах.
			cartList.forEach(async (item: CartListType, index: number) => {
				item.products.forEach(async (product: ListProducts, indexProduct: number) => {
					// Получаем актуальные данные о продукте.
					const response = await getProductData(product.id);

					// Обновляем информацию о продукте в списке заказа.
					cartList[index].products[indexProduct] = {
						...response.data,
						...cartList[index].products[indexProduct],
					};
				});
			});

			// Формируем успешный ответ.
			const result: CartListResponse = {
				data: cartList,
				status: 200, // Успех.
			};

			resolve(result);
		} catch (error) {
			// Если произошла ошибка, возвращаем код 403 (ошибка).
			const result: CartListResponse = {
				data: [],
				status: 403,
			};

			resolve(result);
		}
	});
};
