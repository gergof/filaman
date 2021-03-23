import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgCode(props: SvgProps) {
	return (
		<Svg
			xmlns="http://www.w3.org/2000/svg"
			width={130}
			height={130}
			{...props}
		>
			<Path
				style={{
					lineHeight: 'normal',
					fontVariantLigatures: 'normal',
					fontVariantPosition: 'normal',
					fontVariantCaps: 'normal',
					fontVariantNumeric: 'normal',
					fontVariantAlternates: 'normal',
					fontVariantEastAsian: 'normal',
					fontFeatureSettings: 'normal',
					fontVariationSettings: 'normal',
					textIndent: 0,
					textAlign: 'start',
					textDecorationLine: 'none',
					textDecorationStyle: 'solid',
					textDecorationColor: '#000',
					textTransform: 'none',
					textOrientation: 'mixed',
					whiteSpace: 'normal',
					shapePadding: 0,
					shapeMargin: 0,
					inlineSize: 0,
					isolation: 'auto',
					mixBlendMode: 'normal',
					solidColor: '#000',
					solidOpacity: 1
				}}
				d="M106.5 41v48h5V41zm-3 0v48h1V41zm-2 0v48h1V41zm-4 0v48h3V41zm-8 0v48h5V41zm-9 0v48h5V41zm-2 0v48h1V41zm-7 0v48h3V41zm-5 0v48h3V41zm-11 0v48h5V41zM41 41v48h12V41zm-5.5 0v48h1V41zm-8 0v48h5V41zm-9 0v48h3V41zM15 32.5c-4.113 0-7.5 3.387-7.5 7.5v50c0 4.113 3.387 7.5 7.5 7.5h100c4.113 0 7.5-3.387 7.5-7.5V40c0-4.113-3.387-7.5-7.5-7.5zm0 5h100c1.41 0 2.5 1.09 2.5 2.5v50c0 1.41-1.09 2.5-2.5 2.5H15c-1.41 0-2.5-1.09-2.5-2.5V40c0-1.41 1.09-2.5 2.5-2.5z"
				color="#000"
				fontWeight={400}
				fontFamily="sans-serif"
				overflow="visible"
				paintOrder="fill markers stroke"
			/>
		</Svg>
	);
}

export default SvgCode;
