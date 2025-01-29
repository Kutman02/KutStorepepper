import Image from 'next/image'; // Импортируем компонент Image из Next.js для работы с изображениями
import { useEffect, useState } from 'react'; // useState для управления состоянием, useEffect для побочных эффектов
import accepted from 'public/icons/accepted.png'; // Импортируем изображение "accepted" для отображения состояния заказа
import { getMyOrders } from '@src/api/order'; // Импортируем функцию для получения заказов пользователя
import OrderedProduct from './orderedProduct'; // Импортируем компонент для отображения товаров в заказе
import { useTranslation } from 'react-i18next'; // Для поддержки многоязычности

// Тип для данных заказа, описывающий структуру заказа
type OrderType = {
	country: string;
	postalCode: string;
	products: []; // Массив продуктов в заказе
	state: string;
};

const OrderedProducts = () => {
	const [orders, setOrders] = useState([]); // Состояние для хранения списка заказов
	const { t } = useTranslation(); // Хук для перевода текста

	// Функция для получения заказов с API
	const getCart = async () => {
		const response = await getMyOrders(); // Получаем заказы с помощью API
		setOrders(response.data); // Обновляем состояние заказов
	};

	// useEffect для загрузки заказов при монтировании компонента
	useEffect(() => {
		getCart(); // Загружаем заказы
	}, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании

	// Если заказов нет, отображаем сообщение
	if (!orders.length) {
		return (
			<div className='text-center py-8'>
				<h3 className='text-lg text-gray-600'>{t('profilet.thereisNoOrder')}</h3>
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto px-4 py-8'>
			<div className='space-y-6'>
				{orders.map((item: OrderType, index: number) => (
					<div key={index} className='bg-white rounded-lg shadow-sm overflow-hidden'>
						<div className='flex items-center justify-between p-4 border-b border-gray-100'>
							<span className='text-lg font-medium text-gray-900'>
								{t('profilet.orderNumber')}
								{index + 1}
							</span>
							<div className='w-6 h-6 relative'>
								<Image src={accepted} alt='accepted' className='object-contain' fill />
							</div>
						</div>

						<div className='divide-y divide-gray-100'>
							<OrderedProduct products={item.products} />
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrderedProducts;
