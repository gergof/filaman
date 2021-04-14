import React, { useCallback, useMemo } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import _ from 'lodash';
import moment, { Moment } from 'moment';
import { FAB } from 'react-native-paper';
import { material, systemWeights } from 'react-native-typography';

import DetailChips from '../../components/DetailChips';
import InfoCard from '../../components/InfoCard';
import SvgCode from '../../components/icons/Code';
import SvgDiameter from '../../components/icons/Diameter';
import SvgPrice from '../../components/icons/Price';
import SvgWeight from '../../components/icons/Weight';
import Spools from '../../data/state/actions/Spools';
import { useAppSelector } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

import SpoolDetailsHeader from './SpoolDetailsHeader';
import UsageChart from './UsageChart';

interface Params extends ParamListBase {
	SpoolDetails: {
		id: string;
	};
}
interface Props {
	route: RouteProp<Params, 'SpoolDetails'>;
	navigation: StackNavigationProp<Params, 'SpoolDetails'>;
}
const SpoolDetails: React.FC<Props> = ({ route, navigation }) => {
	const id = route.params.id;
	const styles = useStyles(getStyles);
	const spool = useAppSelector(Spools.get(id));

	const onEdit = useCallback(() => {
		if (spool) {
			navigation.navigate('EditSpool', { id: spool.id });
		}
	}, [navigation, spool]);

	const usageChartData: {
		date: Moment;
		remaining: number;
	}[] = useMemo(() => {
		if (!spool) {
			return [];
		}

		const firstPrint = spool.prints.reduce(
			(acc, cur) =>
				moment(cur.date).isBefore(acc) ? moment(cur.date) : acc,
			moment()
		);

		const printsUsage = spool.prints.reduce(
			(acc, cur) => {
				const last = _.last(acc);

				if (!last) {
					return [];
				}

				if (moment(cur.date).isSame(last.date, 'day')) {
					return [
						...acc.slice(0, -1),
						{
							...last,
							remaining: last.remaining - cur.weight
						}
					];
				}

				return [
					...acc,
					{
						date: moment(cur.date),
						remaining: last.remaining - cur.weight
					}
				];
			},
			[{ date: firstPrint.subtract(1, 'days'), remaining: spool.weight }]
		);

		return [
			...printsUsage,
			{ date: moment(), remaining: _.last(printsUsage)?.remaining || 0 }
		];
	}, [spool]);

	if (!spool) {
		navigation.goBack();
		return null;
	}

	return (
		<React.Fragment>
			<ScrollView style={styles.container}>
				<View style={styles.content}>
					<SpoolDetailsHeader spool={spool} />
					<View style={styles.body}>
						<InfoCard style={styles.card}>
							<Text style={styles.title}>{spool.name}</Text>
							{spool.manufacturer ? (
								<Text style={styles.manufacturer}>
									{spool.manufacturer}
								</Text>
							) : null}
						</InfoCard>
						<DetailChips
							style={styles.chips}
							chips={[
								{
									id: 'diameter',
									icon: SvgDiameter,
									value: `${spool.diameter} mm`
								},
								{
									id: 'weight',
									icon: SvgWeight,
									value: `${spool.totalWeight} g`
								},
								{
									id: 'price',
									icon: SvgPrice,
									value: `${spool.price.value} ${spool.price.currency}`
								},
								{
									id: 'code',
									icon: SvgCode,
									value: `${spool.code.substr(
										0,
										4
									)}-${spool.code.substr(4)}`
								}
							]}
						/>
						<InfoCard style={styles.card}>
							<Text style={styles.text}>
								Remaining:{' '}
								<Text
									style={[styles.text, styles.text_regular]}
								>
									{spool.remaining}g (
									{Math.floor(
										(spool.remaining / spool.totalWeight) *
											100 *
											10
									) / 10}
									%)
								</Text>
							</Text>
						</InfoCard>
						<Text style={styles.sectionLabel}>Usage</Text>
						<UsageChart
							style={styles.usageChart}
							data={usageChartData}
							total={spool.totalWeight}
							color={styles.usageChart_line.color}
						/>
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
		manufacturer: {
			...material.subheadingObject,
			color: theme.color.secondary.text
		},
		chips: {
			marginBottom: 32
		},
		text: {
			...material.body2Object,
			color: theme.color.primary.text
		},
		text_regular: {
			...systemWeights.regular
		},
		sectionLabel: {
			...material.subheadingObject,
			color: theme.color.primary.text,
			marginBottom: 8
		},
		usageChart: {
			height: 200,
			marginBottom: 16,
			backgroundColor: theme.color.secondary.background,
			borderRadius: 4
		},
		usageChart_line: {
			color: theme.color.primary.main
		},
		fab: {
			position: 'absolute',
			margin: 16,
			right: 0,
			bottom: 0,
			backgroundColor: theme.color.primary.accent
		}
	});

export default SpoolDetails;
