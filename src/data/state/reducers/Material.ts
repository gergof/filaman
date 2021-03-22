import { createSlice } from '@reduxjs/toolkit';

import Material from '../../models/Material';

import getCrudReducers from './getCrudReducers';

interface MaterialState {
	store: {
		[k: string]: Material;
	};
	list: string[];
}

const initialState: MaterialState = {
	store: {
		'default-1': {
			id: 'default-1',
			name: 'PLA',
			code: 'PLA',
			density: 1240,
			notes: '- Easy to print\n- Biodegradable\n- For consumer products'
		},
		'default-2': {
			id: 'default-2',
			name: 'ABS',
			code: 'ABS',
			density: 1010,
			notes: '- Durable\n- Impact resistant\n- For functional parts'
		},
		'default-3': {
			id: 'default-3',
			name: 'PETG',
			code: 'PETG',
			density: 1270,
			notes: '- More flexible than PLA or ABS\n- Durable'
		},
		'default-4': {
			id: 'default-4',
			name: 'TPU',
			code: 'TPU',
			density: 1210,
			notes:
				'- Extremely flexible\n- Rubber like\n- For elastic parts and wearables'
		},
		'default-5': {
			id: 'default-5',
			name: 'Nylon',
			code: 'NYLON',
			density: 1020,
			notes: '- Strong\n- Flexible\n- Durable'
		}
	},
	list: ['default-1', 'default-2', 'default-3', 'default-4', 'default-5']
};

const slice = createSlice({
	name: 'materials',
	initialState,
	reducers: getCrudReducers<MaterialState, Material>()
});

const materialActions = slice.actions;
const materialReducer = slice.reducer;

export { materialActions };
export default materialReducer;
