import React, { useState } from 'react'; // Импортируем React для работы с компонентами
import { useTranslation } from 'react-i18next'; // Импортируем хук для работы с переводами
import Image from 'next/image';

// Определяем тип данных для вкладок
type ProductTabsType = {
	content: string; // Содержимое вкладки
	title: string; // Заголовок вкладки
	images?: string[]; // Добавляем массив изображений
};

const ProductTabs = ({ data }: { data: ProductTabsType[] }) => {
	// Принимаем данные как пропс
	const { t } = useTranslation(); // Инициализируем хук для переводов
	const [activeTab, setActiveTab] = useState(0);
	const [activeImage, setActiveImage] = useState(0);

	return (
		<div className='max-w-7xl mx-auto px-4 py-12 bg-white'>
			{/* Декоративный элемент */}
			<div className='absolute left-0 right-0 h-32 bg-gradient-to-b from-amber-50/50 to-transparent -z-10' />

			{/* Галерея изображений */}
			{data[activeTab].images && data[activeTab].images.length > 0 && (
				<div className='mb-8'>
					{/* Основное изображение */}
					<div className='relative w-full h-[400px] rounded-lg overflow-hidden mb-4'>
						<Image
							src={data[activeTab].images[activeImage]}
							alt={data[activeTab].title}
							fill
							className='object-cover'
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						/>
					</div>

					{/* Миниатюры */}
					{data[activeTab].images.length > 1 && (
						<div className='flex gap-4 overflow-x-auto pb-2'>
							{data[activeTab].images.map((img, idx) => (
								<button
									key={idx}
									onClick={() => setActiveImage(idx)}
									className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden 
										${activeImage === idx ? 'ring-2 ring-amber-500' : 'ring-1 ring-gray-200'}`}>
									<Image
										src={img}
										alt={`${data[activeTab].title} ${idx + 1}`}
										fill
										className='object-cover'
										sizes='80px'
									/>
								</button>
							))}
						</div>
					)}
				</div>
			)}

			{/* Вкладки */}
			<div className='border-b border-amber-100'>
				<div className='flex flex-wrap gap-8'>
					{data.map((tab, index) => (
						<button
							key={index}
							onClick={() => {
								setActiveTab(index);
								setActiveImage(0); // Сброс активного изображения при смене вкладки
							}}
							className={`
								relative py-4 px-2 text-base font-medium 
								transition-all duration-300 hover:text-amber-600
								${
									activeTab === index
										? 'text-amber-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-500'
										: 'text-gray-600'
								}
							`}>
							{tab.title}
						</button>
					))}
				</div>
			</div>

			{/* Контент вкладок */}
			<div className='mt-8'>
				<div className='bg-white rounded-lg p-6 shadow-sm border border-amber-50'>
					<h3 className='text-xl font-semibold text-amber-800 mb-4'>{data[activeTab].title}</h3>
					<div className='prose prose-amber max-w-none'>
						<p className='text-gray-600 leading-relaxed'>{data[activeTab].content}</p>
					</div>
				</div>

				{/* Декоративные элементы */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8'>
					{[...Array(4)].map((_, i) => (
						<div key={i} className='p-4 bg-amber-50/50 rounded-lg text-center'>
							<div className='text-amber-700 font-medium mb-2'>{t(`productContent.feature${i + 1}`)}</div>
							<div className='text-sm text-gray-600'>{t(`productContent.featureDesc${i + 1}`)}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductTabs; // Экспортируем компонент для использования в других частях приложения
