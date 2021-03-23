import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgDiameter(props: SvgProps) {
	return (
		<Svg width={130} height={130} {...props}>
			<Path d="M114.945 11a4 4 0 00-2.773 1.172l-100 100a4 4 0 000 5.656 4 4 0 005.656 0l100-100a4 4 0 000-5.656A4 4 0 00114.945 11zM65 16c-27.015 0-49 21.985-49 49s21.985 49 49 49 49-21.985 49-49-21.985-49-49-49zm0 8c22.691 0 41 18.309 41 41s-18.309 41-41 41-41-18.309-41-41 18.309-41 41-41z" />
		</Svg>
	);
}

export default SvgDiameter;
