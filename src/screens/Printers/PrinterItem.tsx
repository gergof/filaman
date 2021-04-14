import React, { useCallback } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ProgressCircle } from 'react-native-svg-charts';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BlurhashImage from '../../components/BlurhashImage';
import DetailChips from '../../components/DetailChips';
import SvgPrint from '../../components/icons/Print';
import { PrinterCalculatedWithPrints } from '../../data/models/Printer';
import useStyles from '../../hooks/useStyles';
import mergeStyles from '../../theme/mergeStyles';
import { AppTheme } from '../../types';

interface Props {
	item: PrinterCalculatedWithPrints;
}
const PrinterItem: React.FC<Props> = ({ item }) => {
	const styles = useStyles(getStyles);
	const navigation = useNavigation();

	const onPress = useCallback(() => {
		navigation.navigate('PrinterDetails', { id: item.id });
	}, [navigation, item.id]);

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
				<Icon
					name="image"
					size={styles.picture_placeholder.width}
					color={styles.picture_placeholder.color}
				/>
			)}
			<View style={styles.content}>
				<Text style={styles.name}>{item.name}</Text>
				<Text style={styles.model}>{item.model}</Text>
				<View style={styles.chipsConteiner}>
					<DetailChips
						style={styles.chips}
						small
						chips={[
							{
								id: 'prints',
								icon: SvgPrint,
								value: item.prints.length.toString()
							},
							{
								id: 'successRate',
								icon: ({ width, height }) => (
									<ProgressCircle
										style={{ width, height }}
										progress={item.successRate}
										progressColor={
											styles.successRateColor.color
										}
										backgroundColor={
											styles.successRateColor
												.backgroundColor
										}
										strokeWidth={3}
									/>
								),
								value: `${Math.floor(item.successRate * 100)} %`
							}
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
			marginBottom: 8,
			backgroundColor: theme.color.secondary.light,
			elevation: 2,
			borderRadius: 8,
			padding: 16,
			paddingTop: 8,
			paddingBottom: 8,
			flexDirection: 'row',
			justifyContent: 'flex-start'
		},
		_pressed: {
			opacity: 0.4
		},
		picture: {
			width: 80,
			height: 80,
			borderRadius: 8
		},
		picture_placeholder: {
			width: 80,
			color: theme.color.primary.disabled
		},
		content: {
			flex: 1,
			marginLeft: 18
		},
		name: {
			...material.subheadingObject,
			color: theme.color.primary.text,
			marginBottom: 4
		},
		model: {
			...material.body1Object,
			color: theme.color.secondary.text
		},
		chipsConteiner: {
			flex: 1,
			justifyContent: 'flex-end'
		},
		chips: {
			justifyContent: 'space-between'
		},
		successRateColor: {
			color: theme.color.primary.main,
			backgroundColor: theme.color.primary.error
		}
	});

export default PrinterItem;
