import Image, { StaticImageData } from 'next/image'; // Импортируем компонент Image из Next.js для отображения изображений и тип StaticImageData для работы с изображениями
import { useTranslation } from 'react-i18next';

// Тип для массива продуктов (в заказе)
type OrderType = {
	products: OrderedProductType[];
};

// Тип для каждого продукта в заказе
type OrderedProductType = {
	category: string; // Категория продукта
	description: []; // Описание продукта (массив)
	id: string; // Уникальный идентификатор продукта
	images: StaticImageData[]; // Массив изображений продукта
	price: number; // Цена за единицу продукта
	score: number; // Оценка продукта
	summery: string; // Краткое описание
	title: string; // Название продукта
	total: number; // Общее количество этого продукта в заказе
};

// Компонент, который отображает заказы с продуктами
const OrderedProduct = ({ products }: OrderType) => {
	const { t } = useTranslation();

	return (
		<>
			{/* Проходим по всем продуктам в заказе и отображаем их */}
			{products.map((item: OrderedProductType, index: number) => (
				<div key={index} className='flex items-center gap-6 p-4 border-b border-gray-200'>
					{/* Изображение продукта */}
					<div className='relative w-[150px] h-[150px]'>
						<Image src={item.images[0]} alt='product' fill className='object-cover rounded-lg' />
					</div>

					{/* Детали продукта */}
					<div className='flex-1 space-y-4'>
						{/* Название продукта */}
						<h3 className='text-lg font-medium text-gray-900'>{item.title}</h3>

						{/* Количество */}
						<div className='space-y-1'>
							<span className='text-sm text-gray-500'>{t('Total')}:</span>
							<div className='text-base font-medium text-gray-900'>{item.total}</div>
						</div>

						{/* Общая цена */}
						<div className='space-y-1'>
							<span className='text-sm text-gray-500'>{t('TotalPrice')}:</span>
							<div className='text-lg font-bold text-primary'>{`${item.price * item.total} сом`}</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default OrderedProduct;
