import React, { useState, useEffect } from "react";

const OperationalStatus: React.FC<{
  owner: string;
  appContract: any;
}> = ({ owner, appContract }) => {
  const [opStatus, setOpStatus] = useState(false);

  const getOperationalStatus = async () => {
    if (!appContract) return;
    try {
      const isOperational = await appContract.methods
        .isOperational()
        .call({ from: owner });
      setOpStatus(isOperational);
    } catch (err) {
      console.error("Error isOperational");
    }
  };

  useEffect(() => {
    getOperationalStatus();
  }, []);

  return (
    <div className="EthApp-status">
      status{" "}
      <span
        className={`EthApp-status-indicator ${opStatus ? "active" : ""}`}
      ></span>
    </div>
  );
};

export default OperationalStatus;
