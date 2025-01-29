import React from 'react'; // Импортируем React для работы с компонентами
import { useTranslation } from 'react-i18next'; // Импортируем хук для работы с переводами

// Определяем тип данных для вкладок
type ProductTabsType = {
	content: string; // Содержимое вкладки
	title: string; // Заголовок вкладки
};

const ProductTabs = ({ data }: { data: ProductTabsType[] }) => {
	// Принимаем данные как пропс
	const { t } = useTranslation(); // Инициализируем хук для переводов

	return (
		<div className='max-w-7xl mx-auto px-4 py-8'>
			{/* Вкладки */}
			<div className='border-b border-gray-200'>
				<div className='flex space-x-8'>
					<button
						className='
							border-b-2 
							border-primary 
							py-4 
							px-1 
							text-base 
							font-medium 
							text-primary 
							focus:outline-none
						'
					>
						{t('productContent.productDescription')}
					</button>
				</div>
			</div>

			{/* Контент вкладок */}
			<div className='mt-8 space-y-6'>
				{data.map((item: ProductTabsType, index: number) => (
					<div key={index} className='space-y-4'>
						<h3 className='text-lg font-medium text-gray-900'>{item.title}</h3>
						<p className='text-base text-gray-600'>{item.content}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProductTabs; // Экспортируем компонент для использования в других частях приложения
