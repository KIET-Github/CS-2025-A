import React from 'react';
import { Button, Heading, TextWrapper } from '../../globalStyles';
import { IconContext } from 'react-icons/lib';
import { useEffect,useState } from "react";
import abi from "../../utilits/secure.json"
import { ethers } from "ethers";
import { useAddress, useMetamask, useContract } from '@thirdweb-dev/react';
import {
	PricingSection,
	PricingWrapper,
	PricingContainer,
	PricingCardInfo,
	PricingCardPlan,
	PricingCardCost,
	PricingCardFeatures,
	PricingCardText,
	PricingCardFeature,
	PricingCard,
} from '../Pricing/PricingStyles';
import Particle2 from '../Particle2';


function Winner(){
    const address = useAddress();
	console.log(address);
	const { ethereum } = window;
	const contractAddress = "0x9E3F72e647302fe1B95A5021Bf825c1A43516034";
	const contractABI = abi.abi;

	  const [isName, setIsName] = useState("");
	   const [isAbout, setIsAbout] = useState("");
	   const [isDescription, setIsDescription] = useState("");
	   const [isName1, setIsName1] = useState("");
	   const [isAbout1, setIsAbout1] = useState("");
	   const [isDescription1, setIsDescription1] = useState("");
       const[vote1,setVote1]=useState(0);
       const[vote2,setVote2]=useState(0);


	 const provider = new ethers.providers.Web3Provider(ethereum);
	  const signer = provider.getSigner();
	  const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
	  
      const calldata =async()=>{
		
        let count = await wavePortalContract.getvotes(2);
        console.log("Retrieved total wave count...", count.toNumber());
        let name = await wavePortalContract.getdataname(2);
        console.log( name.toString());
        let about = await wavePortalContract.getdataabout(2);
    console.log(about.toString());
    let description = await wavePortalContract.getdatadescribe(2);
    console.log(description.toString());


    let name1 = await wavePortalContract.getdataname(3);
         console.log( name1.toString());
     let about1 = await wavePortalContract.getdataabout(3);
     console.log(about1.toString());
     let description1 = await wavePortalContract.getdatadescribe(3);
     console.log(description1.toString());
     let votes1 = await wavePortalContract.getvotes(2);
     let votes2 = await wavePortalContract.getvotes(3);
     console.log(votes1.toNumber());
     console.log(votes2.toNumber());
     setVote1(votes1.toNumber());
     setVote2(votes2.toNumber());
        setIsName(name);
        setIsAbout(about);
        setIsDescription(description);
        setIsName1(name1);
        setIsAbout1(about1);
        setIsDescription1(description1);
        console.log(isName);
    
}
useEffect(() => {
    calldata();
  },[])


    return (
		
		<IconContext.Provider value={{ color: '#a9b3c1', size: '1rem' }}>
			<Particle2/>
			<PricingSection id="Winner">
			
				<PricingWrapper>
					<Heading >Its judging time!</Heading>
					<br/>

					<br/>
					<PricingContainer>
					<PricingCard >
								<PricingCardInfo>
									<PricingCardPlan>AAP</PricingCardPlan>
									<PricingCardCost>Raj Verma</PricingCardCost>
									<PricingCardText>I will bring Odd/Even Rule in the state and reduce pollution, also all our processes will be as transparent as blockchain.</PricingCardText>
									
									
     
									Votes: 0
	
    								
								</PricingCardInfo>
							</PricingCard>
						
							<PricingCard >
								<PricingCardInfo>
									<PricingCardPlan>{isName}</PricingCardPlan>
									<PricingCardCost>{isAbout}</PricingCardCost>
									<PricingCardText>{isDescription}</PricingCardText>
									Votes: {vote1}
									
     
									
    								
								</PricingCardInfo>
							</PricingCard>
							<PricingCard >
								<PricingCardInfo>
									<PricingCardPlan>{isName1}</PricingCardPlan>
									<PricingCardCost>{isAbout1}</PricingCardCost>
									<PricingCardText>{isDescription1}</PricingCardText>
									Votes: {vote2}
									
     
									
	
    								
								</PricingCardInfo>
							</PricingCard>
							<PricingCard >
								<PricingCardInfo>
									<PricingCardPlan>BSP</PricingCardPlan>
									<PricingCardCost>Radhika Dubey</PricingCardCost>
									<PricingCardText>I will never let prejudices and discrimination affect people. I will ensure women security and opportunities for women.</PricingCardText>
									
									
     
									Votes: 0
    								
								</PricingCardInfo>
							</PricingCard>
							
					</PricingContainer>
                    
				</PricingWrapper>
			</PricingSection>
		</IconContext.Provider>
        );

}
export default Winner;