import React from 'react';
import { View, Text } from 'react-native';

interface Props {}
const Welcome: React.FC<Props> = () => {
	return (
		<View style={{ flex: 1, backgroundColor: 'white' }}>
			<Text>Welcome!</Text>
		</View>
	);
};

export default Welcome;
