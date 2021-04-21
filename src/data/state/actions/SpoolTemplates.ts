import { Action, nanoid } from '@reduxjs/toolkit';
import _ from 'lodash';

import SpoolTemplate from '../../models/SpoolTemplate';
import { AppState } from '../../store';
import { spoolTemplateActions } from '../reducers/SpoolTemplate';

class SpoolTemplates {
	static getAll(): (state: AppState) => SpoolTemplate[] {
		return state => {
			return _(state.spoolTemplates.list)
				.map(id => state.spoolTemplates.store[id])
				.filter(item => !!item)
				.sortBy('name')
				.value();
		};
	}

	static get(id: string): (state: AppState) => SpoolTemplate | null {
		return state => {
			return state.spoolTemplates.store[id] || null;
		};
	}

	static create(SpoolTemplate: Omit<SpoolTemplate, 'id'>): Action {
		return spoolTemplateActions.create({
			id: nanoid(),
			...SpoolTemplate
		});
	}

	static update(id: string, patch: Omit<SpoolTemplate, 'id'>): Action {
		return spoolTemplateActions.update({
			id: id,
			patch: {
				id,
				...patch
			}
		});
	}

	static delete(id: string): Action {
		return spoolTemplateActions.delete(id);
	}
}

export default SpoolTemplates;
