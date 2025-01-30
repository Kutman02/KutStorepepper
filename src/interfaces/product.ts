export interface ProductsDataApiResponse {
	list: ProductDataApiResponse[];
}

export interface ProductDataApiResponse {
	id: number;
	title: string;
	images: string[];
	price: number;
	score: number;
	category: string;
	summary: string;
	description: string;
}

// Если нужны дополнительные типы, их тоже можно добавить здесь
export interface ProductDescription {
	title: string;
	content: string;
}

export interface Product {
	id: string;
	title: string;
	price: number;
	score: number;
	images: string[];
	category: string;
	summery: string;
	description: ProductDescription[];
}
