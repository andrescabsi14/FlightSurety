import React from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import axios from "axios";
import Web3 from "web3";
import "./TravelerDetails.scss";
import Table from "../components/Table";

class AirlineDetails extends React.Component<{
  web3: any;
  accounts: any;
  appContract: any;
  dataContract: any;
  userContext: any;
  txHistory: any;
  metamaskAddress: any;
  setError: any;
  setNotification: any;
}> {
  state = {
    newAirline: {
      address: "0x2d25Ed1AFdDC11814dD6538fB52b42C9394694fD",
      name: "Quantas",
      code: "QA",
      membership: "",
    },
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

  isActiveAirline = async (airlineAddress: string) => {
    const { appContract, accounts } = this.props;

    if (!appContract || !airlineAddress) return;
    try {
      const OWNER = accounts[0];
      const result = await appContract
        .isActiveAirline(airlineAddress)
        .call({ from: OWNER });
    } catch (err) {
      this.setLocalError(err);
      console.error("Error isActiveAirline");
    }
  };

  fetchAirlines = async () => {
    try {
      const { data } = await axios.get(`/airlines`);

      if (data) {
        // const formattedData = data.airlines.map(airline => {

        // })
        // await this.isActiveAirline();
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

  onRegisterAirlineChange = (field: string, value: string) => {
    const currentState = this.state;
    this.setState((prevState) => ({
      ...currentState,
      newAirline: {
        ...currentState.newAirline,
        [field]: value,
      },
    }));
  };

  registerAirline = async () => {
    const { appContract, accounts } = this.props;
    const { newAirline, airlines } = this.state;

    const airline2Register = newAirline;

    try {
      const newAirlineReq = await appContract
        .registerAirline(newAirline.address)
        .send({ from: accounts[0] });
      this.setState({
        newAirline: {
          address: "",
          name: "",
          code: "",
          membership: "",
        },
        airlines: [...airlines, airline2Register],
        error: "",
      });
    } catch (err) {
      this.setState({
        error: `Airline Register error ${err.message || err || ""}`,
      });
    }
  };

  registerFirstAirline = async () => {
    const { appContract, accounts } = this.props;
    try {
      // const numberAirlines = await appContract
      //   .getNumberAirlines()
      //   .send({ from: accounts[0] });
      const activationFee = Web3.utils.toWei("10", "ether");
      const newAirlineReq = await appContract
        .registerFirstAirline()
        .send({ from: accounts[0], value: activationFee });
    } catch (err) {
      console.error(err);
    }
  };

  firstAirline = async () => {
    const { accounts, appContract, dataContract } = this.props;
    const owner = accounts[0];

    try {
      const airlinesRegistered = await appContract
        .getNumberAirlines()
        .send({ from: owner });

      // const airlinesRegistered = await dataContract
      //   .getAirlinesRegistered()
      //   .send({ from: accounts[0] });
      debugger;

      if (airlinesRegistered) {
        debugger;
      } else {
        debugger;
        // this.registerFirstAirline();
      }
    } catch (err) {
      console.error(err);
      debugger;
    }
  };

  componentDidMount() {
    this.fetchAirlines();
    this.firstAirline();

    // const owner = this.props.accounts[0];
    // debugger;
    // this.isActiveAirline(owner);
  }

  render() {
    const {
      newAirline,
      airlinesColumns,
      airlines,
      isFarmer,
      error,
    } = this.state;

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
            actionTitle={"Activate airline"}
            onClickHandler={(id: any) => console.log(id)}
          />

          <Typography variant="h4">Register Airline</Typography>
          <div className="FarmDetail-formWrapper">
            <div className="FarmDetail-Input">
              <TextField
                label="Airline Address"
                multiline
                rowsMax="1"
                value={newAirline.address}
                onChange={(e) =>
                  this.onRegisterAirlineChange("address", e.target.value)
                }
                disabled={isFarmer ? true : false}
              />
            </div>
            <div className="FarmDetail-Input">
              <TextField
                label="Airline Name"
                multiline
                rowsMax="1"
                value={newAirline.name}
                onChange={(e) =>
                  this.onRegisterAirlineChange("name", e.target.value)
                }
                disabled={isFarmer ? true : false}
              />
            </div>
            <div className="FarmDetail-Input">
              <TextField
                label="Airline Code"
                multiline
                rowsMax="1"
                value={newAirline.code}
                onChange={(e) =>
                  this.onRegisterAirlineChange("code", e.target.value)
                }
                disabled={isFarmer ? true : false}
              />
            </div>

            <div className="FarmDetail-Input">
              <TextField
                label="Active Membership?"
                multiline
                rowsMax="1"
                placeholder={"Enter ether amount (Min 10 Ether required)"}
                value={newAirline.membership}
                onChange={(e) =>
                  this.onRegisterAirlineChange("membership", e.target.value)
                }
                disabled={isFarmer ? true : false}
              />
            </div>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.registerAirline}
            >
              Register Airline
            </Button>

            <div className="Error-msg" style={{ color: "red" }}>
              {error}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default AirlineDetails;
