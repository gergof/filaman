import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { Control, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import { material } from 'react-native-typography';

import Materials from '../../data/state/actions/Materials';
import Settings from '../../data/state/actions/Settings';
import { useAppSelector } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';
import numberFieldTransform from '../../utils/numberFieldTransform';
import Picker from '../Picker';

export interface SpoolFormFields {
	name: string;
	manufacturer: string;
	materialId: string | null;
	color: string | null;
	diameter: number | null;
	totalWeight: number | null;
	weight: number | null;
	price: number | null;
}

const colors: [string, string][] = [
	['White', '#ffffff'],
	['Wooden', '#a3825f'],
	['Sky Blue', '#276fd3'],
	['Blue', '#0c3285'],
	['Dark Blue', '#171256'],
	['Tran-violet', '#8e1b6e'],
	['Purple', '#391763'],
	['Pink', '#e3565f'],
	['Fluo Rose', '#f91c75'],
	['Fluo Red', '#d91a12'],
	['Tran-red', '#c21919'],
	['Red', '#96090e'],
	['Fluo Yellow', '#a7df1d'],
	['Fluo Green', '#05c237'],
	['Green', '#268f26'],
	['Fluo Orange', '#fd7210'],
	['Orange', '#f34a13'],
	['Grey', '#848586'],
	['Silver', '#7b7d80'],
	['Lazurite', '#6b5a30'],
	['Gold', '#5a3c21'],
	['Yellow', '#dc9b04'],
	['Black', '#000000'],
	['Brown', '#7a211f']
];

interface Props {
	control: Control<SpoolFormFields>;
	submitText: string;
	onSubmit: () => void;
}
const SpoolForm: React.FC<Props> = ({ control, submitText, onSubmit }) => {
	const styles = useStyles(getStyles);
	const materials = useAppSelector(Materials.getAll());
	const settings = useAppSelector(Settings.get());

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
				name="manufacturer"
				render={({ value, onChange, onBlur }, { invalid }) => (
					<TextInput
						style={styles.field}
						mode="outlined"
						label="Manufacturer"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={invalid}
					/>
				)}
			/>
			<Controller
				control={control}
				name="materialId"
				rules={{ required: true }}
				render={({ value, onChange, onBlur }, { invalid }) => (
					<Picker
						style={styles.field}
						label="Material"
						placeholder="Select Material"
						data={materials.map(material => ({
							id: material.id,
							text: material.name
						}))}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						error={invalid}
					/>
				)}
			/>
			<Controller
				control={control}
				name="color"
				rules={{ required: true }}
				render={({ value, onChange, onBlur }, { invalid }) => (
					<Picker
						style={styles.field}
						label="Color"
						placeholder="Select Color"
						data={colors.map(color => ({
							id: color[1],
							text: color[0]
						}))}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						error={invalid}
						renderItem={item => (
							<View style={styles.colorItem}>
								<View
									style={[
										styles.colorBullet,
										{ backgroundColor: item.id }
									]}
								/>
								<Text style={styles.colorText}>
									{item.text}
								</Text>
							</View>
						)}
					/>
				)}
			/>
			<Controller
				control={control}
				name="diameter"
				rules={{ required: true, min: 0.1 }}
				render={({ value, onChange, onBlur }, { invalid }) => (
					<TextInput
						style={styles.field}
						mode="outlined"
						label="Diameter"
						keyboardType="decimal-pad"
						value={numberFieldTransform.parse(value)}
						onChangeText={value =>
							onChange(numberFieldTransform.store(value))
						}
						onBlur={onBlur}
						error={invalid}
					/>
				)}
			/>
			<Controller
				control={control}
				name="totalWeight"
				rules={{ required: true, min: 1 }}
				render={({ value, onChange, onBlur }, { invalid }) => (
					<TextInput
						style={styles.field}
						mode="outlined"
						label="Weight (g)"
						keyboardType="decimal-pad"
						value={numberFieldTransform.parse(value)}
						onChangeText={value => {
							onChange(numberFieldTransform.store(value));
							control.setValue(
								'weight',
								numberFieldTransform.store(value)
							);
						}}
						onBlur={onBlur}
						error={invalid}
					/>
				)}
			/>
			<Controller
				control={control}
				name="weight"
				rules={{ required: true, min: 1 }}
				render={({ value, onChange, onBlur }, { invalid }) => (
					<TextInput
						style={styles.field}
						mode="outlined"
						label="Remaining Weight (g)"
						keyboardType="decimal-pad"
						value={numberFieldTransform.parse(value)}
						onChangeText={value =>
							onChange(numberFieldTransform.store(value))
						}
						onBlur={onBlur}
						error={invalid}
					/>
				)}
			/>
			<Controller
				control={control}
				name="price"
				rules={{ required: true, min: 0 }}
				render={({ value, onChange, onBlur }, { invalid }) => (
					<TextInput
						style={styles.field}
						mode="outlined"
						label={`Price (${settings.currency})`}
						keyboardType="decimal-pad"
						value={numberFieldTransform.parse(value)}
						onChangeText={value =>
							onChange(numberFieldTransform.store(value))
						}
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
		},
		colorItem: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		colorBullet: {
			width: 16,
			height: 16,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: theme.color.primary.background,
			marginRight: 8
		},
		colorText: {
			...material.body1Object,
			color: theme.color.primary.text,
			fontSize: 16
		}
	});

export default SpoolForm;
