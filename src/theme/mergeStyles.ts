const mergeStyles = <T, K extends keyof T>(
	styles: T,
	merge: (K | [K, boolean])[]
): T[K][] => {
	return merge.reduce((acc: T[K][], cur: K | [K, boolean]) => {
		if (cur instanceof Array) {
			if (cur[1]) {
				return [...acc, styles[cur[0]]];
			}
		}

		if (cur) {
			return [...acc, styles[cur as K]];
		}

		return acc;
	}, []);
};

export default mergeStyles;
