import {
	combineReducers,
	configureStore as configureReduxStore,
	getDefaultMiddleware
} from '@reduxjs/toolkit';
import MMKVStorage from 'react-native-mmkv-storage';
import { persistReducer, createMigrate, persistStore } from 'redux-persist';

import appInfo from '../../app.json';

import migrations from './state/migrations';
import imageReducer from './state/reducers/Image';
import materialReducer from './state/reducers/Material';
import printReducer from './state/reducers/Print';
import printerReducer from './state/reducers/Printer';
import settingsReducer from './state/reducers/Settings';
import spoolReducer from './state/reducers/Spool';
import spoolTemplateReducer from './state/reducers/SpoolTemplate';

const storage = new MMKVStorage.Loader().initialize();

const rootReducer = combineReducers({
	images: imageReducer,
	materials: materialReducer,
	printers: printerReducer,
	prints: printReducer,
	settings: settingsReducer,
	spools: spoolReducer,
	spoolTemplates: spoolTemplateReducer
});

const persistedReducer = persistReducer(
	{
		key: 'store',
		storage,
		version: appInfo.storeVersion,
		migrate: createMigrate(migrations)
	},
	rootReducer
);

const store = configureReduxStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		thunk: true,
		immutableCheck: true,
		serializableCheck: false
	})
});

const persistor = persistStore(store);

export { store, persistor };

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
