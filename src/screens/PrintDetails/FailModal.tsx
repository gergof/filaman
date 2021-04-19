import React, { useCallback, useState } from 'react';
import { StyleSheet, Modal, View, Text } from 'react-native';

import moment, { Moment } from 'moment';
import { Button, TextInput } from 'react-native-paper';
import { material } from 'react-native-typography';

import DatePicker from '../../components/DatePicker';
import ImagePicker from '../../components/ImagePicker';
import Images from '../../data/state/actions/Images';
import Prints from '../../data/state/actions/Prints';
import { useAppDispatch } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';
import numberFieldTransform from '../../utils/numberFieldTransform';

interface Props {
	id: string;
	open: boolean;
	onClose: () => void;
}
const FailModal: React.FC<Props> = ({ id, open, onClose }) => {
	const styles = useStyles(getStyles);
	const [pickedImage, setPickedImage] = useState<string | null>(null);
	const [duration, setDuration] = useState<Moment>(
		moment().startOf('day').add(15, 'minutes')
	);
	const [failedAt, setFailedAt] = useState<number>(0);
	const dispatch = useAppDispatch();

	const cancel = useCallback(() => {
		if (pickedImage) {
			dispatch(Images.delete(pickedImage));
			setPickedImage(null);
		}
		onClose();
	}, [pickedImage, setPickedImage, dispatch, onClose]);

	const onChangeFailedAt = useCallback(
		(value: string) => {
			const number = numberFieldTransform.store(value) || 0;

			if (number < 0) {
				setFailedAt(0);
				return;
			}
			if (number > 99) {
				setFailedAt(99);
				return;
			}

			setFailedAt(number);
		},
		[setFailedAt]
	);

	const onSubmit = useCallback(() => {
		dispatch(
			Prints.update(id, {
				imageId: pickedImage,
				progress: failedAt / 100,
				duration: duration.diff(moment().startOf('day'), 'seconds')
			})
		);
		onClose();
	}, [dispatch, id, pickedImage, duration, failedAt, onClose]);

	return (
		<Modal
			visible={open}
			animationType="slide"
			onRequestClose={cancel}
			transparent
		>
			<View style={styles.modal}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Print Failed</Text>
					<DatePicker
						label="Duration"
						value={duration}
						onChange={setDuration}
						onBlur={() => {}}
						mode="time"
						format="HH:mm"
						style={styles.picker}
						backgroundColor={styles.modalContent.backgroundColor}
					/>
					<TextInput
						style={styles.textField}
						mode="outlined"
						label="Failed at %"
						value={numberFieldTransform.parse(failedAt)}
						onChangeText={onChangeFailedAt}
						keyboardType="decimal-pad"
					/>
					<ImagePicker
						value={pickedImage}
						onChange={setPickedImage}
						onBlur={() => {}}
						style={styles.picker}
					/>
					<Button
						labelStyle={styles.buttonText}
						mode="contained"
						onPress={onSubmit}
					>
						Done
					</Button>
				</View>
			</View>
		</Modal>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		modal: {
			flex: 1,
			justifyContent: 'center'
		},
		modalContent: {
			borderRadius: 8,
			backgroundColor: theme.color.secondary.light,
			elevation: 2,
			paddingTop: 16,
			paddingBottom: 16,
			paddingLeft: 8,
			paddingRight: 8,
			marginLeft: 15,
			marginRight: 15
		},
		title: {
			...material.titleObject,
			color: theme.color.primary.text,
			marginBottom: 8
		},
		picker: {
			marginBottom: 16
		},
		textField: {
			marginBottom: 16,
			backgroundColor: theme.color.secondary.light
		},
		buttonText: {
			color: theme.color.secondary.light
		}
	});

export default FailModal;
