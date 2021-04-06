const numberFieldTransform = {
	store: (value: string): number | null => {
		const number = parseFloat(value.replace(/[^0-9.]/, ''));

		return isNaN(number) ? null : number;
	},
	parse: (value: number | null): string => {
		if (value === null || isNaN(value)) {
			return '';
		}

		return value.toString();
	}
};

export default numberFieldTransform;
