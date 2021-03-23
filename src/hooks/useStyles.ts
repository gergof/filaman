import { useContext, useMemo } from 'react';

import ThemeContext from '../theme/ThemeContext';
import type { AppTheme } from '../types';

const useStyles = <T extends (theme: AppTheme) => any>(
	getStyles: T
): ReturnType<T> => {
	const themeContext = useContext(ThemeContext);
	const styles = useMemo(() => getStyles(themeContext), [
		themeContext,
		getStyles
	]);

	return styles;
};

export default useStyles;
