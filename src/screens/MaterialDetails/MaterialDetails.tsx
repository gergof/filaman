import React, { useCallback } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { RouteProp, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FAB } from 'react-native-paper';
import { material } from 'react-native-typography';
import stringToColor from 'string-to-color';

import DetailChips from '../../components/DetailChips';
import InfoCard from '../../components/InfoCard';
import SvgDensity from '../../components/icons/Density';
import Materials from '../../data/state/actions/Materials';
import { useAppSelector } from '../../hooks/reduxHooks';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

import MaterialDetailsHeader from './MaterialDetailsHeader';

interface Params extends ParamListBase {
	MaterialDetails: {
		id: string;
	};
}
interface Props {
	route: RouteProp<Params, 'MaterialDetails'>;
	navigation: StackNavigationProp<Params, 'MaterialDetails'>;
}
const MaterialDetails: React.FC<Props> = ({ route, navigation }) => {
	const id = route.params.id;
	const styles = useStyles(getStyles);
	const material = useAppSelector(Materials.get(id));

	const onEdit = useCallback(() => {
		if (material && material.id) {
			navigation.navigate('EditMaterial', { id: material.id });
		}
	}, [navigation, material]);

	if (!material) {
		navigation.goBack();
		return null;
	}

	return (
		<React.Fragment>
			<ScrollView style={styles.container}>
				<View style={styles.content}>
					<MaterialDetailsHeader
						code={material.code}
						color={stringToColor(material.code)}
					/>
					<View style={styles.body}>
						<InfoCard style={styles.card}>
							<Text style={styles.name}>{material.name}</Text>
						</InfoCard>
						<DetailChips
							style={styles.chips}
							chips={[
								{
									id: 'density',
									icon: SvgDensity,
									value: `${
										material.density / 1000
									} g/cm${String.fromCharCode(179)}`
								}
							]}
						/>
						{material.notes ? (
							<InfoCard style={styles.card}>
								<Text style={styles.notesTitle}>Notes</Text>
								<Text style={styles.notes}>
									{material.notes}
								</Text>
							</InfoCard>
						) : null}
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
			paddingRight: 16
		},
		name: {
			...material.titleObject,
			color: theme.color.primary.text
		},
		card: {
			marginBottom: 16
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
		fab: {
			position: 'absolute',
			margin: 16,
			right: 0,
			bottom: 0,
			backgroundColor: theme.color.primary.accent
		}
	});

export default MaterialDetails;
