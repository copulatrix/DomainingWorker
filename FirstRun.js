var _Self = require('./App.json');
var _Secret = _Self[0];
var _Name = _Self[1];
var _Hostname = _Self[2];

var fs = require('fs');
var execSync = require('child_process').execSync;

var request = require('request');

fs.writeFileSync('/etc/rc.local', `#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

forever /DomainingWorker/OnStart.js & 

exit 0`);

console.log(execSync('chmod +x /etc/rc.local').toString());

request.post({
    url: `https://${_Secret}:${_Secret}@domaining.fadebit.com/api/worker/notify`,
    form: {
        Name: _Name,
        Hostname: _Hostname
    }
}, function(error, response, body){
    console.log(error);
    console.log(body);
});