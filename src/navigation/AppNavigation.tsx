import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import MainStackNavigation from './MainStackNavigation';

const Stack = createStackNavigator();

interface Props {}
const AppNavigation: React.FC<Props> = () => {
	const commonOptions = {
		animationEnabled: false
	};

	return (
		<Stack.Navigator headerMode="none" initialRouteName="App">
			<Stack.Screen
				name="App"
				component={MainStackNavigation}
				options={commonOptions}
			/>
		</Stack.Navigator>
	);
};

export default AppNavigation;
