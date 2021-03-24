import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import { Controller, Control } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';

import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

export interface MaterialFormFields {
	name: string;
	code: string;
	density: number;
	notes: string | null;
}

interface Props {
	control: Control<MaterialFormFields>;
	submitText: string;
	onSubmit: () => void;
}
const MaterialForm: React.FC<Props> = ({ control, submitText, onSubmit }) => {
	const styles = useStyles(getStyle);

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
						onChangeText={text => {
							onChange(text);
							control.setValue(
								'code',
								text.toUpperCase().replace(/ /g, '').slice(0, 6)
							);
						}}
						onBlur={onBlur}
						error={invalid}
					/>
				)}
			/>
			<Controller
				control={control}
				name="code"
				rules={{ required: true, maxLength: 6 }}
				render={({ value, onChange, onBlur }, { invalid }) => (
					<TextInput
						style={styles.field}
						mode="outlined"
						label="Code"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={invalid}
					/>
				)}
			/>
			<Controller
				control={control}
				name="density"
				rules={{ required: true, min: 0 }}
				render={({ value, onChange, onBlur }, { invalid }) => (
					<TextInput
						style={styles.field}
						mode="outlined"
						label={`Density (kg/m${String.fromCharCode(179)})`}
						keyboardType="decimal-pad"
						value={value.toString()}
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

const getStyle = (theme: AppTheme) =>
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

export default MaterialForm;
