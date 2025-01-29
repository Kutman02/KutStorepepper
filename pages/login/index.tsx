// Импортируем необходимые компоненты для страницы
import LoginPage from '@src/components/pages/login'; // Компонент страницы логина
import MainLayout from '@src/layouts/mainLayout';
import Head from 'next/head'; // Для работы с <head> документа, например, для тега <title>

const Login = () => {
	return (
		<MainLayout>
			{/* Компонент Head для добавления мета-данных в <head> документа */}
			<Head>
				<title>Логин</title> {/* Заголовок страницы */}
			</Head>

			<div className='container mx-auto px-4 py-8'>
				{/* Отображаем компонент страницы логина */}
				<LoginPage />
			</div>
		</MainLayout>
	);
};

// Экспортируем компонент для использования в других частях приложения
export default Login;
