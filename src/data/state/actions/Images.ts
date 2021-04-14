import { Action, nanoid, ThunkAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import * as fs from 'react-native-fs';

import Image from '../../models/Image';
import { AppState, AppDispatch } from '../../store';
import { imageActions } from '../reducers/Image';

class Images {
	static getAll(): (state: AppState) => Image[] {
		return state => {
			return _(state.images.list)
				.map(id => state.images.store[id])
				.filter(item => !!item)
				.sortBy('name')
				.value();
		};
	}

	static get(id: string): (state: AppState) => Image | null {
		return state => {
			return state.images.store[id] || null;
		};
	}

	static create(
		image: Omit<Image, 'id'>
	): (dispatch: AppDispatch) => Promise<Image> {
		return dispatch => {
			const createImage = {
				id: nanoid(),
				...image
			};

			dispatch(imageActions.create(createImage));

			return Promise.resolve(createImage);
		};
	}

	static update(id: string, patch: Omit<Image, 'id'>): Action {
		return imageActions.update({
			id: id,
			patch: {
				id,
				...patch
			}
		});
	}

	static delete(
		id: string
	): ThunkAction<Promise<void>, AppState, unknown, Action> {
		return (dispatch, getState) => {
			const image = Images.get(id)(getState());

			dispatch(imageActions.delete(id));

			if (image && image.path.includes('file://')) {
				return fs.unlink(image.path);
			}

			return Promise.resolve();
		};
	}
}

export default Images;
