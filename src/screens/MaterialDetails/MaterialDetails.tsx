import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { RouteProp, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
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

	if (!material) {
		navigation.goBack();
		return null;
	}

	return (
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
						chips={[
							{
								id: 'density',
								icon: SvgDensity,
								value: `${
									material.density / 1000
								} g/m${String.fromCharCode(179)}`
							}
						]}
					/>
				</View>
			</View>
		</ScrollView>
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
		}
	});

export default MaterialDetails;
