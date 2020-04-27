pragma solidity ^0.4.25;

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";


contract FlightSuretyData {
    using SafeMath for uint256;

    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/

    address private contractOwner; // Account used to deploy contract
    bool private operational = true; // Blocks all state changes throughout the contract if false
    mapping(address => uint256) authorizedContracts;
    mapping(address => uint256) airlinesCandidates;
    mapping(address => bool) airlines;
    mapping(address => uint256) activeAirlines;
    uint256 public totalAirlines = 0;

    /********************************************************************************************/
    /*                                       EVENT DEFINITIONS                                  */
    /********************************************************************************************/

    /**
     * @dev Constructor
     *      The deploying account becomes contractOwner
     */
    constructor() public {
        contractOwner = msg.sender;
        airlines[msg.sender] = true;
        activeAirlines[msg.sender] = 12;
    }

    event AirlineAdded(address airline, uint256 totalAirlines);
    event AirlineCandidateAdded(address airline);
    event AirlineCandidateVoted(address airline);
    event AirlineActivated(address airline);

    /********************************************************************************************/
    /*                                       FUNCTION MODIFIERS                                 */
    /********************************************************************************************/

    // Modifiers help avoid duplication of code. They are typically used to validate something
    // before a function is allowed to be executed.

    /**
     * @dev Modifier that requires the "operational" boolean variable to be "true"
     *      This is used on all state changing functions to pause the contract in
     *      the event there is an issue that needs to be fixed
     */
    modifier requireIsOperational() {
        require(operational, "Data Contract is currently not operational");
        _; // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
     * @dev Modifier that requires the "ContractOwner" account to be the function caller
     */
    modifier requireContractOwner() {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    modifier isCallerAuthorized() {
        require(authorizedContracts[msg.sender] == 1, "Unauthorized");
        _;
    }

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    function getAirlinesRegistered()
        external
        view
        requireIsOperational
        returns (uint256)
    {
        return totalAirlines;
    }

    function getAirlineCandidateVotes(address airlineCandidate)
        public
        view
        requireIsOperational
        isCallerAuthorized
        returns (uint256)
    {
        return airlinesCandidates[airlineCandidate];
    }

    function isRegisteredAirline(address airline)
        public
        view
        requireIsOperational
        returns (bool)
    {
        return airlines[airline];
    }

    function isAirlineActive(address airline)
        public
        view
        requireIsOperational
        returns (bool)
    {
        return activeAirlines[airline] != 0;
    }

    function isRegisteredAirlineCandidate(address airlineCandidate)
        public
        view
        requireIsOperational
        returns (bool)
    {
        return airlinesCandidates[airlineCandidate] >= 0;
    }

    function authorizeCaller(address dataContract)
        external
        requireIsOperational
        requireContractOwner
    {
        authorizedContracts[dataContract] = 1;
    }

    function deauthorizeCaller(address dataContract) external {
        delete authorizedContracts[dataContract];
    }

    /**
     * @dev Get operating status of contract
     *
     * @return A bool that is the current operating status
     */

    function isOperational() public view returns (bool) {
        return operational;
    }

    /**
     * @dev Sets contract operations on/off
     *
     * When operational mode is disabled, all write transactions except for this one will fail
     */

    function setOperatingStatus(bool mode) external requireContractOwner {
        require(
            mode != operational,
            "Operational status must be different from existing one"
        );
        operational = mode;
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

    /**
     * @dev Add an airline to the registration queue
     *      Can only be called from FlightSuretyApp contract
     *
     */

    function registerAirline(address airline)
        external
        requireIsOperational
        isCallerAuthorized
    {
        persistAirline(airline);
    }

    function registerAirlineCandidate(address airlineCandidate)
        external
        requireIsOperational
        isCallerAuthorized
    {
        persistAirlineCandidate(airlineCandidate);
    }

    function voteAirlineCandidate(address airlineAddress)
        external
        requireIsOperational
        isCallerAuthorized
    {
        persistVoteAirlineCandidate(airlineAddress);
    }

    function activateAirline(address airlineAddress)
        external
        payable
        requireIsOperational
        isCallerAuthorized
    {
        persistActiveAirline(airlineAddress, msg.value);
    }

    /**
     * @dev Buy insurance for a flight
     *
     */

    function buy() external payable {}

    /**
     *  @dev Credits payouts to insurees
     */
    function creditInsurees() external pure {}

    /**
     *  @dev Transfers eligible payout funds to insuree
     *
     */
    function pay() external pure {}

    /**
     * @dev Initial funding for the insurance. Unless there are too many delayed flights
     *      resulting in insurance payouts, the contract should be self-sustaining
     *
     */

    function fund() public payable {}

    function getFlightKey(
        address airline,
        string memory flight,
        uint256 timestamp
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    /**
     * @dev Fallback function for funding smart contract.
     *
     */
    function() external payable {
        fund();
    }

    // Internal functions

    function persistAirline(address airlineAddress)
        internal
        requireIsOperational
        isCallerAuthorized
    {
        airlines[airlineAddress] = true;
        totalAirlines = totalAirlines.add(1);
        emit AirlineAdded(airlineAddress, totalAirlines);
    }

    function persistAirlineCandidate(address airlineAddress)
        internal
        requireIsOperational
        isCallerAuthorized
    {
        airlinesCandidates[airlineAddress] = 0;
        emit AirlineCandidateAdded(airlineAddress);
    }

    function persistVoteAirlineCandidate(address airlineAddress)
        internal
        requireIsOperational
        isCallerAuthorized
    {
        airlinesCandidates[airlineAddress] = airlinesCandidates[airlineAddress]
            .add(1);
        emit AirlineCandidateVoted(airlineAddress);
    }

    function persistActiveAirline(address airlineAddress, uint256 value)
        internal
        requireIsOperational
        isCallerAuthorized
    {
        activeAirlines[airlineAddress] = value;
        emit AirlineActivated(airlineAddress);
    }
}
