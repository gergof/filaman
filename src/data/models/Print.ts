interface Print {
	id: string | null;
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

export default Print;
