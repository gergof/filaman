import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgDensity(props: SvgProps) {
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
				d="M27.5 82.5c-2.732 0-5 2.268-5 5s2.268 5 5 5 5-2.268 5-5-2.268-5-5-5zm5-40c-5.493 0-10 4.507-10 10s4.507 10 10 10 10-4.507 10-10-4.507-10-10-10zm0 5c2.791 0 5 2.209 5 5s-2.209 5-5 5-5-2.209-5-5 2.209-5 5-5zm30 55c-2.732 0-5 2.268-5 5s2.268 5 5 5 5-2.268 5-5-2.268-5-5-5zm15-50c-2.732 0-5 2.268-5 5s2.268 5 5 5 5-2.268 5-5-2.268-5-5-5zm25 0c-2.732 0-5 2.268-5 5s2.268 5 5 5 5-2.268 5-5-2.268-5-5-5zm-35-35c-5.493 0-10 4.507-10 10s4.507 10 10 10 10-4.507 10-10-4.507-10-10-10zm0 5c2.791 0 5 2.209 5 5s-2.209 5-5 5-5-2.209-5-5 2.209-5 5-5zM50 72.5c-6.874 0-12.5 5.626-12.5 12.5S43.126 97.5 50 97.5 62.5 91.874 62.5 85 56.874 72.5 50 72.5zm0 5c4.172 0 7.5 3.328 7.5 7.5 0 4.172-3.328 7.5-7.5 7.5a7.462 7.462 0 01-7.5-7.5c0-4.172 3.328-7.5 7.5-7.5zm-25-20c-4.113 0-7.5 3.387-7.5 7.5 0 4.113 3.387 7.5 7.5 7.5 4.113 0 7.5-3.387 7.5-7.5 0-4.113-3.387-7.5-7.5-7.5zm0 5c1.41 0 2.5 1.09 2.5 2.5s-1.09 2.5-2.5 2.5-2.5-1.09-2.5-2.5 1.09-2.5 2.5-2.5zm57.5 5c-11.016 0-20 8.984-20 20s8.984 20 20 20 20-8.984 20-20-8.984-20-20-20zm0 5c8.314 0 15 6.686 15 15s-6.686 15-15 15-15-6.686-15-15 6.686-15 15-15zm2.5-40c-4.113 0-7.5 3.387-7.5 7.5 0 4.113 3.387 7.5 7.5 7.5 4.113 0 7.5-3.387 7.5-7.5 0-4.113-3.387-7.5-7.5-7.5zm0 5c1.41 0 2.5 1.09 2.5 2.5s-1.09 2.5-2.5 2.5-2.5-1.09-2.5-2.5 1.09-2.5 2.5-2.5zm-32.5-5c-8.255 0-15 6.745-15 15 0 8.255 6.745 15 15 15 8.255 0 15-6.745 15-15 0-8.255-6.745-15-15-15zm0 5c5.552 0 10 4.448 10 10s-4.448 10-10 10-10-4.448-10-10 4.448-10 10-10zM65 6C32.463 6 6 32.463 6 65s26.463 59 59 59 59-26.463 59-59S97.537 6 65 6zm0 8c28.214 0 51 22.786 51 51s-22.786 51-51 51-51-22.786-51-51 22.786-51 51-51z"
				color="#000"
				fontWeight={400}
				fontFamily="sans-serif"
				overflow="visible"
			/>
		</Svg>
	);
}

export default SvgDensity;
