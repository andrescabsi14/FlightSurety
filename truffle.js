var HDWalletProvider = require("truffle-hdwallet-provider");
const infuraProjectId = process.env.INFURA_PROJECT_ID;
const mnemonic = process.env.WALLET_MNEMONIC;
//   const infuraProjectId = process.env.INFURA_PROJECT_ID;
// const mnemonic = process.env.WALLET_MNEMONIC;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rinkeby.infura.io/v3/${infuraProjectId}`
        ),
      network_id: 4, // rinkeby's id
      gas: 4500000, // rinkeby has a lower block limit than mainnet
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: "^0.4.24",
    },
  },
};
