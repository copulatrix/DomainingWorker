var fs = require('fs');
var execSync = require('child_process').execSync;

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
