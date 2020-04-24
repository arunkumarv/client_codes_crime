var fs = require('fs');

var raw = fs.readFileSync('./ageGroup.json');

var data = JSON.parse(raw);

console.log ( data );

fs.writeFileSync('./myjson.json', JSON.stringify(data))

