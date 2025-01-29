// Импорт необходимых модулей и компонентов
import Image, { StaticImageData } from 'next/image'; // Компонент Image от Next.js для оптимизированного отображения изображений
import { useDispatch } from 'react-redux'; // Хук для отправки действий в хранилище Redux
import close from 'public/icons/close.png'; // Импорт изображения для кнопки "Закрыть"
import Button from '../../../base/button'; // Компонент Button (кнопка)
import { postCartChange } from '@src/api/cart'; // API-запрос для изменения корзины
import { updateGlobalSlice } from '@src/store/globalSlice'; // Действие для обновления глобального состояния Redux
import { useTranslation } from 'react-i18next'; // Хук для работы с переводами (i18n)

// Типизация для каждого товара в корзине
type CartListType = {
	category: string; // Категория товара
	description: []; // Описание товара
	id: string; // Уникальный идентификатор товара
	images: StaticImageData[]; // Массив изображений товара
	price: number; // Цена одного товара
	score: number; // Оценка товара
	summery: string; // Краткое описание товара
	title: string; // Название товара
	total: number; // Количество товара в корзине
};

// Типизация пропсов компонента CartProducts
type CartProductsProps = {
	cartList: CartListType[];
	setCartList: (updatedList: CartListType[]) => void;
};

// Компонент CartProducts для отображения товаров в корзине
const CartProducts = ({ cartList, setCartList }: CartProductsProps) => {
	const { t } = useTranslation(); // Хук для работы с переводами
	const dispatch = useDispatch(); // Хук для отправки действий в Redux

	// Функция для увеличения количества товара
	const increment = async (id: string) => {
		const response = await postCartChange(id, 1); // Запрос к API для увеличения количества товара на 1
		if (response.status === 200) {
			// Если запрос успешен
			const index = cartList.findIndex((item) => item.id === id); // Находим индекс товара по его id
			const listCloned = [...cartList];
			listCloned[index].total += 1; // Увеличиваем количество товара
			setCartList(listCloned); // Обновляем список товаров в состоянии
		}
	};

	// Функция для уменьшения количества товара
	const decrement = async (id: string) => {
		const response = await postCartChange(id, -1); // Запрос к API для уменьшения количества товара на 1
		if (response.status === 200) {
			// Если запрос успешен
			const index = cartList.findIndex((item) => item.id === id); // Находим индекс товара
			const listCloned = [...cartList];
			listCloned[index].total -= 1; // Уменьшаем количество товара
			setCartList(listCloned); // Обновляем список товаров в состоянии
		}
	};

	// Функция для удаления товара из корзины
	const deleteItem = async (id: string) => {
		const response = await postCartChange(id, 0); // Запрос к API для удаления товара из корзины
		if (response.status === 200) {
			// Если запрос успешен
			const cartListDelete = JSON.parse(localStorage.getItem('cartList') || '[]'); // Получаем обновленный список корзины из localStorage
			const index = cartList.findIndex((item) => item.id === id); // Находим индекс товара
			const listCloned = [...cartList];
			listCloned.splice(index, 1); // Удаляем товар из списка
			setCartList(listCloned); // Обновляем список товаров в состоянии
			dispatch(updateGlobalSlice({ cartTotal: cartListDelete?.length })); // Обновляем общее количество товаров в глобальном состоянии Redux
		}
	};

	// JSX-рендеринг для каждого товара в корзине
	return (
		<div className='space-y-4'>
			{cartList.map((item, index) => (
				<div key={index} className='flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white'>
					<div className='flex items-center gap-6'>
						<div className='relative w-[150px] h-[150px]'>
							<Image src={item.images[0]} alt='product' fill className='object-cover rounded-lg' />
						</div>
						<div className='space-y-4'>
							<h3 className='text-lg font-medium text-gray-900'>{item.title}</h3>
							<div className='flex items-center gap-2'>
								<Button
									onClick={() => (item.total > 1 ? decrement(item.id) : '')}
									className='w-10 h-9 flex items-center justify-center hover:bg-gray-100 rounded-md'
								>
									-
								</Button>
								<span className='w-10 text-center font-medium'>{item.total}</span>
								<Button
									onClick={() => increment(item.id)}
									className='w-10 h-9 flex items-center justify-center hover:bg-gray-100 rounded-md'
								>
									+
								</Button>
							</div>
							<div className='space-y-1'>
								<span className='text-sm text-gray-500'>{t('totalt')}</span>
								<div className='text-lg font-bold text-primary'>{`${item.price * item.total} сом`}</div>
							</div>
						</div>
					</div>
					<button onClick={() => deleteItem(item.id)} className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
						<Image src={close} alt='remove' width={18} height={18} />
					</button>
				</div>
			))}
		</div>
	);
};

export default CartProducts; // Экспорт компонента для использования в других частях приложения
