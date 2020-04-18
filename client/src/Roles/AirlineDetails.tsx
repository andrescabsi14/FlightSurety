import React from "react";
import { Typography } from "@material-ui/core";
// import Web3 from "web3";
import "./TravelerDetails.scss";
import Table from "../components/Table";

enum MembershipStatus {
  active = "Active",
  none = "",
}

class AirlineDetails extends React.Component<{
  web3: any;
  accounts: any;
  supplyContract: any;
  userContext: any;
  txHistory: any;
  metamaskAddress: any;
  upc: any;
  setError: any;
  setNotification: any;
}> {
  state = {
    farmerId: "",
    isFarmer: false,
    originFarmName: "",
    originFarmInformation: "",
    originFarmLatitude: "",
    originFarmLongitude: "",
    error: null,
    loading: false,
    flightColumns: ["Name", "Code", "Membership"],
    flights: [
      {
        code: "AV",
        name: "Avianca",
        membership: MembershipStatus.active,
      },
      {
        code: "UA65",
        name: "United Airlines",
        membership: MembershipStatus.active,
      },
      {
        code: "LH34",
        name: "Lufthansa",
        membership: MembershipStatus.active,
      },
      {
        code: "CAD253",
        name: "Air Canada",
        membership: MembershipStatus.none,
      },
      {
        code: "AA3680",
        name: "American Airlines",
        membership: MembershipStatus.none,
      },
      {
        code: "AA695",
        name: "United Airlines",
        membership: MembershipStatus.none,
      },
      {
        code: "BA6750",
        name: "British Airways",
        membership: MembershipStatus.none,
      },
    ],
  };

  handleChange = (fieldId: any, value: any) => {
    this.setState({
      [fieldId]: value,
    });
  };

  setLocalError = (error: any) => {
    this.setState({
      loading: false,
      error: JSON.stringify(error),
    });
  };

  async componentDidMount() {}

  render() {
    const { flightColumns, flights, isFarmer } = this.state;
    return (
      <section
        className={
          isFarmer ? "FarmDetail-wrapper extended" : "FarmDetail-wrapper"
        }
      >
        <div className="FarmDetail-newfarmer">
          <Typography variant="h4">Member Airlines</Typography>

          <Table
            cols={flightColumns}
            data={flights}
            actionTitle={"Buy Insurance"}
            onClickHandler={(id: any) => console.log(id)}
          />
        </div>
      </section>
    );
  }
}

export default AirlineDetails;
