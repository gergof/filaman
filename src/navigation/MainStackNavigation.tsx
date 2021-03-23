import React, { useState, useCallback } from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import useStyles from '../hooks/useStyles';
import { AppTheme } from '../types';

import HomeTabNavigation from './HomeTabNavigation';
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

	return (
		<React.Fragment>
			<StatusBar backgroundColor={styles.statusBar.backgroundColor} />
			<Stack.Navigator initialRouteName="Home" headerMode="screen">
				<Stack.Screen
					name="Home"
					options={{
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
