var _Self = require('./App.json');
var _Secret = _Self[0];
var _Name = _Self[1];
var _Hostname = _Self[2];

var express = require('express');
var request = require('request');
var CronJob = require('cron').CronJob;
var whois = require('whois')

var exec = require('child_process').exec;

var app = express();

global.Worker = {
    GotJob: false,
    List: 0,
    Availiable: [],
    Words: []
};
 
app.get('/', function(req, res){
    res.send('Hello World');
});
 
app.get('/info', function(req, res){
    res.send(global.Worker);
});
 
app.get('/update', function(req, res){
    exec('git pull', {
        cwd: __dirname
    }, function(GITerror, GITstdout, GITstderr){
        exec('npm install', {
            cwd: __dirname
        }, function(NPMerror, NPMstdout, NPMstderr){
            res.send({
                git: {
                    error: GITerror,
                    stdout: GITstdout,
                    stderr: GITstderr
                },
                npm: {
                    error: NPMerror,
                    stdout: NPMstdout,
                    stderr: NPMstderr
                }
            });

            process.exit(1);
        });
    });
});
 
app.listen(3000);

SetStatus('Worker Started Up!');

new CronJob('0 * * * * *', function(){
    if(global.Worker['GotJob'] == false){
        SetStatus('Looking for Job!');
        GetJob();
    }
}, null, true, 'America/Los_Angeles');

function Work(I, Callback){
    if(global.Worker.Words[I]){
        whois.lookup(`${global.Worker.Words[I]}.com`, function(error, data){
            if(
                (data.indexOf(`No match for domain "${global.Worker.Words[I].toUpperCase()}.COM"`) != -1)
                ||
                (data.indexOf(`No match for "${global.Worker.Words[I].toUpperCase()}.COM"`) != -1)
            ){
                global.Worker.Availiable.push(`${global.Worker.Words[I]}.com`);
                SetStatus(`Found: ${global.Worker.Words[I]}.com`);
                request.post({
                    url: `https://${_Secret}:${_Secret}@domaining.fadebit.com/api/worker/domains`,
                    form: {
                        Domain: `${global.Worker.Words[I]}.com`
                    },
                    json: true
                }, function(error, response, body){
                    console.log('error', error);
                    console.log('body', body);
                });
            }
            Work(I+1, Callback);
        });
    }else{
        Callback();
    }
}

function StartWorking(){
    SetStatus('StartWorking() Called');
    Work(0, function(){
        SetStatus('Finished');
        
        request.post({
            url: `https://${_Secret}:${_Secret}@domaining.fadebit.com/api/worker/job/complete`,
            form: {
                Worker: _Name,
                List: global.Worker.List
            },
            json: true
        }, function(error, response, body){
            global.Worker = {
                GotJob: false,
                List: 0,
                Availiable: [],
                Words: []
            };
        });
    });
}

function GetJob(){
    request.post({
        url: `https://${_Secret}:${_Secret}@domaining.fadebit.com/api/worker/job`,
        form: {
            Worker: _Name
        },
        json: true
    }, function(error, response, body){
        if(body.Success){
            global.Worker.GotJob = true;
            global.Worker.List = body.List;
            global.Worker.Words = body.Words;
            SetStatus('Got Job. (' + global.Worker.List + ')');
            StartWorking();
        }
    });
}

function SetStatus(Status){
    console.log(Status);
    request.post({
        url: `https://${_Secret}:${_Secret}@domaining.fadebit.com/api/worker/notify`,
        form: {
            Name: _Name,
            Hostname: _Hostname,
            Status: Status
        }
    }, function(error, response, body){
        
    });
}