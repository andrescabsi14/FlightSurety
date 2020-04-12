pragma solidity ^0.4.25;


interface FlightSuretyDataInterface {
    function isOperational() external view returns (bool);

    function getAirlinesRegistered() external view returns (uint256);

    function getAirlineCandidateVotes(address airlineCandidate)
        external
        view
        returns (uint256);

    function registerAirline(address airline) external;

    function registerAirlineCandidate(address airlineCandidate) external;

    function voteAirlineCandidate(address airlineAddress) external;

    function isRegisteredAirline(address airline) external returns (bool);

    function isRegisteredAirlineCandidate(address airlineCandidate)
        external
        returns (bool);
}
