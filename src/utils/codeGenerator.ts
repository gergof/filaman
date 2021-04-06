const codeGenerator = {
	generate: (length: number): string => {
		const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const res: string[] = [];

		for (let i = 0; i < length; i++) {
			res.push(
				charset.charAt(Math.floor(Math.random() * charset.length))
			);
		}

		return res.join('');
	}
};

export default codeGenerator;
