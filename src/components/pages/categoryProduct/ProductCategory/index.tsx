import { useDispatch, useSelector } from 'react-redux'; // Импортируем хук для работы с Redux
import { useRouter } from 'next/router'; // Импортируем хук для работы с маршрутизацией
import Image from 'next/image'; // Компонент для работы с изображениями
import Link from 'next/link'; // Компонент для создания ссылок
import loading from 'public/images/loading.gif'; // Изображение для состояния загрузки
import interest from 'public/icons/interest.png'; // Иконка интереса товара
import score from 'public/icons/score.png'; // Иконка оценки товара
import { routes } from '@src/constants/routes'; // Импортируем маршруты из констант
import Button from '@src/components/base/button'; // Импортируем компонент кнопки
import { updateGlobalSlice } from '@src/store/globalSlice'; // Импортируем экшен для обновления состояния Redux
import { postCartChange } from '@src/api/cart'; // Импортируем API-запрос для изменения корзины
import { ListProducts } from '@src/interfaces/listProducts'; // Импортируем тип для списка продуктов
import { useTranslation } from 'react-i18next'; // Хук для работы с переводами

type ProductCategoryType = {
	list: { id: string; title: string; images: string[]; price: number }[];
};

// Компонент для отображения категории товаров
const ProductCategory = ({ list }: ProductCategoryType) => {
	const { t } = useTranslation(); // Инициализация хука для перевода
	const router = useRouter(); // Инициализация хука маршрутизации
	const dispatch = useDispatch(); // Хук для работы с dispatch в Redux
	const email = useSelector((state: any) => state.globalSlice.data.email); // Извлекаем email из состояния Redux
	const password = useSelector((state: any) => state.globalSlice.data.password); // Извлекаем пароль из состояния Redux

	// Функция для добавления товара в корзину
	const handleBuy = async (id: string) => {
		// Проверяем, авторизован ли пользователь
		if (!email && !password) {
			router.push(routes.login);
			return;
		}

		try {
			// Отправляем запрос на добавление товара в корзину
			const response = await postCartChange(id, 1);

			// Проверяем успешность запроса
			if (response.status === 200) {
				dispatch(updateGlobalSlice({ cartTotal: response.cartTotal }));
				router.push(routes.cart);
			}
		} catch (error) {
			console.error('Error adding to cart:', error);
		}
	};

	return (
		<>
			{list.map((item) => (
				<div
					key={item.id}
					className='group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300'>
					<Link href={routes.product(item.id)} className='block relative'>
						<div className='aspect-square relative overflow-hidden bg-orange-50'>
							<Image
								src={item.images[0]}
								alt={item.title}
								fill
								className='object-cover group-hover:scale-105 transition-transform duration-500'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
						</div>
						<div className='p-4'>
							<h3 className='text-gray-800 font-medium line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors duration-200'>
								{item.title}
							</h3>
							<div className='mt-3 flex items-center justify-between'>
								<span className='text-primary font-semibold text-lg'>{item.price} сом</span>
								<button
									onClick={(e) => {
										e.preventDefault();
										handleBuy(item.id);
									}}
									className='px-4 py-2 text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full 
                                    hover:from-orange-600 hover:to-red-600 transform hover:-translate-y-0.5 
                                    active:translate-y-0 transition-all duration-200 shadow-sm 
                                    hover:shadow-md flex items-center gap-2'>
									<svg
										className='w-4 h-4'
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
						</div>
					</Link>
				</div>
			))}
		</>
	);
};

export default ProductCategory; // Экспортируем компонент
