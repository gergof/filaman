import * as React from 'react';

import Svg, { SvgProps, G, Path } from 'react-native-svg';

function SvgPrint(props: SvgProps) {
	return (
		<Svg width={130} height={130} {...props}>
			<G stroke="#000">
				<Path
					d="M65 10l44.575 28.057L65 66.114 20.425 38.057z"
					strokeWidth={1.444}
				/>
				<Path
					transform="skewY(32.384) scale(.84448 1)"
					strokeWidth={1.217}
					strokeLinecap="square"
					d="M17.588 37.401h52.784v44.891H17.588z"
				/>
				<Path
					transform="skewY(-32.384) scale(.84448 1)"
					strokeWidth={1.217}
					strokeLinecap="square"
					d="M83.568 119.85h52.784v44.891H83.568z"
				/>
			</G>
		</Svg>
	);
}

export default SvgPrint;
