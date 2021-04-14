import Image from './Image';
import Printer from './Printer';
import Spool from './Spool';

interface Print {
	id: string;
	date: string;
	name: string;
	spoolId: string;
	printerId: string;
	weight: number;
	progress: number | null;
	duration: number | null;
	imageId: string | null;
	notes: string | null;
}

export interface PrintCalculatedFields {
	spool: Spool;
	printer: Printer;
	image: Image | null;
}

export interface PrintCalculated extends Print, PrintCalculatedFields {}

export default Print;
