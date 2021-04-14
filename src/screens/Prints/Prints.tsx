import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper';

import { default as SPrints } from '../../data/state/actions/Print';
import { useAppSelector } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

interface Props {}
const Prints: React.FC<Props> = () => {
	const styles = useStyles(getStyles);
	const data = useAppSelector(SPrints.getAll());
	const navigation = useNavigation();

	const onAddPress = useCallback(() => {
		navigation.navigate('AddPrint');
	}, [navigation]);

	console.log(data);

	return (
		<View style={styles.container}>
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

export default Prints;