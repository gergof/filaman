import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { Moment } from 'moment';
import { Control, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import { material } from 'react-native-typography';

import Printers from '../../data/state/actions/Printers';
import Spools from '../../data/state/actions/Spools';
import { useAppSelector } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';
import numberFieldTransform from '../../utils/numberFieldTransform';
import DatePicker from '../DatePicker';
import Picker from '../Picker';
import SvgSpool from '../icons/Spool';

export interface PrintFormFields {
	name: string;
	spoolId: string | null;
	printerId: string | null;
	weight: number | null;
	date: Moment;
	notes: string;
	// fields only for completed prints:
	progress: number | null;
	duration: number | null;
	imageId: string | null;
}

interface Props {
	control: Control<PrintFormFields>;
	submitText: string;
	isComplete?: boolean;
	onSubmit: () => void;
}
const PrintForm: React.FC<Props> = ({
	control,
	submitText,
	isComplete,
	onSubmit
}) => {
	const styles = useStyles(getStyles);
	const spools = useAppSelector(Spools.getAll());
	const printers = useAppSelector(Printers.getAll());

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
				name="spoolId"
				rules={{ required: true }}
				render={({ value, onChange, onBlur }, { invalid }) => (
					<Picker<{ id: string; text: string; color: string }>
						style={styles.field}
						label="Spool"
						placeholder="Select Spool"
						data={spools.map(spool => ({
							id: spool.id,
							text: spool.name,
							color: spool.color
						}))}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						error={invalid}
						renderItem={item => (
							<View style={styles.spoolItem}>
								<View style={styles.spoolBadge}>
									<SvgSpool
										viewBox="0 0 130 130"
										width={styles.spoolIcon.width}
										height={styles.spoolIcon.height}
										fill={item.color}
									/>
								</View>
								<Text style={styles.spoolText}>
									{item.text}
								</Text>
							</View>
						)}
						renderBadge={item => (
							<View style={styles.spoolBadge}>
								<SvgSpool
									viewBox="0 0 130 130"
									width={styles.spoolIcon.width}
									height={styles.spoolIcon.height}
									fill={item.color}
								/>
							</View>
						)}
					/>
				)}
			/>
			<Controller
				control={control}
				name="printerId"
				rules={{ required: true }}
				render={({ value, onChange, onBlur }, { invalid }) => (
					<Picker
						style={styles.field}
						label="Printer"
						placeholder="Select Printer"
						data={printers.map(printer => ({
							id: printer.id,
							text: printer.name
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
				name="weight"
				rules={{ required: true, min: 0.1 }}
				render={({ value, onChange, onBlur }, { invalid }) => (
					<TextInput
						style={styles.field}
						mode="outlined"
						label="Weight (g)"
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
				name="date"
				rules={{ required: true }}
				render={({ value, onChange, onBlur }, { invalid }) => (
					<DatePicker
						style={styles.field}
						label="Date"
						value={value}
						onChange={onChange}
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
		spoolItem: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		spoolBadge: {
			flexDirection: 'row',
			alignItems: 'center',
			marginRight: 8
		},
		spoolText: {
			...material.body1Object,
			color: theme.color.primary.text,
			fontSize: 16
		},
		spoolIcon: {
			width: 22,
			height: 22
		}
	});

export default PrintForm;
