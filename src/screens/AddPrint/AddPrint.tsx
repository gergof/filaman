import React, { useCallback } from 'react';

import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import { useForm } from 'react-hook-form';

import PrintForm, { PrintFormFields } from '../../components/forms/PrintForm';
import Print from '../../data/models/Print';
import Prints from '../../data/state/actions/Prints';
import { useAppDispatch } from '../../hooks/reduxHooks';

interface Params extends ParamListBase {
	AddPrint?: {
		reprint?: Print;
	};
}
interface Props {
	route: RouteProp<Params, 'AddPrint'>;
	navigation: StackNavigationProp<Params, 'AddPrint'>;
}
const AddPrint: React.FC<Props> = ({ route, navigation }) => {
	const reprint = route.params?.reprint;
	const dispatch = useAppDispatch();

	const { control, handleSubmit } = useForm<PrintFormFields>({
		defaultValues: {
			name: reprint ? reprint.name : '',
			spoolId: reprint ? reprint.spoolId : null,
			printerId: reprint ? reprint.printerId : null,
			weight: reprint ? reprint.weight : null,
			date: moment(),
			notes: reprint ? reprint.notes || '' : '',
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
					duration: reprint ? reprint.duration : null,
					imageId: null
				})
			);
			navigation.canGoBack() && navigation.goBack();
		},
		[dispatch, navigation, reprint]
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
