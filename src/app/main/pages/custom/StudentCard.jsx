import React from 'react';
import { motion } from 'framer-motion';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		minWidth: '100%',
		height: '100px',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 0
	},
	details: {
		display: 'flex',
		flexDirection: 'column',
		flex: 2,
		alignItems: 'start',
		justifyContent: 'center',
		padding: '4px',
		// marginLeft: '25px',
	},
	content: {
		// flex: '1 0 auto', 
		// display: 'flex',
		// flexDirection: 'column',
		// justifyContent: 'center',
		// alignItems: 'flex-start',
		// padding: '4px',
	},
	avatar: {
		width: 80,
		height: 80,
	},
	divider: {
		width: 3,
		height: '80%',
		backgroundColor: 'darkGray',
		marginRight: 5,
		marginLeft: 50
	}
}));

export default function StudentCard(props) {
	const classes = useStyles();
	const theme = useTheme();

	return (
		// <motion.div className="flex-grow-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ scale: 1.1 }}>
		<Card className={classes.root}>
			{/* <div className={classes.divider}></div> */}
			<motion.div
				className={classes.details}
				initial={{ opacity: 0, scale: 0.7 }}
				whileHover={{ scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ ease: 'easeIn', duration: 0.2 }}
			>
				<CardContent className={classes.content}>
					<Typography component="h5" variant="h5">
						{props.student.name}
					</Typography>
					<Typography variant="subtitle1" color="textSecondary">
						{props.student.email}
					</Typography>
				</CardContent>
			</motion.div>
			<Avatar className={classes.avatar} alt="Default student" src="assets/images/custom/student.svg" />
			{/* <CardMedia
				className={classes.cover}
				image="assets/images/custom/student.png"
				// image="/material-ui-static/images/cards/live-from-space.jpg"
				title="Live from space album cover"
			/> */}
		</Card>
		// </motion.div>
	);
}
