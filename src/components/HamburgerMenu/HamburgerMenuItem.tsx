import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { material } from 'react-native-typography';

import useStyles from '../../hooks/useStyles';
import mergeStyles from '../../theme/mergeStyles';
import { AppTheme } from '../../types';

interface Props {
	title: string;
	icon: React.ReactNode;
	onPress: () => void;
}
const HamburgerMenuItem: React.FC<Props> = ({ title, icon, onPress }) => {
	const styles = useStyles(getStyles);

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) =>
				mergeStyles(styles, [['_pressed', pressed]])
			}
		>
			<View style={styles.container}>
				{icon}
				<Text style={styles.text}>{title}</Text>
			</View>
		</Pressable>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			paddingTop: 8,
			paddingBottom: 8,
			flexDirection: 'row',
			alignItems: 'center',
			height: 42
		},
		text: {
			...material.subheadingObject,
			color: theme.color.secondary.light,
			marginLeft: 12
		},
		_pressed: {
			opacity: 0.4
		}
	});

export default HamburgerMenuItem;
