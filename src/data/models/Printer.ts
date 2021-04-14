import Image from './Image';
import Print from './Print';

interface Printer {
	id: string;
	name: string;
	code: string;
	model: string;
	imageId: string | null;
	notes: string | null;
}

export interface PrinterCalculatedFields {
	successRate: number;
	image: Image | null;
}

export interface PrinterPrintsField {
	prints: Print[];
}

export interface PrinterCalculated extends Printer, PrinterCalculatedFields {}
export interface PrinterCalculatedWithPrints
	extends PrinterCalculated,
		PrinterPrintsField {}

export default Printer;
