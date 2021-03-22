import * as React from 'react';

import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';

function SvgDiameter(props: SvgProps) {
	return (
		<Svg width={130} height={130} {...props}>
			<G fill="none" stroke="#000" strokeWidth={8}>
				<Circle cy={65} cx={65} r={45} strokeLinecap="square" />
				<Path d="M15 115L115 15" strokeLinecap="round" />
			</G>
		</Svg>
	);
}

export default SvgDiameter;
