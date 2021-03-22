import { createSlice } from '@reduxjs/toolkit';

import Print from '../../models/Print';

import getCrudReducers from './getCrudReducers';

interface PrintState {
	store: {
		[k: string]: Print;
	};
	list: string[];
}

const initialState: PrintState = {
	store: {},
	list: []
};

const slice = createSlice({
	name: 'prints',
	initialState,
	reducers: getCrudReducers<PrintState, Print>()
});

const printActions = slice.actions;
const printReducer = slice.reducer;

export { printActions };
export default printReducer;
