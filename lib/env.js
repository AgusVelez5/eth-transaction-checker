require('dotenv').config({})

module.exports = {
  DEPLOYMENT_ACCOUNT_KEY: process.env.DEPLOYMENT_ACCOUNT_KEY,
  MAINNET_RPC_HTTP_URL: process.env.MAINNET_RPC_HTTP_URL,
  ARCHIVE_NODE_RPC_URL: process.env.ARCHIVE_NODE_RPC_URL,
  ADDRESSES: process.env.ADDRESSES
}