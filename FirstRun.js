var fs = require('fs');
var execSync = require('child_process').execSync;

fs.writeFileSync('/etc/init.d/DomainingWorker.sh', '#!/bin/bash' + "\n" + 'echo 1 > /1');


console.log(execSync('sudo chmod a+x /etc/init.d/DomainingWorker.sh').toString());
console.log(execSync('sudo chmod 777 /etc/init.d/DomainingWorker.sh').toString());

console.log(execSync('sudo update-rc.d DomainingWorker.sh defaults').toString());
