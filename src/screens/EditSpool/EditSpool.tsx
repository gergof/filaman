import React, { useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';

import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { FAB } from 'react-native-paper';

import SpoolForm, { SpoolFormFields } from '../../components/forms/SpoolForm';
import Spools from '../../data/state/actions/Spools';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

interface Params extends ParamListBase {
	EditSpool: {
		id: string;
	};
}
interface Props {
	route: RouteProp<Params, 'EditSpool'>;
	navigation: StackNavigationProp<Params, 'EditSpool'>;
}
const EditSpool: React.FC<Props> = ({ route, navigation }) => {
	const styles = useStyles(getStyles);
	const id = route.params.id;
	const spool = useAppSelector(Spools.get(id));
	const dispatch = useAppDispatch();
	const { control, handleSubmit } = useForm<SpoolFormFields>({
		defaultValues: {
			name: spool?.name || '',
			manufacturer: spool?.manufacturer || '',
			materialId: spool?.materialId || null,
			color: spool?.color || null,
			diameter: spool?.diameter || null,
			totalWeight: spool?.totalWeight || null,
			weight: spool?.weight || null,
			price: spool?.price.value || null
		}
	});

	const onSubmit = useCallback(
		(data: SpoolFormFields) => {
			if (spool) {
				dispatch(
					Spools.update(spool.id, {
						...spool,
						name: data.name,
						manufacturer: data.manufacturer,
						materialId: data.materialId || '',
						color: data.color || '',
						diameter: data.diameter || 0,
						totalWeight: data.totalWeight || 0,
						weight: data.weight || 0,
						price: {
							value: data.price || 0,
							currency: spool.price.currency
						}
					})
				);

				navigation.canGoBack() && navigation.goBack();
			}
		},
		[dispatch, navigation, spool]
	);

	const onDelete = useCallback(() => {
		Alert.alert('Are you sure?', 'This action can not be undone', [
			{
				text: 'Cancel'
			},
			{
				text: 'Delete',
				onPress: () => {
					if (spool) {
						dispatch(Spools.delete(spool.id));
						navigation.canGoBack() && navigation.popToTop();
					}
				}
			}
		]);
	}, [dispatch, navigation, spool]);

	if (!spool) {
		navigation.goBack();
		return null;
	}

	return (
		<React.Fragment>
			<SpoolForm
				control={control}
				submitText="Save"
				currency={spool.price.currency}
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

export default EditSpool;
