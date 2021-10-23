import { makeStyles } from '@material-ui/core/styles';
import ChartWidget from '../custom/ChartWidget';
import { useSelector } from 'react-redux';
import { IconButton, Icon } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
// import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import './AdminProfilePage.css';
import FirebaseService from 'app/services/firebaseService';
import { forEach } from 'lodash';

const useStyles = makeStyles(theme => ({
	root: {
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
		gap: '24px',
		padding: '24px',
		width: '70%',
		borderRadius: 15
	},
	widget: {
		height: 275,
		width: '100%',
		borderRadius: '10px'
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
	},
	smallerInfoRow: {
		display: 'flex',
		justifyContent: 'space-between',
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

function AdminProfilePage() {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalExerciseName, setModalExerciseName] = useState('false');
	const handleOpen = () => setModalOpen(true);
	const handleClose = () => setModalOpen(false);
	const classes = useStyles();
	const user = useSelector(({ auth }) => auth.user);
	const history = useHistory();

	const [teacherData, setTeacherData] = useState([]);
	const [avgExercise, setAvgExercise] = useState([]);

	// let createFirestoreData = () => {
	//   return FirebaseService.createFakeData();
	// };

	let calculateLessonCompletedForAllStudents = () => {
		return FirebaseService.calculateLessonCompletedForAllStudents();
	};

	const categories = ['Exercise 1', 'Exercise 2', 'Exercise 3', 'Exercise 4', 'Exercise 5', 'Exercise 6'];

	const widgetData1 = [70, 80, 35, 95, 70, 80];
	const widgetData2 = [4, 5, 3, 8, 7, 9];
	const widgetData3 = [20, 120, 45, 35, 80, 30];

	const teachersArr = [
		{
			key: 1,
			studentName: 'Fatima Ahmad',
			lessonName: 'Arabic',
			exerciseName: 'Exercise 3',
			avgScore: 71
		},
		{
			key: 2,
			studentName: 'Osama Qasim',
			lessonName: 'Arabic',
			exerciseName: 'Exercise 2',
			avgScore: 79
		},
		{
			key: 3,
			studentName: 'Anas Nakawa',
			lessonName: 'Arabic',
			exerciseName: 'Exercise 5',
			avgScore: 87
		},
		{
			key: 4,
			studentName: 'Amira Mohamad',
			lessonName: 'Arabic',
			exerciseName: 'Exercise 4',
			avgScore: 96
		},
		{
			key: 5,
			studentName: 'Sami Saeed',
			lessonName: 'Arabic',
			exerciseName: 'Exercise 4',
			avgScore: 84
		}
	];

	let studentsArr = [
		{
			key: 1,
			studentName: 'Yazan Qawasmeh',
			teacherName: 'Anas Nakawa',
			exerciseName: '12',
			avgScore: 91
		},
		{
			key: 2,
			studentName: 'Yousef Yahia',
			teacherName: 'Fatima Ahmad',
			exerciseName: '11',
			avgScore: 82
		},
		{
			key: 3,
			studentName: 'Saad Motamad',
			teacherName: 'Sami Saeed',
			exerciseName: '9',
			avgScore: 79
		},
		{
			key: 4,
			studentName: 'Ahmad Othman',
			teacherName: 'Sami Saeed',
			exerciseName: '12',
			avgScore: 71
		},
		{
			key: 5,
			studentName: 'Abdrahman AlShomaly',
			teacherName: 'Amira Mohamad',
			exerciseName: '12',
			avgScore: 96
		},
		{
			key: 6,
			studentName: 'Basel Tabakha',
			teacherName: 'Amira Mohamad',
			exerciseName: '11',
			avgScore: 87
		},
		{
			key: 7,
			studentName: 'Saeed Sharabati',
			teacherName: 'Amira Mohamad',
			exerciseName: '10',
			avgScore: 83
		},
		{
			key: 8,
			studentName: 'Salem Khalid',
			teacherName: 'Amira Mohamad',
			exerciseName: '9',
			avgScore: 72
		},
		{
			key: 9,
			studentName: 'Ahmad Waleed',
			teacherName: 'Amira Mohamad',
			exerciseName: '12',
			avgScore: 71
		}
	];

	let sortedStudentsArr = studentsArr.sort((a, b) => {
		return b.avgScore - a.avgScore;
	});

	let handleOnClickTeacher = name => {
		history.push('/pages/teacher?n=' + name.replace(' ', '+'));
	};

	let handleOnClickStudent = name => {
		history.push('/pages/student?n=' + name.replace(' ', '+'));
	};

	useEffect(() => {
		FirebaseService.getAllTeacher().then(data => {
			setTeacherData(data);

			for (let i = 0; i < data.length; i++) {
				FirebaseService.getAvgExerciseForTeacher(data).then(data => {
					console.log('getAvgExerciseForTeacher: ', data);
					setAvgExercise([...data]);
				});
			}
		});
	}, []);

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
						<img className="w-full" src="assets\images\custom\admin_graphic.png" alt="" />
					</div>
					<div className="flex justify-center px-5 -mt-12">
						<img
							className="bg-white p-2 rounded-full"
							src="assets/images/custom/admin_picture.png"
							alt="Admin Image"
							style={{
								width: '120px',
								boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' //border: "solid 3px"
							}}
						/>
					</div>
					<div>
						<div className="text-center px-14">
							<h2 className="text-3xl font-bold pt-14">{user.name}</h2>
							{/* <h2 className="text-3xl font-bold pt-14">Admin</h2> */}
							<p className="text-gray-400 mt-2">{user.data.email}</p>
							<div className={classes.smallerInfo}>
								{/* <div className={classes.smallerInfoRow}>
									<div className="font-semibold">Number of Students:</div>
									<div>20{user.data.teacherName}</div>
								</div> */}
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
							<div className="text-center w-1/2 p-10 hover:bg-gray-100 cursor-pointer">
								<p>{/* <span className="font-semibold">Ranking: </span>10 */}</p>
							</div>
							{/* <div className="border"></div> */}
							<div className="text-center w-1/2 p-10 hover:bg-gray-100 cursor-pointer">
								<p>{/* <span className="font-semibold">Completed: </span> 10 */}</p>
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
				<div className="numberBoxesContainer">
					<div className="numberBox">
						<span>100</span>
						Students
					</div>
					<div className="numberBox">
						<span>5</span>
						Teachers
					</div>
				</div>

				<div className={classes.widget}>
					<ChartWidget
						title="Average Score on Each Exercise"
						valueTitle="Points"
						categories={categories}
						data={widgetData1}
					/>
				</div>
				<div className={classes.widget}>
					<ChartWidget
						title="Average Number of Attempts Per Exercise"
						valueTitle="Times"
						categories={categories}
						data={widgetData2}
					/>
				</div>
				<div className={classes.widget}>
					<ChartWidget
						title="Average Time Spent on Each Exercise"
						valueTitle="Minutes"
						categories={categories}
						data={widgetData3}
					/>
				</div>
			</div>

			<p className={classes.title}>Teachers</p>
			<section className="py-1 bg-blueGray-50" style={{ width: '67%', fontSize: '16px' }}>
				<div className="w-full  mb-12 xl:mb-0 px-6 mx-auto mt-10">
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
											Current Lesson
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Avg. Exercise Completed
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Student Average
										</th>
									</tr>
								</thead>
								<tbody>
									{teacherData.map((item, index) => (
										<tr key={item.id} onClick={() => handleOnClickTeacher(item.name)}>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap  text-left text-blueGray-700">
												{item.name}
											</td>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap">
												Arabic
											</td>
											<td className="border-t-0 py-9 px-14 align-center border-l-0 border-r-0 whitespace-nowrap">
												{!isNaN(avgExercise[index]) ? Math.round(avgExercise[index]) : ''}
											</td>
											<td
												className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap font-mono"
												style={{ fontSize: '17px' }}
											></td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>

			{/* --------------------------------------------------------------------------------------------- */}

			<p className={classes.title} style={{ paddingTop: '40px' }}>
				Students
			</p>
			<section className="py-1 bg-blueGray-50" style={{ width: '67%', fontSize: '16px' }}>
				<div className="w-full  mb-12 xl:mb-0 px-6 mx-auto">
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
											Current Lesson
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Exercise Completed
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Student Average
										</th>
									</tr>
								</thead>
								<tbody>
									{sortedStudentsArr.map((item, index) => (
										<tr key={item.key} onClick={() => handleOnClickStudent(item.studentName)}>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap  text-left text-blueGray-700">
												{item.studentName}
											</td>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap">
												Arabic
											</td>
											<td className="border-t-0 py-9 px-14 align-center border-l-0 border-r-0 whitespace-nowrap">
												{item.exerciseName}
											</td>
											<td
												className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap font-mono"
												style={{ fontSize: '17px' }}
											>
												{item.avgScore} &nbsp;
												{index == 0 ? '🥇' : ''}
												{index == 1 ? '🥈' : ''}
												{index == 2 ? '🥉' : ''}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>

			<div>
				<br />
				<br />
				{/* <button onClick={() => createFirestoreData()}>Create Firestore Data</button> */}
				<button onClick={() => calculateLessonCompletedForAllStudents()}>
					Recalculate Lesson Completed For All Students
				</button>
			</div>
		</div>
	);
}

export default AdminProfilePage;
