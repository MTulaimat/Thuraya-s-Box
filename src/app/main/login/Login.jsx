import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth0LoginTab from './tabs/Auth0LoginTab';
import FirebaseLoginTab from './tabs/FirebaseLoginTab';
import JWTLoginTab from './tabs/JWTLoginTab';

var color = '#533D21';
var colorRight = '#CAAF6B';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to right, #1b2330 0%, rgb(13, 17, 24) 100%)`,
		color: '#ffffff'
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, #1b2330 0%, rgb(13, 17, 24) 100%)`,
		color: '#ffffff'
	}
}));

function Login() {
	const classes = useStyles();

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.6 }}
				animate={{ opacity: 1, scale: 1 }}
				className="flex w-full max-w-400 md:max-w-3xl rounded-20 shadow-2xl overflow-hidden"
			>
				<Card
					className={clsx(
						classes.leftSection,
						'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
					)}
					square
				>
					<CardContent className="-mb-40 flex flex-col items-center justify-center w-full py-96 max-w-320">
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.2 } }}>
							<div className="flex items-center -mt-64">
								<img
									className="logo-icon w-4/12"
									src="assets/images/logos/Thurayas box - Logo only.svg"
									alt="logo"
								/>
								<div className="border-l-1 mr-4 w-1 h-40" />
								<img
									className="logo-icon w-8/12"
									src="assets/images/logos/Thurayas box - Text only.svg"
									alt="logo"
								/>
							</div>
						</motion.div>
						<FirebaseLoginTab />
					</CardContent>

					<div className="flex flex-col items-center justify-center pb-32">
						<div>
							<span className="font-normal mr-8">Don't have an account?</span>
							<Link className="font-normal" to="/register" style={{ color: '#DBB657' }}>
								Register
							</Link>
						</div>
						{/* <Link className="font-normal mt-8" to="../../pages/auth/forgot-password/ForgotPasswordPage.js"> */}
						<Link className="font-normal mt-8" to="/forgot-password" style={{ color: '#DBB657' }}>
							Forgot password?
						</Link>
						{/* <Link className="font-normal mt-8" to="/">
							Back to Dashboard
						</Link> */}
					</div>
				</Card>

				<div className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}>
					<div className="max-w-320">
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
						>
							<Typography variant="h3" color="inherit" className="font-semibold leading-tight">
								Welcome <br />
								to Thuraya's Box!
							</Typography>
						</motion.div>

						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
							<Typography variant="subtitle1" color="inherit" className="mt-32">
								A fun, exciting and educational playground for students, parents and techers!
							</Typography>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}

export default Login;
