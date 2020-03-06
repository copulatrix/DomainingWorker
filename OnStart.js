var _Self = require('./App.json');
var _Secret = _Self[0];
var _Name = _Self[1];
var _Hostname = _Self[2];

var express = require('express');
var request = require('request');

var app = express();
 
app.get('/', function(req, res){
    res.send('Hello World');
});
 
app.listen(3000);

request.post({
    url: `https://${_Secret}:${_Secret}@domaining.fadebit.com/api/worker/notify`,
    form: {
        Name: _Name,
        Hostname: _Hostname,
        Status: 'StartUp'
    }
}, function(error, response, body){
    console.log(error);
    console.log(body);
});