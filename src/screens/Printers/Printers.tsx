import React, { useCallback } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper';

import SPrinters from '../../data/state/actions/Printers';
import { useAppSelector } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

import PrinterItem from './PrinterItem';

interface Props {}
const Printers: React.FC<Props> = () => {
	const styles = useStyles(getStyles);
	const data = useAppSelector(SPrinters.getAll());
	const navigation = useNavigation();

	const onAddPress = useCallback(() => {
		navigation.navigate('AddPrinter');
	}, [navigation]);

	return (
		<View style={styles.container}>
			<FlatList
				contentContainerStyle={styles.content}
				data={data}
				keyExtractor={item => item.id}
				renderItem={({ item }) => <PrinterItem item={item} />}
			/>
			<FAB style={styles.fab} icon="plus" onPress={onAddPress} />
		</View>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.color.secondary.light
		},
		content: {
			padding: 16,
			backgroundColor: theme.color.secondary.light
		},
		fab: {
			position: 'absolute',
			bottom: 0,
			right: 0,
			margin: 16,
			backgroundColor: theme.color.primary.accent
		}
	});

export default Printers;
