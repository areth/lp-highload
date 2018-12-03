const pull = require('pull-stream')
const lp = require('pull-length-prefixed')
const pair = require('pull-pair/duplex')
const assert = require('assert')

const p = pair()
const datas = [...Array(500).keys()].map(() => Buffer.from('payload'))

pull(
  pull.values(datas),
  lp.encode(),
  p[0]
)

pull(
  p[1],
  lp.decode(),
  pull.collect((err, array) => {
    if(err) {
      throw err
    }
    assert(JSON.stringify(array) === JSON.stringify(datas), 'Data corrupted')
    console.log('Done')
  })
)
