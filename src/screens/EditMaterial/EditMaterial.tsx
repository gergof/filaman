import React, { useCallback } from 'react';
import { Alert, StyleSheet } from 'react-native';

import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { FAB } from 'react-native-paper';

import MaterialForm, {
	MaterialFormFields
} from '../../components/forms/MaterialForm';
import Materials from '../../data/state/actions/Materials';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

interface Params extends ParamListBase {
	EditMaterial: {
		id: string;
	};
}
interface Props {
	route: RouteProp<Params, 'EditMaterial'>;
	navigation: StackNavigationProp<Params, 'EditMaterial'>;
}
const EditMaterial: React.FC<Props> = ({ route, navigation }) => {
	const styles = useStyles(getStyles);
	const id = route.params.id;
	const material = useAppSelector(Materials.get(id));
	const dispatch = useAppDispatch();
	const { control, handleSubmit } = useForm<MaterialFormFields>({
		defaultValues: {
			name: material?.name || '',
			code: material?.code || '',
			density: material?.density || 1000,
			notes: material?.notes || ''
		}
	});

	const onSubmit = useCallback(
		(data: MaterialFormFields) => {
			if (material && material.id) {
				dispatch(Materials.update(material.id, data));
				navigation.canGoBack() && navigation.goBack();
			}
		},
		[dispatch, navigation, material]
	);

	const onDelete = useCallback(() => {
		Alert.alert('Are you sure?', 'This action can not be undone', [
			{
				text: 'Cancel'
			},
			{
				text: 'Delete',
				onPress: () => {
					if (material && material.id) {
						dispatch(Materials.delete(material.id));
						navigation.canGoBack() && navigation.popToTop();
					}
				}
			}
		]);
	}, [dispatch, navigation, material]);

	if (!material) {
		navigation.goBack();
		return null;
	}

	return (
		<React.Fragment>
			<MaterialForm
				control={control}
				submitText="Save"
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

export default EditMaterial;
