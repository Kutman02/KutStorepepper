import Image from 'next/image';
//import Link from 'next/link';
//import logo from 'public/images/logo.png';
import mail from '@public/icons/mail.png';
import phone from '@public/icons/phone.png';
import { useTranslation } from 'react-i18next';

const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer className='bg-white border-t border-gray-200'>
			<div className='max-w-7xl mx-auto px-4 py-12'>
				{/* Основной контент футера */}
				<div className='flex flex-col md:flex-row gap-8'>
					{/* О нас */}
					<div className='flex-1 space-y-4'>
						<h3 className='text-lg font-medium text-gray-900'>{t('footert.aboutUs')}</h3>
						<p className='text-gray-600 leading-relaxed'>{t('footert.aboutUsTitle')}</p>
					</div>

					{/* Контакты */}
					<div className='flex-1 space-y-4'>
						<h3 className='text-lg font-medium text-gray-900'>{t('footert.contactUs')}</h3>

						{/* Email */}
						<div className='flex items-center gap-3'>
							<div className='w-5 h-5 relative'>
								<Image src={mail} alt='mail' width={20} height={20} className='object-contain' />
							</div>
							<span className='text-gray-600'>Kutmank9@gmail.com</span>
						</div>

						{/* Телефон */}
						<div className='flex items-center gap-3'>
							<div className='w-5 h-5 relative'>
								<Image src={phone} alt='phone' width={20} height={20} className='object-contain' />
							</div>
							<span className='text-gray-600'>0703601025</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
