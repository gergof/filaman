import React, { useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';

import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { FAB } from 'react-native-paper';

import PrintForm, { PrintFormFields } from '../../components/forms/PrintForm';
import Prints from '../../data/state/actions/Prints';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

interface Params extends ParamListBase {
	EditPrint: {
		id: string;
	};
}
interface Props {
	route: RouteProp<Params, 'EditPrint'>;
	navigation: StackNavigationProp<Params, 'EditPrint'>;
}
const EditPrint: React.FC<Props> = ({ route, navigation }) => {
	const styles = useStyles(getStyles);
	const id = route.params.id;

	const print = useAppSelector(Prints.get(id));
	const dispatch = useAppDispatch();

	const { control, handleSubmit } = useForm<PrintFormFields>({
		defaultValues: {
			name: print?.name || '',
			spoolId: print?.spoolId || null,
			printerId: print?.printerId || null,
			weight: print?.weight || null,
			date: print?.date ? moment(print?.date) : moment(),
			notes: print?.notes || '',
			progress: print?.progress || null,
			duration: print?.duration || null,
			imageId: print?.imageId || null
		}
	});

	const onSubmit = useCallback(
		(data: PrintFormFields) => {
			if (print) {
				dispatch(
					Prints.update(print.id, {
						name: data.name,
						spoolId: data.spoolId || '',
						printerId: data.printerId || '',
						weight: data.weight || 0,
						date: data.date.format('YYYY-MM-DD'),
						notes: data.notes,
						progress: data.progress || 1,
						duration: data.duration || 1,
						imageId: data.imageId
					})
				);
				navigation.canGoBack() && navigation.goBack();
			}
		},
		[dispatch, navigation, print]
	);

	const onDelete = useCallback(() => {
		Alert.alert('Are you sure?', 'This action can not be undone', [
			{
				text: 'Cancel'
			},
			{
				text: 'Delete',
				onPress: () => {
					if (print) {
						dispatch(Prints.delete(print.id));
						navigation.canGoBack() && navigation.popToTop();
					}
				}
			}
		]);
	}, [dispatch, navigation, print]);

	if (!print) {
		navigation.goBack();
		return null;
	}

	return (
		<React.Fragment>
			<PrintForm
				control={control}
				submitText="Save"
				onSubmit={handleSubmit(onSubmit)}
				isComplete={print.progress !== null}
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

export default EditPrint;
