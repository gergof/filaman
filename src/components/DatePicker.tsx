import React, { useState, useCallback } from 'react';
import {
	StyleProp,
	ViewStyle,
	StyleSheet,
	View,
	Text,
	Pressable
} from 'react-native';

import moment, { Moment } from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import useStyles from '../hooks/useStyles';
import mergeStyles from '../theme/mergeStyles';
import { AppTheme } from '../types';

interface Props {
	label: string;
	value: Moment;
	onChange: (value: Moment) => void;
	onBlur: () => void;
	mode?: 'date' | 'time';
	format?: string;
	error?: boolean;
	style?: StyleProp<ViewStyle>;
	backgroundColor?: string;
}
const DatePicker: React.FC<Props> = ({
	label,
	value,
	onChange,
	onBlur,
	mode = 'date',
	format = 'YYYY-MM-DD',
	error,
	style,
	backgroundColor
}) => {
	const styles = useStyles(getStyles, { backgroundColor });
	const [isOpen, setIsOpen] = useState(false);

	const close = useCallback(() => {
		setIsOpen(false);
		onBlur();
	}, [onBlur, setIsOpen]);

	const open = useCallback(() => {
		setIsOpen(true);
	}, [setIsOpen]);

	const onSelect = useCallback(
		(date: Date) => {
			onChange(moment(date));
			close();
		},
		[onChange, close]
	);

	return (
		<React.Fragment>
			<View style={[styles.container, style]}>
				<View
					style={mergeStyles(styles, [
						'border',
						['border_error', !!error]
					])}
				/>
				<Pressable style={styles.content} onPress={open}>
					<Text
						style={mergeStyles(styles, [
							'value',
							['error', !!error]
						])}
					>
						{value.format(format)}
					</Text>
					<Icon
						name="arrow-drop-down"
						size={styles.dropdown.width}
						color={styles.dropdown.color}
					/>
				</Pressable>
				<Text
					style={mergeStyles(styles, [
						'label',
						['label_error', !!error]
					])}
				>
					{label}
				</Text>
			</View>
			<DateTimePickerModal
				isVisible={isOpen}
				mode={mode}
				is24Hour={true}
				date={value.toDate()}
				onConfirm={onSelect}
				onCancel={close}
			/>
		</React.Fragment>
	);
};

const getStyles = (theme: AppTheme, params?: { backgroundColor?: string }) =>
	StyleSheet.create({
		container: {
			height: 65
		},
		content: {
			position: 'absolute',
			left: 1,
			top: 9,
			right: 1,
			height: 56,
			borderRadius: 4,
			alignItems: 'center',
			flexDirection: 'row',
			paddingLeft: 14,
			paddingRight: 6
		},
		border: {
			position: 'absolute',
			borderWidth: 1,
			borderRadius: 4,
			borderColor: theme.color.primary.disabled,
			height: 58,
			top: 8,
			left: 0,
			right: 0,
			bottom: 0
		},
		border_error: {
			borderWidth: 2,
			borderColor: theme.color.primary.error
		},
		label: {
			position: 'absolute',
			top: 0,
			left: 10,
			backgroundColor: params?.backgroundColor
				? params.backgroundColor
				: theme.color.primary.background,
			paddingLeft: 4,
			paddingRight: 4,
			fontSize: 12,
			color: theme.color.primary.disabled
		},
		label_error: {
			color: theme.color.primary.error
		},
		value: {
			fontSize: 16,
			color: theme.color.secondary.dark,
			flex: 1
		},
		error: {
			color: theme.color.primary.error
		},
		dropdown: {
			width: 24,
			color: theme.color.primary.disabled
		}
	});

export default DatePicker;
