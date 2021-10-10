import { makeStyles } from '@material-ui/core/styles';
import ChartWidget from '../custom/ChartWidget';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Icon } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
	root: {
		// width: '100vw',
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
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		// flexWrap: 'wrap',
		// backgroundColor: 'lightCyan',
		gap: '24px',
		padding: '24px',
		width: '70%',
		borderRadius: 15,
	},
	widget: {
		height: 275,
		width: '100%',
		borderRadius: '10px',
		// border: '1px solid #0CA789',
		// width: '80%',
		// marginTop: 30,
	},
	title: {
		marginTop: 20,
		fontSize: 35,
		padding: 10,
	},
	smallerTitle: {
		fontSize: 20,
	},
	lesson: {
		fontSize: 16,
		height: 45,
		width: '75%',
		borderRadius: '10px',
		display: 'flex',
		alignItems: 'center',
		backgroundColor: '#D3D3D3',
		justifyContent: 'space-between',
	}
}));



function ProfilePage() {
	const classes = useStyles();
	const user = useSelector(({ auth }) => auth.user);

	const categories = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	const widgetData1 = [70, 80, 35, 95, 70, 80, 35];
	const widgetData2 = [60, 30, 25, 85, 20, 40, 55];
	const widgetData3 = [20, 120, 45, 35, 80, 30, 65];

	const lessonsArr = [
		{
			lessonName: 'Lesson xd123',
			exerciseName: 'Exercise 1'
		},
		{
			lessonName: 'Lesson xd123',
			exerciseName: 'Exercise 1'
		},
		{
			lessonName: 'Lesson xd533',
			exerciseName: 'Exercise 1'
		},
		{
			lessonName: 'Lesson xd151',
			exerciseName: 'Exercise 1'
		},
		{
			lessonName: 'Lesson xd321',
			exerciseName: 'Exercise 1'
		},

	];

	return (
		<div className={classes.root}>
			<div>
				{/* TODOXD have to make this switch based on gender of student*/}
				<img alt="student profile photo" width="80" height="80" src="assets/images/custom/student.svg" />
			</div>
			<br />

			<p className={classes.smallerTitle}><b>{user.data.email}</b></p>
			<div style={{ display: 'flex', marginTop: 20, width: '50%', alignItems: 'center', justifyContent: 'space-around' }}>
				<div style={{ width: '35%' }}>
					<p className={classes.smallerTitle}>Name: <b>{user.data.displayName}</b></p>
					<p className={classes.smallerTitle}>Teacher's Name: <b>MISSING!{user.data.teacherName}</b></p>
					{/* <p className={classes.smallerTitle}>Teacher: <b>{user.data.teacherEmail}</b></p> */}
				</div>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<div style={{ borderRadius: '10px', border: '1px solid #0CA789', color: '#0CA789', padding: 15, }}>Rank</div>
				</div>
				<div style={{ width: '35%' }}>
					<p className={classes.smallerTitle}>Last Online: <b>MISSING!{user.data.lastOnline}</b></p>
					<p className={classes.smallerTitle}>Date Joined: <b>MISSING!{user.data.dateJoined}</b></p>
				</div>
			</div>

			<p className={classes.title}>Analytics</p>
			<div className={classes.widgetContainer}>
				<div className={classes.widget}>
					<ChartWidget
						title="Score on all exercises done over past week"
						valueTitle="points"
						categories={categories}
						data={widgetData1}
					/>
				</div>
				<div className={classes.widget}>
					<ChartWidget
						title="Attempts on all exercises done over past week"
						valueTitle="times"
						categories={categories}
						data={widgetData2}
					/>
				</div>
				<div className={classes.widget}>
					<ChartWidget
						title="Time spent on all exercises done over past week"
						valueTitle="minutes"
						categories={categories}
						data={widgetData3}
					/>
				</div>
			</div>

			<h2 style={{ textAlign: 'center' }}>Exercise Data</h2>
			<br />



			<div className={classes.lesson}>
				<span>
					<span style={{ display: 'inline-block', marginLeft: '20px', marginRight: '50px' }}>Lesson Title</span>
					<span style={{ display: 'inline-block' }} >Exercise Title</span>
				</span>
				<span style={{ display: 'inline-block', marginRight: '20px' }}>
					<IconButton
						// disableRipple
						className="w-16 h-16 ltr:ml-4 rtl:mr-4 p-0"
						color="inherit"
					>
						<Icon className="text-16 arrow-icon">
							{/* {theme.direction === 'ltr' ? 'keyboard_arrow_right' : 'keyboard_arrow_left'} */}
							keyboard_arrow_right
						</Icon>
					</IconButton>
				</span>
			</div>
		</div>
	);
}

export default ProfilePage;
