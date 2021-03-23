import React, { useCallback } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';

import useStyles from '../../hooks/useStyles';
import mergeStyles from '../../theme/mergeStyles';
import { AppTheme } from '../../types';

interface Props {
	openMenu: () => void;
}
const HomeHeader: React.FC<Props> = ({ openMenu }) => {
	const styles = useStyles(getStyles);

	const onMenuPress = useCallback(() => {
		openMenu();
	}, [openMenu]);

	return (
		<View style={styles.container}>
			<Pressable
				onPress={onMenuPress}
				hitSlop={10}
				style={({ pressed }) =>
					mergeStyles(styles, [['pressable_pressed', pressed]])
				}
			>
				<Icon
					name="menu"
					color={styles.hamburger.color}
					size={styles.hamburger.width}
				/>
			</Pressable>
			<Text style={styles.title}>Home</Text>
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
		hamburger: {
			width: 36,
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

export default HomeHeader;
