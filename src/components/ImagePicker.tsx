import React, { useState, useCallback } from 'react';
import {
	StyleProp,
	ViewStyle,
	StyleSheet,
	View,
	Modal,
	Text,
	Pressable,
	Alert
} from 'react-native';

import { nanoid } from '@reduxjs/toolkit';
import { Blurhash } from 'react-native-blurhash';
import * as fs from 'react-native-fs';
import {
	launchImageLibrary,
	ImagePickerResponse,
	launchCamera
} from 'react-native-image-picker';
import { Button } from 'react-native-paper';
import Permissions from 'react-native-permissions';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Images from '../data/state/actions/Images';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import useStyles from '../hooks/useStyles';
import mergeStyles from '../theme/mergeStyles';
import { AppTheme } from '../types';

import BlurhashImage from './BlurhashImage';

interface Props {
	value: string | null;
	onChange: (id: string | null) => void;
	onBlur: () => void;
	error?: boolean;
	style?: StyleProp<ViewStyle>;
}
const ImagePicker: React.FC<Props> = ({
	value,
	onChange,
	onBlur,
	error,
	style
}) => {
	const styles = useStyles(getStyles);
	const [isMethodPickerOpen, setIsMethodPickerOpen] = useState(false);
	const dispatch = useAppDispatch();
	const image = useAppSelector(Images.get(value || ''));

	const onAddClick = useCallback(() => {
		setIsMethodPickerOpen(true);
	}, [setIsMethodPickerOpen]);

	const closeMethodPicker = useCallback(() => {
		setIsMethodPickerOpen(false);
		onBlur();
	}, [setIsMethodPickerOpen, onBlur]);

	const permissionError = useCallback(() => {
		Alert.alert('Error', 'Insufficient permissions to perform action.');
		closeMethodPicker();
	}, [closeMethodPicker]);

	const genericError = useCallback(() => {
		Alert.alert('Error', 'Something went wrong');
		closeMethodPicker();
	}, [closeMethodPicker]);

	const pickImage = useCallback(
		(mode: 'gallery' | 'camera') => {
			Permissions.check(
				Permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
			)
				.then(result => {
					if (result != Permissions.RESULTS.GRANTED) {
						permissionError();
						return;
					}

					return new Promise<ImagePickerResponse>(resolve => {
						if (mode == 'gallery') {
							launchImageLibrary(
								{
									mediaType: 'photo'
								},
								resolve
							);
						} else {
							launchCamera(
								{
									mediaType: 'photo',
									cameraType: 'back'
								},
								resolve
							);
						}
					});
				})
				.then(resp => {
					if (!resp) {
						return;
					}

					if (resp.errorCode) {
						genericError();
						return;
					}

					if (!resp.didCancel) {
						return resp.uri;
					}
				})
				.then(uri => {
					if (!uri) {
						return;
					}

					closeMethodPicker();

					const extension = uri.split('.').pop();
					const path = `${
						fs.DocumentDirectoryPath
					}/Images/${nanoid()}.${extension}`;

					return fs
						.mkdir(`${fs.DocumentDirectoryPath}/Images`)
						.then(() => fs.moveFile(uri, path))
						.then(() => `file://${path}`);
				})
				.then(uri => {
					if (!uri) {
						return;
					}

					return Blurhash.encode(uri, 4, 3).then(blurhash => ({
						uri,
						blurhash
					}));
				})
				.then(data => {
					if (!data) {
						return;
					}

					return dispatch(
						Images.create({
							path: data.uri,
							blurhash: data.blurhash
						})
					);
				})
				.then(image => {
					if (!image) {
						return;
					}

					onChange(image.id);
				})
				.catch(() => {});
		},
		[permissionError, closeMethodPicker, genericError, dispatch, onChange]
	);

	const removeImage = useCallback(() => {
		if (image) {
			dispatch(Images.delete(image.id));
			onChange(null);
		}
	}, [dispatch, onChange, image]);

	return (
		<React.Fragment>
			<View
				style={[
					...mergeStyles(styles, [
						'picker',
						['picker_error', !!error]
					]),
					style
				]}
			>
				{image ? (
					<React.Fragment>
						<BlurhashImage
							style={styles.pickedImage}
							image={image}
						/>
						<Button
							style={styles.button}
							labelStyle={styles.buttonText}
							onPress={removeImage}
						>
							Remove
						</Button>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Icon
							name="insert-photo"
							color={styles.insertIcon.color}
							size={styles.insertIcon.width}
						/>
						<Button
							style={styles.button}
							labelStyle={styles.buttonText}
							onPress={onAddClick}
						>
							Add Image
						</Button>
					</React.Fragment>
				)}
			</View>
			<Modal
				visible={isMethodPickerOpen}
				animationType="slide"
				onRequestClose={closeMethodPicker}
				transparent
			>
				<View style={styles.modal}>
					<View style={styles.modalContent}>
						<Pressable
							style={({ pressed }) =>
								mergeStyles(styles, [
									'modalButton',
									['modalButton_pressed', pressed]
								])
							}
							onPress={() => pickImage('gallery')}
						>
							<Icon
								name="collections"
								color={styles.modalIcon.color}
								size={styles.modalIcon.width}
							/>
							<Text style={styles.modalText}>
								Pick from gallery
							</Text>
						</Pressable>
						<Pressable
							style={({ pressed }) =>
								mergeStyles(styles, [
									'modalButton',
									['modalButton_pressed', pressed]
								])
							}
							onPress={() => pickImage('camera')}
						>
							<Icon
								name="photo-camera"
								color={styles.modalIcon.color}
								size={styles.modalIcon.width}
							/>
							<Text style={styles.modalText}>Take picture</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		</React.Fragment>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		picker: {
			backgroundColor: theme.color.secondary.background,
			borderRadius: 4,
			paddingRight: 16,
			flexDirection: 'row',
			alignItems: 'center'
		},
		picker_error: {
			borderWidth: 2,
			borderColor: theme.color.primary.error
		},
		insertIcon: {
			width: 90,
			color: theme.color.primary.disabled
		},
		button: {
			marginLeft: 8,
			flex: 1
		},
		buttonText: {
			color: theme.color.primary.disabled
		},
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
		modalButton: {
			padding: 16,
			borderRadius: 4,
			flexDirection: 'row',
			alignItems: 'center'
		},
		modalButton_pressed: {
			opacity: 0.4
		},
		modalIcon: {
			width: 32,
			color: theme.color.primary.accent
		},
		modalText: {
			...material.body1Object,
			color: theme.color.primary.text,
			fontSize: 16,
			marginLeft: 16
		},
		pickedImage: {
			width: 76,
			height: 76,
			marginLeft: 8,
			marginTop: 8,
			marginBottom: 8,
			borderRadius: 8
		}
	});

export default ImagePicker;
