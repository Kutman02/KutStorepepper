import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Button from '@src/components/base/button';
import Input from '@src/components/base/input';
import { postAuth } from '@src/api/auth';
import { updateGlobalSlice } from '@src/store/globalSlice';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { t } = useTranslation();
	const [inputValues, setInputValues] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInputValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmitForm = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await postAuth(inputValues.email, inputValues.password);

			if (response.status === 201) {
				dispatch(
					updateGlobalSlice({
						email: inputValues.email,
						password: inputValues.password,
					}),
				);
				router.push('/');
			}
		} catch (error) {
			console.error('Login error:', error);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-white'>
			<div className='w-full max-w-md p-6 bg-white rounded-lg shadow-sm'>
				<h1 className='text-2xl font-bold text-gray-900 mb-6'>{t('login')}</h1>
				<form onSubmit={handleSubmitForm} className='space-y-4'>
					<Input
						className='w-full'
						placeholder={t('email')}
						name='email'
						value={inputValues.email}
						onChange={handleChange}
						required
					/>
					<Input
						className='w-full'
						name='password'
						type='password'
						placeholder={t('password')}
						value={inputValues.password}
						onChange={handleChange}
						required
					/>
					<Button type='submit' className='w-full'>
						{t('login')}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
