import React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';

import useStyles from '../hooks/useStyles';
import { AppTheme } from '../types';

interface Props {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}
const InfoCard: React.FC<Props> = ({ children, style }) => {
	const styles = useStyles(getStyles);

	return <View style={[styles.container, style]}>{children}</View>;
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			borderWidth: 1,
			borderColor: theme.color.primary.divider,
			borderRadius: 16,
			padding: 8,
			paddingLeft: 16,
			paddingRight: 16
		}
	});

export default InfoCard;
