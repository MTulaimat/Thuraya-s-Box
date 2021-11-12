import {
	createSlice
} from '@reduxjs/toolkit';
import {
	showMessage
} from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import {
	createUserSettingsFirebase,
	setUserData
} from './userSlice';
import { isArray } from 'lodash';

export const submitRegister =
	({
		displayName,
		password,
		email
	}) =>
		async dispatch => {
			return jwtService
				.createUser({
					displayName,
					password,
					email
				})
				.then(user => {
					dispatch(setUserData(user));
					return dispatch(registerSuccess());
				})
				.catch(errors => {
					return dispatch(registerError(errors));
				});
		};

export const registerWithFirebase = model => async dispatch => {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");
		return () => false;
	}

	const {
		email,
		password,
		displayName,
		teacherEmail,
		role,
		currentExercise,
		level,
		section
	} = model;

	// TODOXD warn user in form if teacher email doesnt exist!

	let levelInt;
	if (role == 'student') {
		let isTeacherEmail = await firebaseService.isTeacherEmail(teacherEmail);

		if (level != null && typeof (level) == 'string')
			levelInt = parseInt(level);

		if (!isTeacherEmail) {
			alert(`Teacher's e-mail doesn't exist!`);
			console.log("Teacher's e-mail doesn't exist!");
			return;
		}
	}

	let result = await firebaseService.firestore.collection('users').where('email', '==', teacherEmail).get();
	let teacherDocId = result.docs[0].id;
	let teacherDoc = await firebaseService.firestore.collection('users').doc(teacherDocId).get();
	let teacherName = teacherDoc.data().name;

	return firebaseService.auth
		.createUserWithEmailAndPassword(email, password)
		.then(response => {
			dispatch(
				createUserSettingsFirebase({
					...response.user,
					displayName,
					email,
					teacherEmail,
					teacherName: teacherName,
					role,
					currentExercise,
					level: levelInt,
					completed: 0,
					dateJoined: new Date().addHours(4).toISOString(),
					lastOnline: new Date().addHours(4).toISOString(),
					section
				})
			);

			return dispatch(registerSuccess());
		})
		.catch(error => {
			const usernameErrorCodes = ['auth/operation-not-allowed', 'auth/user-	not-found', 'auth/user-disabled'];

			const emailErrorCodes = ['auth/email-already-in-use', 'auth/invalid-email'];

			const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

			const response = [];

			if (usernameErrorCodes.includes(error.code)) {
				response.push({
					type: 'username',
					message: error.message
				});
			}

			if (emailErrorCodes.includes(error.code)) {
				response.push({
					type: 'email',
					message: error.message
				});
			}

			if (passwordErrorCodes.includes(error.code)) {
				response.push({
					type: 'password',
					message: error.message
				});
			}

			if (error.code === 'auth/invalid-api-key') {
				dispatch(showMessage({
					message: error.message
				}));
			}

			return dispatch(registerError(response));
		});
};

const initialState = {
	success: false,
	errors: []
};

const registerSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {
		registerSuccess: (state, action) => {
			state.success = true;
			state.errors = [];
		},
		registerError: (state, action) => {
			state.success = false;
			state.errors = action.payload;
		}
	},
	extraReducers: {}
});

export const {
	registerSuccess,
	registerError
} = registerSlice.actions;

export default registerSlice.reducer;