// Импортируем необходимые компоненты и типы для страницы
import Head from 'next/head'; // Для работы с <head> документа, например, для тега <title>
import type { GetServerSideProps } from 'next'; // Для получения данных на сервере перед рендером страницы
import HomeContent from '@src/components/pages/home'; // Компонент для отображения контента главной страницы
import { HomeDataApiResponse } from '@src/interfaces/home'; // Тип данных, которые получаем с API
import { Rubik } from '@next/font/google'; // Импортируем шрифт Rubik с Google Fonts
import { getHomeData } from '@src/api/home'; // Функция для получения данных с API

// Настройка шрифта Rubik для страницы
export const title = Rubik({
	subsets: ['latin'], // Поддержка латинских символов
	weight: ['400', '500', '600', '700'], // Доступные веса шрифта
});

type HomeProps = {
	// Ожидаем объект данных, полученных с API
	data: HomeDataApiResponse;
};

const Home = ({ data }: HomeProps) => {
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Компонент Head для добавления мета-данных в <head> документа */}
			<Head>
				<title>Перец</title> {/* Заголовок страницы */}
			</Head>

			<div className='container mx-auto px-4 py-8'>
				{/* Отображаем контент главной страницы с переданными данными */}
				<HomeContent data={data} />
			</div>
		</div>
	);
};

// Функция для получения данных на сервере перед рендером страницы
export const getServerSideProps: GetServerSideProps = async () => {
	// Получаем данные с API
	const response = await getHomeData();

	// Возвращаем данные в пропсах, чтобы они были переданы в компонент
	return { props: { data: response.data } };
};

export default Home;
