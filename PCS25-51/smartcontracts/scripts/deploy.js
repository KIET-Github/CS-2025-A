// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {ethers}= require("hardhat");

 
async function main() {
const  SecureVote= await  ethers.getContractFactory("Secure");
console.log("Deploying Contract");
const secure = await SecureVote.deploy();

await secure.deployed();
console.log(`Deployed contract at address ${secure.address}`);


}
main()
.then(()=>{
  process.exit(0)
})
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
