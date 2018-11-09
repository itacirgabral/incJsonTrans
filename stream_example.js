const fs = require('fs')
const Transform = require('stream').Transform

const line2length = new Transform({
  transform: (data, _, done) => {
    done(null, Buffer.from(`length: ${data.length}\n`))
  }
})

fs.createReadStream('funcionarios800k.json').pipe(line2length).pipe(process.stdout)
