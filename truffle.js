var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic =
  "trim nephew effort cruise tobacco recall release twist angle child board praise";
//   const infuraProjectId = process.env.INFURA_PROJECT_ID;
// const mnemonic = process.env.WALLET_MNEMONIC;

module.exports = {
  networks: {
    development: {
      provider: function () {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:7545/", 0, 50);
      },
      network_id: "*",
      gas: 9999999,
    },
  },
  compilers: {
    solc: {
      version: "^0.4.24",
    },
  },
};
