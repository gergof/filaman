import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
	StyleSheet,
	Modal,
	View,
	Animated,
	Pressable,
	ScrollView
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import useStyles from '../../hooks/useStyles';
import mergeStyles from '../../theme/mergeStyles';
import { AppTheme } from '../../types';

import HamburgerMenuItem from './HamburgerMenuItem';

interface Props {
	open: boolean;
	close: () => void;
}
const HamburgerMenu: React.FC<Props> = ({ open, close }) => {
	const styles = useStyles(getStyles);
	const navigation = useNavigation();
	const animation = useRef(new Animated.Value(0)).current;
	const [lastState, setLastState] = useState(false);
	const [shouldShow, setShouldShow] = useState(false);

	const navigateToScreen = useCallback(
		(screen: string) => {
			close();
			navigation.navigate(screen);
		},
		[navigation, close]
	);

	useEffect(() => {
		if (lastState == false && open == true) {
			setShouldShow(true);
			Animated.spring(animation, {
				toValue: 1,
				speed: 30,
				useNativeDriver: false
			}).start();
		}

		if (lastState == true && open == false) {
			Animated.spring(animation, {
				toValue: 0,
				speed: 30,
				useNativeDriver: false
			}).start(() => {
				setShouldShow(false);
			});
		}

		setLastState(open);
	}, [open]); // eslint-disable-line react-hooks/exhaustive-deps

	const modalTranslate = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [-270, -20]
	});

	return (
		<Modal visible={shouldShow} transparent={true} onRequestClose={close}>
			<Animated.View
				style={[
					styles.container,
					{ transform: [{ translateX: modalTranslate }] }
				]}
			>
				<Pressable
					hitSlop={10}
					onPress={close}
					style={({ pressed }) =>
						mergeStyles(styles, [['_pressed', pressed]])
					}
				>
					<Icon
						name="arrow-back"
						color={styles.closeButton.color}
						size={styles.closeButton.width}
					/>
				</Pressable>
				<ScrollView style={styles.list}>
					<HamburgerMenuItem
						title="Materials"
						icon={
							<Icon
								name="inventory"
								color={styles.itemIcon.color}
								size={styles.itemIcon.width}
							/>
						}
						onPress={() => navigateToScreen('Materials')}
					/>
					<HamburgerMenuItem
						title="Spool Templates"
						icon={
							<Icon
								name="build"
								color={styles.itemIcon.color}
								size={styles.itemIcon.width}
							/>
						}
						onPress={() => navigateToScreen('SpoolTemplates')}
					/>
					<View style={styles.separator} />
					<HamburgerMenuItem
						title="Settings"
						icon={
							<Icon
								name="settings"
								color={styles.itemIcon.color}
								size={styles.itemIcon.width}
							/>
						}
						onPress={() => navigateToScreen('Settings')}
					/>
					<HamburgerMenuItem
						title="About"
						icon={
							<Icon
								name="info"
								color={styles.itemIcon.color}
								size={styles.itemIcon.width}
							/>
						}
						onPress={() => navigateToScreen('About')}
					/>
				</ScrollView>
			</Animated.View>
		</Modal>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.color.primary.dark,
			width: 270,
			paddingTop: 8,
			padding: 16,
			paddingLeft: 36
		},
		closeButton: {
			width: 36,
			color: theme.color.secondary.light
		},
		list: {
			marginTop: 16
		},
		itemIcon: {
			width: 20,
			height: 20,
			color: theme.color.secondary.light
		},
		separator: {
			backgroundColor: theme.color.secondary.light,
			height: 1,
			width: 200,
			marginLeft: 14,
			marginRight: 14,
			marginTop: 16,
			marginBottom: 16,
			opacity: 0.2
		},
		_pressed: {
			opacity: 0.4
		}
	});

export default HamburgerMenu;
