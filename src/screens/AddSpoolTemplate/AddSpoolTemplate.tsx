import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import SpoolForm, { SpoolFormFields } from '../../components/forms/SpoolForm';
import Settings from '../../data/state/actions/Settings';
import SpoolTemplates from '../../data/state/actions/SpoolTemplates';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

interface Props {}
const AddSpoolTemplate: React.FC<Props> = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation();
	const settings = useAppSelector(Settings.get());

	const { control, handleSubmit } = useForm<SpoolFormFields>({
		defaultValues: {
			name: '',
			manufacturer: '',
			materialId: null,
			color: null,
			diameter: 1.75,
			totalWeight: null,
			weight: null,
			price: null
		}
	});

	const onSubmit = useCallback(
		(data: SpoolFormFields) => {
			dispatch(
				SpoolTemplates.create({
					name: data.name,
					manufacturer: data.manufacturer,
					materialId: data.materialId || '',
					color: data.color || '',
					diameter: data.diameter || 0,
					totalWeight: data.totalWeight || 0,
					weight: data.weight || 0,
					price: {
						value: data.price || 0,
						currency: settings.currency
					}
				})
			);

			navigation.canGoBack() && navigation.goBack();
		},
		[navigation, dispatch, settings]
	);

	return (
		<SpoolForm
			control={control}
			submitText="Add Spool Template"
			onSubmit={handleSubmit(onSubmit)}
		/>
	);
};

export default AddSpoolTemplate;
