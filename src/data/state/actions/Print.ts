import { ThunkAction, Action, nanoid } from '@reduxjs/toolkit';
import _ from 'lodash';

import Print, {
	PrintCalculated,
	PrintCalculatedFields
} from '../../models/Print';
import { AppState } from '../../store';
import { printActions } from '../reducers/Print';
import { printerActions } from '../reducers/Printer';
import { spoolActions } from '../reducers/Spool';

class Prints {
	static getAll(): (state: AppState) => PrintCalculated[] {
		return state => {
			return _(state.prints.list)
				.map(id => state.prints.store[id])
				.filter(item => !!item)
				.map(item => ({
					...item,
					...Prints.getExtraFields(state, item)
				}))
				.sortBy('date')
				.reverse()
				.value();
		};
	}

	static get(id: string): (state: AppState) => PrintCalculated | null {
		return state => {
			const item = state.prints.store[id];

			if (!item) {
				return null;
			}

			return {
				...item,
				...Prints.getExtraFields(state, item)
			};
		};
	}

	private static getExtraFields(
		state: AppState,
		item: Print
	): PrintCalculatedFields {
		return {
			spool: state.spools.store[item.spoolId],
			printer: state.printers.store[item.printerId],
			image: item.imageId ? state.images.store[item.imageId] : null
		};
	}

	static create(
		print: Omit<Print, 'id'>
	): ThunkAction<void, AppState, unknown, Action> {
		return dispatch => {
			const createPrint = {
				id: nanoid(),
				...print
			};

			dispatch(printActions.create(createPrint));
			dispatch(
				spoolActions.addPrint({
					id: createPrint.spoolId,
					printId: createPrint.id
				})
			);
			dispatch(
				printerActions.addPrint({
					id: createPrint.printerId,
					printId: createPrint.id
				})
			);
		};
	}
}

export default Prints;
