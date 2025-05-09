import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import {
	FormColumn,
	FormWrapper,
	FormInput,
	FormSection,
	FormRow,
	FormLabel,
	FormInputRow,
	FormMessage,
	FormButton,
	FormTitle,
} from './loginStyle';
import { Container } from '../../globalStyles';
import validateForm from './validatelogin';
import Particle from '../Particle';

const Form = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	let history = useNavigate();
	const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])

	const handleSubmit = async (e) => {
		e.preventDefault();
		const resultError = validateForm({ name, email, password, confirmPass });
		const res =await fetch("/sign-in",{
			method: "POST",
			headers :{
				"Content-Type": "application/json"
			},
			body: JSON.stringify({				
				email : email,
				password :password
			})
		});
		console.log(res.statusText);
		const data= res.json();
		console.log(data);
		if(res.status!==201){
			window.alert("Invalid Email/Password");
		}else{
			let expires = new Date()
			expires.setTime(expires.getTime() + (1000* 1000))
			setCookie('access_token', res.statusText, { path: '/',  expires})
			//setCookie('refresh_token', response.data.refresh_token, {path: '/', expires})
			window.alert("LogIn Successful");
			history('/');
		}

		if (resultError !== null) {
			setError(resultError);
			return;
		}
		setName('');
		setEmail('');
		setPassword('');
		setConfirmPass('');
		setError(null);
		setSuccess('Application was submitted!');
	};

	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const formData = [
		
		{ label: 'Email', value: email, onChange: (e) => setEmail(e.target.value), type: 'email' },
		{
			label: 'Password',
			value: password,
			onChange: (e) => setPassword(e.target.value),
			type: 'password',
		},
		
	];
	return (
		<FormSection>
			<Particle/>
			<Container>
				<FormRow>
					<FormColumn small>
						<FormTitle>Log In</FormTitle>
						<FormWrapper onSubmit={handleSubmit}>
							{formData.map((el, index) => (
								<FormInputRow key={index}>
									<FormLabel>{el.label}</FormLabel>
									<FormInput
										type={el.type}
										placeholder={`Enter your ${el.label.toLocaleLowerCase()}`}
										value={el.value}
										onChange={el.onChange}
									/>
								</FormInputRow>
							))}

							<FormButton type="submit" >Log In</FormButton>
						</FormWrapper>
						<br/>
						<text>Not Registered? <a href='/signup'>SignUp</a></text>
						{error && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
								error
							>
								{error}
							</FormMessage>
						)}
						{success && (
							<FormMessage
								variants={messageVariants}
								initial="hidden"
								animate="animate"
							>
								{success}
							</FormMessage>
						)}
					</FormColumn>
					
				</FormRow>
				
			</Container>
		</FormSection>
	);
};

export default Form;
