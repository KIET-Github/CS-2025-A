import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
} from './formOrgStyle';
import { Container } from '../../globalStyles';
import validateForm from './validateOrg';
import Particle from '../Particle';
import { ethers } from "ethers";
import abi from "../../utilits/secure.json"
const getEthereumObject = () => window.ethereum;

const Form = () => {
	const [name, setName] = useState('');
	const [about, setAbout] = useState('');
	const [description, setDescription] = useState('');
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	// const [confirmPass, setConfirmPass] = useState('');
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	let history = useNavigate();
    
    const { ethereum } = window;
    const contractAddress = "0x9E3F72e647302fe1B95A5021Bf825c1A43516034";
	const contractABI = abi.abi;

    const provider = new ethers.providers.Web3Provider(ethereum);
	  const signer = provider.getSigner();
	  const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);




	const handleSubmit = async(e) => {
		e.preventDefault();
		
		
        const formtxn = await wavePortalContract.addPerson(name,about,description);
        console.log("minting proposal...",formtxn.hash);
        await formtxn.wait();
        console.log("Minted..",formtxn.hash);

        window.alert("Proposal Added to Blockchain successfully");
        console.log(name);
        console.log(about);
        console.log(description);

		setName('');
		setAbout('');
		setDescription('');
		// setEmail('');
		// setPassword('');
		// setConfirmPass('');
		setError(null);
		setSuccess('Application was submitted!');
	};
	
	const messageVariants = {
		hidden: { y: 30, opacity: 0 },
		animate: { y: 0, opacity: 1, transition: { delay: 0.2, duration: 0.4 } },
	};

	const formData = [
		{ label: 'Name', value: name, onChange: (e) => setName(e.target.value), type: 'text' },
		{ label: 'About', value: about, onChange: (e) => setAbout(e.target.value), type: 'text' },
		{ label: 'description', value: description, onChange: (e) => setDescription(e.target.value), type: 'text' },
		// {
		// 	label: 'Password',
		// 	value: password,
		// 	onChange: (e) => setPassword(e.target.value),
		// 	type: 'password',
		// },
		// {
		// 	label: 'Confirm Password',
		// 	value: confirmPass,
		// 	onChange: (e) => setConfirmPass(e.target.value),
		// 	type: 'password',
		// },
	];

	return (
		
		<FormSection method ="POST">
			<Particle/>
			<Container>
				<FormRow>
					<FormColumn small>
						<FormTitle>make a form</FormTitle>
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

							<FormButton type="submit"  >Submit</FormButton>
						</FormWrapper>
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
