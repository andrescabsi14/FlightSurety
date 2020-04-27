pragma solidity ^0.4.25;

// It's important to avoid vulnerabilities due to numeric overflow bugs
// OpenZeppelin's SafeMath library, when used correctly, protects agains such bugs
// More info: https://www.nccgroup.trust/us/about-us/newsroom-and-events/blog/2018/november/smart-contract-insecurity-bad-arithmetic/

import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./FlightSuretyData-interface.sol";


/************************************************** */
/* FlightSurety Smart Contract                      */
/************************************************** */
contract FlightSuretyApp {
    using SafeMath for uint256; // Allow SafeMath functions to be called for all uint256 types (similar to "prototype" in Javascript)
    bool operational = true;
    /********************************************************************************************/
    /*                                       DATA VARIABLES                                     */
    /********************************************************************************************/
    FlightSuretyDataInterface public FlightSuretyData;

    uint256 MIN_ACTIVATE_FUNDS = 10 ether;

    // Flight status codes
    uint8 private constant STATUS_CODE_UNKNOWN = 0;
    uint8 private constant STATUS_CODE_ON_TIME = 10;
    uint8 private constant STATUS_CODE_LATE_AIRLINE = 20;
    uint8 private constant STATUS_CODE_LATE_WEATHER = 30;
    uint8 private constant STATUS_CODE_LATE_TECHNICAL = 40;
    uint8 private constant STATUS_CODE_LATE_OTHER = 50;

    address private contractOwner; // Account used to deploy contract

    struct Flight {
        bool isRegistered;
        uint8 statusCode;
        uint256 updatedTimestamp;
        address airline;
    }
    mapping(bytes32 => Flight) private flights;

    event AirlineRegistered(address airline);
    event AirlineCandidateRegistered(address airline);
    event FirstAirlineRegistered(address airline);

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
        // Modify to call data contract's status
        require(operational, "App Contract is currently not operational");
        _; // All modifiers require an "_" which indicates where the function body will be added
    }

    /**
     * @dev Modifier that requires the "ContractOwner" account to be the function caller
     */
    modifier requireContractOwner() {
        require(msg.sender == contractOwner, "Caller is not contract owner");
        _;
    }

    modifier requireAirlinesAutorization() {
        uint256 airlinesRegistered = FlightSuretyData.getAirlinesRegistered();
        require(
            airlinesRegistered > 4,
            "Your registration application will be voted by our registered airlines."
        );
        _;
    }

    modifier requireMemberAirline() {
        bool isMemberAirline = FlightSuretyData.isRegisteredAirline(msg.sender);
        require(
            isMemberAirline,
            "Your need to be a member airline to perform this task"
        );
        _;
    }

    modifier requireMemberAirlineActive() {
        bool isMemberAirlineActive = FlightSuretyData.isAirlineActive(
            msg.sender
        );
        require(
            isMemberAirlineActive,
            "Your need to be an active member airline to perform this task"
        );
        _;
    }

    modifier requireActivateMinimumFunds() {
        bool areFundsEnough = msg.value >= MIN_ACTIVATE_FUNDS;
        require(areFundsEnough, "Insufficient funds.");
        _;
    }

    modifier requireEOATx() {
        bool isExternallyOwnedAccount = tx.origin == msg.sender;
        require(isExternallyOwnedAccount, "Contracts not allowed.");
        _;
    }

    /********************************************************************************************/
    /*                                       CONSTRUCTOR                                        */
    /********************************************************************************************/

    /**
     * @dev Contract constructor
     *
     */
    constructor() public {
        contractOwner = msg.sender;
    }

    /********************************************************************************************/
    /*                                       UTILITY FUNCTIONS                                  */
    /********************************************************************************************/

    function getMinimumActivateFunds() public view returns (uint256) {
        return MIN_ACTIVATE_FUNDS;
    }

    function setOperatingStatus(bool mode) external requireContractOwner {
        require(
            mode != operational,
            "Operational status must be different from existing one"
        );
        operational = mode;
    }

    function isOperational() public view requireContractOwner returns (bool) {
        return operational;
    }

    /********************************************************************************************/
    /*                                     SMART CONTRACT FUNCTIONS                             */
    /********************************************************************************************/

    function isActiveAirline(address airline)
        public
        view
        requireIsOperational
        returns (bool)
    {
        return FlightSuretyData.isAirlineActive(airline);
    }

    /**
     * @dev Add an airline to the registration queue
     *
     */

    function getNumberAirlines() external view returns (uint256) {
        uint256 totalAirlines = FlightSuretyData.getAirlinesRegistered();
        return totalAirlines;
    }

    function registerFirstAirline() external payable requireContractOwner {
        FlightSuretyData.registerAirline(msg.sender);
        FlightSuretyData.activateAirline(msg.sender);
        emit FirstAirlineRegistered(msg.sender);
    }

    function addAirlineCandidate(address airlineCandidate)
        public
        requireIsOperational
        requireMemberAirline
        requireMemberAirlineActive
        requireAirlinesAutorization
    {
        require(
            FlightSuretyData.isRegisteredAirline(airlineCandidate) == false,
            "This Airline Candidate is an already registered Airline"
        );

        require(
            FlightSuretyData.isRegisteredAirlineCandidate(airlineCandidate) ==
                false,
            "This Airline is already registered as Airline Candidate"
        );
        FlightSuretyData.registerAirlineCandidate(msg.sender);
    }

    function voteAirlineCandidate(address airlineAddress)
        public
        requireIsOperational
        requireMemberAirline
        requireMemberAirlineActive
        requireAirlinesAutorization
    {
        require(
            !FlightSuretyData.isRegisteredAirlineCandidate(airlineAddress),
            "This Airline is already registered as Airline Candidate"
        );
        require(
            FlightSuretyData.isRegisteredAirlineCandidate(airlineAddress),
            "This Airline is already registered as Airline Candidate"
        );

        FlightSuretyData.voteAirlineCandidate(airlineAddress);

        uint256 candidateVotes = FlightSuretyData.getAirlineCandidateVotes(
            airlineAddress
        );
        uint256 totalAirlines = FlightSuretyData.getAirlinesRegistered();

        // Registration of fifth and subsequent airlines requires multi-party consensus of 50% of registered airlines
        bool approvalReached = candidateVotes > totalAirlines.div(2);

        if (approvalReached) {
            FlightSuretyData.registerAirline(airlineAddress);
        }
    }

    function registerAirline(address airlineCandidate)
        external
        requireIsOperational
        requireMemberAirlineActive
        requireMemberAirline
    {
        require(
            !FlightSuretyData.isRegisteredAirline(airlineCandidate),
            "This Airline is already registered"
        );

        uint256 airlinesRegistered = FlightSuretyData.getAirlinesRegistered();

        if (airlinesRegistered <= 4) {
            FlightSuretyData.registerAirline(airlineCandidate);
            emit AirlineRegistered(airlineCandidate);
        } else {
            addAirlineCandidate(airlineCandidate);
            emit AirlineCandidateRegistered(airlineCandidate);
        }
    }

    function activateAirline(address airline)
        public
        payable
        requireIsOperational
        requireMemberAirline
        requireEOATx
        requireActivateMinimumFunds
    {
        FlightSuretyData.activateAirline(airline);
    }

    /**
     * @dev Register a future flight for insuring.
     *
     */

    function registerFlight() external pure {}

    /**
     * @dev Called after oracle has updated flight status
     *
     */

    function processFlightStatus(
        address airline,
        string memory flight,
        uint256 timestamp,
        uint8 statusCode
    ) internal pure {}

    // Generate a request for oracles to fetch flight information
    function fetchFlightStatus(
        address airline,
        string flight,
        uint256 timestamp
    ) external {
        uint8 index = getRandomIndex(msg.sender);

        // Generate a unique key for storing the request
        bytes32 key = keccak256(
            abi.encodePacked(index, airline, flight, timestamp)
        );
        oracleResponses[key] = ResponseInfo({
            requester: msg.sender,
            isOpen: true
        });

        emit OracleRequest(index, airline, flight, timestamp);
    }

    // region ORACLE MANAGEMENT

    // Incremented to add pseudo-randomness at various points
    uint8 private nonce = 0;

    // Fee to be paid when registering oracle
    uint256 public constant REGISTRATION_FEE = 1 ether;

    // Number of oracles that must respond for valid status
    uint256 private constant MIN_RESPONSES = 3;

    struct Oracle {
        bool isRegistered;
        uint8[3] indexes;
    }

    // Track all registered oracles
    mapping(address => Oracle) private oracles;

    // Model for responses from oracles
    struct ResponseInfo {
        address requester; // Account that requested status
        bool isOpen; // If open, oracle responses are accepted
        mapping(uint8 => address[]) responses; // Mapping key is the status code reported
        // This lets us group responses and identify
        // the response that majority of the oracles
    }

    // Track all oracle responses
    // Key = hash(index, flight, timestamp)
    mapping(bytes32 => ResponseInfo) private oracleResponses;

    // Event fired each time an oracle submits a response
    event FlightStatusInfo(
        address airline,
        string flight,
        uint256 timestamp,
        uint8 status
    );

    event OracleReport(
        address airline,
        string flight,
        uint256 timestamp,
        uint8 status
    );

    // Event fired when flight status request is submitted
    // Oracles track this and if they have a matching index
    // they fetch data and submit a response
    event OracleRequest(
        uint8 index,
        address airline,
        string flight,
        uint256 timestamp
    );

    // Register an oracle with the contract
    function registerOracle() external payable {
        // Require registration fee
        require(msg.value >= REGISTRATION_FEE, "Registration fee is required");

        uint8[3] memory indexes = generateIndexes(msg.sender);

        oracles[msg.sender] = Oracle({isRegistered: true, indexes: indexes});
    }

    function getMyIndexes() external view returns (uint8[3]) {
        require(
            oracles[msg.sender].isRegistered,
            "Not registered as an oracle"
        );

        return oracles[msg.sender].indexes;
    }

    // Called by oracle when a response is available to an outstanding request
    // For the response to be accepted, there must be a pending request that is open
    // and matches one of the three Indexes randomly assigned to the oracle at the
    // time of registration (i.e. uninvited oracles are not welcome)
    function submitOracleResponse(
        uint8 index,
        address airline,
        string flight,
        uint256 timestamp,
        uint8 statusCode
    ) external {
        require(
            (oracles[msg.sender].indexes[0] == index) ||
                (oracles[msg.sender].indexes[1] == index) ||
                (oracles[msg.sender].indexes[2] == index),
            "Index does not match oracle request"
        );

        bytes32 key = keccak256(
            abi.encodePacked(index, airline, flight, timestamp)
        );
        require(
            oracleResponses[key].isOpen,
            "Flight or timestamp do not match oracle request"
        );

        oracleResponses[key].responses[statusCode].push(msg.sender);

        // Information isn't considered verified until at least MIN_RESPONSES
        // oracles respond with the *** same *** information
        emit OracleReport(airline, flight, timestamp, statusCode);
        if (
            oracleResponses[key].responses[statusCode].length >= MIN_RESPONSES
        ) {
            emit FlightStatusInfo(airline, flight, timestamp, statusCode);

            // Handle flight status as appropriate
            processFlightStatus(airline, flight, timestamp, statusCode);
        }
    }

    function getFlightKey(address airline, string flight, uint256 timestamp)
        internal
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(airline, flight, timestamp));
    }

    // Returns array of three non-duplicating integers from 0-9
    function generateIndexes(address account) internal returns (uint8[3]) {
        uint8[3] memory indexes;
        indexes[0] = getRandomIndex(account);

        indexes[1] = indexes[0];
        while (indexes[1] == indexes[0]) {
            indexes[1] = getRandomIndex(account);
        }

        indexes[2] = indexes[1];
        while ((indexes[2] == indexes[0]) || (indexes[2] == indexes[1])) {
            indexes[2] = getRandomIndex(account);
        }

        return indexes;
    }

    // Returns array of three non-duplicating integers from 0-9
    function getRandomIndex(address account) internal returns (uint8) {
        uint8 maxValue = 10;

        // Pseudo random number...the incrementing nonce adds variation
        uint8 random = uint8(
            uint256(
                keccak256(
                    abi.encodePacked(blockhash(block.number - nonce++), account)
                )
            ) % maxValue
        );

        if (nonce > 250) {
            nonce = 0; // Can only fetch blockhashes for last 256 blocks so we adapt
        }

        return random;
    }

    // endregion
}
