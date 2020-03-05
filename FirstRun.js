var fs = require('fs');
var execSync = require('child_process').execSync;

fs.writeFileSync('/etc/init.d/DomainingWorker.sh', 'forever start /DomainingWorker/OnStart.js');

console.log(execSync('sudo update-rc.d DomainingWorker.sh defaults').toString());
console.log(execSync('sudo chmod +x /etc/init.d/DomainingWorker.sh').toString());