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
import spoolReducer from './state/reducers/Spool';

const storage = new MMKVStorage.Loader().initialize();

const rootReducer = combineReducers({
	images: imageReducer,
	materials: materialReducer,
	spools: spoolReducer,
	printers: printerReducer,
	prints: printReducer
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
