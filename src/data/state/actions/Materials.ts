import Material from '../../models/Material';
import { AppState } from '../../store';

class Materials {
	static getAll(): (state: AppState) => Material[] {
		return state => {
			return state.materials.list
				.map(id => {
					return state.materials.store[id];
				})
				.filter(item => !!item);
		};
	}

	static get(id: string): (state: AppState) => Material | null {
		return state => {
			return state.materials.store[id] || null;
		};
	}
}

export default Materials;
