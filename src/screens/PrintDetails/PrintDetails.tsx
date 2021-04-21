import React, { useCallback, useState, useMemo } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import moment from 'moment';
import { Button, FAB } from 'react-native-paper';
import { material } from 'react-native-typography';

import DetailChips from '../../components/DetailChips';
import InfoCard from '../../components/InfoCard';
import SvgDuration from '../../components/icons/Duration';
import SvgPrice from '../../components/icons/Price';
import SvgPrinter from '../../components/icons/Printer';
import SvgSpool from '../../components/icons/Spool';
import SvgWeight from '../../components/icons/Weight';
import Prints from '../../data/state/actions/Prints';
import { useAppSelector } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

import DoneModal from './DoneModal';
import FailModal from './FailModal';
import PrintDetailsHeader from './PrintDetailsHeader';

interface Params extends ParamListBase {
	PrintDetails: {
		id: string;
	};
}
interface Props {
	route: RouteProp<Params, 'PrintDetails'>;
	navigation: StackNavigationProp<Params, 'PrintDetails'>;
}
const PrintDetails: React.FC<Props> = ({ route, navigation }) => {
	const id = route.params.id;
	const styles = useStyles(getStyles);
	const print = useAppSelector(Prints.get(id));

	const [isFailedModalOpen, setFailedModalOpen] = useState<boolean>(false);
	const [isDoneModalOpen, setDoneModalOpen] = useState<boolean>(false);

	const onFailedPress = useCallback(() => {
		setFailedModalOpen(true);
	}, [setFailedModalOpen]);
	const onSuccessPress = useCallback(() => {
		setDoneModalOpen(true);
	}, [setDoneModalOpen]);
	const onFailedClose = useCallback(() => {
		setFailedModalOpen(false);
	}, [setFailedModalOpen]);
	const onDoneClose = useCallback(() => {
		setDoneModalOpen(false);
	}, [setDoneModalOpen]);

	const onPrintAgainPress = useCallback(() => {
		if (print) {
			navigation.navigate('AddPrint', { reprint: print });
		}
	}, [navigation, print]);

	const printPrice = useMemo(
		() =>
			print
				? print.weight *
				  (print.progress === null ? 1 : print.progress) *
				  (print.spool.price.value / print.spool.totalWeight)
				: 0,
		[print]
	);

	const onEdit = useCallback(() => {
		navigation.navigate('EditPrint', { id: id });
	}, [navigation, id]);

	if (!print) {
		navigation.goBack();
		return null;
	}

	return (
		<React.Fragment>
			<ScrollView style={styles.container}>
				<View style={styles.content}>
					<PrintDetailsHeader print={print} />
					<View style={styles.body}>
						<InfoCard style={styles.card}>
							<Text style={styles.title}>{print.name}</Text>
							<Text style={styles.date}>
								{moment(print.date).format('YYYY-MM-DD')}
							</Text>
						</InfoCard>
						<DetailChips
							style={styles.chips}
							chips={[
								{
									id: 'spool',
									icon: SvgSpool,
									value: print.spool.name
								},
								{
									id: 'printer',
									icon: SvgPrinter,
									value: print.printer.name
								},
								{
									id: 'weight',
									icon: SvgWeight,
									value:
										`${print.weight} g` +
										(print.progress !== null &&
										print.progress != 1
											? ` (${Math.floor(
													print.weight *
														print.progress
											  )} g used)`
											: '')
								},
								{
									id: 'price',
									icon: SvgPrice,
									value: `${
										Math.round(printPrice * 100) / 100
									} ${print.spool.price.currency}`
								},
								...(print.progress !== null
									? [
											{
												id: 'duration',
												icon: SvgDuration,
												value: `${Math.floor(
													moment
														.duration(
															print.duration,
															'seconds'
														)
														.asHours()
												)} hrs ${moment
													.duration(
														print.duration,
														'seconds'
													)
													.minutes()} min`
											}
									  ]
									: [])
							]}
						/>
						{print.notes ? (
							<InfoCard style={styles.card}>
								<Text style={styles.notesTitle}>Notes</Text>
								<Text style={styles.notes}>{print.notes}</Text>
							</InfoCard>
						) : null}
						{print.progress === null ? (
							<View style={styles.inProgressButtons}>
								<Button
									style={styles.inProgressButton}
									labelStyle={styles.buttonText}
									mode="contained"
									onPress={onFailedPress}
								>
									Print Failed
								</Button>
								<Button
									style={styles.inProgressButton}
									labelStyle={styles.buttonText}
									mode="contained"
									onPress={onSuccessPress}
								>
									Print Done
								</Button>
							</View>
						) : (
							<View style={styles.doneButtons}>
								<Button
									style={styles.doneButton}
									labelStyle={styles.buttonText}
									mode="contained"
									onPress={onPrintAgainPress}
								>
									Print Again
								</Button>
							</View>
						)}
					</View>
				</View>
			</ScrollView>
			<DoneModal
				id={print.id}
				initialDuration={print.duration}
				open={isDoneModalOpen}
				onClose={onDoneClose}
			/>
			<FailModal
				id={print.id}
				open={isFailedModalOpen}
				onClose={onFailedClose}
			/>
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
		date: {
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
		inProgressButtons: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginTop: 32
		},
		inProgressButton: {
			width: '48%'
		},
		buttonText: {
			color: theme.color.secondary.light
		},
		fab: {
			position: 'absolute',
			bottom: 0,
			right: 0,
			margin: 16,
			backgroundColor: theme.color.primary.accent
		},
		doneButtons: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			marginTop: 32
		},
		doneButton: {
			flex: 1
		}
	});

export default PrintDetails;
