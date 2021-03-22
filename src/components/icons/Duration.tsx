import * as React from 'react';

import Svg, { SvgProps, G, Path } from 'react-native-svg';

function SvgDuration(props: SvgProps) {
	return (
		<Svg width={130} height={130} {...props}>
			<G fill="none" stroke="#000" strokeWidth={8} strokeLinecap="round">
				<Path d="M117.934 79.932a55 55 0 01-53.867 40.06A55 55 0 0111.59 78.128a55 55 0 0127.09-61.421 55 55 0 0166.3 10.523" />
				<Path d="M91 33h20V13" />
				<Path d="M65 35v30l15 10v0" strokeLinejoin="round" />
			</G>
		</Svg>
	);
}

export default SvgDuration;
