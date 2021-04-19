import { Action, nanoid } from '@reduxjs/toolkit';
import _ from 'lodash';

import codeGenerator from '../../../utils/codeGenerator';
import Spool, {
	SpoolCalculated,
	SpoolCalculatedFields,
	SpoolPrintsFields,
	SpoolCalculatedWithPrints
} from '../../models/Spool';
import { AppState } from '../../store';
import { spoolActions } from '../reducers/Spool';

class Spools {
	static getAll(): (state: AppState) => SpoolCalculated[] {
		return state => {
			return _(state.spools.list)
				.map(id => state.spools.store[id])
				.filter(item => !!item)
				.map(item => ({
					...item,
					...Spools.getMetaFields(state, item)
				}))
				.sortBy('name')
				.value();
		};
	}

	static get(
		id: string
	): (state: AppState) => SpoolCalculatedWithPrints | null {
		return state => {
			const item = state.spools.store[id];

			if (!item) {
				return null;
			}

			return {
				...item,
				...Spools.getMetaFields(state, item),
				...Spools.getPrints(state, item.id)
			};
		};
	}

	private static getMetaFields(
		state: AppState,
		item: Spool
	): SpoolCalculatedFields {
		return {
			material: state.materials.store[item.materialId],
			remaining:
				item.weight -
				(state.spools.printsRelation[item.id] || []).reduce(
					(acc: number, cur: string) => {
						const print = state.prints.store[cur];

						if (print.progress === null) {
							// print not finished
							return acc;
						}

						const used = print.progress * print.weight;

						return acc + used;
					},
					0
				)
		};
	}

	private static getPrints(state: AppState, id: string): SpoolPrintsFields {
		return {
			prints: (state.spools.printsRelation[id] || []).map(
				printId => state.prints.store[printId]
			)
		};
	}

	static create(spool: Omit<Spool, 'id' | 'code'>): Action {
		return spoolActions.create({
			id: nanoid(),
			code: codeGenerator.generate(8),
			...spool
		});
	}

	static update(id: string, patch: Omit<Spool, 'id'>): Action {
		return spoolActions.update({
			id,
			patch: {
				id,
				...patch
			}
		});
	}

	static delete(id: string): Action {
		return spoolActions.delete(id);
	}
}

export default Spools;
