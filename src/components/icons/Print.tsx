import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgPrint(props: SvgProps) {
	return (
		<Svg width={130} height={130} {...props}>
			<Path d="M70.572 75.092l44.575-28.27v44.89l-44.575 28.27zm-55.72-28.27l44.576 28.27v44.89l-44.575-28.27zM65 10l44.575 28.057L65 66.114 20.425 38.057z" />
		</Svg>
	);
}

export default SvgPrint;
