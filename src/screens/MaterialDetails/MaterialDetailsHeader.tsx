import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { material, systemWeights } from 'react-native-typography';

import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

interface Props {
	code: string;
	color: string;
}
const MaterialDetailsHeader: React.FC<Props> = ({ code, color }) => {
	const styles = useStyles(getStyles);

	return (
		<View style={styles.header}>
			<View style={styles.headerBackground} />
			<View style={styles.headerBadgeContainer}>
				<View style={styles.headerBadgeOuter}>
					<View style={[styles.headerBadge, { borderColor: color }]}>
						<Text
							style={[styles.headerBadgeText, { color: color }]}
						>
							{code}
						</Text>
					</View>
				</View>
			</View>
		</View>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		header: {
			height: 133
		},
		headerBackground: {
			height: 100,
			backgroundColor: theme.color.primary.main,
			elevation: 2
		},
		headerBadgeContainer: {
			position: 'absolute',
			top: 67,
			left: 0,
			right: 0,
			flexDirection: 'row',
			justifyContent: 'center'
		},
		headerBadgeOuter: {
			elevation: 2,
			padding: 2,
			backgroundColor: theme.color.secondary.light,
			borderRadius: 30
		},
		headerBadge: {
			borderWidth: 4,
			borderColor: '#000',
			borderRadius: 30,
			padding: 5,
			paddingLeft: 10,
			paddingRight: 10,
			justifyContent: 'center'
		},
		headerBadgeText: {
			...material.display1Object,
			...systemWeights.bold,
			lineHeight: 45,
			color: '#000'
		}
	});

export default MaterialDetailsHeader;
