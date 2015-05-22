var JiraApi = require('jira').JiraApi;
var config = require('../config.js');
var jira = new JiraApi('https', config.jira.host, config.jira.port, config.jira.user, config.jira.password, config.jira.apiversion);

module.exports = jira;
