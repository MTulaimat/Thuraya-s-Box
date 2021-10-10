import { makeStyles } from '@material-ui/core/styles';
import ChartWidget from '../custom/ChartWidget';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100vw',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30,
	},
	avatar: {
		border: `4px solid ${theme.palette.background.default}`
	},
	topBg: {
		background: 'url("assets/images/profile/morain-lake.jpg")!important',
		backgroundSize: 'cover!important',
		backgroundPosition: 'center center!important'
	},
	layoutHeader: {
		background: 'none',
		height: 320,
		minHeight: 320,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	},
	widgetContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		// flexWrap: 'wrap',
		backgroundColor: 'lightCyan',
		gap: 24,
		padding: 24,
		width: '90%',
		borderRadius: 15,
	},
	widget: {

	},
	title: {
		marginTop: 20,
		fontSize: 35,
		padding: 10,
	},
}));

function ProfilePage() {
	const classes = useStyles();

	const categories = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	const widgetData1 = [70, 80, 35, 95, 70, 80, 35];
	const widgetData2 = [60, 30, 25, 85, 20, 40, 55];
	const widgetData3 = [20, 120, 45, 35, 80, 30, 65];

	return (
		<div className={classes.root}>
			<div>
				<img alt="student profile photo" width="80" height="80" src="assets/images/custom/student.svg"/>
			</div>
			<p className={classes.title} >Analytics</p>
			<div className={classes.widgetContainer}>
				<ChartWidget
					className={classes.widget}
					title="Score"
					valueTitle="points"
					categories={categories}
					data={widgetData1}
				/>
				<ChartWidget
					className={classes.widget}
					title="Attempts"
					valueTitle="times"
					categories={categories}
					data={widgetData2}
				/>
				<ChartWidget
					className={classes.widget}
					title="Solve time"
					valueTitle="minutes"
					categories={categories}
					data={widgetData3}
				/>
			</div>
		</div>
	);
}

export default ProfilePage;
