const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {
  contracts_build_directory:"./roulette-fe/public/contracts",

  networks: {
    polygontestnet:{ // 0x13881
      provider: () => new HDWalletProvider("gather dog smart major edge arch vacant crash core curious grow muffin", `https://rpc-mumbai.maticvigil.com/`),
      network_id: 80001,
      confirmations: 10,
      timeoutBlocks: 200
    },
  polygon:{ // 0x89
      provider: () => new HDWalletProvider("gather dog smart major edge arch vacant crash core curious grow muffin", `https://rpc-mainnet.maticvigil.com/`),
      network_id: 137,
      confirmations: 10,
      timeoutBlocks: 200
    }
  },


  compilers: {
    solc: {
      version: "0.8.7",
    }
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    polygonscan: ""
  }

};
