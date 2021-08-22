const { ADDRESSES } = require('../lib/env')
const { sleep } = require('../lib/utils')

const range = (start, stop, step = 1) => {
  const result = []
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) 
    result.push(i)
  return result
}

module.exports = async ({start, end}) => {
  const blocks_range = range(parseInt(start), parseInt(end))

  for (const block_number of blocks_range) {
    const block = await web3.eth.getBlock(block_number)
    console.log(`[*] Searching block ${ block_number }`)
    if (block && block.transactions) { 
      for (const tx of block.transactions){
        const tx_data = await web3.eth.getTransaction(tx)
        await sleep(1000)
        for (const address of ADDRESSES.split(',')) 
          if (address === tx_data.to.toLowerCase()) {
            console.log(`[+] Transaction found on block ${ block_number } \n`)
            console.table({ hash: tx_data.hash, address: tx_data.from, value: web3.utils.fromWei(tx_data.value, 'ether'), timestamp: (new Date()).toISOString() })
          }
      }
    } else
      console.log(`[-] No txs found on block ${ block_number }`)
  }
}
