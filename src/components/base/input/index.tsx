import { ChangeEvent } from 'react';

type InputProps = {
	name?: string;
	value?: string | number;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	placeholder?: string;
	disabled?: boolean;
	pattern?: string;
	required?: boolean;
	className?: string;
};

const Input = ({
	name,
	value,
	onChange,
	type = 'text',
	placeholder,
	disabled = false,
	pattern,
	required = false,
	className = '',
	...props
}: InputProps) => {
	return (
		<input
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled}
			pattern={pattern}
			required={required}
			className={`
				w-full 
				px-4 
				py-2 
				border 
				border-gray-200
				rounded-md
				bg-white
				text-gray-900
				placeholder-gray-400
				focus:ring-2 
				focus:ring-primary
				focus:border-primary
				focus:outline-none
				disabled:bg-gray-50
				disabled:text-gray-500
				disabled:border-gray-200
				disabled:cursor-not-allowed
				transition-all
				duration-200
				${className}
			`}
			{...props}
		/>
	);
};

export default Input;
