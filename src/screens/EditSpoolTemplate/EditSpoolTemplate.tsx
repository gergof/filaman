import React, { useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';

import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { FAB } from 'react-native-paper';

import SpoolForm, { SpoolFormFields } from '../../components/forms/SpoolForm';
import SpoolTemplates from '../../data/state/actions/SpoolTemplates';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

interface Params extends ParamListBase {
	EditSpoolTemplate: {
		id: string;
	};
}
interface Props {
	route: RouteProp<Params, 'EditSpoolTemplate'>;
	navigation: StackNavigationProp<Params, 'EditSpoolTemplate'>;
}
const EditSpoolTemplate: React.FC<Props> = ({ route, navigation }) => {
	const styles = useStyles(getStyles);
	const id = route.params.id;

	const spoolTemplate = useAppSelector(SpoolTemplates.get(id));
	const dispatch = useAppDispatch();

	const { control, handleSubmit } = useForm<SpoolFormFields>({
		defaultValues: {
			name: spoolTemplate?.name || '',
			manufacturer: spoolTemplate?.manufacturer || '',
			materialId: spoolTemplate?.materialId || null,
			color: spoolTemplate?.color || null,
			diameter: spoolTemplate?.diameter || null,
			totalWeight: spoolTemplate?.totalWeight || null,
			weight: spoolTemplate?.weight || null,
			price: spoolTemplate?.price.value || null
		}
	});

	const onSubmit = useCallback(
		(data: SpoolFormFields) => {
			if (spoolTemplate) {
				dispatch(
					SpoolTemplates.update(spoolTemplate.id, {
						name: data.name,
						manufacturer: data.manufacturer,
						materialId: data.materialId || '',
						color: data.color || '',
						diameter: data.diameter || 0,
						totalWeight: data.totalWeight || 0,
						weight: data.weight || 0,
						price: {
							value: data.price || 0,
							currency: spoolTemplate.price.currency
						}
					})
				);

				navigation.canGoBack() && navigation.goBack();
			}
		},
		[navigation, dispatch, spoolTemplate]
	);

	const onDelete = useCallback(() => {
		Alert.alert('Are you sure?', 'This action can not be undone', [
			{
				text: 'Cancel'
			},
			{
				text: 'Delete',
				onPress: () => {
					if (spoolTemplate) {
						dispatch(SpoolTemplates.delete(spoolTemplate.id));
						navigation.canGoBack() && navigation.goBack();
					}
				}
			}
		]);
	}, [navigation, dispatch, spoolTemplate]);

	if (!spoolTemplate) {
		navigation.goBack();
		return null;
	}

	return (
		<React.Fragment>
			<SpoolForm
				control={control}
				submitText="Save"
				currency={spoolTemplate.price.currency}
				onSubmit={handleSubmit(onSubmit)}
			/>
			<FAB style={styles.fab} icon="delete" onPress={onDelete} small />
		</React.Fragment>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		fab: {
			position: 'absolute',
			bottom: 0,
			right: 0,
			margin: 16,
			backgroundColor: theme.color.primary.destructive
		}
	});

export default EditSpoolTemplate;
