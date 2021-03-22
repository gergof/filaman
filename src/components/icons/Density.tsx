import * as React from 'react';

import Svg, { SvgProps, G, Circle } from 'react-native-svg';

function SvgDensity(props: SvgProps) {
	return (
		<Svg width={130} height={130} {...props}>
			<G
				fill="none"
				stroke="#000"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<Circle cx={65} cy={65} r={55} strokeWidth={8} />
				<Circle cx={52.5} cy={47.5} r={12.5} strokeWidth={5} />
				<Circle cx={85} cy={40} r={5} strokeWidth={5} />
				<Circle cx={82.5} cy={87.5} r={17.5} strokeWidth={5} />
				<Circle cx={25} cy={65} r={5} strokeWidth={5} />
				<Circle cx={50} cy={85} r={10} strokeWidth={5} />
				<Circle cx={67.5} cy={27.5} r={7.5} strokeWidth={5} />
				<Circle cx={102.5} cy={57.5} r={2.5} strokeWidth={5} />
				<Circle cx={77.5} cy={57.5} r={2.5} strokeWidth={5} />
				<Circle cx={62.5} cy={107.5} r={2.5} strokeWidth={5} />
				<Circle cx={32.5} cy={52.5} r={7.5} strokeWidth={5} />
				<Circle cx={27.5} cy={87.5} r={2.5} strokeWidth={5} />
			</G>
		</Svg>
	);
}

export default SvgDensity;
