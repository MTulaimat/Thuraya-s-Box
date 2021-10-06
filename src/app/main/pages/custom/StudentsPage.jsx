import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import FirebaseService from 'app/services/firebaseService';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
let i = 0;
function StudentsPage() {
	const [hasError, setErrors] = useState(false);
	const [students, setStudents] = useState([]);
	const [load, setLoad] = useState(false);
	console.log(++i);

	const user = useSelector(({ auth }) => auth.user);

	useEffect(() => {
		async function fetchStudents() {
			// const res = await FirebaseService.getTeacherStudents('khalid-ahmad@rawafid.com');
			const res = await FirebaseService.getTeacherStudents(user.data.email);
			setStudents(res);
		}

		fetchStudents();
	}, [load]);

	return (
		<React.Fragment>
			<CssBaseline />
			<Container maxWidth="sm">
				{/* <Container fixed> */}
				<Typography
					className="flex flex-col items-center gap-24 my-40 p-24 rounded-2xl"
					component="div"
					// style={{ backgroundColor: '#EEEEEE00' }}
					style={{ backgroundColor: 'lightcyan' }}
				>
					{students.length === 0 ? <div> No students found! </div> : null}
					{students.map((student, i) => (
						<StudentCard student={student} key={student.id} />
					))}
				</Typography>
			</Container>
		</React.Fragment>
	);
}

export default StudentsPage;
