pragma solidity ^0.4.25;


interface FlightSuretyDataInterface {
    function isOperational() external view returns (bool);

    function getAirlinesRegistered() external view returns (uint256);

    function registerAirline(address airline) external;
}
