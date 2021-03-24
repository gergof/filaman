import React, { useCallback } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { material, systemWeights } from 'react-native-typography';
import stringToColor from 'string-to-color';

import DetailChips from '../../components/DetailChips';
import SvgDensity from '../../components/icons/Density';
import Material from '../../data/models/Material';
import useStyles from '../../hooks/useStyles';
import mergeStyles from '../../theme/mergeStyles';
import { AppTheme } from '../../types';

interface Props {
	item: Material;
}
const MaterialItem: React.FC<Props> = ({ item }) => {
	const styles = useStyles(getStyles);
	const navigation = useNavigation();

	const onPress = useCallback(() => {
		navigation.navigate('MaterialDetails', { id: item.id });
	}, [navigation, item.id]);

	const colorCode = stringToColor(item.code);

	return (
		<Pressable
			style={({ pressed }) =>
				mergeStyles(styles, ['container', ['_pressed', pressed]])
			}
			onPress={onPress}
		>
			<View style={styles.badgeContainer}>
				<View style={[styles.badge, { borderColor: colorCode }]}>
					<Text style={[styles.badgeText, { color: colorCode }]}>
						{item.code}
					</Text>
				</View>
			</View>
			<View style={styles.data}>
				<Text style={styles.name}>{item.name}</Text>
				<DetailChips
					chips={[
						{
							id: 'density',
							icon: SvgDensity,
							value: `${
								item.density / 1000
							} g/cm${String.fromCharCode(179)}`
						}
					]}
					small
				/>
			</View>
		</Pressable>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			height: 75,
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
		badgeContainer: {
			width: 80,
			marginRight: 16,
			justifyContent: 'center',
			alignItems: 'flex-start'
		},
		badge: {
			borderWidth: 2.5,
			borderColor: '#000',
			borderRadius: 20,
			padding: 2,
			paddingLeft: 4,
			paddingRight: 4,
			justifyContent: 'center'
		},
		badgeText: {
			...material.body2Object,
			...systemWeights.bold,
			lineHeight: 16,
			color: '#000'
		},
		data: {
			flex: 1,
			alignItems: 'flex-start'
		},
		name: {
			...material.subheadingObject,
			color: theme.color.primary.text,
			marginBottom: 4
		},
		_pressed: {
			opacity: 0.4
		}
	});

export default MaterialItem;
