import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { FAB } from 'react-native-paper';

import SSpools from '../../data/state/actions/Spools';
import { useAppSelector } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

interface Props {}
const Spools: React.FC<Props> = () => {
	const styles = useStyles(getStyles);
	const data = useAppSelector(SSpools.getAll());
	const navigation = useNavigation();

	const onAddPress = useCallback(() => {
		navigation.navigate('AddSpool');
	}, [navigation]);

	console.log('spools:', data);

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
		fab: {
			position: 'absolute',
			margin: 16,
			right: 0,
			bottom: 0,
			backgroundColor: theme.color.primary.accent
		}
	});

export default Spools;
