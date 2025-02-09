const path = require('path')

module.exports = {
  name: 'run:env',
  description: 'Run script scoped to a particular environment',
  params: [
    {
      name: 'envFile',
      description: 'Path to environment file',
      default: '.env'
    },
    {
      name: 'script',
      description: 'Path to script'
    },
    {
      name: 'args',
      description: 'Script args',
      default: 'a=a'
    },
    {
      name: 'gasPrice',
      description: 'Gas price in wei',
      default: '0'
    }
  ],
  action: async ({ script, args, gasPrice }) => {
    const { DEFAULT_GAS_PRICE } = require('../lib/env')
    process.env.FIXED_GAS_PRICE = gasPrice === '0' ? DEFAULT_GAS_PRICE : gasPrice
    const full_path = path.join(process.cwd(), script)
    const parsed_args = args.split(',').filter(a => a).reduce((out, a) => {
      const [k, v] = a.split('=')
      out[k] = v
      return out
    }, {})
    await require(full_path)(parsed_args)
  }
}