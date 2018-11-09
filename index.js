const ijson = require('i-json')
const parser = ijson.createParser((value, path) => {
  if (path.length === 2) {
    buffer2token.push(path.join('/') + '\n')
  }
  return value
}, 2)

let n = 0

const Transform = require('stream').Transform
const transform = (data, _, done) => {
  parser.update(data)
  done()
}

const buffer2token = new Transform({transform})

require('fs').createReadStream('funcionarios.json').pipe(buffer2token).pipe(process.stdout)
