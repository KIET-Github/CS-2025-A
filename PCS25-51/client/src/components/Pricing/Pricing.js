import React from 'react';
import { Button, Heading, TextWrapper } from '../../globalStyles';
import { IconContext } from 'react-icons/lib';
import abi from "../../utilits/secure.json"
import { useEffect,useState } from "react";
import { ethers } from "ethers";
import { useAddress, useMetamask, useContract } from '@thirdweb-dev/react';
import Img1 from './1st.png'
import Img2 from './2nd.jpg'
import Img3 from './3rd.png'
import Img4 from './4th.png'
import './nft.css'
import './nftlink.css'


import { Dna } from  'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
} from './PricingStyles';

import Particle2 from '../Particle2';
import Timmer from './timmer';





const getEthereumObject = () => window.ethereum;


  function Pricing() {
	
	const address = useAddress();
	console.log(address);
	const { ethereum } = window;
	const contractAddress = "0x9E3F72e647302fe1B95A5021Bf825c1A43516034";
	const contractABI = abi.abi;
	//const editionDrop = useEditionDrop("0x846EE7F5C27345340505b53fCaF931b2A075A10a");
	const editionDrop = useContract("0x846EE7F5C27345340505b53fCaF931b2A075A10a", "edition-drop").contract;
	  // State variable for us to know if user has our NFT.
	  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
	  // isClaiming lets us easily keep a loading state while the NFT is minting.
	  const [isClaiming, setIsClaiming] = useState(false);
	  const [isName, setIsName] = useState("");
	   const [isAbout, setIsAbout] = useState("");
	   const [isDescription, setIsDescription] = useState("");
	   const [isName1, setIsName1] = useState("");
	   const [isAbout1, setIsAbout1] = useState("");
	   const [isDescription1, setIsDescription1] = useState("");
	   const [isload,setIsLoad]=useState("");
	   const [isEnd,setIsEnd]=useState("");
	   const [hasVoted,sethasVoted]=useState(true);
	   const [isLink,setIsLink]= useState("");


	 const provider = new ethers.providers.Web3Provider(ethereum);
	  const signer = provider.getSigner();
	  const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
	  useEffect(() => {
		// If they don't have an connected wallet, exit!

		if (!address) {
		  return;
		}
	
		const checkBalance = async () => {
		  try {
			const balance = await editionDrop.balanceOf(address, 0);
			if (balance.gt(0)) {
			  setHasClaimedNFT(true);
			  setIsLink("https://testnets.opensea.io/assets/"+editionDrop.getAddress()+"/0")
			  console.log("🌟 this user has a membership NFT!");
			} else {
			  setHasClaimedNFT(false);
			  console.log("😭 this user doesn't have a membership NFT.");
			}
		  } catch (error) {
			setHasClaimedNFT(false);
			console.error("Failed to get balance", error);
		  }
		};
		checkBalance();
	  }, [address, editionDrop]);


	  const mintNft = async () => {
		try {
		  setIsClaiming(true);
		  await editionDrop.claim("0", 1);
		  setIsLink("https://testnets.opensea.io/assets/"+editionDrop.getAddress()+"/0")
		  console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
		  setHasClaimedNFT(true);
		} catch (error) {
		  setHasClaimedNFT(false);
		  console.error("Failed to mint NFT", error);
		} finally {
		  setIsClaiming(false);
		}
	  };
	  


	const vote = async (index)=>{
		if(hasClaimedNFT||!	hasVoted){
			window.alert("Sorry! You Have Already Voted");
			return;
		}
		let count = await wavePortalContract.addvote(index);
		setIsLoad(count.hash);
		console.log("Mining",count.hash);
		await count.wait();
		console.log("Minted...",count.hash);
		window.alert("vote sucessful");
		sethasVoted(false);

		setIsEnd(count.hash);
	}

	
	
		// If they don't have an connected wallet, exit!
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
			<PricingSection id="pricing">
			
				<PricingWrapper>
					<Heading >Make a choice!</Heading>
					<br/>

					<Dna
						visible={true}
						height="80"
						width="80"
						ariaLabel="dna-loading"
						wrapperStyle={{}}
						wrapperClass="dna-wrapper"
						/>

					
					<Timmer/>
					<br/>
					<PricingContainer>
					<PricingCard >
					<img src={Img4} width="279px" height="146px" alt="" />
								<PricingCardInfo>
									<PricingCardPlan>AAP</PricingCardPlan>
									<PricingCardCost>Raj Verma</PricingCardCost>
									<PricingCardText>I will bring Odd/Even Rule in the state and reduce pollution, also all our processes will be as transparent as blockchain.</PricingCardText>
									
									
     
									<Button >
									
										Vote Here
										
										</Button>
	
    								
								</PricingCardInfo>
							</PricingCard>
						
							<PricingCard >
							<img src={Img3} width="279px" height="146px" alt="" />
								<PricingCardInfo>
									<PricingCardPlan>{isName}</PricingCardPlan>
									<PricingCardCost>{isAbout}</PricingCardCost>
									<PricingCardText>{isDescription}</PricingCardText>
									
									
     
									<Button onClick={()=>vote(2)} >
									
										Vote Here
										
										</Button>
	
    								
								</PricingCardInfo>
							</PricingCard>
							<PricingCard >
							<img src={Img1} width="279px" height="146px" alt="" />
								<PricingCardInfo>
									<PricingCardPlan>{isName1}</PricingCardPlan>
									<PricingCardCost>{isAbout1}</PricingCardCost>
									<PricingCardText>{isDescription1}</PricingCardText>
									
									
     
									<Button onClick={()=>vote(3)}>
									
										Vote Here
										
										</Button>
	
    								
								</PricingCardInfo>
							</PricingCard>
							<PricingCard >
							<img src={Img2} width="279px" height="146px" alt="" />
								<PricingCardInfo>
									<PricingCardPlan>BSP</PricingCardPlan>
									<PricingCardCost>Radhika Dubey</PricingCardCost>
									<PricingCardText>I will never let prejudices and discrimination affect people. I will ensure women security and opportunities for women.</PricingCardText>
									
									
     
									<Button >
									
										Vote Here
										
										</Button>
	
    								
								</PricingCardInfo>
							</PricingCard>
							
							
					</PricingContainer>
					<br/>
					<br/>
					<br/> <br/> <br/> <br/><br/><br/><br/>
					<Heading>
						{!hasVoted?"Congratulations! You have successfully voted.":""}</Heading>
					<br/>
					<br/>
					<button class="btn-17" disabled={hasVoted}
        onClick={mintNft}>
            
            <span class="text-container">
                <span class="text">{isClaiming? "minting...": "mint your NFT"}</span>
            </span>
        </button>
				<br/>
		
		{/* Link Button */}
		
		{hasClaimedNFT?<a href={isLink} target="_blank">
		<button class="btn-37">
			<span class="new">{isLink}</span>
			<div class="old">
				<span>See your nft</span>
				<span aria-hidden>See your NFT</span>
			</div>
		</button>
		</a>:""}
		
		

				</PricingWrapper>
			</PricingSection>
		</IconContext.Provider>
		
	);
}
export default Pricing;
