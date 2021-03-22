import * as React from 'react';

import Svg, { SvgProps, G, Path, Circle } from 'react-native-svg';

function SvgWeight(props: SvgProps) {
	return (
		<Svg width={130} height={130} {...props}>
			<G fill="none" stroke="#000" strokeWidth={8}>
				<Path d="M118.318 110.291L96.682 49.71A7.095 7.095 35.173 0090 45H40a7.095 7.095 144.827 00-6.682 4.709L11.682 110.29A3.524 3.524 54.827 0015 115h100a3.524 3.524 125.173 003.318-4.709z" />
				<Circle cy={30} cx={65} r={15} strokeLinecap="round" />
			</G>
		</Svg>
	);
}

export default SvgWeight;
