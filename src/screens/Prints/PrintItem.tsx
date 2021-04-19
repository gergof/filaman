import React, { useMemo, useCallback } from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BlurhashImage from '../../components/BlurhashImage';
import DetailChips from '../../components/DetailChips';
import SvgDuration from '../../components/icons/Duration';
import SvgPrint from '../../components/icons/Print';
import SvgPrinter from '../../components/icons/Printer';
import SvgSpool from '../../components/icons/Spool';
import SvgWeight from '../../components/icons/Weight';
import { PrintCalculated } from '../../data/models/Print';
import useStyles from '../../hooks/useStyles';
import mergeStyles from '../../theme/mergeStyles';
import { AppTheme } from '../../types';

interface Props {
	item: PrintCalculated;
}
const PrintItem: React.FC<Props> = ({ item }) => {
	const styles = useStyles(getStyles);
	const navigation = useNavigation();

	const onPress = useCallback(() => {
		navigation.navigate('PrintDetails', { id: item.id });
	}, [navigation, item]);

	const statusIcon: { icon: string; color: string } = useMemo(() => {
		if (item.progress === null) {
			return {
				icon: 'play-circle-fill',
				color: styles.statusIcon_running.color
			};
		}

		if (item.progress == 1) {
			return {
				icon: 'check-circle',
				color: styles.statusIcon_success.color
			};
		}

		return {
			icon: 'error',
			color: styles.statusIcon_fail.color
		};
	}, [item.progress, styles]);

	return (
		<Pressable
			style={({ pressed }) =>
				mergeStyles(styles, ['container', ['_pressed', pressed]])
			}
			onPress={onPress}
		>
			{item.image ? (
				<BlurhashImage style={styles.picture} image={item.image} />
			) : (
				<View style={styles.picturePlaceholderContainer}>
					<SvgPrint
						viewBox="0 0 130 130"
						width={styles.picturePlaceholderIcon.width}
						height={styles.picturePlaceholderIcon.height}
						fill={styles.picturePlaceholderIcon.color}
					/>
				</View>
			)}
			<View style={styles.content}>
				<View style={styles.header}>
					<View style={styles.nameAndDate}>
						<Text style={styles.name} numberOfLines={1}>
							{item.name}
						</Text>
						<Text style={styles.date}>
							{moment(item.date).format('YYYY-MM-DD')}
						</Text>
					</View>
					<Icon
						size={styles.statusIcon.width}
						name={statusIcon.icon}
						color={statusIcon.color}
					/>
				</View>
				<View style={styles.chipsContainer}>
					<DetailChips
						style={styles.chips}
						small
						chips={[
							{
								id: 'spool',
								icon: SvgSpool,
								value: item.spool.name
							},
							{
								id: 'printer',
								icon: SvgPrinter,
								value: item.printer.name
							},
							{
								id: 'weight',
								icon: SvgWeight,
								value: `${item.weight} g`
							},
							...(item.progress !== null
								? [
										{
											id: 'duration',
											icon: SvgDuration,
											value: `${Math.floor(
												moment
													.duration(
														item.duration,
														'seconds'
													)
													.asHours()
											)} hrs ${moment
												.duration(
													item.duration,
													'seconds'
												)
												.minutes()} min`
										}
								  ]
								: [])
						]}
					/>
				</View>
			</View>
		</Pressable>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			height: 112,
			marginBottom: 8,
			backgroundColor: theme.color.secondary.light,
			elevation: 2,
			borderRadius: 8,
			padding: 16,
			paddingTop: 8,
			paddingBottom: 8,
			flexDirection: 'row',
			justifyContent: 'flex-start',
			alignItems: 'center'
		},
		_pressed: {
			opacity: 0.4
		},
		picture: {
			width: 80,
			height: 80,
			borderRadius: 8
		},
		picturePlaceholderContainer: {
			width: 80,
			height: 80,
			borderRadius: 8
		},
		picturePlaceholderIcon: {
			width: 80,
			height: 80,
			color: theme.color.primary.disabled
		},
		content: {
			flex: 1,
			marginLeft: 18
		},
		header: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginBottom: 4
		},
		nameAndDate: {
			flex: 1
		},
		name: {
			...material.subheadingObject,
			color: theme.color.primary.text,
			marginBottom: 4
		},
		date: {
			...material.captionObject,
			color: theme.color.secondary.text
		},
		statusIcon: {
			width: 22
		},
		statusIcon_success: {
			color: theme.color.primary.main
		},
		statusIcon_fail: {
			color: theme.color.primary.error
		},
		statusIcon_running: {
			color: theme.color.primary.pending
		},
		chipsContainer: {
			flex: 1,
			justifyContent: 'flex-end'
		},
		chips: {
			justifyContent: 'space-between'
		}
	});

export default PrintItem;
