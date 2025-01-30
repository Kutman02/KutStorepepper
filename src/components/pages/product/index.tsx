import Image from 'next/image'; // Импортируем компонент Image для отображения изображений в Next.js
import { useRouter } from 'next/router'; // Импортируем useRouter для навигации между страницами
import { useDispatch, useSelector } from 'react-redux'; // Импортируем хук useDispatch для отправки действий в Redux, useSelector для получения данных из Redux
import { routes } from '@src/constants/routes'; // Импортируем константы с путями маршрутов
import { postCartChange } from '@src/api/cart'; // Импортируем функцию для добавления товара в корзину
import ProductTabs from './productTabs'; // Импортируем компонент вкладок для отображения описания товара
import { updateGlobalSlice } from '@src/store/globalSlice'; // Импортируем экшн для обновления состояния корзины
import { useTranslation } from 'react-i18next'; // Импортируем хук для перевода текста

type ProductContentProps = {
	data: {
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
};

// Основной компонент для отображения контента страницы товара
const ProductContent = ({ data }: ProductContentProps) => {
	const { t } = useTranslation(); // Инициализация хука для перевода
	const router = useRouter(); // Хук для работы с маршрутом
	const dispatch = useDispatch(); // Хук для отправки экшенов в Redux
	const email = useSelector((state: any) => state.globalSlice.data.email); // Получаем email из глобального состояния
	const password = useSelector((state: any) => state.globalSlice.data.password); // Получаем пароль из глобального состояния

	// Функция для добавления товара в корзину
	const handleBuy = async () => {
		if (!email && !password) {
			// Если пользователь не авторизован, перенаправляем на страницу входа
			router.push(routes.login);
			return;
		}

		// Отправляем запрос на добавление товара в корзину
		const response = await postCartChange(data.id, 1);

		if (response.status === 200) {
			// Если товар добавлен в корзину, обновляем состояние и перенаправляем на страницу корзины
			dispatch(updateGlobalSlice({ cartTotal: response.cartTotal }));
			router.push(routes.cart);
		}
	};

	return (
		<div className='max-w-7xl mx-auto'>
			{/* Основная информация о продукте */}
			<div className='bg-white shadow-lg overflow-hidden'>
				{/* Мобильный заголовок */}
				<div className='p-4 lg:hidden bg-gradient-to-r from-amber-50 to-transparent'>
					<h1 className='text-2xl font-bold text-gray-900'>{data.title}</h1>
					<div className='h-1 w-16 bg-amber-500 mt-2'></div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-2'>
					{/* Левая колонка с изображением */}
					<div className='relative p-4 sm:p-6 lg:p-8 bg-gradient-to-b from-amber-50/30 via-transparent to-transparent'>
						<div className='aspect-square relative overflow-hidden bg-white'>
							<Image
								src={data.images[0]}
								alt={data.title}
								fill
								className='object-cover hover:scale-105 transition-transform duration-500'
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							/>
						</div>
						{/* Дополнительные изображения */}
						{data.images.length > 1 && (
							<div className='flex gap-3 mt-3 overflow-x-auto pb-2 scrollbar-hide'>
								{data.images.map((img, idx) => (
									<button
										key={idx}
										className='relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden border-2 border-amber-200 hover:border-amber-400 transition-colors'>
										<Image src={img} alt={`${data.title} ${idx + 1}`} fill className='object-cover' sizes='80px' />
									</button>
								))}
							</div>
						)}
					</div>

					{/* Правая колонка с информацией */}
					<div className='p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-amber-50/50 via-transparent to-transparent'>
						<div className='space-y-4 sm:space-y-6'>
							{/* Десктопный заголовок */}
							<div className='hidden lg:block'>
								<h1 className='text-3xl font-bold text-gray-900 mb-2'>{data.title}</h1>
								<div className='h-1 w-20 bg-amber-500'></div>
							</div>

							{/* Цена для мобильных */}
							<div className='flex items-center justify-between lg:hidden'>
								<div className='flex items-baseline gap-1'>
									<span className='text-xl font-bold text-amber-600'>{data.price}</span>
									<span className='text-base text-gray-600'>сом</span>
								</div>
								<button
									onClick={handleBuy}
									className='px-2 py-1 text-[10px] bg-gradient-to-r from-orange-500 to-red-500 
									text-white hover:from-orange-600 hover:to-red-600 
									transition-all duration-200 shadow-sm hover:shadow-md 
									flex items-center gap-0.5 min-w-[70px]'>
									<svg
										className='w-3 h-3'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
										/>
									</svg>
									{t('addToCart')}
								</button>
							</div>

							{/* Описание */}
							<p className='text-gray-600 leading-relaxed'>{data.summery}</p>

							{/* Цена и кнопка для десктопа */}
							<div className='hidden lg:block space-y-2'>
								<div className='flex items-center gap-1'>
									<span className='text-2xl font-bold text-amber-600'>{data.price}</span>
									<span className='text-lg text-gray-600'>сом</span>
								</div>

								<button
									onClick={handleBuy}
									className='w-full sm:w-auto px-2.5 py-1 text-[11px] bg-gradient-to-r from-orange-500 to-red-500 
									text-white hover:from-orange-600 hover:to-red-600 
									transition-all duration-200 shadow-sm hover:shadow-md 
									flex items-center justify-center gap-0.5 min-w-[80px]'>
									<svg
										className='w-3 h-3'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
										xmlns='http://www.w3.org/2000/svg'>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
										/>
									</svg>
									{t('addToCart')}
								</button>
							</div>

							{/* Дополнительная информация */}
							<div className='grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100'>
								<div className='bg-amber-50 p-3 sm:p-4 text-center'>
									<div className='text-amber-700 font-medium text-sm sm:text-base'>100% Натуральный</div>
									<div className='text-xs sm:text-sm text-gray-600'>Без добавок</div>
								</div>
								<div className='bg-amber-50 p-3 sm:p-4 text-center'>
									<div className='text-amber-700 font-medium text-sm sm:text-base'>Быстрая доставка</div>
									<div className='text-xs sm:text-sm text-gray-600'>По всей стране</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Вкладки с описанием */}
			<ProductTabs data={data.description} />
		</div>
	);
};

export default ProductContent;
