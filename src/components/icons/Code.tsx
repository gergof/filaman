import * as React from 'react';

import Svg, { SvgProps, G, Path } from 'react-native-svg';

function SvgCode(props: SvgProps) {
	return (
		<Svg width={130} height={130} {...props}>
			<G fill="none" stroke="#000">
				<Path
					d="M15 35h100a5 5 45 015 5v50a5 5 135 01-5 5H15a5 5 45 01-5-5V40a5 5 135 015-5z"
					strokeWidth={5}
				/>
				<Path d="M20 41v48" strokeWidth={3} strokeLinejoin="round" />
				<Path d="M30 41v48" strokeWidth={5} strokeLinejoin="round" />
				<Path d="M36 41v48" strokeLinejoin="round" />
				<Path d="M47 41v48" strokeWidth={12} strokeLinejoin="round" />
				<Path d="M58 41v48" strokeWidth={5} strokeLinejoin="round" />
				<Path
					d="M68 41v48M73 41v48"
					strokeWidth={3}
					strokeLinejoin="round"
				/>
				<Path d="M79 41v48" strokeLinejoin="round" />
				<Path
					d="M83 41v48M92 41v48"
					strokeWidth={5}
					strokeLinejoin="round"
				/>
				<Path d="M99 41v48" strokeWidth={3} strokeLinejoin="round" />
				<Path d="M102 41v48M104 41v48" strokeLinejoin="round" />
				<Path d="M109 41v48" strokeWidth={5} strokeLinejoin="round" />
			</G>
		</Svg>
	);
}

export default SvgCode;
