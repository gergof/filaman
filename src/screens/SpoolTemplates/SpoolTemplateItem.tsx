import React, { useCallback } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { material } from 'react-native-typography';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SpoolTemplate from '../../data/models/SpoolTemplate';
import useStyles from '../../hooks/useStyles';
import mergeStyles from '../../theme/mergeStyles';
import { AppTheme } from '../../types';

interface Props {
	item: SpoolTemplate;
}
const SpoolTemplateItem: React.FC<Props> = ({ item }) => {
	const styles = useStyles(getStyles);
	const navigation = useNavigation();

	const onEdit = useCallback(() => {
		navigation.navigate('EditSpoolTemplate', { id: item.id });
	}, [navigation, item.id]);

	const onCreateFrom = useCallback(() => {
		navigation.navigate('AddSpool', { fromTemplate: item });
	}, [navigation, item]);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{item.name}</Text>
			<View style={styles.actionIcons}>
				<Pressable
					style={({ pressed }) =>
						mergeStyles(styles, [
							'actionIconButton',
							['actionIconButton_pressed', pressed]
						])
					}
					hitSlop={10}
					onPress={onEdit}
				>
					<Icon
						size={styles.actionIcon.width}
						name="build"
						color={styles.actionIcon.color}
					/>
				</Pressable>
				<Pressable
					style={({ pressed }) =>
						mergeStyles(styles, [
							'actionIconButton',
							['actionIconButton_pressed', pressed]
						])
					}
					hitSlop={10}
					onPress={onCreateFrom}
				>
					<Icon
						size={styles.actionIcon.width}
						name="add"
						color={styles.actionIcon.color}
					/>
				</Pressable>
			</View>
		</View>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			// height: 'auto',
			borderBottomWidth: 1,
			borderBottomColor: theme.color.primary.divider,
			padding: 16,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between'
		},
		title: {
			...material.subheadingObject,
			color: theme.color.primary.text,
			flex: 1
		},
		actionIcons: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		actionIconButton: {
			marginLeft: 24
		},
		actionIcon: {
			width: 18,
			color: theme.color.primary.accent
		},
		actionIconButton_pressed: {
			opacity: 0.4
		}
	});

export default SpoolTemplateItem;
