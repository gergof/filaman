import { createSlice } from '@reduxjs/toolkit';

import Image from '../../models/Image';

import getCrudReducers from './getCrudReducers';

interface ImageState {
	store: {
		[k: string]: Image;
	};
	list: string[];
}

const initialState: ImageState = {
	store: {},
	list: []
};

const slice = createSlice({
	name: 'images',
	initialState,
	reducers: getCrudReducers<ImageState, Image>()
});

const imageActions = slice.actions;
const imageReducer = slice.reducer;

export { imageActions };
export default imageReducer;
