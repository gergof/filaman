import { createSlice } from '@reduxjs/toolkit';

import Spool from '../../models/Spool';

import getCrudReducers from './getCrudReducers';

interface SpoolState {
	store: {
		[k: string]: Spool;
	};
	list: string[];
}

const initialState: SpoolState = {
	store: {},
	list: []
};

const slice = createSlice({
	name: 'spools',
	initialState,
	reducers: getCrudReducers<SpoolState, Spool>()
});

const spoolActions = slice.actions;
const spoolReducer = slice.reducer;

export { spoolActions };
export default spoolReducer;
