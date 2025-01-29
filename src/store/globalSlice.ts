import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
	data: {
		email: string;
		password: string;
		cartTotal: number;
	};
}

const initialState: GlobalState = {
	data: {
		email: '',
		password: '',
		cartTotal: 0,
	},
};

const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		updateGlobalSlice: (state, action: PayloadAction<Partial<GlobalState['data']>>) => {
			state.data = { ...state.data, ...action.payload };
		},
	},
});

export const { updateGlobalSlice } = globalSlice.actions;
export default globalSlice.reducer;
