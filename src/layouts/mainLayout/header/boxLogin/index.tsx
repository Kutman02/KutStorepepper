import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import account from '@public/icons/account.png';
import cart from '@public/icons/cart.png';
import Button from '@src/components/base/button';
import { useTranslation } from 'react-i18next';

const BoxLogin = () => {
	const email = useSelector((state: any) => state.globalSlice.data.email);
	const password = useSelector((state: any) => state.globalSlice.data.password);
	const counter = useSelector((state: any) => state.globalSlice.data.cartTotal);
	const isLogin = email && password;
	const { t } = useTranslation();

	if (!isLogin) {
		return (
			<Link href='/login'>
				<span className='inline-block'>
					<Button className='px-4 py-2 hover:bg-primary/90 text-sm'>{t('login')}</Button>
				</span>
			</Link>
		);
	}

	return (
		<div className='flex items-center gap-4'>
			<Link href='/profile' className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
				<Image src={account} alt='account' width={20} height={20} />
			</Link>

			<div className='relative'>
				<Link href='/cart' className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
					<Image src={cart} alt='cart' width={20} height={20} />
					{counter ? (
						<span className='absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>
							{counter}
						</span>
					) : null}
				</Link>
			</div>
		</div>
	);
};

export default BoxLogin;
