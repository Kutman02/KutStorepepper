import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import filter from 'public/icons/filter.png';
import Input from '@src/components/base/input';
import ProductCategory from './ProductCategory';
import PriceRange from './PriceRange';
import { routes } from '@src/constants/routes';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { getProducts } from '@src/api/product';
import { Product } from '@src/interfaces/product';

interface CategoryProductProps {
	products: Product[];
	category?: string;
}

const CategoryProduct = ({ products, category }: CategoryProductProps) => {
	const { t } = useTranslation();
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState('');
	const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');

	console.log('CategoryProduct render:', { products, category });

	// Если products не определен, показываем загрузку
	if (products === undefined) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div>Загрузка...</div>
			</div>
		);
	}

	// Если products пустой массив, показываем сообщение
	if (products.length === 0) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div>Товары не найдены</div>
			</div>
		);
	}

	// Фильтруем продукты по категории
	const filteredProducts = category 
		? products.filter(product => product.category.toLowerCase() === category.toLowerCase())
		: products;

	// Фильтрация данных
	const filteredData = filteredProducts.filter((item) => {
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

	// Сброс фильтров
	const resetFilters = () => {
		setSearchTerm('');
		setPriceRange({ min: 0, max: 1000 });
		setSortBy('name');
		setIsFilterOpen(false);
	};

	const listCategory = [
		{ title: t('category.masalas'), link: 'masalas' },
		{ title: t('category.chatMasalas'), link: 'chat-masalas' },
		{ title: t('category.pepperPowder'), link: 'pepper-Powder' },
		{ title: t('category.cookingEssentials'), link: 'cooking-essentials' },
		{ title: t('category.refundOil'), link: 'refund-oil' },
	];

	return (
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
						{t('FilterProducts.Showing')} {sortedData.length} {t('FilterProducts.of')} {filteredProducts.length}{' '}
						{t('FilterProducts.product')}
					</p>
				</div>
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
										<label className='text-sm font-medium text-gray-700 mb-2 block'>
											{t('FilterProducts.priceRange')}
										</label>
										<PriceRange
											min={priceRange.min}
											max={priceRange.max}
											onChange={(min, max) => setPriceRange({ min, max })}
										/>
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
						<PriceRange
							min={priceRange.min}
							max={priceRange.max}
							onChange={(min, max) => setPriceRange({ min, max })}
						/>
					</div>
				</div>
			</div>

			{/* Список товаров */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
				<ProductCategory list={sortedData} />
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	try {
		const products = await getProducts();
		
		return {
			props: {
				products,
				category: query.category || null,
			},
		};
	} catch (error) {
		console.error('Error fetching products:', error);
		return {
			props: {
				products: [],
				category: null,
			},
		};
	}
};

export default CategoryProduct;
