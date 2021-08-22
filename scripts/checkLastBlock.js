const { ADDRESSES } = require('../lib/env')
const { sleep } = require('../lib/utils')

module.exports = async _ => {
  while (true) {
    const block = await web3.eth.getBlock('latest')
    console.log(`[*] Searching block ${ block.number }...`)
    if (block && block.transactions) {
      for (const tx of block.transactions){
        const tx_data = await web3.eth.getTransaction(tx)
        await sleep(1000)
        for (const address of ADDRESSES.split(',')) 
          if (address === tx_data.to.toLowerCase()) {
            console.log(`[+] Transaction found on block ${ block.number } \n`)
            console.table({ hash: tx_data.hash, address: tx_data.from, value: web3.utils.fromWei(tx_data.value, 'ether'), timestamp: (new Date()).toISOString() })
          }
      }
    } else
      console.log(`[-] No txs found on block ${ block.number }`)
  }
}