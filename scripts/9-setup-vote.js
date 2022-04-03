import sdk from "./1-initialize-sdk.js";

const vote = sdk.getVote("0x8c53d616ce6d84c2829a048714b7ad0E2A022205");
const token = sdk.getToken("0x9645023b5B182230bd0e9bc82fc4B633452079a9");

(async () => {
  try {
    await token.roles.grant("minter", vote.getAddress());

    console.log(
      "Successfully gave vote contract permissions to act on token contract"
    );
  } catch (error) {
    console.error(
      "Failed to grant vote contract permissions on token contract",
      error
    );
    process.exit(1);
  }

  try {
    const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);
    const ownedAmount = ownedTokenBalance.displayValue;
    const percent90 = (Number(ownedAmount) / 100) * 90;

    await token.transfer(vote.getAddress(), percent90);
    console.log(
      "Successfully transferred" + percent90 + "tokens to vote contract"
    );
  } catch (err) {
    console.error("Failed to transfer tokens to vote contract", err);
  }
})();
