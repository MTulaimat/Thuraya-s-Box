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
import firebase from 'firebase/app';
import { doc, setDoc } from 'firebase/firestore';
import { random } from 'lodash';

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

	const [teachersData, setTeachersData] = useState([]);
	const [studentsData, setStudentsData] = useState([]);
	const [avgExercise, setAvgExercise] = useState([]);
	const [refreshToggler, setRefreshToggler] = useState(false);
	const [loading, setLoading] = useState(false);

	// let createFirestoreData = () => {
	//   return FirebaseService.createFakeData();
	// };

	let calculateAverageScoreForAllStudents = async () => {
		// get all students
		setLoading(true);

		const query1 = await FirebaseService.firestore
			.collection('users')
			.where('role', 'array-contains', 'student')
			.get();

		for (const doc of query1.docs) {
			// for each student, get their exercise data (only done exercises)
			const query2 = await FirebaseService.firestore
				.collection('exerciseData')
				.where('studentId', '==', doc.id)
				.where('completed', '==', true)
				.get();

			let count = query2.docs.length;
			let sum = 0;

			if (count > 0) {
				for (const doc2 of query2.docs) {
					// go over the exercise data of each student and calculate a sum
					sum = sum + doc2.data().score;
				}

				await doc.ref.update({
					averageScore: Math.round(sum / count)
				});
			} else {
				await doc.ref.update({
					averageScore: 0
				});
			}
		}
		setLoading(false);
		setRefreshToggler(!refreshToggler);
	};

	let calculateAverageScoreForAllTeachers = async () => {
		// get all teachers
		setLoading(true);

		FirebaseService.calculateLessonCompletedForAllStudents();
		const query1 = await FirebaseService.firestore
			.collection('users')
			.where('role', 'array-contains', 'teacher')
			.get();

		for (const doc of query1.docs) {
			// for each teacher, get all their students
			const query2 = await FirebaseService.firestore
				.collection('users')
				.where('teacherEmail', '==', doc.data().email)
				.get();

			let count = query2.docs.length;
			let sum = 0;

			// sum the averages of all the students
			for (const doc2 of query2.docs) {
				sum = sum + doc2.data().averageScore;
			}

			// update the teacher's data with the average scores
			await doc.ref.update({
				averageScore: Math.round(sum / count)
			});
		}
		setLoading(false);
		setRefreshToggler(!refreshToggler);
	};

	let allExercises = [
		{
			order: 1,
			id: 'arabic-letter-picker-1',
			lesson: 'Arabic',
			level: 1,
			title: 'Letter Picker'
		},
		{
			order: 2,
			id: 'arabic-image-colorer-1',
			lesson: 'Arabic',
			level: 1,
			title: 'Image Coloring'
		},
		{
			order: 3,
			id: 'arabic-letter-drawer-1',
			lesson: 'Arabic',
			level: 1,
			title: 'Letter Drawing'
		},
		{
			id: 'arabic-letter-dragger-1',
			lesson: 'Arabic',
			level: 1,
			order: 4,
			title: 'Letter Dragging'
		},
		{
			id: 'arabic-letter-orderer-1',
			lesson: 'Arabic',
			level: 1,
			order: 5,
			title: 'Letter Ordering'
		},
		{
			id: 'arabic-word-drawer-1',
			lesson: 'Arabic',
			level: 1,
			order: 6,
			title: 'Word Drawing'
		}
	];
	let createExerciseDataForStudent = async uid => {
		if (!firebase.apps.length) {
			return false;
		}

		let sampleExercise = [
			// Sample 1 (3.5/6)
			{
				completed: true
			},
			{
				completed: true
			},
			{
				completed: true
			},
			{
				completed: false
			}
		];

		let pickedExercises = _.cloneDeep(sampleExercise);

		for (let j = 0; j < pickedExercises.length; j++) {
			pickedExercises[j].level = 1;
			pickedExercises[j].order = j + 1;
			pickedExercises[j].lesson = 'Arabic';
			pickedExercises[j].title = allExercises[j].title;
			pickedExercises[j].exerciseId = allExercises[j].id;
			pickedExercises[j].studentId = uid;
			pickedExercises[j].attempts = random(1, 3);
			pickedExercises[j].mistakes = random(0, 3);

			if (pickedExercises[j].completed === true) {
				pickedExercises[j].time = random(15, 30);
				pickedExercises[j].score = 100 - 2 * pickedExercises[j].mistakes - pickedExercises[j].time;
			}

			setTimeout(() => {
				FirebaseService.firestore
					.collection('exerciseData')
					.doc(uid + '-' + pickedExercises[j].exerciseId)
					.set(pickedExercises[j])
					.then(() => {
						console.log('exerciseData document successfully written!');
					});
			}, 0);
		}
	};

	let addTeacherNamesToAllStudents = async () => {
		if (!firebase.apps.length) {
			return false;
		}

		// get literally all students:
		var querySnapshot = await FirebaseService.firestore
			.collection('users')
			.where('role', 'array-contains', 'student')
			.get();

		let data = querySnapshot.docs.map(doc => {
			return {
				id: doc.id,
				...doc.data()
			};
		});

		let teacherEmailsToNames = {
			'teacher@mail.com': 'Fatima Ahmad',
			'osamaqasim@mail.com': 'Osama Qasim',
			'anasnakawa@mail.com': 'Anas Nakawa',
			'samisaeed@mail.com': 'Sami Saeed',
			'amiramohamad@mail.com': 'Amira Mohamad'
		};

		for (let i = 0; i < data.length; i++) {
			if (data[i].teacherEmail == null || data[i].teacherEmail == '') continue;
			// add a field called teacherName to every student based on their teacherEmail
			if (teacherEmailsToNames[data[i].teacherEmail] != null)
				FirebaseService.firestore
					.collection('users')
					.doc(data[i].id)
					.update({
						teacherName: teacherEmailsToNames[data[i].teacherEmail]
					})
					.then(() => {
						console.log('Document successfully updated!');
					})
					.catch(error => {
						// The document probably doesn't exist.
						console.error('Error updating document: ', error);
					});
		}
	};

	const categories = [
		'Letter Picker',
		'Image Coloring',
		'Letter Drawing',
		'Letter Dragging',
		'Letter Ordering',
		'Word Drawing'
	];

	const widgetData1 = [70, 80, 35, 95, 70, 80];
	const widgetData2 = [4, 5, 3, 8, 7, 9];
	const widgetData3 = [20, 120, 45, 35, 80, 30];

	let handleOnClickTeacher = id => {
		history.push('/pages/teacher?id=' + id);
	};

	let handleOnClickStudent = id => {
		history.push('/pages/student?id=' + id);
	};

	useEffect(() => {
		FirebaseService.getAllTeachers().then(data => {
			setTeachersData(data);
			FirebaseService.getAvgExerciseForTeacher(data).then(data => {
				setAvgExercise([...data]);
			});
		});
		FirebaseService.getAllStudents().then(data => {
			setStudentsData(data);
		});
	}, [refreshToggler]);

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

			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
				{/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-20 rounded" onClick={() => createFirestoreData()}>
					Create Firestore Data
				</button> */}
				{/* <button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-20 rounded"
					onClick={() => calculateLessonCompletedForAllStudents()}
				>
					Calculate num of completed lessons for all students
				</button> */}
				{/* <button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-20 rounded"
					onClick={() => calculateAverageScoreForAllStudents()}
				>
					Calculate average score for all students
				</button>
				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-20 rounded"
					onClick={() => calculateAverageScoreForAllTeachers()}
				>
					Calculate average score for all teachers
				</button> */}
				{/* <button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-20 rounded"
					onClick={() => createExerciseDataForStudent('hCXvl0ARHFOz374VEH8Q5rLPCGB3')}
				>
					Create Exercise Data For student@mail.com
				</button> */}
				{/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-10 px-20 rounded" onClick={() => addTeacherNamesToAllStudents()}>
					Add Teacher Names to All Students
				</button> */}
			</div>
			<br />
			<br />
			<p className={classes.title}>Analytics</p>
			<div className={classes.widgetContainer}>
				<div className="numberBoxesContainer">
					<div className="numberBox">
						<span>{studentsData?.length}</span>
						Students
					</div>
					<div className="numberBox">
						<span>{teachersData?.length}</span>
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
										onClick={() => calculateAverageScoreForAllTeachers()}
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
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
											#
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Name
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Current Lesson
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Avg. Exercise
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Average
										</th>
									</tr>
								</thead>
								<tbody>
									{teachersData.map((item, index) => (
										<tr key={item.id} onClick={() => handleOnClickTeacher(item.id)}>
											<td
												className="border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap text-center text-blueGray-700"
												style={{ width: '50px' }}
											>
												{index + 1}
											</td>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap  text-left text-blueGray-700">
												{item.name}
											</td>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap">
												Arabic
											</td>
											<td className="border-t-0 py-9 px-14 align-center border-l-0 border-r-0 whitespace-nowrap">
												{!isNaN(avgExercise[index]) ? Math.round(avgExercise[index]) : '-'}
											</td>
											<td
												className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap font-mono"
												style={{ fontSize: '17px' }}
											>
												{!isNaN(item.averageScore) ? item.averageScore : '-'}
											</td>
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
										onClick={() => calculateAverageScoreForAllStudents()}
									>
										Refresh
									</Button>
								</div>
							</div>
						</div>

						<div className="block w-full overflow-x-auto" style={{ paddingBottom: '15px' }}>
							<table className="m7-admin-table items-center bg-transparent w-full border-collapse">
								<thead>
									<tr>
										<th
											className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center"
											style={{ width: '50px' }}
										>
											#
										</th>
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
											Average
										</th>
									</tr>
								</thead>
								<tbody>
									{studentsData.map((item, index) => (
										<tr key={item.id} onClick={() => handleOnClickStudent(item.id)}>
											<td
												className="border-t-0 align-middle border-l-0 border-r-0 whitespace-nowrap text-center text-blueGray-700"
												style={{ width: '50px' }}
											>
												{index + 1}
											</td>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap  text-left text-blueGray-700">
												{item.name}
											</td>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap">
												Arabic
											</td>
											<td className="border-t-0 py-9 px-14 align-center border-l-0 border-r-0 whitespace-nowrap font-mono">
												{item.completed > 0
													? `${item.completed}- ` + allExercises[item.completed].title
													: '-'}
											</td>
											<td
												className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap font-mono"
												style={{ fontSize: '17px' }}
											>
												{!isNaN(item.averageScore) ? item.averageScore : '-'} &nbsp;
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
			{loading && (
				<div style={{ position: 'fixed', bottom: '40px', right: '40px', zIndex: '999' }}>
					<button
						type="button"
						className="inline-flex items-center px-12 py-12 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-default"
						disabled=""
					>
						<svg
							className="animate-spin -ml-1 mr-8 h-24 w-24 text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Loading...
					</button>
				</div>
			)}
		</div>
	);
}

export default AdminProfilePage;
