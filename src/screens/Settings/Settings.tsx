import React, { useMemo, useCallback } from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import Picker from '../../components/Picker';
import SSettings from '../../data/state/actions/Settings';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

import currencies from './data/currencies';

interface Props {}
const Settings: React.FC<Props> = () => {
	const styles = useStyles(getStyles);

	const settings = useAppSelector(SSettings.get());
	const dispatch = useAppDispatch();

	const currencyList = useMemo(
		() => currencies.map(currency => ({ id: currency, text: currency })),
		[]
	);

	const onCurrencyChange = useCallback(
		(currency: string) => {
			dispatch(SSettings.set('currency', currency));
		},
		[dispatch]
	);

	return (
		<ScrollView style={styles.container}>
			<Picker
				label="Currency"
				data={currencyList}
				value={settings.currency}
				onChange={onCurrencyChange}
				onBlur={() => {}}
				style={styles.field}
			/>
		</ScrollView>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			padding: 16
		},
		field: {
			marginBottom: 16
		}
	});

export default Settings;
