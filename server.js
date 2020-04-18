const flightsData = require("./dummyData/flights");
const airlinesData = require("./dummyData/airlines");
const FlightSuretyApp = require("./build/contracts/FlightSuretyApp.json");
const Config = require("./config.json");
const Web3 = require("web3");
const express = require("express");

let config = Config["localhost"];
let web3 = new Web3(
  new Web3.providers.WebsocketProvider(config.url.replace("http", "ws"))
);
web3.eth.defaultAccount = web3.eth.accounts[0];
let flightSuretyApp = new web3.eth.Contract(
  FlightSuretyApp.abi,
  config.appAddress
);

flightSuretyApp.events.OracleRequest(
  {
    fromBlock: 0,
  },
  function (error, event) {
    if (error) console.log(error);
    console.log(event);
  }
);

const app = express();
app.get("/api", (req, res) => {
  res.send({
    message: "An API for use with your Dapp!",
  });
});

app.get("/app", (req, res) => {
  res.send(FlightSuretyApp);
});

app.get("/airlines", (req, res) => {
  res.json(airlinesData);
});

app.get("/flights", (req, res) => {
  res.json(flightsData);
});

app.use(express.static("build"));

app.listen(5000, () =>
  console.log("FlightSurety server listening on port 5000!")
);
