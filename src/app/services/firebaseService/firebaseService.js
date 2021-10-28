/* eslint import/no-extraneous-dependencies: off*/
import firebase from 'firebase/app';
import 'firebase/auth';
import {
	doc,
	setDoc
} from 'firebase/firestore';
import {
	random,
	reject, VERSION
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

	getAllStudents = () => {
		if (!firebase.apps.length) {
			return false;
		}

		var usersRef = this.firestore.collection("users");
		var query = usersRef.where("role", "array-contains", "student").orderBy('averageScore', 'desc');

		return new Promise((resolve, reject) => {
			query.get()
				.then((querySnapshot) => {
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


	getAllStudentsForTeacher = async (teacherId) => {
		if (!firebase.apps.length) {
			return false;
		}

		var teacherDoc = await this.firestore.collection("users").doc(teacherId).get();
		console.log('teacherId ', teacherId);
		console.log('teacherDoc ', teacherDoc.data());
		var teacherEmail = teacherDoc.data().email;

		var usersRef = this.firestore.collection("users");
		var query = usersRef.where('teacherEmail', '==', teacherEmail).where("role", "array-contains", "student").orderBy('averageScore', 'desc');

		return new Promise((resolve, reject) => {
			query.get()
				.then((querySnapshot) => {
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

	getAllTeachers = () => {
		if (!firebase.apps.length) {
			return false;
		}

		var usersRef = this.firestore.collection("users");
		var query = usersRef.where("role", "array-contains", "teacher").orderBy('name', 'asc');

		return new Promise((resolve, reject) => {
			query.get()
				.then((querySnapshot) => {
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

	getAvgExerciseForTeacher = async (teachersData) => {
		if (!firebase.apps.length) {
			return false;
		}

		let result = [];

		return new Promise(async (resolve, reject) => {

			for (let i = 0; i < teachersData.length; i++) {
				let querySnapshot = await this.firestore.collection("users")
					.where("teacherEmail", "==", teachersData[i].email)
					.get();

				let data = querySnapshot.docs.map(doc => {
					return {
						id: doc.id,
						...doc.data()
					};
				});

				let res;
				res = data.reduce((a, b) => a + b.completed, 0);
				res = res / data.length;

				result[i] = res;
			}

			resolve(result);
		});
	};

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
			var userDocRef = this.firestore.collection('users').doc(userId);

			userDocRef
				.get()
				.then(doc => {
					if (doc.exists) {
						console.log('getUserData: ', doc.data());
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
		return this.firestore.collection('users')
			.doc(user.uid)
			.set({
				name: user.name || user.data.displayName,
				displayName: user.name || user.data.displayName,
				email: user.data.email,
				role: user.role,
				teacherEmail: user.data.teacherEmail ? user.data.teacherEmail.toLowerCase() : '',
				currentExercise: user.currentExercise != undefined ? user.currentExercise : null,
				teacherName: user.data.teacherName != null ? user.data.teacherName : '',
				level: user.data.level != null ? user.data.level : 1,
				// TODOXD continue here
			}, { merge: true })
			.then(() => {
				console.log('Document successfully written!');
			})
			.catch(error => {
				console.error('Error writing document: ', error);
			});
		//return this.db.ref(`users/${user.uid}`).set(user);
	};

	createFakeData = async () => {
		if (!firebase.apps.length) {
			return false;
		}

		let fakeFirstNames = [
			"Mohamad",
			"Omar",
			"Ali",
			"Ahmad",
			"Ibrahim",
			"Yousef",
			"Khalil",
			"Fatima",
			"Lena",
			"Amira",
			"Aisha",
			"Zahra",
			"Alia",
			"Salma",
			"Zainab",
			"Aya",
			"Reem",
			"Malak",
			"Yasmin",
			"Farah",
			"Kareem",
			"Fahad",
			"Faisal",
			"Sultan",
			"Yazan",
			"Mahmoud",
		];

		let fakeLastNames = [
			"Ammar",
			"AlShomaly",
			"AlQasim",
			"AlRasheed",
			"Qubbaj",
			"Qawasmeh",
			"AlSalem",
			"AlOmary",
			"AlOmary",
			"Abadi",
			"Badawi",
			"Darwish",
			"Ghazali",
			"Kassab",
			"Maamoun",
			"Nabih",
			"Najjar",
			"Qadir",
			"Qureshi",
			"Qasem",
			"Sameer",
			"Morad",
			"Tabakha",
			"Othman",
			"Husainy",
			"AlYousef",
		];

		//used
		let generatedStudentNames = [];

		//unused
		let teachers = ["Fatima Ahmad", "Mohamad Yahia", "Anas Nakawa", "Amira Mohamad", "Sami Saeed"];

		//used
		let teacherEmails = [
			"teacher@mail.com",
			"osamaqasim@mail.com",
			"anasnakawa@mail.com",
			"amiramohamad@mail.com",
			"samisaeed@mail.com",
		];

		let incompleteExercise = {
			attempts: 1,
			completed: false,
			exerciseId: "arabic-image-colorer-1",
			lesson: "Arabic",
			mistakes: 1,
			order: 2,
			level: 1,
			studentId: "hCXvl0ARHFOz374VEH8Q5rLPCGB3",
			title: "Letter Picker",
		};

		let allExercises = [{
			order: 1,
			id: "arabic-letter-picker-1",
			lesson: "Arabic",
			level: 1,
			title: "Letter Picker",
		}, {
			order: 2,
			id: "arabic-image-colorer-1",
			lesson: "Arabic",
			level: 1,
			title: "Image Coloring",
		}, {
			order: 3,
			id: "arabic-letter-drawer-1",
			lesson: "Arabic",
			level: 1,
			title: "Letter Drawing",
		}, {
			id: "arabic-letter-dragger-1",
			lesson: "Arabic",
			level: 1,
			order: 4,
			title: "Letter Dragging",
		}, {
			id: "arabic-letter-orderer-1",
			lesson: "Arabic",
			level: 1,
			order: 5,
			title: "Letter Ordering",
		}, {
			id: "arabic-word-drawer-1",
			lesson: "Arabic",
			level: 1,
			order: 6,
			title: "Word Drawing",
		}];

		// score : 000, // Calculate like this: 100 - (mistakes * 2) - (time - 20)
		// mistakes : 000, //RANDOMIZE FROM 0 to 3
		// time : 000, //RANDOMIZE FROM 20 to 40

		let exerciseSamples = [
			[ // Sample 1 (3.5/6)
				{
					completed: true,
				},
				{
					completed: true,
				},
				{
					completed: true,
				},
				{
					completed: false,
				},
			],
			[ // Sample 2 (5/6)
				{
					completed: true,
				},
				{
					completed: true,
				},
				{
					completed: true,
				},
				{
					completed: true,
				},
				{
					completed: true,
				},
			],
			[ // Sample 3 (2.5/6)
				{
					completed: true,
				},
				{
					completed: true,
				},
				{
					completed: false,
				},
			],
			[ // Sample 4 (1.5/6)
				{
					completed: true,
				},
				{
					completed: false,
				},
			],
			[ // Sample 5 (1.5/6)
				{
					completed: true,
				},
				{
					completed: true,
				},
				{
					completed: false,
				},
			],
			[ // Sample 6 (3/6)
				{
					completed: true,
				},
				{
					completed: true,
				},
				{
					completed: true,
				},
			],
		];

		let i = 0;
		while (i < 50) {
			let randomFirst = random(25);
			let randomLast = random(25);
			let generatedName = fakeFirstNames[randomFirst] + " " + fakeLastNames[randomLast];

			if (!generatedStudentNames.includes(generatedName)) {
				generatedStudentNames.push(generatedName);

				let teacherEmail = teacherEmails[i % 5];

				setTimeout(() => {
					this.firestore.collection('users')
						.add({
							name: generatedName,
							displayName: generatedName,
							email: generatedName.split(" ").join("").toLowerCase() + "@mail.com",
							role: ["student"],
							teacherEmail: teacherEmail,
							// currentExercise: calculate this one on the front end
						})
						.then((docRef) => {
							console.log('Student document successfully written!');

							let randomExercisesSample = random(exerciseSamples.length - 1);
							let pickedExercises = _.cloneDeep(exerciseSamples[randomExercisesSample]);
							for (let j = 0; j < pickedExercises.length; j++) {

								let completeExercise = {
									attempts: 1,
									completed: true,
									exerciseId: "arabic-letter-picker-1",
									lesson: "Arabic",
									mistakes: 1,
									order: 1,
									level: 1,
									score: 80,
									studentId: "hCXvl0ARHFOz374VEH8Q5rLPCGB3",
									time: 30,
									title: "Letter Picker",
								};

								pickedExercises[j].level = 1;
								pickedExercises[j].order = j + 1;
								pickedExercises[j].lesson = "Arabic";
								pickedExercises[j].title = allExercises[j].title;
								pickedExercises[j].exerciseId = allExercises[j].id;
								pickedExercises[j].studentId = docRef.id;
								pickedExercises[j].attempts = random(1, 3);
								pickedExercises[j].mistakes = random(0, 3);

								if (pickedExercises[j].completed === true) {
									pickedExercises[j].time = random(20, 40);
									pickedExercises[j].score = 100 - (2 * pickedExercises[j].mistakes) - pickedExercises[j].time;
								}

								setTimeout(() => {
									this.firestore.collection('exerciseData').doc(docRef.id + "-" + pickedExercises[j].exerciseId).set(
										pickedExercises[j]
									).then(() => {
										console.log("exerciseData document successfully written!");
									});
								}, 50);
							}
						})
						.catch(error => {
							console.error('Error writing document: ', error);
						});
				}, 50);

				i++;
			}
		}
	};

	calculateLessonCompletedForAllStudents = async () => {
		if (!firebase.apps.length) {
			return false;
		}

		// get literally all students:
		var querySnapshot = await this.firestore
			.collection('users')
			.where('role', 'array-contains', 'student')
			.get();

		let data = querySnapshot.docs.map(doc => {
			return {
				id: doc.id,
				...doc.data()
			};
		});

		// for each student, 
		// get all their exercises, and see what's the heighest they completed (order)
		for (var i = 0; i < data.length; i++) {
			var querySnapshot2 = await this.firestore
				.collection('exerciseData')
				.where('studentId', '==', data[i].id)
				.get();

			let exerciseData = querySnapshot2.docs.map(doc => {
				return {
					id: doc.id,
					...doc.data()
				};
			});;

			if (data[i].id == 'student2@mail.com')
				console.log(exerciseData.length);

			if (exerciseData.length > 0) {
				let res = exerciseData.reduce((a, b) => { return (a.order > b.order) ? a : b; });
				console.log('res 592 calculateLessonCompletedForAllStudents firebaseService.js: ', res);
				let completed = res.order;
				if (res.completed != true) completed = completed - 1;
				if (isNaN(completed) || completed == null) completed = 0;
				this.firestore.collection('users').doc(data[i].id).update({ completed: completed });
			} else {
				this.firestore.collection('users').doc(data[i].id).update({ completed: 0 });
			}
		}

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


