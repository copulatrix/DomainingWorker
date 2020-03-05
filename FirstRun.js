var fs = require('fs');
var execSync = require('child_process').execSync;

fs.writeFileSync('/etc/init.d/DomainingWorker.sh', '#!/bin/bash' + "\n" + 'echo 1 > /1');

console.log(execSync('sudo update-rc.d DomainingWorker.sh start 2').toString());
console.log(execSync('sudo chmod +x /etc/init.d/DomainingWorker.sh').toString());

