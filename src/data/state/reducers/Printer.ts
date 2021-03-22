import { createSlice } from '@reduxjs/toolkit';

import Printer from '../../models/Printer';

import getCrudReducers from './getCrudReducers';

interface PrinterState {
	store: {
		[k: string]: Printer;
	};
	list: string[];
}

const initialState: PrinterState = {
	store: {},
	list: []
};

const slice = createSlice({
	name: 'printers',
	initialState,
	reducers: getCrudReducers<PrinterState, Printer>()
});

const printerActions = slice.actions;
const printerReducer = slice.reducer;

export { printerActions };
export default printerReducer;
