import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	width?: number;
	fontSize?: number;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, width, fontSize, className = '', ...props }) => {
	const style = {
		width: width ? `${width}px` : 'auto',
		fontSize: fontSize ? `${fontSize}px` : '16px',
	};

	return (
		<button className={`bg-primary text-white rounded-lg transition-colors ${className}`} style={style} {...props}>
			{children}
		</button>
	);
};

export default Button;
