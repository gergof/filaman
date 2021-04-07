import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { ProgressCircle } from 'react-native-svg-charts';

import SvgSpool from '../../components/icons/Spool';
import { SpoolCalculated } from '../../data/models/Spool';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

interface Props {
	spool: SpoolCalculated;
}
const SpoolDetailsHeader: React.FC<Props> = ({ spool }) => {
	const styles = useStyles(getStyles);

	const printColor = useMemo(
		() => (spool.color == '#ffffff' ? '#dddddd' : spool.color),
		[spool.color]
	);

	return (
		<View style={styles.header}>
			<View style={styles.headerBackground} />
			<View style={styles.chartContainer}>
				<View style={styles.chartOuter}>
					<ProgressCircle
						style={styles.chart}
						progressColor={printColor}
						progress={spool.remaining / spool.totalWeight}
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
			</View>
		</View>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		header: {
			height: 165
		},
		headerBackground: {
			height: 100,
			backgroundColor: theme.color.primary.main,
			elevation: 2
		},
		chartContainer: {
			position: 'absolute',
			top: 38,
			left: 0,
			right: 0,
			flexDirection: 'row',
			justifyContent: 'center'
		},
		chartOuter: {
			elevation: 2,
			padding: 2,
			backgroundColor: theme.color.secondary.light,
			borderRadius: 62,
			width: 124,
			height: 124
		},
		chart: {
			position: 'absolute',
			width: 120,
			height: 120,
			top: 2,
			left: 2
		},
		iconContainer: {
			position: 'absolute',
			width: 70,
			height: 70,
			top: 27,
			left: 27
		},
		icon: {
			width: 70,
			height: 70
		}
	});

export default SpoolDetailsHeader;
