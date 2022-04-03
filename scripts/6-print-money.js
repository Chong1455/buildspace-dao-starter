import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x9645023b5B182230bd0e9bc82fc4B633452079a9");

(async () => {
  try {
    const amount = 1000000;
    await token.mint(amount);
    const totalSupply = await token.totalSupply();
    console.log(
      "There now is",
      totalSupply.displayValue,
      "$HOKAGE in circulation"
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();
