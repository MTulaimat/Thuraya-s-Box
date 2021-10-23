import { makeStyles } from '@material-ui/core/styles';
import ChartWidget from '../custom/ChartWidget';
import { useSelector } from 'react-redux';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import { useUrlSearchParams } from 'use-url-search-params';
import './TeacherPage.css';

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
	const categories = ['Exercise 1', 'Exercise 2', 'Exercise 3', 'Exercise 4', 'Exercise 5', 'Exercise 6'];

	const widgetData1 = [70, 80, 35, 95, 70, 80];
	const widgetData2 = [4, 5, 3, 8, 7, 9];
	const widgetData3 = [20, 120, 45, 35, 80, 30];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

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

	let handleOnClick = name => {
		// router.transitionTo();

		history.push('/pages/student?n=' + name.replace(' ', '+'));
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
							<h2 className="text-3xl font-bold pt-14">{params.n == null ? user.name : params.n}</h2>
							<p className="text-gray-400 mt-2">
								{/* {params.e == null ? user.data.email : params.e} */}
								teacher@mail.com
							</p>
							<div className={classes.smallerInfo}>
								<div className={classes.smallerInfoRow}>
									<div className="font-semibold">Number of Students:</div>
									<div>20{user.data.teacherName}</div>
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
											Avg. Score
										</th>
									</tr>
								</thead>
								<tbody>
									{studentsArr.map((item, index) => (
										<tr key={item.key} onClick={() => handleOnClick(item.studentName)}>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap  text-left text-blueGray-700">
												{item.studentName}
											</td>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap">
												{item.lessonName}
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
		</div>
	);
}

export default TeacherProfilePage;
