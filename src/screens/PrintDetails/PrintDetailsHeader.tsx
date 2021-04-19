import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import BlurhashImage from '../../components/BlurhashImage';
import SvgPrint from '../../components/icons/Print';
import { PrintCalculated } from '../../data/models/Print';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

interface Props {
	print: PrintCalculated;
}
const PrintDetailsHeader: React.FC<Props> = ({ print }) => {
	const styles = useStyles(getStyles);

	const statusIcon: { icon: string; color: string } = useMemo(() => {
		if (print.progress === null) {
			return {
				icon: 'play-circle-fill',
				color: styles.statusIcon_running.color
			};
		}

		if (print.progress == 1) {
			return {
				icon: 'check-circle',
				color: styles.statusIcon_success.color
			};
		}

		return {
			icon: 'error',
			color: styles.statusIcon_fail.color
		};
	}, [print.progress, styles]);

	return (
		<View style={styles.header}>
			<View style={styles.headerBackground}>
				<View style={styles.imageContainer}>
					{print.image ? (
						<BlurhashImage
							style={styles.image}
							image={print.image}
						/>
					) : (
						<View style={styles.imagePlaceholderContainer}>
							<SvgPrint
								viewBox="0 0 130 130"
								width={styles.imagePlaceholderIcon.width}
								height={styles.imagePlaceholderIcon.height}
								fill={styles.imagePlaceholderIcon.color}
							/>
						</View>
					)}
					<View style={styles.statusBadgeContainer}>
						<View style={styles.statusBadgeShell}>
							<Icon
								size={styles.statusBadge.width}
								name={statusIcon.icon}
								color={statusIcon.color}
							/>
						</View>
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
		imageContainer: {
			position: 'absolute',
			bottom: -60,
			left: 0,
			right: 0,
			flexDirection: 'row',
			justifyContent: 'center'
		},
		image: {
			width: 120,
			height: 120,
			borderRadius: 8,
			backgroundColor: theme.color.secondary.light,
			elevation: 2
		},
		imagePlaceholder: {
			color: theme.color.primary.disabled
		},
		imagePlaceholderContainer: {
			width: 120,
			height: 120,
			borderRadius: 8,
			elevation: 2,
			backgroundColor: theme.color.secondary.light
		},
		imagePlaceholderIcon: {
			width: 120,
			height: 120,
			color: theme.color.primary.disabled
		},
		statusBadgeContainer: {
			position: 'absolute',
			top: -10,
			width: 120,
			height: 32
		},
		statusBadgeShell: {
			position: 'absolute',
			top: 0,
			right: -10,
			width: 32,
			height: 32,
			elevation: 2,
			backgroundColor: theme.color.secondary.light,
			borderRadius: 16
		},
		statusBadge: {
			width: 32
		},
		statusIcon_success: {
			color: theme.color.primary.main
		},
		statusIcon_fail: {
			color: theme.color.primary.error
		},
		statusIcon_running: {
			color: theme.color.primary.pending
		}
	});

export default PrintDetailsHeader;
