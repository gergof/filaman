import React, { useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';

import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import { FAB } from 'react-native-paper';

import PrinterForm, {
	PrinterFormFields
} from '../../components/forms/PrinterForm';
import Printers from '../../data/state/actions/Printers';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

interface Params extends ParamListBase {
	EditPrinter: {
		id: string;
	};
}
interface Props {
	route: RouteProp<Params, 'EditPrinter'>;
	navigation: StackNavigationProp<Params, 'EditPrinter'>;
}
const EditPrinter: React.FC<Props> = ({ route, navigation }) => {
	const styles = useStyles(getStyles);
	const id = route.params.id;

	const printer = useAppSelector(Printers.get(id));
	const dispatch = useAppDispatch();

	const { control, handleSubmit } = useForm<PrinterFormFields>({
		defaultValues: {
			name: printer?.name || '',
			model: printer?.model || '',
			notes: printer?.notes || '',
			imageId: printer?.imageId || null
		}
	});

	const onSubmit = useCallback(
		(data: PrinterFormFields) => {
			if (printer) {
				dispatch(
					Printers.update(printer.id, {
						...printer,
						name: data.name,
						model: data.model,
						notes: data.notes,
						imageId: data.imageId
					})
				);

				navigation.canGoBack() && navigation.goBack();
			}
		},
		[dispatch, navigation, printer]
	);

	const onDelete = useCallback(() => {
		Alert.alert('Are you sure?', 'This action can not be undone', [
			{
				text: 'Cancel'
			},
			{
				text: 'Delete',
				onPress: () => {
					if (printer) {
						dispatch(Printers.delete(printer.id));
						navigation.canGoBack() && navigation.popToTop();
					}
				}
			}
		]);
	}, [dispatch, navigation, printer]);

	if (!printer) {
		navigation.goBack();
		return null;
	}

	return (
		<React.Fragment>
			<PrinterForm
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
			right: 0,
			bottom: 0,
			margin: 16,
			backgroundColor: theme.color.primary.destructive
		}
	});

export default EditPrinter;
