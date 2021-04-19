import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useForm } from 'react-hook-form';

import PrintForm, { PrintFormFields } from '../../components/forms/PrintForm';
import Prints from '../../data/state/actions/Prints';
import { useAppDispatch } from '../../hooks/reduxHooks';

interface Props {}
const AddPrint: React.FC<Props> = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation();

	const { control, handleSubmit } = useForm<PrintFormFields>({
		defaultValues: {
			name: '',
			spoolId: null,
			printerId: null,
			weight: null,
			date: moment(),
			notes: '',
			progress: null,
			duration: null,
			imageId: null
		}
	});

	const onSubmit = useCallback(
		(data: PrintFormFields) => {
			dispatch(
				Prints.create({
					name: data.name,
					spoolId: data.spoolId || '',
					printerId: data.printerId || '',
					weight: data.weight || 0,
					date: data.date.format('YYYY-MM-DD'),
					notes: data.notes,
					progress: null,
					duration: null,
					imageId: null
				})
			);
			navigation.canGoBack() && navigation.goBack();
		},
		[dispatch, navigation]
	);

	return (
		<PrintForm
			control={control}
			submitText="Add Print"
			onSubmit={handleSubmit(onSubmit)}
		/>
	);
};

export default AddPrint;
