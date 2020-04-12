var FlightSuretyApp = artifacts.require("FlightSuretyApp");
var FlightSuretyData = artifacts.require("FlightSuretyData");
var BigNumber = require("bignumber.js");

var Config = async function (accounts) {
  // These test addresses are useful when you need to add
  // multiple users in test scripts
  let testAddresses = [
    "0x63E5A822922bcEd2B8B34602CEB317fCbb3d6725",
    "0x937ab8734923Bece43849BF367B4762e317Cf1e1",
    "0x00c7CBBc48C8213893E693728eA3b2A1099155C7",
    "0x9e4345f3B9576d394187b6fCF302E8Cd41175135",
    "0x01f14d2cD8b604899443e49be6E143E0e1220a84",
    "0x16BE818dB9CD6C628FAd7Ce9eed0b7d94A707a2f",
    "0x1F1607f95bF5bCEa3aB876225e96181a186C6788",
    "0x1a8F7933E8A67fA2356D98e3ddA33c5f3785Ab21",
    "0xe3fCAAF8E22534252Aa97F2CdD87212F50a22EE6",
  ];

  let owner = accounts[0];
  let firstAirline = accounts[1];

  let flightSuretyData = await FlightSuretyData.new();
  let flightSuretyApp = await FlightSuretyApp.new();

  return {
    owner: owner,
    firstAirline: firstAirline,
    weiMultiple: new BigNumber(10).pow(18),
    testAddresses: testAddresses,
    flightSuretyData: flightSuretyData,
    flightSuretyApp: flightSuretyApp,
  };
};

module.exports = {
  Config: Config,
};
