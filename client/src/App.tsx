import React from "react";
import { CircularProgress, Typography, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ContextSelector from "./ContextSelector";
import CardOption from "./components/CardOption";
import Config from "./config.json";
import getWeb3 from "./getWeb3";

import { AppContext } from "./App.types";
import "./App.scss";
import OperationalStatus from "./components/OperationalStatus";

const TARGET_URL = Config.localhost.url;

const roleOptions = [
  {
    id: AppContext.traveler,
    title: "I'm a Traveler",
    description: "Description",
    image: require("./images/passenger.jpeg"),
    error: null,
  },
  {
    id: AppContext.airline,
    title: "I'm an Airline",
    description: "Description",
    image: require("./images/airlines.jpeg"),
  },
];

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class App extends React.Component {
  state = {
    web3: null,
    account: null,
    appContract: {},
    userContext: "",
    txHistory: "",
    metamaskAddress: "",
    upc: "1",
    loading: true,
    notification: false,
    accounts: [],
    error: null,
  };

  goBack = () => {
    this.setState({
      userContext: AppContext.home,
    });
  };

  setUserContext = (context: AppContext) => {
    this.setState({
      userContext: context,
    });
  };

  setError = (err: any) => {
    this.setState({
      error: err,
      loading: false,
    });
  };

  closeNotification = () => {
    this.setState({
      notification: false,
    });
  };
  setNotification = (message: string) => {
    this.setState({
      notification: message,
    });
  };

  startApp = async (web3: any) => {
    try {
      // Get contract instance
      const networkId = await web3.eth.net.getId();
      const AppContract = await fetch("/app").then((response) => {
        return response.json();
      });

      const deployedNetwork = AppContract.networks[networkId];
      const appContractInstance = new web3.eth.Contract(
        AppContract.abi,
        deployedNetwork.address
      );

      const accounts = await web3.eth.getAccounts(); // Get account address

      this.setState({
        web3,
        accounts,
        appContract: appContractInstance,
        loading: false,
      });
    } catch (err) {
      this.setError(err);
      console.error("Error starting app");
      console.error(err);
    }
  };

  setTxHistory = (searchResult: any) => {
    this.setState({
      txHistory: searchResult,
    });
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3(TARGET_URL);
      if (!web3) return;
      this.startApp(web3);
    } catch (err) {
      this.setError(err);
      console.log("Error mounting app");
    }
  };

  render() {
    const {
      web3,
      accounts,
      appContract,
      metamaskAddress,
      upc,
      userContext,
      txHistory,
      loading,
      error,
      notification,
    } = this.state;

    const appIsActive = true;

    return (
      <div className="App">
        <header className="App-header">Alliianz</header>

        {loading && <CircularProgress />}

        {!loading && !error && (
          <section
            className={
              userContext
                ? "ethApp-main-wrapper flatten"
                : "ethApp-main-wrapper"
            }
          >
            {userContext && (
              <div className="EthApp-goback" onClick={this.goBack}>
                <ArrowBackIosIcon /> Go back
              </div>
            )}

            {appContract && accounts && accounts[0] && (
              <OperationalStatus
                appContract={appContract}
                owner={accounts[0]}
              />
            )}

            {!userContext && (
              <div className="Context-selector">
                <section className="Context-selection">
                  {roleOptions.map((role, index) => (
                    <CardOption
                      key={index}
                      selectOption={this.setUserContext}
                      role={role}
                    />
                  ))}
                </section>
              </div>
            )}
          </section>
        )}

        {error && (
          <section className="Error-notice">
            <Typography
              className="Error-title"
              gutterBottom
              variant="h4"
              component="h4"
            >
              Ops, something went wrong.
            </Typography>

            <Typography
              className="Error-subtitle"
              gutterBottom
              variant="h4"
              component="h4"
            >
              Please reload the page or change your account. If the problem
              persist please write at andrescabsi@gmail.com
            </Typography>
            <br />
            <div className="Error-wrapper">{JSON.stringify(error)}</div>
          </section>
        )}

        {!error && (
          <section
            className={
              userContext
                ? "Core-Functionality-wrapper expanded"
                : "Core-Functionality-wrapper"
            }
          >
            <div className="Roles-Functionality-wrapper">
              {userContext && !error && appContract && (
                <ContextSelector
                  web3={web3}
                  accounts={accounts}
                  appContract={appContract}
                  userContext={userContext}
                  txHistory={txHistory}
                  metamaskAddress={metamaskAddress}
                  upc={upc}
                  setError={this.setError}
                  setNotification={this.setNotification}
                  setTxHistory={this.setTxHistory}
                />
              )}
            </div>
          </section>
        )}

        <Snackbar
          open={!!notification}
          autoHideDuration={6000}
          onClose={this.closeNotification}
        >
          <Alert onClose={this.closeNotification} severity="success">
            {notification}
          </Alert>
        </Snackbar>

        <footer>
          <Typography
            className="CoffeeCol-moto"
            gutterBottom
            variant="body1"
            component="p"
          >
            Get a flight insurance using the Ethereum blockchain.
          </Typography>
          <Typography
            className="CoffeeCol-moto"
            gutterBottom
            variant="body1"
            component="p"
          >
            Andres Cabrera @2020 All rights reserved.
          </Typography>
        </footer>
      </div>
    );
  }
}

export default App;
