// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17; //This is the version of the Solidity compiler we want our contract to use

// version of solidity

import "hardhat/console.sol";//Some magic given to us by Hardhat to do some console logs in our contract


//Once we initialize this contract for the first time, that constructor will run and print out that line
contract Secure {
//we also added a totalWaves variable that automatically is initialized to 0. 
//But, this variable is special because it's called a "state variable" and it's cool because it's stored permanently in contract storage.

    address owner;
    address[] public voters;
    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
        owner=msg.sender;

       
    }

        struct template{
            uint256 votes;
            string name;
            string about;
            string describe;


        }

         template[] public identity;
           

     function addPerson(string memory _name,string memory _about,string memory _describe) public {
         if(msg.sender==owner){
    identity.push(template(0,_name,_about,_describe));
         }
    
  }


function getvotes(uint256 index) public view returns (uint256){
    if(identity.length==0){
        console.log("no identity exist");
        
    }
    return identity[index].votes;

}
    function addvote(uint256 index) public {
        if(identity.length==0){
        console.log("no identity exist");
        
    }   
        voters.push(msg.sender);
        identity[index].votes++;
        
    }

       function retrievevoters() public view returns (address[] memory){
            
        return voters;
    }
    function winner() public view returns (uint256,uint256){

            return (identity[0].votes,identity[1].votes);
        

    }

    function getdataname(uint index) public view returns (string memory){
         template storage temp = identity[index];
         return (temp.name);

    }
    function getdataabout(uint index) public view returns (string memory){
         template storage temp = identity[index];
         return (temp.about);

    }
    function getdatadescribe(uint index) public view returns (string memory){
         template storage temp = identity[index];
         return (temp.describe);

    }

    function endPoll() public {
            if(msg.sender==owner){
        delete identity;
        delete voters;
            }
    }

} 
