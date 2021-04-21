import { createSlice } from '@reduxjs/toolkit';

import SpoolTemplate from '../../models/SpoolTemplate';

import getCrudReducers from './getCrudReducers';

interface SpoolTemplateState {
	store: {
		[k: string]: SpoolTemplate;
	};
	list: string[];
}

const initialState: SpoolTemplateState = {
	store: {},
	list: []
};

const slice = createSlice({
	name: 'spoolTemplates',
	initialState,
	reducers: getCrudReducers<SpoolTemplateState, SpoolTemplate>()
});

const spoolTemplateActions = slice.actions;
const spoolTemplateReducer = slice.reducer;

export { spoolTemplateActions };
export default spoolTemplateReducer;
