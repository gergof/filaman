import * as React from 'react';

import Svg, { SvgProps, G, Circle, Path } from 'react-native-svg';

function SvgSpool(props: SvgProps) {
	return (
		<Svg width={130} height={130} {...props}>
			<G fill="none" stroke="#000">
				<Circle
					transform="scale(1 -1)"
					cy={-65}
					cx={55}
					r={45}
					strokeWidth={8}
				/>
				<Circle cx={55.413} cy={65} strokeWidth={3} />
				<Circle
					transform="scale(1 -1)"
					cy={-65}
					cx={55.413}
					strokeWidth={5}
					r={21.239}
				/>
				<Circle cx={55.413} cy={65} r={10} strokeWidth={5} />
				<Path
					d="M90.413 25l14.085-.067c3 0 5 2 5 5v40c0 3 2 5 5 5l11.915.067"
					strokeWidth={5}
					strokeLinecap="round"
				/>
			</G>
		</Svg>
	);
}

export default SvgSpool;
