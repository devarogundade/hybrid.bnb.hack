const HDWalletProvider = require('@truffle/hdwallet-provider');

const dotenv = require("dotenv");
dotenv.config();

const MNEMONIC = process.env.MNEMONIC;

module.exports = {
  plugins: [
    'truffle-contract-size',
    'truffle-plugin-stdjsonin'
  ],

  networks: {
    bscTestnet: {
      provider: () => new HDWalletProvider(MNEMONIC, 'https://bsc-testnet.publicnode.com'),
      network_id: 97,
      confirmations: 2,
      timeoutBlocks: 9999999,
      skipDryRun: true,
      networkCheckTimeout: 999999999
    },

    mumbai: {
      provider: () => new HDWalletProvider(MNEMONIC, 'https://rpc.ankr.com/polygon_mumbai'),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 9999999,
      skipDryRun: true,
      networkCheckTimeout: 999999999
    }
  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.20", // Fetch exact version from solc-bin (default: truffle's version)
    }
  }
};