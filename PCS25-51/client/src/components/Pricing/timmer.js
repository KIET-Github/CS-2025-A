import React from "react";
import { Row, TextWrapper } from '../../globalStyles';
import Countdown from "react-countdown";

import { useNavigate } from 'react-router-dom';



// Random component
const Completionist = () => <span  style={{color: 'white'}} ><TextWrapper
mb="1.4rem"
weight="600"
size="1.5rem"
color="white"
align="center"
> Voting is Finished!
</TextWrapper></span>;

// Renderer callback with condition





function Timmer() {
  let history = useNavigate();
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      history('/Winner');
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          <TextWrapper
              mb="1.4rem"
              weight="600"
              size="1.5rem"
              color="white"
              align="center"
            > Time Left- {hours}:{minutes}:{seconds}
            </TextWrapper>
          
        </span>
      );
    }
  };
  
  
  return (
    <div  style={{color: 'white'}} >
        
        <Countdown date={'2022-11-15T14:10:00.417+05:30'} renderer={renderer} 
        />
        {/* <Countdown date={Date.now() + 10000} renderer={renderer} /> */}
      
      </div>
  )
}

export default Timmer







