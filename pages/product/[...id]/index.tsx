// Импортируем необходимые типы и компоненты для страницы
import type { GetServerSideProps } from 'next'; // Для получения данных на сервере перед рендером страницы
import { getProductData } from '@src/api/product'; // Функция для получения данных о продукте с API
import ProductContent from '@src/components/pages/product'; // Компонент для отображения данных о продукте
import Head from 'next/head'; // Для работы с <head> документа, например, для тега <title>

// Типизация для данных продукта
type ProductData = {
	category: string;
	description: Array<{
		title: string;
		content: string;
	}>;
	id: string;
	images: string[];
	price: number;
	score: number;
	summery: string;
	title: string;
};

type ProductType = {
	data: {
		data: ProductData;
		status: number;
	};
};

const Product = (props: ProductType) => {
	// Проверяем, был ли успешным запрос на получение данных (статус 200)
	const product = props.data.status === 200;

	// Логируем данные для отладки
	console.log('props', props);

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Компонент Head для добавления мета-данных в <head> документа */}
			<Head>
				<title>Перец</title> {/* Заголовок страницы */}
			</Head>

			<div className='container mx-auto px-4 py-8'>
				{/* Если данные получены успешно, отображаем компонент с информацией о продукте */}
				{product ? <ProductContent data={props.data.data} /> : 'There is no product'}
				{/* Если продукта нет, выводим сообщение об этом */}
			</div>
		</div>
	);
};

// Функция для получения данных на сервере перед рендером страницы
export const getServerSideProps: GetServerSideProps = async (context: any) => {
	// Получаем идентификатор продукта из URL
	const id = context.query.id;

	// Запрашиваем данные о продукте с помощью API
	const response = await getProductData(id[0]);

	// Возвращаем данные в пропсах, чтобы они были переданы в компонент
	return { props: { data: response } };
};

export default Product;
