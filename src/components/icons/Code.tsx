import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgCode(props: SvgProps) {
	return (
		<Svg width={130} height={130} {...props}>
			<Path d="M106.5 41v48h5V41zm-3 0v48h1V41zm-2 0v48h1V41zm-4 0v48h3V41zm-8 0v48h5V41zm-9 0v48h5V41zm-2 0v48h1V41zm-7 0v48h3V41zm-5 0v48h3V41zm-11 0v48h5V41zM41 41v48h12V41zm-5.5 0v48h1V41zm-8 0v48h5V41zm-9 0v48h3V41zM15 32.5c-4.113 0-7.5 3.387-7.5 7.5v50c0 4.113 3.387 7.5 7.5 7.5h100c4.113 0 7.5-3.387 7.5-7.5V40c0-4.113-3.387-7.5-7.5-7.5zm0 5h100c1.41 0 2.5 1.09 2.5 2.5v50c0 1.41-1.09 2.5-2.5 2.5H15c-1.41 0-2.5-1.09-2.5-2.5V40c0-1.41 1.09-2.5 2.5-2.5z" />
		</Svg>
	);
}

export default SvgCode;
