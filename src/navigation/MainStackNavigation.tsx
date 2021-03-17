import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { WelcomeScreen } from '../screens';

const Stack = createStackNavigator();

interface Props {}
const MainStackNavigation: React.FC<Props> = () => {
	return (
		<Stack.Navigator initialRouteName="Welcome" headerMode="screen">
			<Stack.Screen name="Welcome" component={WelcomeScreen} />
		</Stack.Navigator>
	);
};

export default MainStackNavigation;
