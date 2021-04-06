import { Action } from '@reduxjs/toolkit';

import MSettings from '../../models/Settings';
import { AppState } from '../../store';
import { settingsActions } from '../reducers/Settings';

class Settings {
	static get(): (state: AppState) => MSettings {
		return state => {
			return state.settings;
		};
	}

	static set<SK extends keyof MSettings>(
		key: SK,
		value: MSettings[SK]
	): Action {
		return settingsActions.set({ key, value });
	}
}

export default Settings;
