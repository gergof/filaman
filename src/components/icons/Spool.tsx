import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgSpool(props: SvgProps) {
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
				d="M104.492 22.434l-14.09.066a2.5 2.5 0 00-2.488 2.512 2.5 2.5 0 002.512 2.488l14.072-.066c.944 0 1.488.272 1.857.642.37.37.643.913.643 1.858v40c0 2.055.727 4.012 2.107 5.392 1.38 1.38 3.337 2.108 5.393 2.108l11.9.066a2.5 2.5 0 002.516-2.486 2.5 2.5 0 00-2.486-2.514l-11.922-.066h-.008c-.945 0-1.488-.273-1.858-.643-.37-.37-.642-.913-.642-1.857v-40c0-2.056-.727-4.013-2.108-5.393-1.38-1.38-3.337-2.107-5.392-2.107zM55.414 52.5c-6.874 0-12.5 5.626-12.5 12.5s5.626 12.5 12.5 12.5 12.5-5.626 12.5-12.5-5.626-12.5-12.5-12.5zm0 5c4.172 0 7.5 3.328 7.5 7.5 0 4.172-3.328 7.5-7.5 7.5a7.462 7.462 0 01-7.5-7.5c0-4.172 3.328-7.5 7.5-7.5zm0 31.238c-13.081 0-23.74-10.657-23.74-23.738s10.659-23.738 23.74-23.738c13.081 0 23.738 10.657 23.738 23.738S68.495 88.738 55.414 88.738zm0-5A18.7 18.7 0 0074.152 65a18.7 18.7 0 00-18.738-18.738A18.702 18.702 0 0036.674 65a18.702 18.702 0 0018.74 18.738zM55 114C27.985 114 6 92.015 6 65s21.985-49 49-49 49 21.985 49 49-21.985 49-49 49zm0-8c22.691 0 41-18.309 41-41S77.691 24 55 24 14 42.309 14 65s18.309 41 41 41z"
				color="#000"
				fontWeight={400}
				fontFamily="sans-serif"
				overflow="visible"
			/>
		</Svg>
	);
}

export default SvgSpool;
