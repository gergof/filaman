interface SpoolTemplate {
	id: string;
	name: string;
	manufacturer: string;
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

export default SpoolTemplate;
