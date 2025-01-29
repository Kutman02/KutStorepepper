// Импортируем необходимые компоненты для создания документа в Next.js
import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
	return (
		// Компонент <Html> задает язык страницы
		<Html lang='en' className='h-full'>
			<Head>
				{/* Мета-тег для описания страницы (можно изменять по необходимости) */}
				<meta name='description' content='Перец' />
				{/* Закомментированная строка для установки иконки сайта (favicon) */}
				{/* <link rel='icon' href='/favicon.ico' /> */}
			</Head>

			{/* Тело страницы */}
			<body className='h-full antialiased bg-gray-50'>
				{/* Основной контент страницы */}
				<Main />
				{/* Скрипты для работы Next.js */}
				<NextScript />
			</body>
		</Html>
	);
};

// Экспортируем компонент документа, чтобы Next.js использовал его для рендеринга
export default Document;
