const ABI = [
  {
    "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const CONTRACT_ADDRESS = "0xc7b6a777C0aDfC8bD3de8a5881B2C9561123714A";
let signer;
let contract;

// Candidate info with local images
const candidatesInfo = [
  { name: "BJP", symbol: "images/bjp.png" },
  { name: "Congress", symbol: "images/congress.png" },
  { name: "AAP", symbol: "images/aap.png" }
];

// Load candidates and votes from backend API
async function loadCandidates() {
    console.log("Loading candidates");
  const resCount = await fetch("http://localhost:3000/candidates/count");
  const dataCount = await resCount.json();
  const total = parseInt(dataCount.total);

  const container = document.getElementById("candidates");
  container.innerHTML = "";

  for (let i = 0; i < total; i++) {
    const res = await fetch(`http://localhost:3000/candidates/${i}`);
    const data = await res.json();

    const candidateName = candidatesInfo[i]?.name || `Candidate ${i}`;
    const candidateSymbol = candidatesInfo[i]?.symbol || "";

    const div = document.createElement("div");
    div.className = "candidate";
    div.innerHTML = `
      <span class="candidate-name">
        ${candidateSymbol ? `<img src="${candidateSymbol}" alt="${candidateName} symbol" class="symbol" />` : ""}
        ${candidateName}
      </span>
      <span class="votes-count">Votes: ${data.votes}</span>
      <button onclick="vote(${i})" class="vote-btn">Vote</button>
    `;
    container.appendChild(div);
  }
}

// Send vote transaction via contract
async function vote(index) {
  try {
    const tx = await contract.vote(index);
    await tx.wait();
    alert("Vote cast successfully!");
    loadCandidates(); // refresh vote counts from backend
  } catch (err) {
    console.error("Voting failed:", err);
    alert("Voting failed. See console for details.");
  }
}

async function init() {
  const walletAddress = localStorage.getItem("walletAddress");
  if (!walletAddress) {
    alert("Wallet not connected. Redirecting to connect page.");
    window.location.href = "connect.html";
    return;
  }
  document.getElementById("walletAddress").innerText = "Connected wallet: " + walletAddress;

  if (typeof window.ethereum === "undefined") {
    alert("MetaMask not detected!");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

  loadCandidates();
}

window.onload = init;
