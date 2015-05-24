var JiraApi = require('jira').JiraApi;
var config = require('../config.js');
var _ = require('lodash');

module.exports = new JiraObject();

function JiraObject () {

    var self = this;

    this.api = new JiraApi('https', config.jira.host, config.jira.port, config.jira.user, config.jira.password, config.jira.apiversion);

    this.priorities = {
        Trivial: {name: 'Trivial', color: '#aaa', id: '5'},
        Medium: {name: 'Medium', color: '#aaa', id: '1000'},
        Critical: {name: 'Critical', color: '#aaa', id: '2'},
        Minor: {name: 'Minor', color: '#aaa', id: '4'},
        Major: {name: 'Major', color: '#aaa', id: '3'}
    };

    this.api.getProject('BEAM', function function_name (err, res) {
        self.id = res.id;
        self.versions = _.indexBy(res.versions, 'name');
        self.components = _.indexBy(res.components, 'name');
        self.issueTypes = _.indexBy(res.issueTypes, 'name');
    });
}

JiraObject.prototype.getPriorityColor = function (i) {
    return _.find(this.priorities, function (p) {
        return p.id === i;
    }, 'color') || '#aaa';
};

JiraObject.prototype.getPriority = function (name) {
    return this.priorities[name];
};
