import React, { useCallback, useState } from 'react';
import { StyleSheet, Modal, View, Text } from 'react-native';

import moment, { Moment } from 'moment';
import { Button } from 'react-native-paper';
import { material } from 'react-native-typography';

import DatePicker from '../../components/DatePicker';
import ImagePicker from '../../components/ImagePicker';
import Images from '../../data/state/actions/Images';
import Prints from '../../data/state/actions/Prints';
import { useAppDispatch } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

interface Props {
	id: string;
	initialDuration: number | null;
	open: boolean;
	onClose: () => void;
}
const DoneModal: React.FC<Props> = ({ id, initialDuration, open, onClose }) => {
	const styles = useStyles(getStyles);
	const [pickedImage, setPickedImage] = useState<string | null>(null);
	const [duration, setDuration] = useState<Moment>(
		initialDuration
			? moment().startOf('day').add(initialDuration, 'seconds')
			: moment().startOf('day').add(15, 'minutes')
	);
	const dispatch = useAppDispatch();

	const cancel = useCallback(() => {
		if (pickedImage) {
			dispatch(Images.delete(pickedImage));
			setPickedImage(null);
		}
		onClose();
	}, [pickedImage, setPickedImage, dispatch, onClose]);

	const onSubmit = useCallback(() => {
		dispatch(
			Prints.update(id, {
				imageId: pickedImage,
				progress: 1,
				duration: duration.diff(moment().startOf('day'), 'seconds')
			})
		);
		onClose();
	}, [dispatch, id, pickedImage, duration, onClose]);

	return (
		<Modal
			visible={open}
			animationType="slide"
			onRequestClose={cancel}
			transparent
		>
			<View style={styles.modal}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Print Done</Text>
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
		buttonText: {
			color: theme.color.secondary.light
		}
	});

export default DoneModal;
