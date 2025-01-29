import Image from 'next/image'; // Импортируем компонент Image для отображения изображений в Next.js
import { useRouter } from 'next/router'; // Импортируем useRouter для навигации между страницами
import { useDispatch, useSelector } from 'react-redux'; // Импортируем хук useDispatch для отправки действий в Redux, useSelector для получения данных из Redux
import Button from '@src/components/base/button'; // Импортируем компонент кнопки
import { routes } from '@src/constants/routes'; // Импортируем константы с путями маршрутов
import { postCartChange } from '@src/api/cart'; // Импортируем функцию для добавления товара в корзину
import score from '@public/icons/score.png'; // Импортируем иконку для рейтинга товара
import share from '@public/icons/share.png'; // Импортируем иконку для кнопки "поделиться"
import interest from '@public/icons/interest.png'; // Импортируем иконку для добавления в избранное
import ProductTabs from './productTabs'; // Импортируем компонент вкладок для отображения описания товара
import { updateGlobalSlice } from '@src/store/globalSlice'; // Импортируем экшн для обновления состояния корзины
import { useTranslation } from 'react-i18next'; // Импортируем хук для перевода текста

type ProductData = {
	id: string;
	images: string[];
	title: string;
	summery: string;
	price: number;
	description: Array<{ title: string; content: string }>;
};

// Основной компонент для отображения контента страницы товара
const ProductContent = ({ data }: { data: ProductData }) => {
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
		<div className='max-w-7xl mx-auto px-4 py-8'>
			<div className='bg-white rounded-xl shadow-sm overflow-hidden'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 p-6'>
					{/* Изображение продукта */}
					<div className='aspect-square relative rounded-lg overflow-hidden bg-gray-100'>
						<Image src={data.images[0]} alt={data.title} fill className='object-cover' />
					</div>

					{/* Информация о продукте */}
					<div className='space-y-6'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center gap-4'>
								<div className='flex items-center gap-2'>
									<Image src={score} alt='score' width={20} height={20} className='object-contain' />
									<span className='text-sm text-gray-600'>4.5</span>
								</div>
								<Image src={interest} alt='interest' width={20} height={20} className='object-contain' />
							</div>
							<Image src={share} alt='share' width={20} height={20} className='object-contain' />
						</div>

						<div>
							<h1 className='text-2xl font-bold text-gray-900 mb-4'>{data.title}</h1>
							<p className='text-gray-600'>{data.summery}</p>
						</div>

						<div className='flex items-center justify-between'>
							<span className='text-2xl font-bold text-primary'>{data.price} сом</span>
							<Button onClick={handleBuy} className='px-8'>
								{t('addToCart')}
							</Button>
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
