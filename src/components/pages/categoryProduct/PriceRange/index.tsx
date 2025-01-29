import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface PriceRangeProps {
	min: number;
	max: number;
	onChange: (min: number, max: number) => void;
}

const PriceRange = ({ min, max, onChange }: PriceRangeProps) => {
	const { t } = useTranslation();
	const [localMin, setLocalMin] = useState(min);
	const [localMax, setLocalMax] = useState(max);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			onChange(localMin, localMax);
		}, 500);

		return () => clearTimeout(timeoutId);
	}, [localMin, localMax, onChange]);

	return (
		<div className='space-y-4'>
			<div className='flex items-center gap-4'>
				<div className='relative flex-1'>
					<input
						type='number'
						value={localMin}
						onChange={(e) => setLocalMin(Number(e.target.value))}
						className='w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm 
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
						placeholder={t('FilterProducts.min')}
						min={0}
					/>
					<span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm'>
						{t('FilterProducts.currency')}
					</span>
				</div>
				<span className='text-gray-400'>—</span>
				<div className='relative flex-1'>
					<input
						type='number'
						value={localMax}
						onChange={(e) => setLocalMax(Number(e.target.value))}
						className='w-full pl-3 pr-8 py-2 border border-gray-200 rounded-lg text-sm 
                        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500'
						placeholder={t('FilterProducts.max')}
						min={0}
					/>
					<span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm'>
						{t('FilterProducts.currency')}
					</span>
				</div>
			</div>

			<div className='relative pt-2'>
				<div className='h-2 bg-gray-100 rounded-full'>
					<div
						className='absolute h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full'
						style={{
							left: `${(localMin / 1000) * 100}%`,
							right: `${100 - (localMax / 1000) * 100}%`,
						}}
					/>
				</div>
				<div className='relative -mt-1'>
					<input
						type='range'
						min={0}
						max={1000}
						value={localMin}
						onChange={(e) => setLocalMin(Number(e.target.value))}
						className='absolute w-full h-4 opacity-0 cursor-pointer'
						style={{ zIndex: 2 }}
					/>
					<input
						type='range'
						min={0}
						max={1000}
						value={localMax}
						onChange={(e) => setLocalMax(Number(e.target.value))}
						className='absolute w-full h-4 opacity-0 cursor-pointer'
						style={{ zIndex: 2 }}
					/>
				</div>
			</div>
		</div>
	);
};

export default PriceRange;
