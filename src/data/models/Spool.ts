interface Spool {
	id: string | null;
	name: string;
	code: string | null;
	manufacturer: string | null;
	color: string;
	diameter: number;
	totalWeight: number;
	weight: number;
	price: {
		value: number;
		currency: string;
	};
	materialId: string;
}

export default Spool;
