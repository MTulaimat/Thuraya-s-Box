import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import _ from '@lodash';
import ReactApexChart from 'react-apexcharts';

function ChartWidget(props) {
	const widgetData = {
		id: 'widget2',
		title: 'Score over time',
		average: 0,
		series: [
			{
				name: 'Score',
				data: [70, 80, 35, 95, 70, 80, 35]
			}
		],
		options: {
			chart: {
				type: 'area',
				height: '100%',
				sparkline: {
					enabled: true
				}
			},
			fill: {
				type: 'solid',
				opacity: 0.7
			},
			xaxis: {
				categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
			},
			tooltip: {
				followCursor: true,
				theme: 'dark',
				fixed: {
					enabled: false,
					position: 'topRight',
					offsetX: 0,
					offsetY: 0
				}
			}
		}
	};

	(function updateWidgetData() {
		widgetData.series[0].data = props.data;
		widgetData.options.xaxis.categories = props.categories;
	})();

	(function calcAverage() {
		const sum = widgetData.series[0].data.reduce((a, b) => a + b, 0);
		widgetData.average = (sum / widgetData.series[0].data.length).toFixed(0) || 0;
	})();

	const theme = useTheme();
	const data = _.merge({}, widgetData);

	_.setWith(data, 'options.colors', [theme.palette.primary.main]);

	return (
		<Card className="w-full rounded-20 shadow">
			<div className="p-20 pb-0">
				<Typography className="h3 font-medium">{props.title}</Typography>
				<div className="flex flex-row flex-wrap items-center mt-12">
					<Typography className="text-48 font-semibold leading-none tracking-tighter">
						{data.average}
					</Typography>
					<div className="flex flex-col mx-8">
						<div className="flex items-center">
							<Typography className="whitespace-nowrap mx-4" color="textSecondary">
								{props.valueTitle}
							</Typography>
						</div>
					</div>
				</div>
			</div>
			<div className="h-full w-100-p">
				{/* was h-96 */}
				<ReactApexChart
					options={data.options}
					series={data.series}
					type={data.options.chart.type}
					height={data.options.chart.height}
				/>
			</div>
		</Card>
	);
}

export default ChartWidget;
