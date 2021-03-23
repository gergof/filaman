import React from 'react';

import ThemeContext from './ThemeContext';
import theme from './theme';

interface Props {
	children: React.ReactNode;
}
const ThemeProvider: React.FC<Props> = ({ children }) => {
	return (
		<ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
	);
};

export default ThemeProvider;
