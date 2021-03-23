import React, { useState, useCallback } from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import {
	createStackNavigator,
	TransitionPresets
} from '@react-navigation/stack';
import type { GestureDirection } from '@react-navigation/stack/src/types';

import useStyles from '../hooks/useStyles';
import { MaterialsScreen, MaterialDetailsScreen } from '../screens';
import { AppTheme } from '../types';

import HomeTabNavigation from './HomeTabNavigation';
import BaseHeader from './headers/BaseHeader';
import HomeHeader from './headers/HomeHeader';

const Stack = createStackNavigator();

interface Props {}
const MainStackNavigation: React.FC<Props> = () => {
	const styles = useStyles(getStyles);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const openMenu = useCallback(() => {
		setMenuOpen(true);
	}, [setMenuOpen]);
	const closeMenu = useCallback(() => {
		setMenuOpen(false);
	}, [setMenuOpen]);

	const defaultOptions = {
		...TransitionPresets.SlideFromRightIOS,
		gestureDirection: 'horizontal' as GestureDirection
	};

	return (
		<React.Fragment>
			<StatusBar backgroundColor={styles.statusBar.backgroundColor} />
			<Stack.Navigator initialRouteName="Home" headerMode="screen">
				<Stack.Screen
					name="Home"
					options={{
						...defaultOptions,
						header: props => (
							<HomeHeader {...props} openMenu={openMenu} />
						)
					}}
				>
					{props => (
						<HomeTabNavigation
							{...props}
							menuOpen={menuOpen}
							closeMenu={closeMenu}
						/>
					)}
				</Stack.Screen>
				<Stack.Screen
					name="Materials"
					component={MaterialsScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Materials" />
						)
					}}
				/>
				<Stack.Screen
					name="MaterialDetails"
					component={MaterialDetailsScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Material Details" />
						)
					}}
				/>
			</Stack.Navigator>
		</React.Fragment>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		statusBar: {
			backgroundColor: theme.color.primary.dark
		}
	});

export default MainStackNavigation;
