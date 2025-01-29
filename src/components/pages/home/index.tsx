import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import filter from '@public/icons/filter.png';
import Input from '@src/components/base/input';
import { routes } from '@src/constants/routes';
import { HomeDataApiResponse } from '@src/interfaces/home';
import { useDispatch, useSelector } from 'react-redux';
import { postCartChange } from '@src/api/cart';
import { updateGlobalSlice } from '@src/store/globalSlice';
import { useRouter } from 'next/router';

// Определение типа для пропсов компонента HomeContent
type HomeContentProps = {
	data: HomeDataApiResponse;
};

// Основной компонент для отображения домашней страницы
const HomeContent = ({ data }: HomeContentProps) => {
	const { t } = useTranslation();
	const router = useRouter();
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState('');
	const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');
	const email = useSelector((state: any) => state.globalSlice.data.email);
	const password = useSelector((state: any) => state.globalSlice.data.password);

	// Фильтрация данных
	const filteredData = data.sliderProducts.bestOffer.list.filter((item) => {
		const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesPrice = item.price >= priceRange.min && item.price <= priceRange.max;
		return matchesSearch && matchesPrice;
	});

	// Сортировка данных
	const sortedData = [...filteredData].sort((a, b) => {
		switch (sortBy) {
			case 'price-asc':
				return a.price - b.price;
			case 'price-desc':
				return b.price - a.price;
			default:
				return a.title.localeCompare(b.title);
		}
	});

	const handleBuy = async (id: string) => {
		if (!email && !password) {
			router.push('/login');
			return;
		}

		try {
			const response = await postCartChange(id, 1);
			if (response.status === 200) {
				dispatch(updateGlobalSlice({ cartTotal: 1 }));
			}
		} catch (error) {
			console.error('Error adding to cart:', error);
		}
	};

	// Сброс фильтров
	const resetFilters = () => {
		setSearchTerm('');
		setPriceRange({ min: 0, max: 1000 });
		setSortBy('name');
		setIsFilterOpen(false);
	};

	return (
		<div className='py-8 bg-gray-50'>
			<div className='container mx-auto px-4'>
				{/* Верхняя панель с основными элементами управления */}
				<div className='mb-8 bg-white rounded-xl shadow-sm p-4'>
					<div className='flex flex-wrap items-center justify-between gap-4'>
						<div className='flex items-center gap-4'>
							<button
								onClick={() => setIsFilterOpen(!isFilterOpen)}
								className='flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 
								text-white rounded-full hover:from-orange-600 hover:to-red-600 
								transform hover:-translate-y-0.5 active:translate-y-0 
								transition-all duration-200 shadow-sm hover:shadow-md'
							>
								<Image src={filter} alt='filter' width={18} height={18} className='opacity-90' />
								<span className='text-sm font-medium'>{t('FilterProducts.filter')}</span>
							</button>
						</div>
						<p className='text-sm text-gray-600'>
							{t('FilterProducts.Showing')} {sortedData.length} {t('FilterProducts.of')}{' '}
							{data.sliderProducts.bestOffer.list.length} {t('FilterProducts.product')}
						</p>
					</div>
				</div>

				{/* Десктопный фильтр */}
				<div className='hidden lg:block mb-8 bg-white rounded-xl shadow-sm p-4'>
					<div className='grid grid-cols-3 gap-6'>
						<div>
							<label className='text-sm font-medium text-gray-700 mb-2 block'>{t('FilterProducts.sortBy')}</label>
							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
								className='w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm 
								focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
							>
								<option value='name'>{t('FilterProducts.sortByName')}</option>
								<option value='price-asc'>{t('FilterProducts.priceLowToHigh')}</option>
								<option value='price-desc'>{t('FilterProducts.priceHighToLow')}</option>
							</select>
						</div>
						<div>
							<label className='text-sm font-medium text-gray-700 mb-2 block'>{t('FilterProducts.search')}</label>
							<Input
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder={t('FilterProducts.searcht')}
								className='w-full'
							/>
						</div>
						<div>
							<label className='text-sm font-medium text-gray-700 mb-2 block'>{t('FilterProducts.priceRange')}</label>
							<div className='flex gap-4'>
								<Input
									type='number'
									value={priceRange.min}
									onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
									placeholder='Min'
									className='w-1/2'
								/>
								<Input
									type='number'
									value={priceRange.max}
									onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
									placeholder='Max'
									className='w-1/2'
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Сетка товаров */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
					{sortedData.map((item) => (
						<div
							key={item.id}
							className='group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300'
						>
							<Link href={routes.product(item.id)} className='block relative'>
								<div className='aspect-square relative overflow-hidden bg-orange-50'>
									<Image
										src={item.images[0]}
										alt={item.title}
										fill
										className='object-cover group-hover:scale-105 transition-transform duration-500'
									/>
									<div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
								</div>
								<div className='p-4'>
									<h3 className='text-gray-800 font-medium line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors duration-200'>
										{item.title}
									</h3>
									<div className='mt-3 flex items-center justify-between'>
										<span className='text-primary font-semibold text-lg'>{item.price} сом</span>
										<button
											onClick={(e) => {
												e.preventDefault();
												handleBuy(item.id);
											}}
											className='px-4 py-2 text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full 
											hover:from-orange-600 hover:to-red-600 transform hover:-translate-y-0.5 
											active:translate-y-0 transition-all duration-200 shadow-sm 
											hover:shadow-md flex items-center gap-2'
										>
											<svg
												className='w-4 h-4'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
												/>
											</svg>
											{t('addToCart')}
										</button>
									</div>
								</div>
							</Link>
						</div>
					))}
				</div>

				{/* Мобильный фильтр */}
				{isFilterOpen && (
					<div className='fixed inset-0 z-50 lg:hidden bg-black/50 backdrop-blur-sm'>
						<div className='fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl'>
							<div className='flex flex-col h-full'>
								<div className='p-4 border-b border-gray-100'>
									<div className='flex items-center justify-between mb-4'>
										<h3 className='text-lg font-medium'>{t('FilterProducts.filter')}</h3>
										<button
											onClick={() => setIsFilterOpen(false)}
											className='p-2 hover:bg-gray-100 rounded-full transition-colors'
										>
											<svg className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
												<path
													fillRule='evenodd'
													d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
													clipRule='evenodd'
												/>
											</svg>
										</button>
									</div>
									<div className='space-y-6'>
										<div>
											<label className='text-sm font-medium text-gray-700 mb-2 block'>
												{t('FilterProducts.sortBy')}
											</label>
											<select
												value={sortBy}
												onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
												className='w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm 
												focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
											>
												<option value='name'>{t('FilterProducts.sortByName')}</option>
												<option value='price-asc'>{t('FilterProducts.priceLowToHigh')}</option>
												<option value='price-desc'>{t('FilterProducts.priceHighToLow')}</option>
											</select>
										</div>
										<div>
											<label className='text-sm font-medium text-gray-700 mb-2 block'>
												{t('FilterProducts.search')}
											</label>
											<Input
												value={searchTerm}
												onChange={(e) => setSearchTerm(e.target.value)}
												placeholder={t('FilterProducts.searcht')}
												className='w-full'
											/>
										</div>
										<div>
											<label className='text-sm font-medium text-gray-700 mb-2 block'>
												{t('FilterProducts.priceRange')}
											</label>
											<div className='flex gap-4'>
												<Input
													type='number'
													value={priceRange.min}
													onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
													placeholder='Min'
													className='w-1/2'
												/>
												<Input
													type='number'
													value={priceRange.max}
													onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
													placeholder='Max'
													className='w-1/2'
												/>
											</div>
										</div>
									</div>
								</div>
								<div className='mt-auto p-4 border-t border-gray-100'>
									<button
										onClick={resetFilters}
										className='w-full px-4 py-2 text-sm text-orange-500 hover:text-orange-600 
										hover:bg-orange-50 rounded-full transition-all duration-200 
										border border-orange-200 hover:border-orange-300'
									>
										{t('FilterProducts.resetFilters')}
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default HomeContent; // Экспортируем компонент для использования в других частях приложения
