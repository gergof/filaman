import Material from './Material';

interface Spool {
	id: string;
	name: string;
	code: string;
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

export interface SpoolCalculatedFields {
	material: Material;
	remaining: number;
}

export interface SpoolCalculated extends Spool, SpoolCalculatedFields {}

export default Spool;
