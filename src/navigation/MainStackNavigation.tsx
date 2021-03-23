import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import HomeTabNavigation from './HomeTabNavigation';

const Stack = createStackNavigator();

interface Props {}
const MainStackNavigation: React.FC<Props> = () => {
	return (
		<Stack.Navigator initialRouteName="Home" headerMode="screen">
			<Stack.Screen name="Home" component={HomeTabNavigation} />
		</Stack.Navigator>
	);
};

export default MainStackNavigation;
