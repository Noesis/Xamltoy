var express = require('express');
var app = express();

app.use(express.static(__dirname + '/src'));

app.get('/code/*', function (req, res) {
    res.sendFile(__dirname + '/src/code.html');
});

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/src/index.html');
});

console.log('Development server is running on http://localhost:3000');
app.listen(3000);