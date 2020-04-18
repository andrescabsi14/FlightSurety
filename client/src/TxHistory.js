import React from "react";
import { Typography } from "@material-ui/core";
import "./TxHistory.scss";

const TxHistory = ({ txHistory }) => {
  console.warn(txHistory);
  return (
    <section className="TxHistory-wrapper">
      <Typography style={{ marginBottom: "20px" }} variant="h4">
        Transaction History
      </Typography>
      <div className="TxHistory-formWrapper">
        {txHistory.itemSKU && (
          <div className="TxHistory-Input">
            <div className="label">itemSKU:</div>
            <div className="value">{txHistory.itemSKU}</div>
          </div>
        )}

        {txHistory.itemUPC && (
          <div className="TxHistory-Input">
            <div className="label">itemUPC:</div>
            <div className="value">{txHistory.itemUPC}</div>
          </div>
        )}

        {txHistory.ownerID && (
          <div className="TxHistory-Input">
            <div className="label">ownerID:</div>
            <div className="value">{txHistory.ownerID}</div>
          </div>
        )}

        {txHistory.originFarmerID && (
          <div className="TxHistory-Input">
            <div className="label">originFarmerID:</div>
            <div className="value">{txHistory.originFarmerID}</div>
          </div>
        )}

        {txHistory.originFarmName && (
          <div className="TxHistory-Input">
            <div className="label">originFarmName:</div>
            <div className="value">{txHistory.originFarmName}</div>
          </div>
        )}

        {txHistory.originFarmInformation && (
          <div className="TxHistory-Input">
            <div className="label">originFarmInformation:</div>
            <div className="value">{txHistory.originFarmInformation}</div>
          </div>
        )}

        {txHistory.originFarmLatitude && (
          <div className="TxHistory-Input">
            <div className="label">originFarmLatitude:</div>
            <div className="value">{txHistory.originFarmLatitude}</div>
          </div>
        )}

        {txHistory.originFarmLongitude && (
          <div className="TxHistory-Input">
            <div className="label">originFarmLongitude:</div>
            <div className="value">{txHistory.originFarmLongitude}</div>
          </div>
        )}

        {txHistory.productID && (
          <div className="TxHistory-Input">
            <div className="label">productID:</div>
            <div className="value">{txHistory.productID}</div>
          </div>
        )}

        {txHistory.productNotes && (
          <div className="TxHistory-Input">
            <div className="label">productNotes:</div>
            <div className="value">{txHistory.productNotes}</div>
          </div>
        )}

        {txHistory.productPrice && (
          <div className="TxHistory-Input">
            <div className="label">productPrice:</div>
            <div className="value">{txHistory.productPrice}</div>
          </div>
        )}

        {txHistory.itemState && (
          <div className="TxHistory-Input">
            <div className="label">itemState:</div>
            <div className="value">{txHistory.itemState}</div>
          </div>
        )}

        {txHistory.distributorID && (
          <div className="TxHistory-Input">
            <div className="label">distributorID:</div>
            <div className="value">{txHistory.distributorID}</div>
          </div>
        )}
        {txHistory.retailerID && (
          <div className="TxHistory-Input">
            <div className="label">retailerID:</div>
            <div className="value">{txHistory.retailerID}</div>
          </div>
        )}
        {txHistory.consumerID && (
          <div className="TxHistory-Input">
            <div className="label">consumerID:</div>
            <div className="value">{txHistory.consumerID}</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TxHistory;
