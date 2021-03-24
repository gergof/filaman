import { Action, nanoid } from '@reduxjs/toolkit';
import _ from 'lodash';

import Material from '../../models/Material';
import { AppState } from '../../store';
import { materialActions } from '../reducers/Material';

class Materials {
	static getAll(): (state: AppState) => Material[] {
		return state => {
			return _(state.materials.list)
				.map(id => state.materials.store[id])
				.filter(item => !!item)
				.sortBy('name')
				.value();
		};
	}

	static get(id: string): (state: AppState) => Material | null {
		return state => {
			return state.materials.store[id] || null;
		};
	}

	static create(material: Omit<Material, 'id'>): Action {
		return materialActions.create({
			id: nanoid(),
			...material
		});
	}

	static update(id: string, patch: Omit<Material, 'id'>): Action {
		return materialActions.update({
			id: id,
			patch: {
				id,
				...patch
			}
		});
	}

	static delete(id: string): Action {
		return materialActions.delete(id);
	}
}

export default Materials;
