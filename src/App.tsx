import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './data/store';
import AppNavigation from './navigation/AppNavigation';
import ThemeProvider from './theme/ThemeProvider';
import paperTheme from './theme/paperTheme';

interface Props {}
const App: React.FC<Props> = () => {
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<ReduxProvider store={store}>
					<PersistGate persistor={persistor} loading={null}>
						<ThemeProvider>
							<PaperProvider theme={paperTheme}>
								<AppNavigation />
							</PaperProvider>
						</ThemeProvider>
					</PersistGate>
				</ReduxProvider>
			</SafeAreaProvider>
		</NavigationContainer>
	);
};

export default App;
