import React, { useMemo, useState, useCallback } from 'react';
import {
	StyleProp,
	ViewStyle,
	StyleSheet,
	View,
	Text,
	Modal,
	Pressable,
	ScrollView
} from 'react-native';

import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';

import useStyles from '../hooks/useStyles';
import mergeStyles from '../theme/mergeStyles';
import { AppTheme } from '../types';

interface PickerData {
	id: string;
	text: string;
}
interface Props {
	label: string;
	placeholder?: string;
	data: PickerData[];
	value: string | null;
	onChange: (id: string) => void;
	onBlur: () => void;
	renderItem?: (item: PickerData) => React.ReactNode;
	error?: boolean;
	style?: StyleProp<ViewStyle>;
}
const Picker: React.FC<Props> = ({
	label,
	placeholder,
	data,
	value,
	onChange,
	onBlur,
	renderItem,
	error,
	style
}) => {
	const styles = useStyles(getStyles);
	const [isOpen, setIsOpen] = useState(false);

	const close = useCallback(() => {
		setIsOpen(false);
		onBlur();
	}, [onBlur, setIsOpen]);

	const open = useCallback(() => {
		setIsOpen(true);
	}, [setIsOpen]);

	const onSelect = useCallback(
		(id: string) => {
			onChange(id);
			close();
		},
		[onChange, close]
	);

	const selectedValue = useMemo(
		() => (value ? data.find(item => item.id == value) : null),
		[data, value]
	);

	const defaultRenderItem = useCallback(
		(item: PickerData) => {
			return <Text style={styles.itemText}>{item.text}</Text>;
		},
		[styles]
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
							['placeholder', !selectedValue],
							['error', !!error]
						])}
					>
						{!selectedValue
							? placeholder || 'Select...'
							: selectedValue.text}
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
			<Modal
				visible={isOpen}
				animationType="slide"
				onRequestClose={close}
				transparent
			>
				<View style={styles.modal}>
					<ScrollView>
						{data.map(item => (
							<Pressable
								key={item.id}
								style={({ pressed }) =>
									mergeStyles(styles, [
										'item',
										['item_selected', item.id == value],
										['item_pressed', pressed]
									])
								}
								onPress={() => onSelect(item.id)}
							>
								{renderItem
									? renderItem(item)
									: defaultRenderItem(item)}
							</Pressable>
						))}
					</ScrollView>
				</View>
			</Modal>
		</React.Fragment>
	);
};

const getStyles = (theme: AppTheme) =>
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
			backgroundColor: theme.color.primary.background,
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
		placeholder: {
			color: theme.color.primary.disabled
		},
		error: {
			color: theme.color.primary.error
		},
		dropdown: {
			width: 24,
			color: theme.color.primary.disabled
		},
		modal: {
			position: 'absolute',
			top: 20,
			bottom: 50,
			left: 15,
			right: 15,
			borderRadius: 8,
			backgroundColor: theme.color.secondary.light,
			elevation: 2,
			paddingTop: 16,
			paddingBottom: 16,
			paddingLeft: 8,
			paddingRight: 8
		},
		item: {
			paddingTop: 16,
			paddingBottom: 16,
			paddingLeft: 16,
			paddingRight: 16,
			borderRadius: 4
		},
		item_selected: {
			backgroundColor: theme.color.primary.light
		},
		item_pressed: {
			opacity: 0.7
		},
		itemText: {
			...material.body1Object,
			color: theme.color.primary.text,
			fontSize: 16
		}
	});

export default Picker;
