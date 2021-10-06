import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerWithFirebase } from 'app/auth/store/registerSlice';
import * as yup from 'yup';
import _ from '@lodash';
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { isTuesday } from 'date-fns';
import { boolean } from 'yup/lib/locale';

const defaultValues = {
	displayName: '',
	email: '',
	password: '',
	passwordConfirm: '',
	teacherEmail: '',
	role: ''
};

function FirebaseRegisterTab(props) {
	/* * Form Validation Schema */
	//Musab
	const [isStudent, setIsStudent] = useState(true);
	
	
	
	const schema = yup.object().shape({
		isStudent: yup.boolean(),
		displayName: yup.string().required('You must enter a display name'),
		email: yup.string().email('You must enter a valid email').required('You must enter an email'),
		password: yup.string().required('Please enter your password.').min(8, 'Password is too short - should be 8 chars minimum.'),
		passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),		
		teacherEmail: yup.string().when('isStudent',{
			is: true, // alternatively: (val) => val == true
			then: yup.string().email("You must enter a valid email").required('You must enter an email'),
			otherwise: yup.string().email("You must enter a valid email"),
		  })
	});

	// TODOXD when changing role on register change schema or wtv to not require teacherEmail, or just use notifications

	const teacherSchema = yup.object().shape({
		displayName: yup.string().required('You must enter a display name'),
		email: yup.string().email('You must enter a valid email').required('You must enter an email'),
		password: yup.string().required('Please enter your password.').min(8, 'Password is too short - should be 8 chars minimum.'),
		passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
	});

	const dispatch = useDispatch();
	const authRegister = useSelector(({ auth }) => auth.register);

	const [isFormValid, setIsFormValid] = useState(false);
	const formRef = useRef(null);
	const { control, formState, handleSubmit, reset, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: yupResolver(schema)
	});
	
	const { isValid, dirtyFields, errors } = formState;
	
	// useEffect(() => {
	// 	let schemeToUse = isStudent ? schema : teacherSchema;
	// 	({ control, formState, handleSubmit, reset, setError } = useForm({
	// 		mode: 'onChange',
	// 		defaultValues,
	// 		resolver: yupResolver(schemeToUse)
	// 	}));
	// }, [isStudent])

	useEffect(() => {
		authRegister.errors.forEach(error => {
			setError(error.type, {
				type: 'manual',
				message: error.message
			});
		});
	}, [authRegister.errors, setError]);

	function onSubmit(model) {

		var currRole = isStudent ? 'student' : 'teacher';
		model.role = [currRole];
		dispatch(registerWithFirebase(model));
	}

	return (
		<>
			<div className="w-full">
				<form className="flex flex-col justify-center w-full" onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="displayName"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mb-16"
								type="text"
								label="Display name"
								error={!!errors.displayName}
								helperText={errors?.displayName?.message}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												person
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								required
							/>
						)}
					/>

					<Controller
						name="email"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mb-16"
								type="text"
								error={!!errors.email}
								helperText={errors?.email?.message}
								label="Email"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												email
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								required
							/>
						)}
					/>

					<Controller
						name="password"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mb-16"
								type="password"
								label="Password"
								error={!!errors.password}
								helperText={errors?.password?.message}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												vpn_key
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								required
							/>
						)}
					/>

					<Controller
						name="passwordConfirm"
						control={control}
						render={({ field }) => (
							<TextField
								{...field}
								className="mb-16"
								type="password"
								label="Confirm Password"
								error={!!errors.passwordConfirm}
								helperText={errors?.passwordConfirm?.message}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												vpn_key
											</Icon>
										</InputAdornment>
									)
								}}
								variant="outlined"
								required
							/>
						)}
					/>

					{/* Teacher Email */}
					<>
						{isStudent ? (
							<Controller
								name="teacherEmail"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										className="mb-16"
										type="text"
										error={!!errors.teacherEmail}
										helperText={errors?.teacherEmail?.message}
										label="Teacher's Email"
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">
													<Icon className="text-20" color="action">
														email
													</Icon>
												</InputAdornment>
											)
										}}
										variant="outlined"
										required
									/>
								)}
							/>
						) : null}
					</>

					{/* Musab */}
					<FormControl component="fieldset">
						<RadioGroup
							row
							aria-label="position"
							name="position"
							defaultValue="student"
							className="flex justify-around"
							onChange={e => {
								setIsStudent(e.target.value === 'student' ? true : false);
							}}
						>
							<FormControlLabel
								value="student"
								control={<Radio color="primary" />}
								label="Student"
								labelPlacement="end"
							/>
							<FormControlLabel
								value="teacher"
								control={<Radio color="primary" />}
								label="Teacher"
								labelPlacement="end"
							/>
						</RadioGroup>
					</FormControl>

					<Button
						type="submit"
						variant="contained"
						color="primary"
						className="w-full mx-auto mt-16"
						aria-label="REGISTER"
						disabled={_.isEmpty(dirtyFields) || !isValid}
						value="legacy"
					>
						Register
					</Button>
				</form>
			</div>
		</>
	);
}

export default FirebaseRegisterTab;