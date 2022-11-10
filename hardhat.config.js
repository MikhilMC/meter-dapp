require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const METER_TESTNET_PRIVATE_KEY = process.env.METER_TESTNET_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {},
    meter_testnet: {
      url: "https://rpctest.meter.io",
      accounts: [`${METER_TESTNET_PRIVATE_KEY}`],
    },
  },
};
