import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";



(async () => {
  try {
    const editionDrop = await sdk.getEditionDrop("0x846EE7F5C27345340505b53fCaF931b2A075A10a","edition-drop");
    await editionDrop.createBatch([
      {
        name: "Voter Receipt",
        description: "This NFT will verify that you have voted in SecureVote",
        image: readFileSync("scripts/assets/NFTFINAL.jpeg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();