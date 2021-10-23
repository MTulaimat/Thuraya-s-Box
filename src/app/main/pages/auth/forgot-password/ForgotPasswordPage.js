import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { darken } from '@material-ui/core/styles/colorManipulator';
import * as yup from 'yup';
import _ from '@lodash';
import FirebaseService from 'app/services/firebaseService';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	email: yup.string().email('You must enter a valid email').required('You must enter an email')
});

const defaultValues = {
	email: ''
};

function ForgotPasswordPage() {
	const classes = useStyles();
	const { control, formState, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});

	const { isValid, dirtyFields, errors } = formState;
	
	const onSubmit = values => {
		FirebaseService.resetPassword(values.email);
		reset(defaultValues);
	}

	// function onSubmit() {

	// 	FirebaseService.resetPassword();
	// 	// reset(defaultValues);
	// 	// resetPass();
		
	// }

	function resetPass(){


	}

	return (

		<div className={clsx(classes.root, 'flex flex-col flex-auto items-center justify-center p-16 sm:p-32')}>
			{console.log(classes.root)}
			<div className="flex flex-col items-center justify-center w-full">
				<motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}>
					<Card className="w-full max-w-384">
						<CardContent className="flex flex-col items-center justify-center p-16 sm:p-24 md:p-32">
							<img
								className="w-128 m-32"
								src="assets/images/logos/Thurayas box - Logo only.svg"
								alt="logo"
							/>

							<Typography variant="h6" className="mt-16 mb-24 font-semibold text-18 sm:text-24">
								Recover your password
							</Typography>

							<form
								name="recoverForm"
								noValidate
								className="flex flex-col justify-center w-full"
								onSubmit={handleSubmit(onSubmit)}
								// onSubmit={handleSubmit(onSubmit)}
							>
								<Controller
									name="email"
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											className="mb-16"
											label="Email"
											autoFocus
											type="email"
											error={!!errors.email}
											helperText={errors?.email?.message}
											variant="outlined"
											fullWidth
										/>
									)}
								/>

								<Button
									variant="contained"
									color="primary"
									className="w-224 mx-auto mt-16"
									aria-label="Reset"
									disabled={_.isEmpty(dirtyFields) || !isValid}
									type="submit"
								>
									Send reset link
								</Button>
							</form>

							<div className="flex flex-col items-center justify-center pt-32 pb-24">
								<Link className="font-normal" to="../../../login/Login.js">
									Go back to login
								</Link>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	);
}

export default ForgotPasswordPage;
