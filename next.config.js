/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
	images: {
		unoptimized: true,
	},
	webpack(config) {
		// Удаляем существующее правило для изображений, если оно есть
		const rules = config.module.rules.filter((rule) => {
			if (typeof rule !== 'string' && rule.test instanceof RegExp) {
				return !rule.test.test('.png');
			}
			return true;
		});

		config.module.rules = [
			...rules,
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/i,
				type: 'asset/resource',
			},
		];

		return config;
	},
};

module.exports = nextConfig;
