import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import PrinterForm, {
	PrinterFormFields
} from '../../components/forms/PrinterForm';
import Printers from '../../data/state/actions/Printers';
import { useAppDispatch } from '../../hooks/reduxHooks';

interface Props {}
const AddPrinter: React.FC<Props> = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation();
	const { control, handleSubmit } = useForm<PrinterFormFields>({
		defaultValues: {
			name: '',
			model: '',
			notes: '',
			imageId: null
		}
	});

	const onSubmit = useCallback(
		(data: PrinterFormFields) => {
			dispatch(Printers.create(data));
			navigation.canGoBack() && navigation.goBack();
		},
		[dispatch, navigation]
	);

	return (
		<PrinterForm
			control={control}
			submitText="Add Printer"
			onSubmit={handleSubmit(onSubmit)}
		/>
	);
};

export default AddPrinter;
