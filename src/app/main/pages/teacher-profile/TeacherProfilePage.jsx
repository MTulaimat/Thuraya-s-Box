import { makeStyles } from '@material-ui/core/styles';
import ChartWidget from '../custom/ChartWidget';
import { useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import { useUrlSearchParams } from 'use-url-search-params';
import './TeacherPage.css';
import FirebaseService from 'app/services/firebaseService';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

function TeacherProfilePage() {
	const [modalOpen, setModalOpen] = useState(false);
	const [modalExerciseName, setModalExerciseName] = useState('false');
	const handleOpen = () => setModalOpen(true);
	const handleClose = () => setModalOpen(false);
	const [params, setParams] = useUrlSearchParams();
	const classes = useStyles();
	const user = useSelector(({ auth }) => auth.user);
	const history = useHistory();
	const location = useLocation();
	const [teacherData, setTeacherData] = useState({});
	const [studentsData, setStudentsData] = useState([]);
	const [refreshToggler, setRefreshToggler] = useState(false);
	const [loading, setLoading] = useState(false);
	const [section, setSection] = useState('A');

	const categories = [
		'Letter Picker',
		'Image Coloring',
		'Letter Drawing',
		'Letter Dragging',
		'Letter Ordering',
		'Word Drawing'
	];
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

	const widgetData1 = [70, 80, 35, 95, 70, 80];
	const widgetData2 = [4, 5, 3, 8, 7, 9];
	const widgetData3 = [20, 120, 45, 35, 80, 30];

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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	useEffect(async () => {
		if (params.id == null && user.role.includes('teacher')) {
			let temp = {
				id: user.uid,
				role: user.role,
				name: user.name,
				displayName: user.displayName,

				email: user.data.email,
				currentExercise: user.data.currentExercise,
				averageScore: user.data.averageScore
			};

			setTeacherData(temp);

			console.log('dadsafASFsa', user);
			FirebaseService.getAllStudentsForTeacher(user.uid).then(data => {
				setStudentsData(data);
			});
		} else if (params.id != null) {
			FirebaseService.firestore
				.collection('users')
				.doc(params.id)
				.get()
				.then(doc => {
					setTeacherData({ id: doc.id, ...doc.data() });
				})
				.catch(error => {
					console.log('Error getting data: ', error);
				});

			FirebaseService.getAllStudentsForTeacher(params.id).then(data => {
				setStudentsData(data);
			});
		} else {
			// <Redirect to="/pages/errors/error-404" />;
			console.error('Should show a message and redirect to 404');
			// TODO $$ Redirect to 404 if id is wrong (later)
		}
	}, [refreshToggler]);

	const studentsArr = [
		{
			key: 1,
			studentName: 'Yazan Qawasmeh',
			lessonName: 'Arabic',
			exerciseName: '12',
			avgScore: 96
		},
		{
			key: 2,
			studentName: 'Basel Tabakha',
			lessonName: 'Arabic',
			exerciseName: '11',
			avgScore: 87
		},
		{
			key: 3,
			studentName: 'Saeed Sharabati',
			lessonName: 'Arabic',
			exerciseName: '10',
			avgScore: 84
		},
		{
			key: 4,
			studentName: 'Saad Motamad',
			lessonName: 'Arabic',
			exerciseName: '9',
			avgScore: 79
		},
		{
			key: 5,
			studentName: 'Ahmad Othman',
			lessonName: 'Arabic',
			exerciseName: '12',
			avgScore: 71
		}
	];

	let handleOnClick = id => {
		// router.transitionTo();

		history.push('/pages/student?id=' + id);
	};

	let sectionChanged = section => {
		if (
			typeof section === 'string' &&
			(section == 'All' || section == 'A' || section == 'B' || section == 'C' || section == 'D' || section == 'E')
		) {
			setSection(section);

			if (params.id == null && user.role.includes('teacher')) {
				FirebaseService.getAllStudentsForTeacher(user.uid, section).then(data => {
					setStudentsData(data);
				});
			} else if (params.id != null) {
				FirebaseService.getAllStudentsForTeacher(params.id, section).then(data => {
					setStudentsData(data);
				});
			}
		}
	};

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
						<img className="w-full" src="assets/images/custom/teacher_graphic.png" alt="" />
					</div>
					<div className="flex justify-center px-5 -mt-12">
						<img
							className="bg-white p-2 rounded-full"
							src="assets/images/custom/teacher.svg"
							alt="Student Image"
							style={{
								width: '120px',
								boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' //border: "solid 3px"
							}}
						/>
					</div>
					<div>
						<div className="text-center px-14">
							<h2 className="text-3xl font-bold pt-14">{teacherData.name}</h2>
							<p className="text-gray-400 mt-2">{teacherData.email}</p>
							<div className={classes.smallerInfo}>
								<div className={classes.smallerInfoRow}>
									<div className="font-semibold">Number of Students:</div>
									<div>{studentsData.length}</div>
								</div>
								<div className={classes.smallerInfoRow}>
									<div className="font-semibold">Last Active:</div>
									<div>{user.data.lastOnline != null ? user.data.lastOnline?.split('T')[0] : 'Today'}</div>
								</div>
								<div className={classes.smallerInfoRow}>
									<div className="font-semibold">Date Joined:</div>
									<div>{user.data.dateJoined != null ? user.data.dateJoined?.split('T')[0] : '2021-10-20'}</div>
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
								<p>{/* <span className="font-semibold">Completed: </span> 7 */}</p>
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

			<p className={classes.title}>Students</p>
			<br />

			<section className="py-1 bg-blueGray-50" style={{ width: '67%', fontSize: '16px' }}>
				<div className="w-full  mb-12 xl:mb-0 px-6 mx-auto mt-24">
					<div className="relative flex flex-col min-w-0 break-words bg-white px-12 w-full mb-6 shadow-lg rounded ">
						<div className="rounded-t mb-0 border-0">
							<div className="flex flex-wrap items-center">
								<div className="relative w-full py-4 px-14 max-w-full flex-grow flex-1">
									<p className="font-semibold text-lg text-blueGray-700">Data</p>
								</div>
								<Select
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									value={section}
									onChange={e => {
										sectionChanged(e.target.value);
									}}
									label="Section"
								>
									<MenuItem value="All">All</MenuItem>
									<MenuItem value="A">A</MenuItem>
									<MenuItem value="B">B</MenuItem>
									<MenuItem value="C">C</MenuItem>
									<MenuItem value="D">D</MenuItem>
									<MenuItem value="E">E</MenuItem>
								</Select>
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
							<table className="items-center bg-transparent w-full border-collapse">
								<thead>
									<tr>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											#
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Name
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Section
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Current Lesson
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Exercise Completed
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Avg. Score
										</th>
									</tr>
								</thead>
								<tbody>
									{studentsData.map((item, index) => (
										<tr key={item.id} onClick={() => handleOnClick(item.id)}>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap  text-left text-blueGray-700">
												{index + 1}
											</td>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap  text-left text-blueGray-700">
												{item.name}
											</td>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap  text-left text-blueGray-700">
												{item.section}
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

export default TeacherProfilePage;
