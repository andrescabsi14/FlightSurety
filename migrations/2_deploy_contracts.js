const FlightSuretyApp = artifacts.require("FlightSuretyApp");
const FlightSuretyData = artifacts.require("FlightSuretyData");
const fs = require("fs");

module.exports = function (deployer) {
  let firstAirline = "0xCe5144391B4aB80668965F2Cc4f2CC102380Ef0A";
  deployer.deploy(FlightSuretyData).then(() => {
    return deployer.deploy(FlightSuretyApp).then(() => {
      let config = {
        localhost: {
          url: "http://localhost:7545",
          dataAddress: FlightSuretyData.address,
          appAddress: FlightSuretyApp.address,
        },
      };
      fs.writeFileSync(
        __dirname + "/../client/src/config.json",
        JSON.stringify(config, null, "\t"),
        "utf-8"
      );
      fs.writeFileSync(
        __dirname + "/../config.json",
        JSON.stringify(config, null, "\t"),
        "utf-8"
      );
    });
  });
};
