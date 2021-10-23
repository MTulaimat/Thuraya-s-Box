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
import { useState } from 'react';
import './Leaderboard.css';
import FirebaseService from 'app/services/firebaseService';

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
			studentName: 'Amer Ahmad',
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
		},
		{
			key: 10,
			studentName: 'Ahmad Khalid',
			teacherName: 'Fatima Ahmad',
			exerciseName: '11',
			avgScore: 87
		},
		{
			key: 11,
			studentName: 'Abdullah Khaldon',
			teacherName: 'Sami Saeed',
			exerciseName: '10',
			avgScore: 82
		},
		{
			key: 12,
			studentName: 'Mustafa Salem',
			teacherName: 'Amira Mohamad',
			exerciseName: '9',
			avgScore: 79
		},
		{
			key: 13,
			studentName: 'Rasheed Othman',
			teacherName: 'Sami Saeed',
			exerciseName: '12',
			avgScore: 71
		},
		{
			key: 14,
			studentName: 'Abdrahman AlShomaly',
			teacherName: 'Amira Mohamad',
			exerciseName: '12',
			avgScore: 99
		},
		{
			key: 15,
			studentName: 'Qasim Ameen',
			teacherName: 'Sami Saeed',
			exerciseName: '11',
			avgScore: 85
		},
		{
			key: 16,
			studentName: 'Taher Mansi',
			teacherName: 'Sami Saeed',
			exerciseName: '10',
			avgScore: 84
		},
		{
			key: 17,
			studentName: 'Samer Osama',
			teacherName: 'Anas Nakawa',
			exerciseName: '9',
			avgScore: 59
		},
		{
			key: 18,
			studentName: 'Omar Salah',
			teacherName: 'Sami Saeed',
			exerciseName: '12',
			avgScore: 58
		},
		{
			key: 19,
			studentName: 'Mahmoud Barakat',
			teacherName: 'Amira Mohamad',
			exerciseName: '10',
			avgScore: 84
		},
		{
			key: 20,
			studentName: 'Muhab Qubaj',
			teacherName: 'Amira Mohamad',
			exerciseName: '12',
			avgScore: 98
		}
	];

	let sortedStudentsArr = studentsArr.sort((a, b) => {
		return b.avgScore - a.avgScore;
	});

	let handleOnClick = name => {
		history.push('/pages/student?n=' + name.replace(' ', '+'));
	};

	return (
		<div className={classes.root}>
			<p className={classes.title}>Leaderboards</p>
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
											#
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Name
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Teacher
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Exercises Completed
										</th>
										<th className="py-9 px-14 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Avg. Score
										</th>
									</tr>
								</thead>
								<tbody>
									{sortedStudentsArr.map((item, index) => (
										<tr key={item.key} onClick={() => handleOnClick(item.studentName)}>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap  text-left text-blueGray-700">
												{index + 1}
											</td>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap  text-left text-blueGray-700">
												{item.studentName}
											</td>
											<td className="border-t-0 py-9 px-14 align-middle border-l-0 border-r-0 whitespace-nowrap">
												{item.teacherName}
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
		</div>
	);
}

export default ProfilePage;
