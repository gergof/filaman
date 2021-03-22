import * as React from 'react';

import Svg, { SvgProps, G, Path } from 'react-native-svg';

function SvgPrinter(props: SvgProps) {
	return (
		<Svg width={130} height={130} {...props}>
			<G stroke="#000">
				<Path
					d="M43 5h44a3 3 45 013 3v44a3 3 135 01-3 3H43a3 3 45 01-3-3V8a3 3 135 013-3z"
					fill="none"
					strokeWidth={8}
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeMiterlimit={50}
				/>
				<Path d="M50 56h30L68 76h-6z" strokeWidth={2} />
				<Path
					d="M65 85v10c0 4 1 5 5 5h40c4 0 5 1 5 5s-1 5-5 5H20c-4 0-5 1-5 5s1 5 5 5h95"
					fill="none"
					strokeWidth={5}
					strokeLinecap="square"
				/>
			</G>
		</Svg>
	);
}

export default SvgPrinter;
