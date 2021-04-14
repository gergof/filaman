import React, { useMemo, useCallback } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ProgressCircle } from 'react-native-svg-charts';
import { material, systemWeights } from 'react-native-typography';
import stringToColor from 'string-to-color';

import DetailChips from '../../components/DetailChips';
import SvgDiameter from '../../components/icons/Diameter';
import SvgSpool from '../../components/icons/Spool';
import SvgWeight from '../../components/icons/Weight';
import { SpoolCalculated } from '../../data/models/Spool';
import useStyles from '../../hooks/useStyles';
import mergeStyles from '../../theme/mergeStyles';
import { AppTheme } from '../../types';

interface Props {
	item: SpoolCalculated;
}
const SpoolItem: React.FC<Props> = ({ item }) => {
	const styles = useStyles(getStyles);
	const navigation = useNavigation();

	const onPress = useCallback(() => {
		navigation.navigate('SpoolDetails', { id: item.id });
	}, [navigation, item.id]);

	const printColor = useMemo(
		() => (item.color == '#ffffff' ? '#dddddd' : item.color),
		[item.color]
	);
	const materialColorCode = useMemo(() => stringToColor(item.material.code), [
		item.material.code
	]);

	return (
		<Pressable
			style={({ pressed }) =>
				mergeStyles(styles, ['container', ['_pressed', pressed]])
			}
			onPress={onPress}
		>
			<View style={styles.usage}>
				<ProgressCircle
					style={styles.chart}
					progressColor={printColor}
					progress={item.remaining / item.totalWeight}
				/>
				<View style={styles.iconContainer}>
					<SvgSpool
						viewBox="0 0 130 130"
						width={styles.icon.width}
						height={styles.icon.height}
						fill={printColor}
					/>
				</View>
			</View>
			<View style={styles.content}>
				<View style={styles.nameRow}>
					<Text style={styles.name} numberOfLines={1}>
						{item.name}
					</Text>
					<View
						style={[
							styles.materialBadge,
							{ borderColor: materialColorCode }
						]}
					>
						<Text
							style={[
								styles.materialBadgeText,
								{ color: materialColorCode }
							]}
						>
							{item.material.code}
						</Text>
					</View>
				</View>
				<Text style={styles.manufacturer}>
					{item.manufacturer || null}
				</Text>
				<View style={styles.chipsContainer}>
					<DetailChips
						style={styles.chips}
						chips={[
							{
								id: 'diameter',
								icon: SvgDiameter,
								value: `${item.diameter} mm`
							},
							{
								id: 'remaining',
								icon: SvgWeight,
								value: `${Math.floor(item.remaining)}/${
									item.totalWeight
								} g`
							}
						]}
						small
					/>
				</View>
			</View>
		</Pressable>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			height: 96,
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
		usage: {
			width: 80,
			height: 80
		},
		chart: {
			position: 'absolute',
			left: 0,
			top: 0,
			width: 80,
			height: 80
		},
		iconContainer: {
			position: 'absolute',
			width: 40,
			height: 40,
			top: 20,
			left: 20
		},
		icon: {
			width: 40,
			height: 40
		},
		content: {
			flex: 1,
			marginLeft: 18
		},
		nameRow: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginBottom: 4
		},
		name: {
			...material.subheadingObject,
			color: theme.color.primary.text,
			marginRight: 4
		},
		materialBadge: {
			borderWidth: 2,
			borderColor: '#000000',
			borderRadius: 20,
			padding: 2,
			paddingLeft: 4,
			paddingRight: 4,
			justifyContent: 'center'
		},
		materialBadgeText: {
			...material.body2Object,
			...systemWeights.bold,
			lineHeight: 16,
			color: '#000000'
		},
		manufacturer: {
			...material.body1Object,
			color: theme.color.secondary.text
		},
		chipsContainer: {
			flex: 1,
			justifyContent: 'flex-end'
		},
		chips: {
			justifyContent: 'space-between'
		},
		_pressed: {
			opacity: 0.4
		}
	});

export default SpoolItem;
