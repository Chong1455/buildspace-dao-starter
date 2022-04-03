import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x9645023b5B182230bd0e9bc82fc4B633452079a9");

(async () => {
  try {
    const allRoles = await token.roles.getAll();
    console.log("Roles that exist right now:", allRoles);
    await token.roles.setAll({ admin: [], minter: [] });
    console.log("Roles after revoking ourselves", await token.roles.getAll());
    console.log("Successfully revoked our superpowers for the ERC-20 contract");
  } catch (error) {
    console.error("Failed to revoke ourselves from the DAO treasury", error);
  }
})();
