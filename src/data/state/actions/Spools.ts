import _ from 'lodash';

import Spool, {
	SpoolCalculated,
	SpoolCalculatedFields
} from '../../models/Spool';
import { AppState } from '../../store';

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

	static get(id: string): (state: AppState) => SpoolCalculated | null {
		return state => {
			const item = state.spools.store[id];

			if (!item) {
				return null;
			}

			return {
				...item,
				...Spools.getMetaFields(state, item)
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
						return acc + state.prints.store[cur].weight;
					},
					0
				)
		};
	}
}

export default Spools;
