import { makeStyles } from '@material-ui/core/styles';
import ChartWidget from '../custom/ChartWidget';
import { useSelector } from 'react-redux';
import { IconButton, Icon } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import './StudentPage.css';
import { useUrlSearchParams } from 'use-url-search-params';

const useStyles = makeStyles(theme => ({
	root: {
		// width: '100vw',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30
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
		borderRadius: 15
	},
	widget: {
		height: 275,
		width: '100%',
		borderRadius: '10px'
		// border: '1px solid #0CA789',
		// width: '80%',
		// marginTop: 30,
	},
	title: {
		marginTop: 30,
		fontSize: 35,
		padding: 10
	},
	smallerTitle: {
		fontSize: 20
	},
	smallerInfo: {
		fontSize: 18,
		width: '100%',
		textAlign: 'left',
		padding: '30px 60px'
		// backgroundColor: "#f8d683",
		// backgroundColor: "#F6F7F9",
		// borderRadius: "10px",
	},
	smallerInfoRow: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%'
	},
	modalInfoRow: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		paddingBottom: '10px'
	},
	lesson: {
		fontSize: 16,
		height: 45,
		width: '75%',
		borderRadius: '10px',
		alignItems: 'center',
		backgroundColor: '#EACD82',
		marginTop: '10px',
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer'
	},
	lessonInner: {
		display: 'flex',
		alignItems: 'center',
		height: 45,
		justifyContent: 'space-between',
		fontWeight: '500',
		width: '100%'
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
	p: 4
};

function ProfilePage() {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalExerciseName, setModalExerciseName] = useState('false');
	const handleOpen = () => setModalOpen(true);
	const handleClose = () => setModalOpen(false);
	const [params, setParams] = useUrlSearchParams();
	const location = useLocation();

	const classes = useStyles();
	const user = useSelector(({ auth }) => auth.user);

	const categories = ['Exercise 1', 'Exercise 2', 'Exercise 3', 'Exercise 4', 'Exercise 5', 'Exercise 6'];
	const widgetData1 = [70, 80, 35, 95, 70, 80];
	const widgetData2 = [60, 30, 25, 85, 20, 40];
	const widgetData3 = [20, 120, 45, 35, 80, 30];

	const lessonsArr = [
		{
			lessonName: 'Arabic',
			exerciseName: 'Exercise 1',
			completed: '✅',
			dateCompleted: '2021-10-13'
		},
		{
			lessonName: 'Arabic',
			exerciseName: 'Exercise 2',
			completed: '✅',
			dateCompleted: '2021-10-14'
		},
		{
			lessonName: 'Arabic',
			exerciseName: 'Exercise 3',
			completed: '✅',
			dateCompleted: '2021-10-16'
		},
		{
			lessonName: 'Arabic',
			exerciseName: 'Exercise 4',
			completed: '❌',
			dateCompleted: '-'
		},
		{
			lessonName: 'Arabic',
			exerciseName: 'Exercise 5',
			completed: '❌',
			dateCompleted: '-'
		}
	];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	return (
		<div className={classes.root}>
			<div
				className="bg-gray-200 dark:bg-gray-800 flex flex-wrap items-center justify-center"
				style={{ width: '600px', borderRadius: '15px' }}
			>
				<div
					className="container lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 bg-white shadow-lg transformduration-200 easy-in-out"
					style={{ borderRadius: '15px' }}
				>
					<div className="overflow-hidden" style={{ height: '24rem', borderRadius: '15px 15px 0px 0px' }}>
						<img className="w-full" src="assets\images\custom\classroom-graphic.jpg" alt="" />
					</div>
					<div className="flex justify-center px-5 -mt-12">
						<img
							className="bg-white p-2 rounded-full"
							src="assets/images/custom/student.svg"
							alt="Student Image"
							style={{
								width: '120px',
								boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' //border: "solid 3px"
							}}
						/>
					</div>
					<div>
						<div className="text-center px-14">
							<h2 className="text-3xl font-bold pt-14">{params.n == null ? user.name : params.n}</h2>
							{/* <p className="text-gray-400 mt-2">{user.data.email}</p> */}
							<p className="text-gray-400 mt-2">student@mail.com</p>
							<div className={classes.smallerInfo}>
								<div className={classes.smallerInfoRow}>
									<div className="font-semibold">Teacher's Name:</div>
									<div>Fatima Ahmad{user.data.teacherName}</div>
								</div>
								<div className={classes.smallerInfoRow}>
									<div className="font-semibold">Last Active:</div>
									<div>2021-10-13{user.data.lastOnline}</div>
								</div>
								<div className={classes.smallerInfoRow}>
									<div className="font-semibold">Date Joined:</div>
									<div>2021-10-05{user.data.dateJoined}</div>
								</div>
							</div>
						</div>
						<hr className="mt-6" />
						<div className="flex bg-gray-50 text-base" style={{ borderRadius: '15px' }}>
							<div className="text-center w-1/2 p-10 hover:bg-gray-100 cursor-pointer select-none">
								<p>
									<span className="font-semibold">Ranking: </span>10
								</p>
							</div>
							<div className="border"></div>
							<div className="text-center w-1/2 p-10 hover:bg-gray-100 cursor-pointer select-none">
								<p>
									<span className="font-semibold">Lesson: </span> 6
								</p>
							</div>
						</div>
					</div>
				</div>
				<br />
				<br />
			</div>
			{/* <div style={{ display: 'flex', marginTop: 20, width: '50%', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', textAlign: 'start' }}></div> */}

			<p className={classes.title}>Analytics</p>
			<div className={classes.widgetContainer}>
				<div className={classes.widget}>
					<ChartWidget
						title="Score on Each Exercise"
						valueTitle="Points"
						categories={categories}
						data={widgetData1}
					/>
				</div>
				<div className={classes.widget}>
					<ChartWidget
						title="Number of Attempts Per Exercise"
						valueTitle="Times"
						categories={categories}
						data={widgetData2}
					/>
				</div>
				<div className={classes.widget}>
					<ChartWidget
						title="Time Spent on All Exercises"
						valueTitle="Minutes"
						categories={categories}
						data={widgetData3}
					/>
				</div>
			</div>

			<p className={classes.title}>Exercise Data</p>
			<br />

			<section className="py-1 bg-blueGray-50" style={{ width: '67%', fontSize: '16px' }}>
				<div className="w-full  mb-12 xl:mb-0 px-6 mx-auto mt-24">
					<div className="relative flex flex-col min-w-0 break-words bg-white px-12 w-full mb-6 shadow-lg rounded ">
						<div className="rounded-t mb-0 border-0">
							<div className="flex flex-wrap items-center">
								<div className="relative w-full py-4 px-14 max-w-full flex-grow flex-1">
									<p className="font-semibold text-lg text-blueGray-700">Data</p>
								</div>
								<div className="relative w-full px-6 max-w-full flex-grow flex-1 text-right">
									<Button
										variant="outlined"
										style={{
											color: '#F3B25F',
											borderColor: '#F3B25F',
											borderWidth: '1.5px',
											fontSize: '16px',
											padding: '0px 6px',
											borderRadius: '5px'
										}}
									>
										Refresh
									</Button>
								</div>
							</div>
						</div>

						<div className="block w-full overflow-x-auto" style={{ paddingBottom: '15px' }}>
							<table className="items-center bg-transparent w-full border-collapse">
								<thead>
									<tr>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Name
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Exercise
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Exercise Done
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Date Completed
										</th>
									</tr>
								</thead>
								<tbody>
									{lessonsArr.map((item, index) => (
										<tr
											key={item.exerciseName}
											onClick={() => {
												setModalExerciseName(item.exerciseName);
												setModalOpen(!modalOpen);
											}}
										>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap  text-left text-blueGray-700">
												{item.lessonName}
											</td>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap">
												{item.exerciseName}
											</td>
											<td className="border-t-0 py-9 px-14 align-center border-l-0 border-r-0 whitespace-nowrap">
												{item.completed}
											</td>
											<td
												className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap font-mono"
												style={{
													fontSize: '16.5px'
												}}
											>
												{item.dateCompleted}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<footer className="relative pt-8 pb-6 mt-16">
					<div className="container mx-auto px-6">
						<div className="flex flex-wrap items-center md:justify-between justify-center">
							<div className="w-full md:w-6/12 px-6 mx-auto text-center">
								<div className="text-sm text-blueGray-500 font-semibold py-1"></div>
							</div>
						</div>
					</div>
				</footer>
			</section>

			{modalOpen ? (
				<div>
					<Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						open={modalOpen}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500
						}}
					>
						<Fade in={modalOpen}>
							<Box sx={modalStyle}>
								<div
									id="transition-modal-title"
									className="font-semibold"
									style={{ marginBottom: '9px', fontSize: 24 }}
								>
									{modalExerciseName}
								</div>
								<div id="transition-modal-description">
									<div className={classes.smallerInfo} style={{ padding: '10px' }}>
										<div className={classes.modalInfoRow}>
											<div className="font-medium">Score:</div>
											<div>50 points</div>
										</div>
										<div className={classes.modalInfoRow}>
											<div className="font-medium">Time to Finish:</div>
											<div>40 seconds</div>
										</div>
										<div className={classes.modalInfoRow}>
											<div className="font-medium">Attempts:</div>
											<div>5 attempts</div>
										</div>
										<div className={classes.modalInfoRow}>
											<div className="font-medium">First Attempted:</div>
											<div>2021-10-14</div>
										</div>
										<div className={classes.smallerInfoRow}>
											<div className="font-medium">Mistakes:</div>
											<div>7 mistakes</div>
										</div>
									</div>
								</div>
							</Box>
						</Fade>
					</Modal>
				</div>
			) : (
				<></>
			)}

			<p className={classes.title} style={{ marginTop: '80px' }}>
				Comments
			</p>
			<br />

			<Comment1></Comment1>
			<br />
			<br />
			<Comment2></Comment2>
		</div>
	);
}

function Comment1() {
	return (
		<div className="flex items-center justify-center w-screen pt-6" style={{ fontSize: '12px' }}>
			<div
				className="text-black p-4 flex"
				style={{
					position: 'relative'
					// boxShadow: 'rgb(149 157 165 / 50%) 0px 3px 4px'
				}}
			>
				<img
					className="rounded-full shadow-lg"
					src="assets/images/custom/admin_picture.png"
					style={{ height: 60, width: 60, left: -40, top: 6, position: 'absolute' }}
				/>
				<div>
					<div
						className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5"
						style={{ borderRadius: 15, padding: '30px 30px 30px 30px' }}
					>
						<div className="font-semibold text-sm leading-relaxed">Admin</div>
						<div className="text-base leading-snug md:leading-normal" style={{ marginTop: 7 }}>
							You're doing a great job! Keep it up!
						</div>
					</div>
					<div className="text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400">2 days ago</div>
					{/* <div className="bg-white dark:bg-gray-700 border border-white dark:border-gray-700 rounded-full float-right -mt-8 mr-0.5 flex shadow items-center ">
						<span className="text-sm ml-1 pr-1.5 text-gray-500 dark:text-gray-300">3</span>
					</div> */}
				</div>
			</div>
		</div>
	);
}

function Comment2() {
	return (
		<div
			className="flex items-center justify-center w-screen pt-6 bg-white dark:bg-gray-800"
			style={{ fontSize: '12px' }}
		>
			<div
				className="bg-white dark:bg-gray-800 text-black dark:text-gray-200 p-4 antialiased flex max-w-lg"
				style={{ position: 'relative' }}
			>
				<img
					className="rounded-full shadow-lg"
					src="assets/images/custom/teacher.svg"
					style={{ height: 60, width: 60, left: -40, top: 6, position: 'absolute' }}
				/>
				<div>
					<div
						className="bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 pt-2 pb-2.5"
						style={{ borderRadius: 15, padding: '30px 30px 30px 30px' }}
					>
						<div className="font-semibold text-sm leading-relaxed">Teacher Fatima</div>
						<div className="text-base leading-snug md:leading-normal" style={{ marginTop: 7 }}>
							Please remember to finish today's lesson
							<br /> before the end of the day!
						</div>
					</div>
					<div className="text-sm ml-4 mt-0.5 text-gray-500 dark:text-gray-400">3 days ago</div>
					{/* <div className="bg-white dark:bg-gray-700 border border-white dark:border-gray-700 rounded-full float-right -mt-8 mr-0.5 flex shadow items-center ">
						<span className="text-sm ml-1 pr-1.5 text-gray-500 dark:text-gray-300">3</span>
					</div> */}
				</div>
			</div>
		</div>
	);
}
export default ProfilePage;
