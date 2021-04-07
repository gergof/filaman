import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import Color from 'color';
import { Moment } from 'moment';
import { Path } from 'react-native-svg';
import { AreaChart, Grid } from 'react-native-svg-charts';

interface Props {
	data: {
		date: Moment;
		remaining: number;
	}[];
	total: number;
	style: StyleProp<ViewStyle>;
	color: string;
}
const UsageChart: React.FC<Props> = ({ data, total, style, color }) => {
	const Line = ({ line }: { line?: string }) => (
		<Path key="line" d={line} stroke={color} strokeWidth={2} fill="none" />
	);

	return (
		<AreaChart
			style={style}
			data={data}
			xAccessor={({ item }) => parseInt(item.date.format('X'))}
			yAccessor={({ item }) => item.remaining}
			yMin={0}
			yMax={total}
			contentInset={{ bottom: 10 }}
			svg={{ fill: Color(color).alpha(0.2).toString() }}
		>
			<Grid />
			<Line />
		</AreaChart>
	);
};

export default UsageChart;
