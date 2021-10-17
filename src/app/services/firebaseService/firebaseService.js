/* eslint import/no-extraneous-dependencies: off*/
import te from 'date-fns/locale/te';
import firebase from 'firebase/app';
import 'firebase/auth';
import {
	doc,
	setDoc
} from 'firebase/firestore';
import {
	reject
} from 'lodash';
import {
	use
} from 'marked';
import {
	resolve
} from 'promise';
import config from './firebaseServiceConfig';

class FirebaseService {
	init(success) {
		if (Object.entries(config).length === 0 && config.constructor === Object) {
			if (process.env.NODE_ENV === 'development') {
				console.warn(
					'Missing Firebase Configuration at src/app/services/firebaseService/firebaseServiceConfig.js'
				);
			}
			success(false);
			return;
		}

		if (firebase.apps.length) {
			return;
		}
		firebase.initializeApp(config);
		this.firestore = firebase.firestore();
		this.auth = firebase.auth();
		success(true);
	}

	getTeacherStudents = teacherEmail => {
		if (!firebase.apps.length) {
			return false;
		}

		var usersRef = this.firestore.collection("users");
		var query = usersRef.where("teacherEmail", "==", teacherEmail);

		return new Promise((resolve, reject) => {

			query.get()
				.then((querySnapshot) => {
					// querySnapshot.forEach((doc) => {
					// doc.data() is never undefined for query doc snapshots
					// console.log(doc.id, " => ", doc.data());
					// });
					let data = querySnapshot.docs.map(doc => {
						return {
							id: doc.id,
							...doc.data()
						};
					});
					resolve(data);
				})
				.catch((error) => {
					console.log("Error getting documents: ", error);
					reject(error);
				});
		});
	};


	isTeacherEmail = teacherEmail => {
		if (!firebase.apps.length) {
			return false;
		}

		var usersRef = this.firestore.collection("users");
		var query = usersRef.where("email", "==", teacherEmail.toLowerCase());

		return new Promise((resolve, reject) => {

			query.get()
				.then((querySnapshot) => {
					resolve(querySnapshot.size > 0);
				})
				.catch((error) => {
					console.log("Error getting documents: ", error);
					reject(error);
				});
		});
	};

	resetPassword = email => {
		if (!firebase.apps.length) {
			return false;
		}

		return new Promise((resolve, reject) => {

			firebase.auth().sendPasswordResetEmail(email)
				.then(() => {
					resolve();
					console.log("email sent!");
				})
				.catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	};

	addExerciseAttempt = (exerciseDataId) => {
		if (!firebase.apps.length) {
			return false;
		}

		return new Promise((resolve, reject) => {

			var exerciseDataRef = this.firestore.collection("exerciseData").doc(exerciseDataId);

			exerciseDataRef.update({
				attempts: firebase.firestore.FieldValue.increment(1)
			}).then(result => {

				console.log("attempts increased!", result);
				resolve();
			})
				.catch(error => {
					console.log('Error incrementing document property:', error);
					reject();
				});;
		});
	};

	// TODOXD M7 Get user data from firestore
	getUserData = userId => {
		if (!firebase.apps.length) {
			return false;
		}
		return new Promise((resolve, reject) => {
			console.log(userId);
			var userDocRef = this.firestore.collection('users').doc(userId);

			userDocRef
				.get()
				.then(doc => {
					console.log("FASFASFASASFASFSAFASFASFSAFASFASFSA", doc.data());
					if (doc.exists) {
						console.log('Document data:', doc.data());
						resolve(doc.data());
					} else {
						// doc.data() will be undefined in this case
						console.log('No such document!');
					}
				})
				.catch(error => {
					reject();
					console.log('Error getting document:', error);
				});
		});
	};

	getAllExercises = user => {
		if (!firebase.apps.length) {
			return false;
		}

		var exercisesRef = this.firestore.collection("exercises");
		var query = exercisesRef.orderBy('order');

		return new Promise((resolve, reject) => {

			exercisesRef.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						// doc.data() is never undefined for query doc snapshots
						console.log(doc.id, " => ", doc.data());
					});
					let data = querySnapshot.docs.map(doc => {
						doc.data();
					});
					resolve(querySnapshot);
				})
				.catch((error) => {
					console.log("Error getting exercises: ", error);
					reject(error);
				});
		});
	};

	updateUserData = user => {
		if (!firebase.apps.length) {
			return false;
		}

		// Add a new document in collection		
		console.log("fasgwseohgewoigjewojgioewjoiw", user);
		return this.firestore.collection('users')
			.doc(user.uid)
			.set({
				name: user.name || user.data.displayName,
				displayName: user.name || user.data.displayName,
				// name: user.data.displayName != null ? user.data.displayName : user.name, // TODOXD COME BACK HERE!!
				email: user.data.email,
				role: user.role,
				teacherEmail: user.data.teacherEmail ? user.data.teacherEmail.toLowerCase() : '',
				currentExercise: user.currentExercise != undefined ? user.currentExercise : null
				// TODOXD continue here
			})
			.then(() => {
				console.log('Document successfully written!');
			})
			.catch(error => {
				console.error('Error writing document: ', error);
			});
		//return this.db.ref(`users/${user.uid}`).set(user);
	};

	onAuthStateChanged = callback => {
		if (!this.auth) {
			return;
		}
		this.auth.onAuthStateChanged(callback);
	};

	signOut = () => {
		if (!this.auth) {
			return;
		}
		this.auth.signOut();
	};
}

const instance = new FirebaseService();

export default instance;