import React, { useState, useCallback } from 'react';
import { StyleSheet, StatusBar } from 'react-native';

import {
	createStackNavigator,
	TransitionPresets
} from '@react-navigation/stack';
import type { GestureDirection } from '@react-navigation/stack/src/types';

import useStyles from '../hooks/useStyles';
import {
	MaterialsScreen,
	MaterialDetailsScreen,
	AddMaterialScreen,
	EditMaterialScreen,
	AddSpoolScreen,
	SpoolDetailsScreen,
	EditSpoolScreen,
	AddPrinterScreen,
	PrinterDetailsScreen,
	EditPrinterScreen,
	AddPrintScreen,
	PrintDetailsScreen,
	EditPrintScreen,
	SpoolTemplatesScreen,
	AddSpoolTemplateScreen,
	EditSpoolTemplateScreen
} from '../screens';
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
					name="AddMaterial"
					component={AddMaterialScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Add Material" />
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
				<Stack.Screen
					name="EditMaterial"
					component={EditMaterialScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Edit Material" />
						)
					}}
				/>
				<Stack.Screen
					name="AddSpool"
					component={AddSpoolScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Add Spool" />
						)
					}}
				/>
				<Stack.Screen
					name="SpoolDetails"
					component={SpoolDetailsScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Spool Details" />
						)
					}}
				/>
				<Stack.Screen
					name="EditSpool"
					component={EditSpoolScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Edit Spool" />
						)
					}}
				/>
				<Stack.Screen
					name="AddPrinter"
					component={AddPrinterScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Add Printer" />
						)
					}}
				/>
				<Stack.Screen
					name="PrinterDetails"
					component={PrinterDetailsScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Printer Details" />
						)
					}}
				/>
				<Stack.Screen
					name="EditPrinter"
					component={EditPrinterScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Edit Printer" />
						)
					}}
				/>
				<Stack.Screen
					name="AddPrint"
					component={AddPrintScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Add Print" />
						)
					}}
				/>
				<Stack.Screen
					name="PrintDetails"
					component={PrintDetailsScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Print Details" />
						)
					}}
				/>
				<Stack.Screen
					name="EditPrint"
					component={EditPrintScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Edit Print" />
						)
					}}
				/>
				<Stack.Screen
					name="SpoolTemplates"
					component={SpoolTemplatesScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Spool Templates" />
						)
					}}
				/>
				<Stack.Screen
					name="AddSpoolTemplate"
					component={AddSpoolTemplateScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader {...props} title="Add Spool Template" />
						)
					}}
				/>
				<Stack.Screen
					name="EditSpoolTemplate"
					component={EditSpoolTemplateScreen}
					options={{
						...defaultOptions,
						header: props => (
							<BaseHeader
								{...props}
								title="Edit Spool Template"
							/>
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
