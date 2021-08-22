const { DEPLOYMENT_ACCOUNT_KEY, MAINNET_RPC_HTTP_URL, ARCHIVE_NODE_RPC_URL } = require('./lib/env')
require("@nomiclabs/hardhat-truffle5")

const custom_tasks = require('./tasks/index.js')
for (const t of custom_tasks) {
  const new_task = task(t.name, t.description)
  for (const p of t.params || [])
    if (p.default || p.default === 0)
      new_task.addOptionalParam(p.name, p.description, p.default)
    else
      new_task.addParam(p.name, p.description)
  new_task.setAction(t.action)
}

const accounts = [DEPLOYMENT_ACCOUNT_KEY].map(k => `0x${ k }`)

const forking = {
  url: ARCHIVE_NODE_RPC_URL || 'No url'
}
if (process.env.BN)
  forking.blockNumber = parseInt(process.env.BN)

const mainnet = {
  url: MAINNET_RPC_HTTP_URL || 'No url',
  gas: "auto",
  gasPrice: 'auto',
  gasMultiplier: 1.2,
  blockGasLimit: 8000000,
  network_id: '56',
  accounts
}

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      chainId: 56,
      accounts: accounts.map(a => ({
        privateKey: a,
        balance: '1000000000000000000000000000'
      })),
      forking
    },
    mainnet
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200000
          }
        }
      }
    ]
  },
  paths: {
    sources: "./contracts"
  }
}