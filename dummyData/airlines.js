const airlineColumns = ["Name", "Code", "Membership"];
const airlines = [
  {
    code: "AV",
    name: "Avianca",
    membership: "Active",
  },
  {
    code: "UA",
    name: "United Airlines",
    membership: "Active",
  },
  {
    code: "LH",
    name: "Lufthansa",
    membership: "Active",
  },
  {
    code: "CAD",
    name: "Air Canada",
    membership: "",
  },
  {
    code: "AA",
    name: "American Airlines",
    membership: "",
  },
  {
    code: "BA",
    name: "British Airways",
    membership: "",
  },
];

const flightsData = { airlineColumns, airlines };
module.exports = flightsData;
