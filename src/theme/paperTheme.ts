import { DefaultTheme } from 'react-native-paper';

import theme from './theme';

const paperTheme: ReactNativePaper.Theme = {
	...DefaultTheme,
	roundness: 4,
	colors: {
		...DefaultTheme.colors,
		primary: theme.color.primary.main
	}
};

export default paperTheme;
