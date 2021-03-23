import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgPrinter(props: SvgProps) {
	return (
		<Svg width={130} height={130} {...props}>
			<Path d="M62.5 82.5V95c0 2.208.197 4.232 1.732 5.768 1.536 1.535 3.56 1.732 5.768 1.732h40c1.792 0 2.268.303 2.232.268-.035-.036.268.44.268 2.232 0 1.792-.303 2.268-.268 2.232.036-.035-.44.268-2.232.268H20c-2.208 0-4.232.197-5.768 1.732-1.535 1.536-1.732 3.56-1.732 5.768 0 2.208.197 4.232 1.732 5.768 1.536 1.535 3.56 1.732 5.768 1.732h97.5v-5H20c-1.792 0-2.268-.303-2.232-.268.035.036-.268-.44-.268-2.232 0-1.792.303-2.268.268-2.232-.036.035.44-.268 2.232-.268h90c2.208 0 4.232-.197 5.768-1.732 1.535-1.536 1.732-3.56 1.732-5.768 0-2.208-.197-4.232-1.732-5.768-1.536-1.535-3.56-1.732-5.768-1.732H70c-1.792 0-2.268-.303-2.232-.268.035.036-.268-.44-.268-2.232V82.5zM43 1c-3.819 0-7 3.181-7 7v44c0 3.819 3.181 7 7 7h8.8L62 76h6l10.2-17H87c3.819 0 7-3.181 7-7V8c0-3.819-3.181-7-7-7zm1 8h42v42H44z" />
		</Svg>
	);
}

export default SvgPrinter;
