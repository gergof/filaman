import { Action, nanoid } from '@reduxjs/toolkit';
import _ from 'lodash';

import codeGenerator from '../../../utils/codeGenerator';
import Printer from '../../models/Printer';
import { AppState } from '../../store';
import { printerActions } from '../reducers/Printer';

class Printers {
	static getAll(): (state: AppState) => Printer[] {
		return state => {
			return _(state.printers.list)
				.map(id => state.printers.store[id])
				.filter(item => !!item)
				.sortBy('name')
				.value();
		};
	}

	static get(id: string): (state: AppState) => Printer | null {
		return state => {
			return state.printers.store[id] || null;
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
