/**
 * Print out a JIRA issue whenever it's mentioned
 * Only works for BEAM right now
 */
var jira = require('../jira.js');
var nconf = require('../nconf.js');
var _ = require('lodash');

module.exports = {
    regex: /^(?:deep-thought|deep_thought|Deep Thought|DT)(?: |,|:){1,2}(?:create a )([A-z]*)(?: priority )([A-z]*)(?: in )([A-z]*)(?:\:)([A-z]*)(?: for )([A-z]*)(?:\: )(.*)(?:\|)(.*)$/g,
    params: [
        'priority',
        'type',
        'version',
        'component',
        'assignee',
        'summary',
        'description'
    ],
    fn: function (slack, config, args) {

        if (!nconf.get("jira:user")[config.userName]) {
            return config.channel.send("Sorry " + config.userNameFull +", before you do that please register yourself with me using `deep_thought: I'm <user> on JIRA` :smile:");
        }

        if (!jira.issueTypes[args.type]) {
            return config.channel.send("Sorry, the issue type is invalid. Should be one of: " + printObject(jira.issueTypes));
        }

        if (!jira.priorities[args.priority]) {
            return config.channel.send("Sorry, the priority is invalid. Should be one of: " + printObject(jira.priorities));
        }

        if (!jira.versions[args.version]) {
            return config.channel.send("Sorry, the version is invalid. Should be one of: " + printObject(jira.versions));
        }

        if (!jira.components[args.component]) {
            return config.channel.send("Sorry, the component is invalid. Should be one of: " + printObject(jira.components));
        }

        var issue = {
            "fields": {
                "project": {
                    "id": jira.id
                },
                "summary": args.summary,
                "issuetype": {
                    "id": jira.issueTypes[args.type].id
                },
                "reporter": {
                    "name": nconf.get("jira:user")[config.userName].name
                },
                "priority": {
                    "id": jira.priorities[args.priority].id
                },
                "versions": [
                    {
                        "id": jira.versions[args.version].id
                    }
                ],
                "description": args.description,
                "fixVersions": [
                    {
                        "id": jira.versions[args.version].id
                    }
                ],
                "components": [
                    {
                        "id": jira.components[args.component].id
                    }
                ]
            }
        };

        jira.api.searchUsers(args.assignee, 0, 10, true, false, function (err, body) {
            if (body.length === 1) {
                var user = body[0];
                issue.assignee = {name: user.name};
                jira.api.addNewIssue(issue, function(error, issue) {
                    if (error) {
                        config.channel.send(":scream: Oh no, there was an error creating this issue! Check the logs, @luca-rager!");
                        console.error(error);
                    } else {
                        config.channel.send("I've successfully created the issue!");
                        console.log(issue);
                    }
                });
            } else if (body.length > 1) {
                return config.channel.send(':disappointed: I found multple users, can you be more precise as to whom I should assign this issue to? Found _' + body.map(function (u) {
                    return u.name + ' (' + u.key +')';
                }).join(', ') +'_');
            } else {
                return config.channel.send(":sweat_smile: I couldn't find anybody with that information to give this issue to, sorry!");
            }
        });

    }
};

function printObject (object) {
    return _.map(object, function (obj, key) {
        return key;
    }).join(', ');
}
