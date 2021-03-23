import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigation from './navigation/AppNavigation';
import ThemeProvider from './theme/ThemeProvider';

interface Props {}
const App: React.FC<Props> = () => {
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<ThemeProvider>
					<AppNavigation />
				</ThemeProvider>
			</SafeAreaProvider>
		</NavigationContainer>
	);
};

export default App;
