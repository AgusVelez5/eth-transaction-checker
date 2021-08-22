# Transaction checker

Update this [repo](https://github.com/jonasbostoen/eth-transaction-checker), now you can the scripts using hardhat.

First steps:
```
git clone https://github.com/AgusVelez5/eth-transaction-checker.git
cd eth-transaction-checker/
npm i
```

Create env variables, see this [file](.env.sample).

Check last block:
```
npx hardhat run:env --network hardhat --env-file .env --script scripts/checkLastBlock.js
```

Check range of blocks:
```
npx hardhat run:env --network hardhat --env-file .env --script scripts/checkRangeOfBlocks.js --args start=<START>,end=<END>
```


Check pending txs:
```
npx hardhat run:env --network hardhat --env-file .env --script scripts/checkPendingTransactions.js
```