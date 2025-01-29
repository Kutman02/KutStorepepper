import Image from 'next/image'; // Импортируем компонент Image из Next.js для работы с изображениями
import { useRouter } from 'next/router'; // Хук для работы с маршрутизацией в Next.js
import { useDispatch, useSelector } from 'react-redux'; // Хуки для работы с Redux (для отправки действий и получения данных из состояния)
import edit from 'public/icons/edit.png'; // Импортируем иконку редактирования
import profile from 'public/images/profile.png'; // Импортируем изображение профиля
import cart from 'public/icons/cart.png'; // Импортируем иконку корзины
import exit from 'public/icons/exit.png'; // Импортируем иконку выхода
import { routes } from '@src/constants/routes'; // Импортируем маршруты приложения
import { updateGlobalSlice } from '../../../store/globalSlice'; // Импортируем действие для обновления глобального состояния
import OrderedProducts from './orderedProducts'; // Компонент для отображения заказов пользователя
import { useTranslation } from 'react-i18next'; // Хук для работы с многоязычностью

const UserProfile = () => {
	const { t } = useTranslation(); // Получаем функцию для перевода текста
	const email = useSelector((state: any) => state.globalSlice.data.email); // Получаем email из глобального состояния
	const dispatch = useDispatch(); // Получаем функцию для отправки действий в Redux
	const router = useRouter(); // Получаем объект маршрутизатора Next.js

	// Функция для выхода из системы
	const handleLogOut = () => {
		localStorage.clear(); // Очищаем localStorage
		dispatch(updateGlobalSlice({ email: null, password: null })); // Очищаем данные пользователя в глобальном состоянии
		router.push(routes.home); // Перенаправляем пользователя на главную страницу
	};

	return (
		<div className='max-w-7xl mx-auto px-4 py-8'>
			<div className='bg-white rounded-lg shadow-sm p-6 mb-8'>
				{/* Профиль пользователя */}
				<div className='space-y-6'>
					{/* Информация об аккаунте */}
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-4'>
							<div className='w-16 h-16 relative rounded-full overflow-hidden'>
								<Image src={profile} alt='account' className='object-cover' fill />
							</div>
							<div className='space-y-1'>
								<div className='text-sm text-gray-500'>{t('userProfile.user')}</div>
								<div className='font-medium text-gray-900'>{email}</div>
							</div>
						</div>
						<button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
							<Image src={edit} alt='edit' width={20} height={20} />
						</button>
					</div>

					{/* Навигация */}
					<div className='space-y-2'>
						{/* Заказы */}
						<div className='relative'>
							<div className='absolute left-0 w-1 h-full bg-primary rounded-r-lg' />
							<div className='flex items-center gap-3 pl-4 py-2'>
								<Image src={cart} alt='cart' width={20} height={20} />
								<span className='text-primary font-medium'>{t('userProfile.orders')}</span>
							</div>
						</div>

						{/* Кнопка выхода */}
						<button
							onClick={handleLogOut}
							className='w-full flex items-center gap-3 pl-4 py-2 text-gray-600 hover:bg-gray-50 transition-colors rounded-lg'
						>
							<Image src={exit} alt='exit' width={20} height={20} />
							<span>{t('userProfile.exit')}</span>
						</button>
					</div>
				</div>
			</div>

			{/* Список заказов */}
			<OrderedProducts />
		</div>
	);
};

export default UserProfile; // Экспортируем компонент для использования в других частях приложения
