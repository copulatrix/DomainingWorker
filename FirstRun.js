var fs = require('fs');
var execSync = require('child_process').execSync;

fs.writeFileSync('/etc/init.d/DomainingWorker.sh', 'forever start /DomainingWorker/OnStart.js');

execSync('chmod +x /etc/init.d/DomainingWorker.sh');
execSync('update-rc.d /etc/init.d/DomainingWorker.sh defaults');