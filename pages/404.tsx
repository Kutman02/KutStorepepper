import { useTranslation } from 'react-i18next';

const Custom404 = () => {
	const { t } = useTranslation();

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-50'>
			<div className='text-center'>
				<h1 className='text-4xl font-bold text-gray-900 mb-2'>404</h1>
				<p className='text-xl text-gray-600'>{t('404page')}</p>
			</div>
		</div>
	);
};

export default Custom404;

//const Custom404 = () => {
//return <h1>Page Not Found</h1>;
//};
//export default Custom404;
