import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const LanguageSelect = () => {
	const { i18n } = useTranslation();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const changeLanguage = (lang: string) => {
		i18n.changeLanguage(lang);
	};

	if (!mounted) return null;

	return (
		<div className='flex items-center gap-2'>
			<button
				onClick={() => changeLanguage('en')}
				className={`px-2 py-1 rounded-md transition-colors ${
					i18n.language === 'en' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
				}`}
			>
				EN
			</button>
			<button
				onClick={() => changeLanguage('ru')}
				className={`px-2 py-1 rounded-md transition-colors ${
					i18n.language === 'ru' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
				}`}
			>
				RU
			</button>
		</div>
	);
};

export default LanguageSelect;
