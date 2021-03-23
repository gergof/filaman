import React from 'react';

import theme from './theme';

const ThemeContext = React.createContext<typeof theme>(theme);

export default ThemeContext;
