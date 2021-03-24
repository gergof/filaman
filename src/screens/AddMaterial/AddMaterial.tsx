import React, { useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';

import MaterialForm, {
	MaterialFormFields
} from '../../components/forms/MaterialForm';
import Materials from '../../data/state/actions/Materials';
import { useAppDispatch } from '../../hooks/reduxHooks';

interface Props {}
const AddMaterial: React.FC<Props> = () => {
	const dispatch = useAppDispatch();
	const navigation = useNavigation();
	const { control, handleSubmit } = useForm<MaterialFormFields>({
		defaultValues: {
			name: '',
			code: '',
			density: 1000,
			notes: ''
		}
	});

	const onSubmit = useCallback(
		(data: MaterialFormFields) => {
			dispatch(Materials.create(data));
			navigation.canGoBack() && navigation.goBack();
		},
		[dispatch, navigation]
	);

	return (
		<MaterialForm
			control={control}
			submitText="Add material"
			onSubmit={handleSubmit(onSubmit)}
		/>
	);
};

export default AddMaterial;
