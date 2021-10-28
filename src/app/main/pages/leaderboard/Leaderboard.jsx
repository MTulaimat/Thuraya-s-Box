import { makeStyles } from '@material-ui/core/styles';
import ChartWidget from '../custom/ChartWidget';
import { useSelector } from 'react-redux';
import { IconButton, Icon } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';
import './Leaderboard.css';
import FirebaseService from 'app/services/firebaseService';
import Switch from '@material-ui/core/Switch';

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
	const history = useHistory();
	const classes = useStyles();
	const [studentsData, setStudentsData] = useState([]);
	const user = useSelector(({ auth }) => auth.user);
	const [showMyStudentsOnly, setShowMyStudentsOnly] = useState(false);
	const [refreshToggler, setRefreshToggler] = useState(false);
	const [loading, setLoading] = useState(false);

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

	let handleOnClick = id => {
		history.push('/pages/student?id=' + id);
	};

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
		var usersRef = FirebaseService.firestore.collection('users');
		var query;
		if (user.role.includes('teacher') && showMyStudentsOnly === true)
			query = usersRef.where('teacherEmail', '==', user.data.email).orderBy('averageScore', 'desc');
		else if ((user.role.includes('teacher') && showMyStudentsOnly === false) || user.role.includes('admin'))
			query = usersRef.where('role', 'array-contains', 'student').orderBy('averageScore', 'desc');
		else if (user.role.includes('student'))
			query = usersRef.where('teacherEmail', '==', user.data.teacherEmail).orderBy('averageScore', 'desc');

		return new Promise((resolve, reject) => {
			query
				.get()
				.then(querySnapshot => {
					let data = querySnapshot.docs.map(doc => {
						return {
							id: doc.id,
							...doc.data()
						};
					});
					setStudentsData(data?.slice(0, 20));
				})
				.catch(error => {
					console.log('Error getting documents: ', error);
				});
		});
	}, [showMyStudentsOnly, refreshToggler]);

	let onSwitchChanged = checked => {
		setShowMyStudentsOnly(checked);
	};

	return (
		<div className={classes.root}>
			<p className={classes.title}>Leaderboards</p>
			<section className="py-1 bg-blueGray-50" style={{ width: '67%', fontSize: '16px' }}>
				<div className="w-full  mb-12 xl:mb-0 px-6 mx-auto">
					<div className="relative flex flex-col min-w-0 break-words bg-white px-12 w-full mb-6 shadow-lg rounded ">
						<div className="rounded-t mb-0 border-0">
							<div className="flex flex-wrap items-center" style={{ alignItems: 'baseline' }}>
								<div className="relative w-full py-4 px-14 max-w-full flex-grow flex-1">
									<p className="font-semibold text-lg text-blueGray-700">Data</p>
								</div>
								<div className="relative w-full px-6 max-w-full flex-grow flex-1 text-right">
									{user.role.includes('teacher') ? (
										<span style={{ paddingRight: '40px' }}>
											All Students
											<Switch
												checked={showMyStudentsOnly}
												onChange={e => {
													onSwitchChanged(e.target.checked);
												}}
											/>
											My Students Only
										</span>
									) : null}
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
											Student Average
										</th>
									</tr>
								</thead>
								<tbody>
									{studentsData.map((item, index) => (
										<tr key={item.id} onClick={() => handleOnClick(item.id)}>
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

export default ProfilePage;
