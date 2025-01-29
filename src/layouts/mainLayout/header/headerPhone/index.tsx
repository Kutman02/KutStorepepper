// Импортируем необходимые компоненты и изображения
import Image from 'next/image'; // Компонент Next.js для работы с изображениями
import more from 'public/icons/more.png'; // Изображение иконки "больше" (more) из папки public

// Компонент HeaderPhone для отображения иконки "больше" на мобильных устройствах
const HeaderPhone = () => {
	return (
		<>
			{/* Отображаем иконку "more" с помощью компонента Image */}
			<Image src={more} alt='more' /> {/* Иконка "more", атрибут alt для доступности */}
		</>
	);
};

// Экспортируем компонент HeaderPhone для использования в других частях приложения
export default HeaderPhone;
