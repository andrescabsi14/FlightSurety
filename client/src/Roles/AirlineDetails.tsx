import React from "react";
import { Typography } from "@material-ui/core";
import axios from "axios";
// import Web3 from "web3";
import "./TravelerDetails.scss";
import Table from "../components/Table";

class AirlineDetails extends React.Component<{
  web3: any;
  accounts: any;
  appContract: any;
  userContext: any;
  txHistory: any;
  metamaskAddress: any;
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
    airlinesColumns: [],
    airlines: [],
  };

  setLocalError = (error: any) => {
    this.setState({
      loading: false,
      error: JSON.stringify(error),
    });
  };

  isActiveAirline = async () => {
    const { appContract, accounts } = this.props;

    if (!appContract) return;
    try {
      const OWNER = accounts[0];
      const result = await appContract.isOperational().call({ from: OWNER });

      console.log(result);
      // this.setState({
      //   txHistory: result,
      // });
    } catch (err) {
      this.setLocalError(err);
      console.error("Error isOperational");
    }
  };

  fetchAirlines = async () => {
    try {
      const { data } = await axios.get(`/airlines`);

      if (data) {
        // const formattedData = data.airlines.map(airline => {

        // })
        await this.isActiveAirline();
        this.setState({
          airlines: data.airlines,
          airlinesColumns: data.airlineColumns,
          error: null,
        });
      }
    } catch (error) {
      this.setLocalError(error);
    }
  };

  componentDidMount() {
    this.fetchAirlines();
  }

  render() {
    const { airlinesColumns, airlines, isFarmer } = this.state;

    return (
      <section
        className={
          isFarmer ? "FarmDetail-wrapper extended" : "FarmDetail-wrapper"
        }
      >
        <div className="FarmDetail-newfarmer">
          <Typography variant="h4">Member Airlines</Typography>

          <Table
            cols={airlinesColumns}
            data={airlines}
            actionTitle={"Buy Insurance"}
            onClickHandler={(id: any) => console.log(id)}
          />
        </div>
      </section>
    );
  }
}

export default AirlineDetails;
