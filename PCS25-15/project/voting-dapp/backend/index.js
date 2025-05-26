const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const ABI = require("./abi.json");

// Constants
const RPC_URL = "http://127.0.0.1:8545";
// const PRIVATE_KEY = "0x34ee338e969d0a7463f2e6a65b07238e635b3e3a6c4d2343c14beecc4eb53f11";
const CONTRACT_ADDRESS = "0xc7b6a777C0aDfC8bD3de8a5881B2C9561123714A";

// Setup provider and contract
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
// const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// GET total number of candidates
app.get("/candidates/count", async (req, res) => {
  try {
    const count = await contract.totalCandidates();
    res.json({ total: count.toString() });
  } catch (error) {
    console.error("Error fetching candidate count:", error);
    res.status(500).json({ error: "Failed to get candidate count" });
  }
});

// GET votes for a specific candidate
app.get("/candidates/:index", async (req, res) => {
  try {
    const index = parseInt(req.params.index);
    const votes = await contract.getCandidate(index);
    res.json({ index, votes: votes.toString() });
  } catch (error) {
    console.error("Error fetching candidate details:", error);
    res.status(500).json({ error: "Failed to get candidate details" });
  }
});

// POST vote for a candidate
// app.post("/vote/:index", async (req, res) => {
//   try {
//     const index = parseInt(req.params.index);
//     const tx = await contract.vote(index);
//     await tx.wait();
//     res.json({ message: "Vote successful", txHash: tx.hash });
//   } catch (error) {
//     console.error("Error voting for candidate:", error);
//     res.status(500).json({ error: "Voting failed" });
//   }
// });

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend service running on http://localhost:${PORT}`);
});
