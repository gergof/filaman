import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgWeight(props: SvgProps) {
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
				d="M65 11c-10.446 0-19 8.554-19 19s8.554 19 19 19 19-8.554 19-19-8.554-19-19-19zm0 8c6.123 0 11 4.877 11 11s-4.877 11-11 11-11-4.877-11-11 4.877-11 11-11zM40 41c-4.675 0-8.877 2.96-10.45 7.363L7.915 108.945C6.206 113.728 9.921 119 15 119h100c5.079 0 8.794-5.272 7.086-10.055l-21.637-60.582A11.123 11.123 0 0090 41zm0 8h50c1.322 0 2.47.81 2.914 2.055L114.324 111H15.676l21.41-59.945A3.068 3.068 0 0140 49z"
				color="#000"
				fontWeight={400}
				fontFamily="sans-serif"
				overflow="visible"
			/>
		</Svg>
	);
}

export default SvgWeight;
