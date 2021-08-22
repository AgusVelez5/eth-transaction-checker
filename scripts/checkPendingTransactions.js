const { ADDRESSES } = require('../lib/env')

module.exports = _ => {
  const subscription = web3.eth.subscribe('pendingTransactions', (err, res) => {
      if (err) console.error(err)
  })

  return async _ => {
    console.log('[+] Watching pending transactions...')
    subscription.on('data', (txHash) => {
        setTimeout(async () => {
          try {
            const tx = await web3.eth.getTransaction(txHash)
            if (tx.to) 
              for (const address of ADDRESSES.split(','))
                if (tx.to.toLowerCase() === address) 
                  console.table({ hash: txHash, address: tx.from, value: web3.utils.fromWei(tx.value, 'ether'), timestamp: (new Date()).toISOString() })
          } catch (err) {
            console.error(err)
          }
        }, 60 * 1000)
    })
  }
}