import React, { useCallback } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { StackHeaderProps } from '@react-navigation/stack';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';

import useStyles from '../../hooks/useStyles';
import mergeStyles from '../../theme/mergeStyles';
import { AppTheme } from '../../types';

interface Props {
	title: string;
}
const BaseHeader: React.FC<Props & StackHeaderProps> = ({
	navigation,
	title
}) => {
	const styles = useStyles(getStyles);

	const onBackPress = useCallback(() => {
		navigation.canGoBack() && navigation.goBack();
	}, [navigation]);

	return (
		<View style={styles.container}>
			<Pressable
				onPress={onBackPress}
				hitSlop={10}
				style={({ pressed }) =>
					mergeStyles(styles, [['pressable_pressed', pressed]])
				}
			>
				<Icon
					name="arrow-back"
					color={styles.icon.color}
					size={styles.icon.width}
				/>
			</Pressable>
			<Text style={styles.title}>{title}</Text>
		</View>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			height: 50,
			backgroundColor: theme.color.primary.main,
			flexDirection: 'row',
			alignItems: 'center',
			padding: 8,
			paddingLeft: 16,
			paddingRight: 16
		},
		icon: {
			width: 28,
			color: theme.color.secondary.light
		},
		pressable_pressed: {
			opacity: 0.4
		},
		title: {
			...material.titleObject,
			color: theme.color.secondary.light,
			marginLeft: 16
		}
	});

export default BaseHeader;
