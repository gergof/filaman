import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { Control, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';

import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';
import ImagePicker from '../ImagePicker';

export interface PrinterFormFields {
	name: string;
	model: string;
	notes: string;
	imageId: string | null;
}

interface Props {
	control: Control<PrinterFormFields>;
	submitText: string;
	onSubmit: () => void;
}
const PrinterForm: React.FC<Props> = ({ control, submitText, onSubmit }) => {
	const styles = useStyles(getStyles);

	return (
		<ScrollView style={styles.container}>
			<Controller
				control={control}
				name="name"
				rules={{ required: true }}
				render={({ value, onChange, onBlur }, { invalid }) => (
					<TextInput
						style={styles.field}
						mode="outlined"
						label="Name"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={invalid}
					/>
				)}
			/>
			<Controller
				control={control}
				name="model"
				render={({ value, onChange, onBlur }, { invalid }) => (
					<TextInput
						style={styles.field}
						mode="outlined"
						label="Model"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={invalid}
					/>
				)}
			/>
			<Controller
				control={control}
				name="notes"
				render={({ value, onChange, onBlur }, { invalid }) => (
					<TextInput
						style={styles.field}
						mode="outlined"
						label="Notes"
						multiline
						numberOfLines={7}
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={invalid}
					/>
				)}
			/>
			<Controller
				control={control}
				name="imageId"
				render={({ value, onChange, onBlur }, { invalid }) => (
					<ImagePicker
						style={styles.field}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						error={invalid}
					/>
				)}
			/>
			<Button
				style={styles.submitButton}
				labelStyle={styles.submitText}
				mode="contained"
				onPress={onSubmit}
			>
				{submitText}
			</Button>
		</ScrollView>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 16
		},
		field: {
			marginBottom: 16
		},
		submitButton: {
			marginBottom: 32
		},
		submitText: {
			color: theme.color.secondary.light
		}
	});

export default PrinterForm;
