import React from "react";
import { Typography } from "@material-ui/core";

import TravelerDetails from "./Roles/TravelerDetails";
import AirlineDetails from "./Roles/AirlineDetails";
import { AppContext } from "./App.types";
import "./ContextSelector.scss";

const ContextSelector: React.FC<{
  web3: any;
  accounts: any;
  supplyContract: any;
  userContext: any;
  txHistory: any;
  metamaskAddress: any;
  upc: any;
  setError: any;
  setNotification: any;
  setTxHistory: any;
}> = ({
  web3,
  accounts,
  supplyContract,
  userContext,
  txHistory,
  metamaskAddress,
  upc,
  setError,
  setNotification,
}) => {
  switch (userContext) {
    case AppContext.traveler: {
      return (
        <>
          <Typography variant="h3">Traveler</Typography>
          <div className="inner-content">
            <TravelerDetails
              web3={web3}
              accounts={accounts}
              supplyContract={supplyContract}
              userContext={userContext}
              txHistory={txHistory}
              metamaskAddress={metamaskAddress}
              upc={upc}
              setError={setError}
              setNotification={setNotification}
            />
          </div>
        </>
      );
    }
    case AppContext.airline: {
      return (
        <>
          <Typography variant="h3">Airline</Typography>
          <div className="inner-content">
            <AirlineDetails
              web3={web3}
              accounts={accounts}
              supplyContract={supplyContract}
              userContext={userContext}
              txHistory={txHistory}
              metamaskAddress={metamaskAddress}
              upc={upc}
              setError={setError}
              setNotification={setNotification}
            />
          </div>
        </>
      );
    }
    default: {
      return <div>No context found</div>;
    }
  }
};

export default ContextSelector;
