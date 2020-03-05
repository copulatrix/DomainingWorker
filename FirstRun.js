var fs = require('fs');

fs.writeFileSync('/etc/cron.d/Domaining', '@reboot root /bin/sh node /DomainingWorker/OnStart.js');