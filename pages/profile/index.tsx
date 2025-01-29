// Импортируем необходимые хуки и компоненты
import { useEffect } from 'react'; // Хук для выполнения побочных эффектов
import { useRouter } from 'next/router'; // Хук для работы с роутингом в Next.js
import UserProfile from '@src/components/pages/userProfile'; // Компонент для отображения профиля пользователя
import Head from 'next/head'; // Компонент для работы с мета-тегами страницы
import { routes } from '@src/constants/routes'; // Импортируем константы маршрутов

const Profile = () => {
	// Используем хук useRouter для навигации между страницами
	const router = useRouter();

	// useEffect срабатывает при монтировании компонента
	useEffect(() => {
		// Получаем email и пароль из localStorage
		const email = localStorage.getItem('email');
		const password = localStorage.getItem('password');

		// Если нет email или пароля в localStorage, переходим на страницу входа
		if (!email || !password) {
			router.push(routes.login); // Перенаправление на страницу логина
		}
	}, [router]); // Пустой массив зависимостей, чтобы этот код выполнился только один раз при монтировании компонента

	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Заголовок страницы */}
			<Head>
				<title>Профиль</title>
			</Head>

			<div className='container mx-auto px-4 py-8'>
				{/* Отображаем компонент профиля пользователя */}
				<UserProfile />
			</div>
		</div>
	);
};

// Экспортируем компонент для использования в других частях приложения
export default Profile;
