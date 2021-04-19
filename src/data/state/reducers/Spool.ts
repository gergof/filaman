import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Spool from '../../models/Spool';

import getCrudReducers from './getCrudReducers';

interface SpoolState {
	store: {
		[k: string]: Spool;
	};
	list: string[];
	printsRelation: {
		[k: string]: string[];
	};
}

const initialState: SpoolState = {
	store: {},
	list: [],
	printsRelation: {}
};

const slice = createSlice({
	name: 'spools',
	initialState,
	reducers: {
		...getCrudReducers<SpoolState, Spool>(),
		addPrint: (
			state,
			action: PayloadAction<{ id: string; printId: string }>
		) => {
			// check if spool exists
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
		},
		removePrint: (
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
					[action.payload.id]: existing.filter(
						id => id != action.payload.printId
					)
				}
			};
		}
	}
});

const spoolActions = slice.actions;
const spoolReducer = slice.reducer;

export { spoolActions };
export default spoolReducer;
