import React, { useState, useEffect } from "react";

const OperationalStatus: React.FC<{
  owner: string;
  appContract: any;
  dataContract: any;
}> = ({ owner, appContract, dataContract }) => {
  const [dataOpStatus, setDataOpStatus] = useState(false);
  const [appOpStatus, setAppOpStatus] = useState(false);

  const getOperationalStatus = async () => {
    if (!appContract) return;
    try {
      const appIsOperational = await appContract.methods
        .isOperational()
        .call({ from: owner });
      setAppOpStatus(appIsOperational);

      const dataIsOperational = await dataContract.methods
        .isOperational()
        .call({ from: owner });
      setDataOpStatus(dataIsOperational);
    } catch (err) {
      console.error("Error isOperational");
    }
  };

  useEffect(() => {
    getOperationalStatus();
  }, []);

  return (
    <div className="EthApp-status">
      App status{" "}
      <span
        className={`EthApp-status-indicator data ${
          dataOpStatus ? "active" : ""
        }`}
      ></span>
      <span
        className={`EthApp-status-indicator app ${appOpStatus ? "active" : ""}`}
      ></span>
    </div>
  );
};

export default OperationalStatus;
