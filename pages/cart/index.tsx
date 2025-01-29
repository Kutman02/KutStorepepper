// Импортируем необходимые хуки и компоненты
import { useEffect, useState } from 'react'; // Хуки для работы с состоянием и побочными эффектами
import { useRouter } from 'next/router'; // Хук для работы с роутингом в Next.js
import Head from 'next/head'; // Компонент для добавления мета-данных в <head> документа
import { getCartList } from '@src/api/cart'; // Функция для получения данных корзины с API
import UserCart from '@src/components/pages/userCart'; // Компонент для отображения корзины пользователя
import { routes } from '@src/constants/routes'; // Константы маршрутов для навигации

type CartItem = {
	id: string;
	title: string;
	price: number;
	total: number;
	images: string[];
};

const Cart = () => {
	// Состояние для хранения списка товаров в корзине
	const [cartList, setCartList] = useState<CartItem[]>([]);
	// Хук для получения объекта роутера
	const router = useRouter();

	// Функция для получения данных корзины с помощью API
	const getCart = async () => {
		const response = await getCartList(); // Запрашиваем данные корзины
		setCartList(response.data); // Обновляем состояние корзины
	};

	useEffect(() => {
		// Получаем email и пароль пользователя из localStorage
		const email = localStorage.getItem('email');
		const password = localStorage.getItem('password');

		// Если нет email или пароля, перенаправляем пользователя на страницу логина
		if (!email || !password) {
			router.push(routes.login); // Переход на страницу логина
		} else {
			// Если данные есть, запрашиваем данные корзины
			getCart();
		}
	}, [router]); // Пустой массив зависимостей, чтобы этот эффект сработал только один раз при монтировании компонента

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Добавляем заголовок страницы */}
			<Head>
				<title>Корзина</title>
			</Head>

			<div className='container mx-auto px-4 py-8'>
				{/* Отображаем компонент корзины с переданным списком товаров */}
				<UserCart cartList={cartList} setCartList={setCartList} />
			</div>
		</div>
	);
};

export default Cart;
