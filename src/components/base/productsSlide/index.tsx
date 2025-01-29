// Импортируем необходимые библиотеки и компоненты
import { useDispatch, useSelector } from 'react-redux';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import loading from 'public/images/loading.gif'; // Логотип или анимация загрузки
import { routes } from '@src/constants/routes'; // Импорт маршрутов
import Button from '../button'; // Импорт компонента кнопки
import { postCartChange } from '@src/api/cart'; // API запрос для изменения корзины
import { updateGlobalSlice } from '@src/store/globalSlice'; // Диспатч для обновления глобального состояния
import { useTranslation } from 'react-i18next'; // Библиотека для перевода

// Определяем типы пропсов для компонента ProductSlide
type ProductSlideProps = {
	title?: string; // Заголовок слайдера продуктов (опционально)
	list: {
		// Список продуктов
		id: string;
		images: StaticImageData; // Данные изображения
		title: string; // Название продукта
		price: number; // Цена продукта
	}[];
	hideTitle?: boolean; // Добавляем новый prop
};

// Тип для отдельного продукта в списке
type ListType = {
	id: string;
	price: number;
	images: any; // Данные изображений
	title: string; // Название продукта
};

// Компонент слайдера продуктов
const ProductSlide = ({ title, list, hideTitle }: ProductSlideProps) => {
	const { t } = useTranslation(); // Используем hook для перевода
	const router = useRouter(); // Получаем доступ к маршрутизатору
	const dispatch = useDispatch(); // Диспатч для изменения глобального состояния
	const email = useSelector((state: any) => state.globalSlice.data.email); // Получаем email из глобального состояния
	const password = useSelector((state: any) => state.globalSlice.data.password); // Получаем пароль из глобального состояния

	// Функция для добавления продукта в корзину
	const handleBuy = async (id: string) => {
		if (!email && !password) {
			// Если пользователь не авторизован, перенаправляем на страницу логина
			router.push(routes.login);
			return;
		}

		const response = await postCartChange(id, 1); // Отправляем запрос для добавления в корзину

		if (response.status === 200) {
			// Если запрос успешен, обновляем данные корзины в глобальном состоянии
			dispatch(updateGlobalSlice({ cartTotal: response.cartTotal }));

			// Перенаправляем пользователя в корзину
			//router.push(routes.cart);
		}
	};

	return (
		<div className='my-16 mb-20'>
			{/* Показываем заголовок только если hideTitle не true */}
			{!hideTitle && title && (
				<div className='flex justify-center mb-[75px]'>
					<h2 className='text-blue-500 text-lg font-bold'>{title}</h2>
				</div>
			)}

			{/* Список продуктов */}
			<div className='flex flex-nowrap overflow-x-auto md:flex-wrap md:overflow-visible justify-center gap-6'>
				{list?.map((item: ListType, index: number) => (
					<div key={index} className='flex flex-col items-center min-w-[250px] p-4'>
						<Link href={routes.product(item.id)} className='flex flex-col items-center no-underline w-full'>
							<div className='w-[225px] h-[225px] relative mb-4'>
								<Image src={item.images[0]} alt='product' fill className='object-cover rounded-md' />
							</div>
							<h3 className='text-gray-900 text-lg mb-2'>{item.title}</h3>
							<span className='text-red-400 text-lg mb-4'>{`${item.price} сом`}</span>
						</Link>
						<Button onClick={() => handleBuy(item.id)} className='w-full'>
							{t('addToCart')}
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

// Экспортируем компонент для использования в других частях приложения
export default ProductSlide;
