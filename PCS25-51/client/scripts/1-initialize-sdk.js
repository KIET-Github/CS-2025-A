import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import ethers from "ethers";

// Importing and configuring our .env file that we use to securely store our environment variables
import dotenv from "dotenv";
dotenv.config();


//ERC-721 where every NFT is unique, even if they have the same image, name, and properties
// With an ERC-1155, multiple people can be the holder of the same NFT. 

// RPC URL, we'll use our QuickNode API URL from our .env file.
const provider = new ethers.providers.JsonRpcProvider("https://methodical-warmhearted-lambo.ethereum-goerli.discover.quiknode.pro/b75f5e0ed8dc69acfea4a504d25827b66046a94e/");
// Your wallet private key. ALWAYS KEEP THIS PRIVATE, DO NOT SHARE IT WITH ANYONE, add it to your .env file and do not commit that file to github!
const wallet = new ethers.Wallet("6fb6b08acf3a52027d7cde06c9c9c54085f738384a3a7e9d46d8ac1a81803dc4", provider);
const sdk = new ThirdwebSDK(wallet);

(async () => {
  try {
    const address = await sdk.getSigner().getAddress();
    console.log("SDK initialized by address:", address)
  } catch (err) {
    console.error("Failed to get apps from the sdk", err);
    process.exit(1);
  }
})();

// We are exporting the initialized thirdweb SDK so that we can use it in our other scripts
export default sdk;