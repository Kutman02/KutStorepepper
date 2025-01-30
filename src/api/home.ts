// Импортируем данные для главной страницы из локальной базы данных.
import { getHomeData } from '@src/services/database/homeData';

// Определяем тип данных, которые возвращаются для главной страницы.
type DataType = {
	slider: {}; // Данные для слайдера (объект, структура зависит от данных).
	bannerMiddle: {}; // Данные для среднего баннера.
	bannerBottom: {}; // Данные для нижнего баннера.
	sliderProducts: {}; // Данные для продуктов, отображаемых в слайдере.
};

// Определяем тип ответа функции.
// Поле `data` содержит структуру `DataType`, включающую все секции главной страницы.
// Поле `status` указывает результат операции: 200 (успех) или 404 (данные не найдены).
type Response = {
	data: DataType; // Данные главной страницы.
	status: 200 | 404; // HTTP статус ответа.
};

// Функция для получения данных главной страницы.
// Она возвращает Promise с объектом типа `Response`.
export const getHome = async () => {
	try {
		const data = await getHomeData();
		return data;
	} catch (error) {
		console.error('Error in getHome:', error);
		return null;
	}
};
