// Определяем тип для ответа. В ответе будет поле `status`, которое может принимать значения 201 (успех) или 422 (ошибка валидации).
type Response = {
	status: 201 | 422;
};

// Функция `postAuth` имитирует отправку данных для авторизации (логин/пароль).
// Она принимает два аргумента: `email` (строка) и `password` (строка).
// Возвращает Promise, который разрешается объектом типа `Response`.
export const postAuth = async (email: string, password: string) => {
	try {
		// Имитация запроса к API
		return {
			status: 201,
			data: {
				email,
				password,
			},
		};
	} catch (error) {
		console.error('Auth error:', error);
		throw error;
	}
};
