import Material from './Material';
import Print from './Print';

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

export interface SpoolPrintsFields {
	prints: Print[];
}

export interface SpoolCalculated extends Spool, SpoolCalculatedFields {}
export interface SpoolCalculatedWithPrints
	extends SpoolCalculated,
		SpoolPrintsFields {}

export default Spool;
