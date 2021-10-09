import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FirebaseService from 'app/services/firebaseService';

// src\Unity\build
const unityContext = new UnityContext({
	dataUrl: 'unity/build/B2.data',
	frameworkUrl: 'unity/build/B2.framework.js',
	loaderUrl: 'unity/build/B2.loader.js',
	codeUrl: 'unity/build/B2.wasm'
});

const useStyles = makeStyles(theme => ({
	root: {
		//width: '100vw',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'start',
		alignItems: 'center',
		padding: 10
	},
	unity: {
		// width: 1280,
		// height: 720,
		// padding: 20
	},
	unityContainer: {
		backgroundColor: 'red',
		width: '95%',
		height: '100%'
	},
	test: {
		backgroundColor: 'red'
	},
	title: {
		marginTop: 20,
		fontSize: 25,
		padding: 10,
		paddingLeft: '50vw',
		paddingRight: '50vw',
		backgroundColor: 'lightcyan'
	},
	image: {
		width: '100%',
		opacity: 1
	}
}));

function PlaygroundPage() {
	const classes = useStyles();
	const theme = useTheme();
	const ref = useRef(null);

	if (useKey('T')){

		var tempUserID = "IjFWwTbbL4OX3QdK72fOFAAMwLC3";
		var exercises = FirebaseService.getAllExercises(tempUserID);

		exercises.then(() => {

			console.log(exercises);
			exercises.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
			});
		})
	}
	
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			console.log('width', ref.current.offsetWidth);
			setSize([
				ref.current.offsetWidth == 0 ? 1280 : ref.current.offsetWidth,
				ref.current.offsetWidth == 0 ? 720 : ref.current.offsetWidth / 1.777777777777778
			]);
		}

		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);

	useEffect(function () {
		unityContext.on('Unity_AddExerciseAttempt', function (exerciseID) {
			var tempUserID = "IjFWwTbbL4OX3QdK72fOFAAMwLC3";
			FirebaseService.addExerciseAttempt(tempUserID + "-" + exerciseID);
		});

		unityContext.on('Unity_Correct', function () {
			
		});
		
		unityContext.on('Unity_False', function () {
		});
	}, []);

	const [progression, setProgression] = useState(0);

	useEffect(function () {
	  unityContext.on("progress", function (progression) {
		setProgression(progression);
	  });
	}, []);

	return (
		<div className={classes.root}>
			{/* <div className={classes.test}>HAALLOOOO</div> */}
			{/* <h2>Loading {progression * 100}%</h2> */}
			<Typography className={classes.title}>Playground!</Typography>
			<div ref={ref} className={classes.unityContainer}>
				<Unity
					unityContext={unityContext}
					matchWebGLToCanvasSize={true}
					style={{ width: size[0], height: size[1] }}
				/>
			</div>
			<img className={classes.image} src={'assets/images/custom/art/backtoschool.svg'}></img>
		</div>
	);

	function useKey(key) {
		// Keep track of key state
		const [pressed, setPressed] = useState(false)
	
		// Does an event match the key we're watching?
		const match = event => key.toLowerCase() == event.key.toLowerCase()
	
		// Event handlers
		const onDown = event => {
			if (match(event)) setPressed(true)
		}
	
		// Bind and unbind events
		useEffect(() => {
			window.addEventListener("keydown", onDown)
			return () => {
				window.removeEventListener("keydown", onDown)
			}
		}, [key])
	
		return pressed
	}
}

export default PlaygroundPage;
