import React, { useState, useRef, useCallback } from 'react';
import {
	StyleProp,
	ViewStyle,
	StyleSheet,
	View,
	Image,
	Animated,
	Easing
} from 'react-native';

import { Blurhash } from 'react-native-blurhash';

import MImage from '../data/models/Image';
import useStyles from '../hooks/useStyles';

const AnimatedBlurhash = Animated.createAnimatedComponent(Blurhash);

interface Props {
	image: MImage;
	style?: StyleProp<ViewStyle>;
}
const BlurhashImage: React.FC<Props> = ({ image, style }) => {
	const styles = useStyles(getStyles);
	const animation = useRef(new Animated.Value(1)).current;
	const [isLoading, setIsLoading] = useState(true);

	const onLoad = useCallback(() => {
		Animated.timing(animation, {
			toValue: 0,
			duration: 500,
			easing: Easing.out(Easing.exp),
			useNativeDriver: false
		}).start(() => {
			setIsLoading(false);
		});
	}, [animation, setIsLoading]);

	return (
		<View style={[styles.container, style]}>
			<Image
				style={styles.image}
				source={{ uri: image.path }}
				onLoad={onLoad}
			/>
			{isLoading ? (
				<AnimatedBlurhash
					style={[styles.blurhash, { opacity: animation }]}
					blurhash={image.blurhash}
				/>
			) : null}
		</View>
	);
};

const getStyles = () =>
	StyleSheet.create({
		container: {
			overflow: 'hidden'
		},
		image: {
			flex: 1,
			resizeMode: 'cover'
		},
		blurhash: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0
		}
	});

export default BlurhashImage;
