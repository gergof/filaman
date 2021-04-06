import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Settings from '../../models/Settings';

interface SettingsState extends Settings {}

const initialState: SettingsState = {
	currency: 'EUR'
};

const slice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		set: <SK extends keyof SettingsState>(
			state: SettingsState,
			action: PayloadAction<{ key: SK; value: SettingsState[SK] }>
		): SettingsState => {
			return {
				...state,
				[action.payload.key]: action.payload.value
			};
		}
	}
});

const settingsActions = slice.actions;
const settingsReducer = slice.reducer;

export { settingsActions };
export default settingsReducer;
