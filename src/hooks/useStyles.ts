import { useContext, useMemo } from 'react';

import ThemeContext from '../theme/ThemeContext';
import type { AppTheme } from '../types';

const useStyles = <T extends (theme: AppTheme, params?: P) => any, P = never>(
	getStyles: T,
	params?: P
): ReturnType<T> => {
	const themeContext = useContext(ThemeContext);
	const styles = useMemo(() => getStyles(themeContext, params), [
		themeContext,
		getStyles,
		params
	]);

	return styles;
};

export default useStyles;
