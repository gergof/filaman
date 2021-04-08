import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { material } from 'react-native-typography';

import HamburgerMenu from '../components/HamburgerMenu/HamburgerMenu';
import SvgPrint from '../components/icons/Print';
import SvgPrinter from '../components/icons/Printer';
import SvgSpool from '../components/icons/Spool';
import useStyles from '../hooks/useStyles';
import { WelcomeScreen, SpoolsScreen, PrintersScreen } from '../screens';
import mergeStyles from '../theme/mergeStyles';
import { AppTheme } from '../types';

const TabNavigator = createBottomTabNavigator();

interface Props {
	menuOpen: boolean;
	closeMenu: () => void;
}
const HomeTabNavigation: React.FC<Props> = ({ menuOpen, closeMenu }) => {
	const styles = useStyles(getStyles);

	return (
		<React.Fragment>
			<TabNavigator.Navigator
				initialRouteName="Spools"
				backBehavior="none"
				lazy={false}
			>
				<TabNavigator.Screen
					name="Spools"
					component={SpoolsScreen}
					options={{
						tabBarIcon: ({ focused }) => (
							<SvgSpool
								width={styles.icon.width}
								height={styles.icon.height}
								viewBox="0 0 130 130"
								fill={
									focused
										? styles.icon_active.color
										: styles.icon.color
								}
							/>
						),
						tabBarLabel: ({ focused }) => (
							<Text
								style={mergeStyles(styles, [
									'label',
									['label_active', focused]
								])}
							>
								Spools
							</Text>
						)
					}}
				/>
				<TabNavigator.Screen
					name="Printers"
					component={PrintersScreen}
					options={{
						tabBarIcon: ({ focused }) => (
							<SvgPrinter
								width={styles.icon.width}
								height={styles.icon.height}
								viewBox="0 0 130 130"
								fill={
									focused
										? styles.icon_active.color
										: styles.icon.color
								}
							/>
						),
						tabBarLabel: ({ focused }) => (
							<Text
								style={mergeStyles(styles, [
									'label',
									['label_active', focused]
								])}
							>
								Printers
							</Text>
						)
					}}
				/>
				<TabNavigator.Screen
					name="Prints"
					component={WelcomeScreen}
					options={{
						tabBarIcon: ({ focused }) => (
							<SvgPrint
								width={styles.icon.width}
								height={styles.icon.height}
								viewBox="0 0 130 130"
								fill={
									focused
										? styles.icon_active.color
										: styles.icon.color
								}
							/>
						),
						tabBarLabel: ({ focused }) => (
							<Text
								style={mergeStyles(styles, [
									'label',
									['label_active', focused]
								])}
							>
								Prints
							</Text>
						)
					}}
				/>
			</TabNavigator.Navigator>
			<HamburgerMenu open={menuOpen} close={closeMenu} />
		</React.Fragment>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		label: {
			...material.captionObject,
			color: theme.color.secondary.text
		},
		label_active: {
			color: theme.color.primary.active
		},
		icon: {
			width: 28,
			height: 28,
			color: theme.color.secondary.text
		},
		icon_active: {
			color: theme.color.primary.active
		}
	});

export default HomeTabNavigation;
