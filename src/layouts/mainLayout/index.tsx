// Импортируем необходимые компоненты и библиотеки
import { Provider } from 'react-redux'; // Для подключения Redux
import { Varela_Round } from '@next/font/google'; // Для подключения шрифта через Google Fonts
import { store } from '@src/store'; // Импортируем Redux store
import Footer from './footer'; // Компонент футера
import Header from './header'; // Компонент хедера

import '../../i18n'; // Инициализация локализации

// Подключаем шрифт Varela Round с определёнными настройками
export const title = Varela_Round({
	subsets: ['latin'], // Указываем, что используем латинский набор символов
	weight: ['400'], // Указываем вес шрифта (нормальный)
});

// Определяем тип пропсов для компонента MainLayout
type MainLayoutProps = {
	children: React.ReactNode; // Пропс для дочерних элементов компонента
};

// Основной компонент макета страницы, оборачивающий контент
const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<div className={title.className}>
			{' '}
			{/* Применяем шрифт ко всему контейнеру */}
			<Provider store={store}>
				{' '}
				{/* Оборачиваем приложение в провайдер Redux */}
				<Header /> {/* Компонент шапки страницы */}
				<main className='min-h-screen bg-gray-50'>{children}</main>
				<Footer /> {/* Компонент футера */}
			</Provider>
		</div>
	);
};

// Экспортируем компонент MainLayout для использования в других частях приложения
export default MainLayout;
