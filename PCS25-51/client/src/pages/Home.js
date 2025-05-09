import React from 'react';

import { Content } from '../components/Content/Content';
import Features from '../components/Features/Features';
import Hero from '../components/Hero/Hero';
// import Card from '../components/card/card';
import { heroOne, heroTwo, heroThree } from '../data/HeroData';
import { Particle } from '../globalStyles';

// Hero Feature Content Carousel

const Home = () => {
	return (
		<>	
			<Hero />
			{/* <Card /> */}
			<Features />
			<Content {...heroOne} />
			<Content {...heroTwo} />
			
			<Content {...heroThree} />
			
			{/* <Carousel /> */}
		</>
	);
};

export default Home;
