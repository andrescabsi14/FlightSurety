var FlightSuretyApp = artifacts.require("FlightSuretyApp");
var FlightSuretyData = artifacts.require("FlightSuretyData");
var BigNumber = require("bignumber.js");

var Config = async function (accounts) {
  // These test addresses are useful when you need to add
  // multiple users in test scripts
  let testAddresses = [
    "0x98071cC46f4f48e47aaFE76FAfc88F58392D18a3",
    "0x242c2143dB6634BC90aD60D24aa91f2b4b4ef833",
    "0x6750678e19Bf7D9e82EC820e152dDc65D0E6CdcD",
    "0xb2504755E1401328Ab9C6b00b8b7fE2aa8e6a67C",
    "0x2d25Ed1AFdDC11814dD6538fB52b42C9394694fD",
    "0x13046902c5EC7f77Aa64d181f14776A7305fF8bB",
    "0xF093b4AF1533B48E8db8A45865B646bdb6A9fC5a",
    "0x0D19a6CCC76AF62D25AeC97B4014972394369c2B",
    "0xc1D2B7Ac47CAdfb5F9b3B1Ba07103FF7C1c9c123",
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
