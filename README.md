# incJsonTrans

O [5º desafio](https://osprogramadores.com/desafios/d05/) d'OsProgramadores exige ler json grandes, [o maior](https://www.bcampos.com/Graphs.php) possui 2,5G.

V8 possui um limite padrão de menos de 2G para o uso de memória, não conseguiríamos ler o json inteiro sem mudar esta configuração.

[i-json](https://github.com/bjouhier/i-json) é um parser incremental, ele suporta receber trechos da string parte do trabalho. Por exemplo:
```javascript
var ijson = require('i-json')
var parser = ijson.createParser(function(value, path) {
	console.log(`${path.join('/')}: ${JSON.stringify(value)}`)
	return value
}, 2)

var json0 = '{"data": [2, 3, [tr'
var json1 = 'ue, false]]'
var json2 = ', "message": "hello" }'

parser.update(new Buffer.from(json0))
parser.update(new Buffer.from(json1))
parser.update(new Buffer.from(json2))
```

Para um stream de transformação receber um objeto e gerar dois ou mais objetos, dá pra fazer desta forma:
```javascript
const transform = new stream.Transform({
  objectMode: true,
  transform: (data, _, done) => {
    for(const d of data) {
      transform.push(d)
    }
    done()
  }
})
```

Lendo o json como um stream e parseando cada bloco de forma incremental a quantidade de méroria utilizada é apenas a necessária para aquele bloco:
```javascript
const parser = ijson.createParser((value, path) => {
  if (path.length === 2) {
    buffer2token.push(path[1] + '\n')
  }
  return undefined
}, 2)

const Transform = require('stream').Transform
const buffer2token = new Transform({
  transform : (data, _, done) => {
  parser.update(data)
  done()
}})
```