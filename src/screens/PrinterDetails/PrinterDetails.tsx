import React, { useMemo, useCallback } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import { FAB } from 'react-native-paper';
import { StackedBarChart, XAxis } from 'react-native-svg-charts';
import { material } from 'react-native-typography';

import DetailChips from '../../components/DetailChips';
import InfoCard from '../../components/InfoCard';
import SvgCode from '../../components/icons/Code';
import Printers from '../../data/state/actions/Printers';
import { useAppSelector } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

import PrinterDetailsHeader from './PrinterDetailsHeader';

interface Params extends ParamListBase {
	PrinterDetails: {
		id: string;
	};
}
interface Props {
	route: RouteProp<Params, 'PrinterDetails'>;
	navigation: StackNavigationProp<Params, 'PrinterDetails'>;
}
const PrinterDetails: React.FC<Props> = ({ route, navigation }) => {
	const id = route.params.id;
	const styles = useStyles(getStyles);
	const printer = useAppSelector(Printers.get(id));

	const printChartData: {
		date: Moment;
		success: number;
		fail: number;
	}[] = useMemo(() => {
		if (!printer) {
			return [];
		}

		const months = _.times(12, i =>
			moment().subtract(i, 'months')
		).reverse();

		return months.map(month => {
			const prints = printer.prints.filter(print =>
				moment(print.date).isSame(month, 'month')
			);
			return prints.reduce(
				(acc, cur) => ({
					...acc,
					...(cur.progress == 1
						? { success: acc.success + 1 }
						: { fail: acc.fail + 1 })
				}),
				{
					date: month,
					success: 0,
					fail: 0
				}
			);
		});
	}, [printer]);

	const onEdit = useCallback(() => {
		if (printer) {
			navigation.navigate('EditPrinter', { id: printer.id });
		}
	}, [navigation, printer]);

	if (!printer) {
		navigation.goBack();
		return null;
	}

	return (
		<React.Fragment>
			<ScrollView style={styles.container}>
				<View style={styles.content}>
					<PrinterDetailsHeader printer={printer} />
					<View style={styles.body}>
						<InfoCard style={styles.card}>
							<Text style={styles.title}>{printer.name}</Text>
							<Text style={styles.model}>{printer.model}</Text>
						</InfoCard>
						<DetailChips
							style={styles.chips}
							chips={[
								{
									id: 'code',
									icon: SvgCode,
									value: `${printer.code.substr(
										0,
										4
									)}-${printer.code.substr(4)}`
								}
							]}
						/>
						{printer.notes ? (
							<InfoCard style={styles.card}>
								<Text style={styles.notesTitle}>Notes</Text>
								<Text style={styles.notes}>
									{printer.notes}
								</Text>
							</InfoCard>
						) : null}
						<View style={styles.chartContainer}>
							<StackedBarChart
								style={styles.chart}
								keys={['success', 'fail']}
								colors={[
									styles.chart_success_color.color,
									styles.chart_fail_color.color
								]}
								data={printChartData}
								contentInset={{ bottom: 10 }}
							/>
							<XAxis
								data={printChartData}
								xAccessor={({ item }) => item.date}
								formatLabel={(value: Moment) =>
									value.format('MMM')
								}
								svg={{
									fontSize: styles.xAxisLabel.fontSize,
									fill: styles.xAxisLabel.color
								}}
								contentInset={{ left: 15, right: 15 }}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
			<FAB style={styles.fab} icon="pencil" onPress={onEdit} />
		</React.Fragment>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			flex: 1
		},
		content: {},
		body: {
			marginTop: 8,
			paddingLeft: 16,
			paddingRight: 16,
			paddingBottom: 64
		},
		card: {
			marginBottom: 16
		},
		title: {
			...material.titleObject,
			color: theme.color.primary.text,
			marginBottom: 4
		},
		model: {
			...material.subheadingObject,
			color: theme.color.secondary.text
		},
		chips: {
			marginBottom: 32
		},
		notesTitle: {
			...material.subheadingObject,
			color: theme.color.primary.text
		},
		notes: {
			...material.body1Object,
			color: theme.color.primary.text
		},
		sectionLabel: {
			...material.subheadingObject,
			color: theme.color.primary.text,
			marginBottom: 8
		},
		printsChart: {
			height: 200,
			marginBottom: 16,
			backgroundColor: theme.color.secondary.background,
			borderRadius: 4
		},
		printsChart_success: {
			color: theme.color.primary.main
		},
		printsChart_fail: {
			color: theme.color.primary.error
		},
		chartContainer: {
			height: 200,
			marginBottom: 16,
			backgroundColor: theme.color.secondary.background,
			borderRadius: 4,
			justifyContent: 'space-between'
		},
		chart: {
			flex: 1
		},
		chart_fail_color: {
			color: theme.color.primary.error
		},
		chart_success_color: {
			color: theme.color.primary.main
		},
		xAxisLabel: {
			fontSize: 10,
			color: theme.color.primary.text
		},
		fab: {
			position: 'absolute',
			bottom: 0,
			right: 0,
			margin: 16,
			backgroundColor: theme.color.primary.accent
		}
	});

export default PrinterDetails;
