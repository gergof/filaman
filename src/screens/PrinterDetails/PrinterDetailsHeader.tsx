import React from 'react';
import { StyleSheet, View } from 'react-native';

import BlurhashImage from '../../components/BlurhashImage';
import SvgPrinter from '../../components/icons/Printer';
import { PrinterCalculated } from '../../data/models/Printer';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

interface Props {
	printer: PrinterCalculated;
}
const PrinterDetailsHeader: React.FC<Props> = ({ printer }) => {
	const styles = useStyles(getStyles);

	return (
		<View style={styles.header}>
			<View style={styles.headerBackground}>
				<View style={styles.imageContainer}>
					{printer.image ? (
						<BlurhashImage
							style={styles.image}
							image={printer.image}
						/>
					) : (
						<View style={styles.imagePlaceholderContainer}>
							<SvgPrinter
								viewBox="0 0 130 130"
								width={styles.imagePlaceholderIcon.width}
								height={styles.imagePlaceholderIcon.height}
								fill={styles.imagePlaceholderIcon.color}
							/>
						</View>
					)}
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
		}
	});

export default PrinterDetailsHeader;
