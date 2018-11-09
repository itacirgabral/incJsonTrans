const stream = require('stream')

let n = 0
const m = [['a1','a2'],['b1','b2']]

const readable = new stream.Readable({
  objectMode: true,
  read() {
    if (n < m.length) {
      readable.push(m[n])
      n++
    } else {
      readable.push(null)
    }
  }
})

const transform = new stream.Transform({
  objectMode: true,
  transform: (data, _, done) => {
    for(const d of data) {
      transform.push(d)
    }
    done()
  }
})

readable.pipe(transform).pipe(process.stdout)
