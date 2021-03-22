import {
	combineReducers,
	configureStore as configureReduxStore
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

const configureStore = () => {
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
		reducer: persistedReducer
	});

	const persistor = persistStore(store);

	return { store, persistor };
};

export default configureStore;
