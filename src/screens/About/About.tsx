import React, { useCallback } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	Image,
	Text,
	Linking
} from 'react-native';

import moment from 'moment';
import { material } from 'react-native-typography';

import appInfo from '../../../app.json';
import useStyles from '../../hooks/useStyles';
import { AppTheme } from '../../types';

interface Props {}
const About: React.FC<Props> = () => {
	const styles = useStyles(getStyles);

	const onGHLink = useCallback(() => {
		Linking.openURL(appInfo.repo);
	}, []);

	const onLicenseLink = useCallback(() => {
		Linking.openURL(`${appInfo.repo}/blob/master/LICENSE`);
	}, []);

	return (
		<ScrollView style={styles.container}>
			<View style={styles.logoContainer}>
				<Image source={require('./AppIcon.png')} style={styles.logo} />
			</View>
			<Text style={styles.title}>Filaman</Text>
			<Text style={styles.description}>
				Manage your 3D printers, filament spools and calculate price of
				printed objects from a single, convinient open-source
				application.
			</Text>
			<Text style={styles.copyright}>
				{String.fromCharCode(169)} Copyright 2021
				{!moment().isSame(moment('2021'), 'year')
					? `-${moment().format('YYYY')}`
					: ''}{' '}
				Fándly Gergő-Zoltán{'\n'}Licensed under GPL-3.0
			</Text>
			<Text style={styles.link} onPress={onGHLink}>
				View project on GitHub
			</Text>
			<Text style={styles.link} onPress={onLicenseLink}>
				License
			</Text>
		</ScrollView>
	);
};

const getStyles = (theme: AppTheme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.color.secondary.light,
			padding: 16
		},
		logoContainer: {
			marginTop: 32,
			marginBottom: 32,
			flexDirection: 'row',
			justifyContent: 'center'
		},
		logo: {
			width: 120,
			height: 120
		},
		title: {
			...material.display1Object,
			color: theme.color.primary.text,
			textAlign: 'center',
			marginBottom: 32
		},
		description: {
			...material.subheadingObject,
			color: theme.color.primary.text,
			textAlign: 'center',
			marginBottom: 64
		},
		copyright: {
			...material.captionObject,
			color: theme.color.secondary.text,
			textAlign: 'center',
			marginBottom: 16
		},
		link: {
			...material.body1Object,
			color: theme.color.primary.active,
			textAlign: 'center',
			marginBottom: 8
		}
	});

export default About;
