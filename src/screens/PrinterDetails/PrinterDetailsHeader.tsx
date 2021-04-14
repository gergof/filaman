import React from 'react';
import { StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import BlurhashImage from '../../components/BlurhashImage';
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
			<View style={styles.headerBackground} />
			<View style={styles.imageContainer}>
				{printer.image ? (
					<BlurhashImage style={styles.image} image={printer.image} />
				) : (
					<Icon
						name="picture"
						size={styles.image.width}
						color={styles.imagePlaceholder.color}
					/>
				)}
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
			top: 40,
			left: 0,
			right: 0,
			flexDirection: 'row',
			justifyContent: 'center'
		},
		image: {
			width: 120,
			height: 120,
			borderRadius: 8,
			elevation: 2
		},
		imagePlaceholder: {
			color: theme.color.primary.disabled
		}
	});

export default PrinterDetailsHeader;
