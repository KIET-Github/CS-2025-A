const { ethers } = require("ethers");
const ABI = require("./abi.json");

// Constants
const RPC_URL = "http://127.0.0.1:8545";
const PRIVATE_KEY = "0x34ee338e969d0a7463f2e6a65b07238e635b3e3a6c4d2343c14beecc4eb53f11";
const CONTRACT_ADDRESS = "0x4FE995167105bF111F19c7Fd7cdCA679a2973801";

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

async function readCandidates() {
    console.log("Reading candidates");
    const count = await contract.totalCandidates();
    console.log(`Total Candidates: ${count.toString()}`);
}

async function getCandidateDetails(index) {
    console.log(`Fetching candidate at index ${index}...`);
    const votes = await contract.getCandidate(index);
    console.log(`Votes: ${votes.toString()}`);
}

async function voteForCandidate(index) {
  try {
    console.log(`Voting for candidate at index ${index}...`);
    const tx = await contract.vote(index); 
    console.log("Transaction sent, waiting for confirmation...");
    await tx.wait();
    console.log("Vote transaction confirmed!");
  } catch (error) {
    console.error("Error voting for candidate:", error);
  }
}


async function main() {
    const address = await wallet.getAddress();
    console.log("Connected Wallet:", address);
    await readCandidates();
    await voteForCandidate(0);
    await voteForCandidate(0);
    await voteForCandidate(0);
    await voteForCandidate(1);
    await voteForCandidate(1);
    await voteForCandidate(1);
    await getCandidateDetails(0);
    await getCandidateDetails(1);
}

main().catch(console.error);
