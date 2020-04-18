import React from "react";
import { Typography } from "@material-ui/core";
// import Web3 from "web3";
import "./TravelerDetails.scss";
import Table from "../components/Table";

class TravelerDetails extends React.Component<{
  web3: any;
  accounts: any;
  appContract: any;
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
    flightColumns: [],
    flights: [],
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
          <Typography variant="h4">Flight Insurance</Typography>
          <Typography variant="body1">
            First, select your flight below.
          </Typography>

          <Table
            cols={flightColumns}
            data={flights}
            actionTitle={"Buy Insurance"}
            onClickHandler={(id: any) => console.log(id)}
          />

          <Typography variant="h4">Active coverage</Typography>
          <div className="Payout-wrapper">
            <Table
              cols={["Flight", "Insurance Status", "Insurance ammount"]}
              data={[
                {
                  flight: "UA123",
                  status: "Active",
                  ammount: "$30",
                },
                {
                  flight: "AL65",
                  status: "Expired",
                  ammount: "$50",
                },
                {
                  flight: "AV12",
                  status: "Payed",
                  ammount: "$100",
                },
              ]}
              actionTitle={"Withdraw"}
              onClickHandler={(id: any) => console.log(id)}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default TravelerDetails;
