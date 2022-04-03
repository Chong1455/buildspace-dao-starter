import sdk from "./1-initialize-sdk.js";

const editionDrop = sdk.getEditionDrop(
  "0xEA70c515e575834D97846994993393c3F64D3736"
);
const token = sdk.getToken("0x9645023b5B182230bd0e9bc82fc4B633452079a9");

(async () => {
  try {
    const walletAddresses = await editionDrop.history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!"
      );
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      const randomAmount = Math.floor(
        Math.random() * (10000 - 1000 + 1) + 1000
      );
      console.log("Going to airdrop", randomAmount, "tokens to", address);

      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });

    console.log("Starting airdrop...");
    await token.transferBatch(airdropTargets);
    console.log(
      "Successfully airdropped tokens to all the holders of the NFT!"
    );
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();
