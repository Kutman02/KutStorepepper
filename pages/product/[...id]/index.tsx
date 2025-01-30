// Импортируем необходимые типы и компоненты для страницы
import type { GetServerSideProps } from 'next'; // Для получения данных на сервере перед рендером страницы
import { getProduct } from '@src/api/product'; // Функция для получения данных о продукте с API
import ProductContent from '@src/components/pages/product'; // Компонент для отображения данных о продукте
import Head from 'next/head'; // Для работы с <head> документа, например, для тега <title>

// Типизация для данных продукта
type ProductData = {
	id: string;
	title: string;
	price: number;
	score: number;
	images: string[];
	category: string;
	summery: string;
	description: Array<{
		title: string;
		content: string;
	}>;
};

type ProductProps = {
	product: ProductData | null;
};

const Product = ({ product }: ProductProps) => {
	// Логируем данные для отладки
	console.log('product data:', product);

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Компонент Head для добавления мета-данных в <head> документа */}
			<Head>
				<title>Перец | {product?.title || 'Товар не найден'}</title> {/* Заголовок страницы */}
			</Head>

			<div className='container mx-auto px-4 py-8'>
				{product ? (
					<ProductContent data={product} />
				) : (
					<div>Товар не найден</div>
				)}
			</div>
		</div>
	);
};

// Функция для получения данных на сервере перед рендером страницы
export const getServerSideProps: GetServerSideProps<ProductProps> = async ({ params }) => {
	const id = params?.id?.[0];
	if (!id) {
		return {
			notFound: true,
		};
	}

	const product = await getProduct(id);
	
	if (!product) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			product,
		},
	};
};

export default Product;
