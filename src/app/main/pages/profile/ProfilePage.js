import { makeStyles } from '@material-ui/core/styles';
import ChartWidget from '../custom/ChartWidget';
import { useSelector } from 'react-redux';
import { IconButton, Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState } from "react";


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
		marginTop: 30,
		fontSize: 35,
		padding: 10,
	},
	smallerTitle: {
		fontSize: 20,
	},
	smallerInfo: {
		fontSize: 18,
		width: "100%",
		textAlign: "left",
		padding: "30px 60px",
		// backgroundColor: "#f8d683",
		// backgroundColor: "#F6F7F9",
		// borderRadius: "10px",
	},
	smallerInfoRow: {
		display: "flex",
		justifyContent: "space-between",
		width: "100%"
	},
	lesson: {
		fontSize: 16,
		height: 45,
		width: '75%',
		borderRadius: '10px',
		alignItems: 'center',
		backgroundColor: '#EACD82',
		marginTop: "10px",
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer'
	},
	lessonInner: {
		display: 'flex',
		alignItems: 'center',
		height: 45,
		justifyContent: 'space-between',
		fontWeight: "500",
		width: "100%",
	}
}));

const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	borderRadius: '15px',
	boxShadow: 24,
	p: 4,
};

function ProfilePage() {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalExerciseName, setModalExerciseName] = useState('false');
	const handleOpen = () => setModalOpen(true);
	const handleClose = () => setModalOpen(false);

	const classes = useStyles();
	const user = useSelector(({ auth }) => auth.user);

	const categories = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	const widgetData1 = [70, 80, 35, 95, 70, 80, 35];
	const widgetData2 = [60, 30, 25, 85, 20, 40, 55];
	const widgetData3 = [20, 120, 45, 35, 80, 30, 65];

	const lessonsArr = [
		{
			lessonName: 'Arabic',
			exerciseName: 'Exercise 1'
		},
		{
			lessonName: 'Arabic',
			exerciseName: 'Exercise 2'
		},
		{
			lessonName: 'Arabic',
			exerciseName: 'Exercise 3'
		},
		{
			lessonName: 'Arabic',
			exerciseName: 'Exercise 4'
		},
		{
			lessonName: 'Arabic',
			exerciseName: 'Exercise 5'
		},

	];

	return (
		<div className={classes.root}>
			<div className="bg-gray-200 dark:bg-gray-800 flex flex-wrap items-center justify-center" style={{ width: "600px" }}>
				<div className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transformduration-200 easy-in-out">
					<div className="overflow-hidden" style={{ height: "24rem" }}>
						<img className="w-full" src="assets\images\custom\classroom-graphic.jpg" alt="" />
					</div>
					<div className="flex justify-center px-5 -mt-12">
						<img className="bg-white p-2 rounded-full" src="assets/images/custom/student.svg" alt="Student Image" style={{
							width: "120px", boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", //border: "solid 3px"
						}} />

					</div>
					<div>
						<div className="text-center px-14">
							<h2 className="text-3xl font-bold pt-14">{user.data.displayName}</h2>
							<p className="text-gray-400 mt-2">{user.data.email}</p>
							<div className={classes.smallerInfo}>
								<div className={classes.smallerInfoRow}><div className="font-semibold">Teacher's Name:</div><div>Yazan Basel{user.data.teacherName}</div></div>
								<div className={classes.smallerInfoRow}><div className="font-semibold">Last Online:</div><div>2021-10-13{user.data.lastOnline}</div></div>
								<div className={classes.smallerInfoRow}><div className="font-semibold">Date Joined:</div><div>2021-10-05{user.data.dateJoined}</div></div>
							</div>
						</div>
						<hr className="mt-6" />
						<div className="flex bg-gray-50 text-base">
							<div className="text-center w-1/2 p-10 hover:bg-gray-100 cursor-pointer">
								<p><span className="font-semibold">Ranking: </span>10</p>
							</div>
							<div className="border"></div>
							<div className="text-center w-1/2 p-10 hover:bg-gray-100 cursor-pointer">
								<p><span className="font-semibold">Exercises: </span> 10/12</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div style={{ display: 'flex', marginTop: 20, width: '50%', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', textAlign: 'start' }}></div> */}
			<br />
			<br />
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

			<p className={classes.title}>Exercise Data</p>
			<br />

			{lessonsArr.map(item => <div key={item.exerciseName} onClick={() => { setModalExerciseName(item.exerciseName); setModalOpen(!modalOpen); }} className={classes.lesson}><div className={classes.lessonInner}>
				<div>
					<span style={{ display: 'inline-block', marginLeft: '20px', marginRight: '50px' }}>{item.lessonName}</span>
					<span style={{ display: 'inline-block' }} >{item.exerciseName}</span>
				</div>
				<div style={{ display: 'inline-block', marginRight: '20px' }}>
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
				</div>
			</div></div>)}

			{modalOpen ? <div>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					open={modalOpen}
					onClose={handleClose}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<Fade in={modalOpen}>
						<Box sx={modalStyle}>
							<Typography id="transition-modal-title" className="font-semibold" variant="h5" component="h2">
								Arabic - {modalExerciseName} Details
							</Typography>
							<Typography id="transition-modal-description" sx={{ mt: 2 }}>
								<div className={classes.smallerInfo} style={{padding: "10px"}}>
									<div className={classes.smallerInfoRow}><div className="font-semibold">Score:</div><div>50 points</div></div>
									<div className={classes.smallerInfoRow}><div className="font-semibold">Time to Finish:</div><div>40 seconds</div></div>
									<div className={classes.smallerInfoRow}><div className="font-semibold">Attempts:</div><div>5 attempts</div></div>
									<div className={classes.smallerInfoRow}><div className="font-semibold">Mistakes:</div><div>7 mistakes</div></div>
								</div>
							</Typography>
						</Box>
					</Fade>
				</Modal>
			</div> : <></>}
		</div >
	);
}

export default ProfilePage;
