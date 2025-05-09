import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, MainHeading } from '../../globalStyles';
import { HeroVideo, HeroSection, HeroText, ButtonWrapper, HeroButton, HeroText1 } from './HeroStyles';
// import Popup2 from '../popup/popup2';
import { useAddress, useMetamask, useEditionDrop } from '@thirdweb-dev/react';
import { useState, useEffect } from 'react';
import Particle from '../Particle';


const Hero = () => {
	const [hasConnected, setHasConnected] = useState(false);
	const address = useAddress();
	const connectWithMetamask = useMetamask();
	console.log("👋 Address:", address);
	useEffect(()=>{
		if(address){
			setHasConnected(true);
		}

	},[address]);
	
	return (
		
		<HeroSection>
			<Particle/>
			<HeroVideo src="" autoPlay loop muted />
			<Container>
				<MainHeading><h1 class="cursive" > <em id="font1" style={{color: '#6789e5'}}>S</em>ecure<em style={{color: '#6789e5'}} id="font2">V</em>ote</h1></MainHeading>
				
				<HeroText>
				<h4>Secure &#124; Smart &#124; Simple</h4>
				</HeroText>
				<HeroText1>
				<b>A platform where you can vote without any discrepancy and corruption.</b>
				</HeroText1>
				<ButtonWrapper>
					<Link to="signup">
						<Button>Sign Up</Button>
					</Link>
					<HeroButton onClick={connectWithMetamask}> {hasConnected ? "Connected" : "Connect your wallet"}</HeroButton>
				</ButtonWrapper>
			</Container>
		</HeroSection>
	);
};

export default Hero;
