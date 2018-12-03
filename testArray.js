const pull = require('pull-stream')
const lp = require('pull-length-prefixed')
const assert = require('assert')

const datas = [...Array(500).keys()].map(() => Buffer.from('payload'))

pull(
  pull.values(datas),
  lp.encode(),
  pull.collect((err, encodedArray) => {
    if(err) {
      throw err
    }

    pull(
      pull.values(encodedArray),
      lp.decode(),
      pull.collect((err, array) => {
        if(err) {
          throw err
        }
        assert(JSON.stringify(array) === JSON.stringify(datas), 'Data corrupted')
        console.log('Done')
      })
    )
  })
)
