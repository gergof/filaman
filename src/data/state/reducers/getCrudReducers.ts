import { PayloadAction } from '@reduxjs/toolkit';

interface BaseState<T> {
	store: {
		[k: string]: T;
	};
	list: string[];
}

interface BaseType {
	id: string;
}

const getCrudReducers = <S extends BaseState<T>, T extends BaseType>() => ({
	create: (state: S, action: PayloadAction<T>) => {
		if (!action.payload.id) {
			return state;
		}

		return {
			...state,
			store: {
				...state.store,
				[action.payload.id]: action.payload
			},
			list: [...state.list, action.payload.id]
		};
	},
	update: (
		state: S,
		action: PayloadAction<{ id: string; patch: Partial<T> }>
	) => {
		const { [action.payload.id]: old, ...restStore } = state.store;
		const key = action.payload.patch.id || action.payload.id;

		return {
			...state,
			store: {
				...restStore,
				[key]: {
					...old,
					...action.payload.patch
				}
			},
			list: [
				...state.list.filter(item => item !== action.payload.id),
				key
			]
		};
	},
	delete: (state: S, action: PayloadAction<string>) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { [action.payload]: old, ...restStore } = state.store;

		return {
			...state,
			store: {
				...restStore
			},
			list: state.list.filter(item => item !== action.payload)
		};
	}
});

export default getCrudReducers;
