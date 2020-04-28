var Test = require("../config/testConfig.js");
var BigNumber = require("bignumber.js");

contract("Flight Surety Tests", async (accounts) => {
  var config;
  before("setup contract", async () => {
    config = await Test.Config(accounts);
    await config.flightSuretyData.authorizeCaller.call(
      config.flightSuretyApp.address
    );
  });

  /****************************************************************************************/
  /* Operations and Settings                                                              */
  /****************************************************************************************/

  it(`(multiparty) has correct initial isOperational() value`, async function () {
    // Get operating status
    let status = await config.flightSuretyData.isOperational.call();
    assert.equal(status, true, "Incorrect initial operating status value");
  });

  it(`(multiparty) can block access to setOperatingStatus() for non-Contract Owner account`, async function () {
    // Ensure that access is denied for non-Contract Owner account
    let accessDenied = false;
    try {
      await config.flightSuretyData.setOperatingStatus(false, {
        from: config.testAddresses[2],
      });
    } catch (e) {
      accessDenied = true;
    }
    assert.equal(accessDenied, true, "Access not restricted to Contract Owner");
  });

  it(`(multiparty) can allow access to setOperatingStatus() for Contract Owner account`, async function () {
    // Ensure that access is allowed for Contract Owner account
    let accessDenied = false;
    try {
      await config.flightSuretyData.setOperatingStatus(false);
    } catch (e) {
      accessDenied = true;
    } finally {
      await config.flightSuretyData.setOperatingStatus(true);
    }
    assert.equal(
      accessDenied,
      false,
      "Access not restricted to Contract Owner"
    );
  });

  it(`(multiparty) can block access to functions using requireIsOperational when operating status is false`, async function () {
    const testAddress = config.testAddresses[3];
    let reverted = false;
    try {
      await config.flightSuretyData.setOperatingStatus(false);
      await config.flightSuretyApp.setOperatingStatus(false);
      await config.flightSuretyData.registerAirline(testAddress, {
        from: config.firstAirline,
      });
    } catch (e) {
      reverted = true;
      console.error(e);
    } finally {
      await config.flightSuretyData.setOperatingStatus(true); // Set it back for other tests to work
      await config.flightSuretyApp.setOperatingStatus(true); // Set it back for other tests to work
    }
    assert.equal(reverted, true, "Access not blocked for requireIsOperational");
  });

  it("(airline) cannot register an Airline using registerAirline() if it is not funded", async () => {
    // ARRANGE
    const newAirline = config.testAddresses[6];

    // ACT
    try {
      const activationFee = web3.utils.toWei(10, "ether");
      await config.flightSuretyApp.registerAirline(newAirline, {
        from: config.firstAirline,
        value: activationFee,
      });
    } catch (e) {
      console.error(e);
    }
    let result = await config.flightSuretyData.isRegisteredAirline.call(
      newAirline
    );

    // ASSERT
    assert.equal(
      result,
      false,
      "Airline should not be able to register another airline if it hasn't provided funding"
    );
  });
});
