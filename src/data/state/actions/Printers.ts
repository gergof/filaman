import { Action, nanoid } from '@reduxjs/toolkit';
import _ from 'lodash';

import codeGenerator from '../../../utils/codeGenerator';
import Printer, {
	PrinterCalculatedFields,
	PrinterPrintsField,
	PrinterCalculatedWithPrints
} from '../../models/Printer';
import { AppState } from '../../store';
import { printerActions } from '../reducers/Printer';

class Printers {
	static getAll(): (state: AppState) => PrinterCalculatedWithPrints[] {
		return state => {
			return _(state.printers.list)
				.map(id => state.printers.store[id])
				.filter(item => !!item)
				.map(item => ({
					...item,
					...Printers.getExtraFields(state, item)
				}))
				.sortBy('name')
				.value();
		};
	}

	static get(
		id: string
	): (state: AppState) => PrinterCalculatedWithPrints | null {
		return state => {
			const item = state.printers.store[id];

			if (!item) {
				return null;
			}

			return {
				...item,
				...Printers.getExtraFields(state, item)
			};
		};
	}

	private static getExtraFields(
		state: AppState,
		item: Printer
	): PrinterCalculatedFields & PrinterPrintsField {
		const prints = (state.printers.printsRelation[item.id] || []).map(
			printId => state.prints.store[printId]
		);

		const finishedPrints = prints.filter(print => print.progress !== null);

		return {
			prints,
			successRate: finishedPrints.length
				? finishedPrints.filter(print => print.progress == 1).length /
				  finishedPrints.length
				: 1,
			image: item.imageId ? state.images.store[item.imageId] : null
		};
	}

	static create(printer: Omit<Printer, 'id' | 'code'>): Action {
		return printerActions.create({
			id: nanoid(),
			code: codeGenerator.generate(8),
			...printer
		});
	}

	static update(id: string, patch: Omit<Printer, 'id'>): Action {
		return printerActions.update({
			id: id,
			patch: {
				id,
				...patch
			}
		});
	}

	static delete(id: string): Action {
		return printerActions.delete(id);
	}
}

export default Printers;
