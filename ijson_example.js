var ijson = require('i-json');

// var parser = ijson.createParser(callback, maxDepth)
var parser = ijson.createParser(function(value, path) {
	console.log(`${path.join('/')}: ${JSON.stringify(value)}`)
	return value
}, 2);

var json0 = '{"data": [2, 3, [tr'
var json1 = 'ue, false]]'
var json2 = ', "message": "hello" }'

parser.update(new Buffer.from(json0))
parser.update(new Buffer.from(json1))
parser.update(new Buffer.from(json2))

