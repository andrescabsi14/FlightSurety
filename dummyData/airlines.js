const airlineColumns = ["Address", "Code", "Name", "Membership"];
const airlines = [
  {
    address: "None",
    code: "AV",
    name: "Avianca",
    membership: "Active",
  },
  {
    address: "None",
    code: "UA",
    name: "United Airlines",
    membership: "Active",
  },
  {
    address: "None",
    code: "LH",
    name: "Lufthansa",
    membership: "Active",
  },
  {
    address: "None",
    code: "CAD",
    name: "Air Canada",
    membership: "",
  },
  {
    address: "None",
    code: "AA",
    name: "American Airlines",
    membership: "",
  },
  { address: "None", code: "BA", name: "British Airways", membership: "" },
];

const flightsData = { airlineColumns, airlines };
module.exports = flightsData;
