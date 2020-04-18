const flightsColumns = ["Flight", "Time", "Airline", "To", "Gate"];
const flights = [
  {
    number: "AV97",
    scheduled: "10:10",
    airline: "Avianca",
    to: "New York",
    gate: "B27",
  },
  {
    number: "UA65",
    scheduled: "10:30",
    airline: "United Airlines",
    to: "Dallas",
    gate: "B3",
  },
  {
    number: "LH34",
    scheduled: "10:45",
    airline: "Lufthansa",
    to: "Frankfurt",
    gate: "B20",
  },
  {
    number: "CAD253",
    scheduled: "11:00",
    airline: "Air Canada",
    to: "Toronto",
    gate: "B22",
  },
  {
    number: "AA3680",
    scheduled: "11:25",
    airline: "American Airlines",
    to: "Boston",
    gate: "B7",
  },
  {
    number: "AA695",
    scheduled: "11:45",
    airline: "United Airlines",
    to: "Los Angeles",
    gate: "B2",
  },
  {
    number: "BA6750",
    scheduled: "12:00",
    airline: "British Airways",
    to: "London",
    gate: "B20",
  },
];

const flightsData = { flightsColumns, flights };
module.exports = flightsData;
