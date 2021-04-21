import React, { useCallback } from 'react';

import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';

import SpoolForm, { SpoolFormFields } from '../../components/forms/SpoolForm';
import SpoolTemplate from '../../data/models/SpoolTemplate';
import Settings from '../../data/state/actions/Settings';
import Spools from '../../data/state/actions/Spools';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

interface Params extends ParamListBase {
	AddSpool?: {
		fromTemplate?: SpoolTemplate;
	};
}
interface Props {
	route: RouteProp<Params, 'AddSpool'>;
	navigation: StackNavigationProp<Params, 'AddSpool'>;
}
const AddSpool: React.FC<Props> = ({ route, navigation }) => {
	const spoolTemplate = route.params?.fromTemplate;

	const dispatch = useAppDispatch();
	const settings = useAppSelector(Settings.get());

	const { control, handleSubmit } = useForm<SpoolFormFields>({
		defaultValues: {
			name: spoolTemplate ? spoolTemplate.name : '',
			manufacturer: spoolTemplate ? spoolTemplate.manufacturer : '',
			materialId: spoolTemplate ? spoolTemplate.materialId : null,
			color: spoolTemplate ? spoolTemplate.color : null,
			diameter: spoolTemplate ? spoolTemplate.diameter : 1.75,
			totalWeight: spoolTemplate ? spoolTemplate.totalWeight : null,
			weight: spoolTemplate ? spoolTemplate.weight : null,
			price: spoolTemplate ? spoolTemplate.price.value : null
		}
	});

	const onSubmit = useCallback(
		(data: SpoolFormFields) => {
			dispatch(
				Spools.create({
					name: data.name,
					manufacturer: data.manufacturer,
					materialId: data.materialId || '',
					color: data.color || '',
					diameter: data.diameter || 0,
					totalWeight: data.totalWeight || 0,
					weight: data.weight || 0,
					price: {
						value: data.price || 0,
						currency: spoolTemplate
							? spoolTemplate.price.currency
							: settings.currency
					}
				})
			);

			navigation.canGoBack() && navigation.popToTop();
		},
		[dispatch, navigation, settings, spoolTemplate]
	);

	return (
		<SpoolForm
			control={control}
			submitText="Add Spool"
			onSubmit={handleSubmit(onSubmit)}
		/>
	);
};

export default AddSpool;
