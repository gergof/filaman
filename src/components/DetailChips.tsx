import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { material } from 'react-native-typography';

import useStyles from '../hooks/useStyles';
import { AppTheme } from '../types';

interface Props {
	chips: {
		id: string;
		icon: React.FC<{
			width: number;
			height: number;
			fill: string;
			viewBox: string;
		}>;
		value: string;
	}[];
	small?: boolean;
}
const DetailChips: React.FC<Props> = ({ chips, small }) => {
	const styles = useStyles(getStyles, { small: !!small });

	return (
		<View style={styles.container}>
			{chips.map(chip => (
				<View key={chip.id} style={styles.chip}>
					<chip.icon
						width={styles.chipIcon.width}
						height={styles.chipIcon.height}
						fill={styles.chipIcon.color}
						viewBox="0 0 130 130"
					/>
					<Text style={styles.chipText}>{chip.value}</Text>
				</View>
			))}
		</View>
	);
};

const getStyles = (theme: AppTheme, params?: { small: boolean }) =>
	StyleSheet.create({
		container: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: params?.small ? 'flex-start' : 'space-around'
		},
		chip: {
			flexDirection: 'row',
			alignItems: 'center',
			marginLeft: params?.small ? 0 : 4,
			marginRight: params?.small ? 8 : 4
		},
		chipIcon: {
			width: params?.small ? 16 : 22,
			height: params?.small ? 16 : 22,
			color: theme.color.secondary.text
		},
		chipText: {
			...material.captionObject,
			color: theme.color.secondary.text,
			marginLeft: 2,
			paddingBottom: 2,
			fontSize: params?.small ? 12 : 18,
			lineHeight: params?.small ? 14 : 20
		}
	});

export default DetailChips;
