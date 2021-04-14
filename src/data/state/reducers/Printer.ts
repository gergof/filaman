import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Printer from '../../models/Printer';

import getCrudReducers from './getCrudReducers';

interface PrinterState {
	store: {
		[k: string]: Printer;
	};
	list: string[];
	printsRelation: {
		[k: string]: string[];
	};
}

const initialState: PrinterState = {
	store: {},
	list: [],
	printsRelation: {}
};

const slice = createSlice({
	name: 'printers',
	initialState,
	reducers: {
		...getCrudReducers<PrinterState, Printer>(),
		addPrint: (
			state,
			action: PayloadAction<{ id: string; printId: string }>
		) => {
			if (!state.list.includes(action.payload.id)) {
				return state;
			}

			const existing = state.printsRelation[action.payload.id] || [];

			return {
				...state,
				printsRelation: {
					...state.printsRelation,
					[action.payload.id]: [
						...existing.filter(id => id != action.payload.printId),
						action.payload.printId
					]
				}
			};
		}
	}
});

const printerActions = slice.actions;
const printerReducer = slice.reducer;

export { printerActions };
export default printerReducer;
