import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigation from './navigation/AppNavigation';

interface Props {}
const App: React.FC<Props> = () => {
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<AppNavigation />
			</SafeAreaProvider>
		</NavigationContainer>
	);
};

export default App;
