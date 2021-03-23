import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgDuration(props: SvgProps) {
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
				d="M65 31a4 4 0 00-4 4v30a4 4 0 001.781 3.328l15 10a4 4 0 005.547-1.11 4 4 0 00-1.11-5.546L69 62.859V35a4 4 0 00-4-4zm46-22a4 4 0 00-4 4v16H91a4 4 0 00-4 4 4 4 0 004 4h24V13a4 4 0 00-4-4zM64.752 6.006a58.842 58.842 0 00-27.986 7.19C13.262 26.004 1.316 53.087 7.706 79.081c6.388 25.994 29.53 44.456 56.294 44.91 26.764.454 50.516-17.212 57.783-42.974a4 4 0 00-2.763-4.936 4 4 0 00-4.936 2.764c-6.292 22.304-26.778 37.54-49.95 37.146-23.17-.393-43.128-16.313-48.66-38.818-5.531-22.505 4.77-45.865 25.12-56.955 20.349-11.09 45.563-7.089 61.478 9.758a4 4 0 005.655.16 4 4 0 00.162-5.655C96.399 12.322 80.67 5.948 64.752 6.006z"
				color="#000"
				fontWeight={400}
				fontFamily="sans-serif"
				overflow="visible"
			/>
		</Svg>
	);
}

export default SvgDuration;
