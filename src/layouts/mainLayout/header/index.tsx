// Импортируем необходимые библиотеки и компоненты
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

// Динамически загружаем компонент BoxLogin, чтобы он не загружался на сервере
const BoxLogin = dynamic(() => import('./boxLogin'), { ssr: false });

const LanguageSelect = dynamic(() => import('@src/components/base/languageSelect'), {
	ssr: false,
});

// Список категорий
const categories = [
	{ title: 'category.masalas', link: 'masalas' },
	{ title: 'category.chatMasalas', link: 'chat-masalas' },
	{ title: 'category.pepperPowder', link: 'pepper-Powder' },
	{ title: 'category.cookingEssentials', link: 'cooking-essentials' },
	{ title: 'category.refundOil', link: 'refund-oil' },
];

const Header = () => {
	const { t } = useTranslation();
	const [mounted, setMounted] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<header className='bg-white sticky top-0 z-50'>
			<div className='border-b border-gray-100 bg-white/80 backdrop-blur-md'>
				<div className='container mx-auto px-4'>
					<div className='flex items-center justify-between h-16'>
						{/* Логотип */}
						<div className='flex items-center gap-6'>
							<Link href='/'>
								<span className='text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80'>
									Kutman
								</span>
							</Link>
							<LanguageSelect />
						</div>

						{/* Навигация */}
						<nav className='hidden lg:block'>
							<ul className='flex items-center gap-6'>
								{categories.map((category, index) => (
									<li key={index}>
										<Link
											href={`/category/${category.link}`}
											className='relative px-2 py-5 text-gray-600 hover:text-primary transition-colors text-sm font-medium group'
										>
											{t(category.title)}
											<span className='absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out' />
										</Link>
									</li>
								))}
							</ul>
						</nav>

						{/* Правая часть */}
						<div className='flex items-center gap-4'>
							<BoxLogin />
							<button
								className='lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors'
								onClick={() => setIsMobileMenuOpen(true)}
							>
								<svg className='w-6 h-6 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Мобильное меню */}
			{isMobileMenuOpen && (
				<div className='fixed inset-0 z-50 lg:hidden'>
					<div className='fixed inset-0 bg-black/20 backdrop-blur-sm' onClick={() => setIsMobileMenuOpen(false)} />
					<div className='fixed inset-y-0 right-0 w-full max-w-sm bg-white/90 backdrop-blur-lg shadow-xl'>
						<div className='flex flex-col h-full'>
							<div className='p-4 border-b border-gray-100/50'>
								<div className='flex items-center justify-between'>
									<span className='text-lg font-bold text-gray-900'>{t('menu')}</span>
									<button
										className='p-2 hover:bg-gray-50/80 rounded-lg transition-colors'
										onClick={() => setIsMobileMenuOpen(false)}
									>
										<svg className='w-6 h-6 text-gray-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
										</svg>
									</button>
								</div>
							</div>
							<nav className='flex-1 overflow-y-auto'>
								<ul className='p-4 space-y-1'>
									{categories.map((category, index) => (
										<li key={index}>
											<Link
												href={`/category/${category.link}`}
												className='flex items-center px-4 py-3 text-gray-700 hover:bg-primary/5 rounded-lg transition-colors'
												onClick={() => setIsMobileMenuOpen(false)}
											>
												{t(category.title)}
											</Link>
										</li>
									))}
								</ul>
							</nav>
						</div>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
