/// <reference path="./.sst/platform/config.d.ts" />
export default $config({
  app(input) {
    return {
      name: 'the-startup-stack',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      home: 'aws',
      providers: {
        aws: {
          region: 'eu-central-1',
        },
        'pulumi-stripe': true,
        cloudflare: true,
      },
    }
  },
  async run() {
    const { readdirSync } = await import('node:fs')
    const outputs = {}
    for (const value of readdirSync('./infra/')) {
      const result = await import(`./infra/${value}`)
      if (result.outputs) Object.assign(outputs, result.outputs)
    }
    return outputs
  },
})
