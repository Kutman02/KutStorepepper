import { ChangeEvent, useState } from 'react'; // Импортируем хуки для работы с состоянием и событиями
import { useRouter } from 'next/router'; // Хук для работы с маршрутизацией в Next.js
import { useDispatch } from 'react-redux'; // Хук для отправки действий в Redux store
import CartProducts from '@src/components/pages/userCart/cartProducts'; // Компонент для отображения списка товаров в корзине
import { updateGlobalSlice } from '@src/store/globalSlice'; // Действие для обновления глобального состояния
import Input from '@src/components/base/input'; // Компонент для ввода данных
import Button from '@src/components/base/button'; // Компонент кнопки
import { postNewOrder } from '@src/api/order'; // API-запрос для создания нового заказа
import { routes } from '@src/constants/routes'; // Список маршрутов в приложении
import { useTranslation } from 'react-i18next'; // Хук для работы с многоязычностью

// Определяем типы пропсов для компонента
type UserCartType = {
	cartList?: any; // Список товаров в корзине
	setCartList?: any; // Функция для обновления списка товаров в корзине
};

// Основной компонент корзины пользователя
const UserCart = ({ cartList, setCartList }: UserCartType) => {
	const { t } = useTranslation(); // Получаем функцию перевода
	const dispatch = useDispatch(); // Получаем функцию для отправки действий в Redux

	// Состояние для значений ввода (страна, штат, почтовый код)
	const [inputValues, setInputValues] = useState({
		country: '', // Страна
		state: '', // Штат
		postalCode: '', // Почтовый код
	});

	const router = useRouter(); // Получаем объект маршрутизатора Next.js

	// Обработчик изменения значений ввода
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target; // Получаем имя и значение поля

		// Обновляем состояние с новыми значениями
		setInputValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// Обработчик отправки формы
	const handleSubmitForm = async () => {
		// Отправляем запрос на создание нового заказа
		const response = await postNewOrder(inputValues.country, inputValues.state, inputValues.postalCode);

		// Если заказ успешно создан, перенаправляем пользователя в профиль и очищаем корзину
		if (response.status === 201) {
			router.push(routes.profile); // Перенаправляем на страницу профиля
			dispatch(updateGlobalSlice({ cartTotal: null })); // Очищаем данные корзины в глобальном состоянии
		}
	};

	return (
		<>
			{/* Если в корзине есть товары */}
			{cartList.length ? (
				<div className='max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8'>
					{/* Секция товаров */}
					<div className='flex-1'>
						<h2 className='text-2xl font-medium text-gray-900 mb-6'>{t('userCart.Products')}</h2>
						<CartProducts cartList={cartList} setCartList={setCartList} />
					</div>

					{/* Форма оформления заказа */}
					<div className='w-full lg:w-[400px]'>
						<h2 className='text-2xl font-medium text-gray-900 mb-6'>{t('userCart.orderSummary')}</h2>
						<div className='bg-white p-6 rounded-lg shadow-sm space-y-6'>
							<p className='text-gray-600'>{t('userCart.orderSummarytitle')}</p>

							{/* Поля формы */}
							<div className='space-y-4'>
								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>{t('userCart.country')}</label>
									<Input
										className='w-full h-[50px]'
										name='country'
										value={inputValues.country}
										onChange={handleChange}
									/>
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>{t('userCart.state')}</label>
									<Input className='w-full h-[50px]' name='state' value={inputValues.state} onChange={handleChange} />
								</div>

								<div>
									<label className='block text-sm font-medium text-gray-700 mb-1'>{t('userCart.postalCode')}</label>
									<Input
										className='w-full h-[50px]'
										name='postalCode'
										value={inputValues.postalCode}
										onChange={handleChange}
									/>
								</div>
							</div>

							{/* Кнопка оформления заказа */}
							<div className='pt-4'>
								<Button onClick={handleSubmitForm} className='w-full h-[50px]'>
									{t('userCart.continueShopping')}
								</Button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='text-center py-8 text-gray-600'>{t('userCart.shoppingBasketIsEmpty')}</div>
			)}
		</>
	);
};

export default UserCart; // Экспортируем компонент для использования в других частях приложения
