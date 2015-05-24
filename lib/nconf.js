var nconf  = require('nconf').file({ file: process.cwd() + '/lib/store.json' });

module.exports = nconf;
