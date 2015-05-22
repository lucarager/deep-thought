/**
 * Simple hello action
 * Will reply hello if greeted
 */
var jira = require('../jira.js');
var recent = {};
var interval = 1000 * 60 * 5;

module.exports = {
    regex: /(BEAM-[0-9]{1,6})/ig,
    params: [
        'issue'
    ],
    fn: function (slack, config, args) {

        if (recent[args.issue]) {
            if (new Date().getTime() - recent[args.issue] < interval) {
                return;
            }
        }

        jira.findIssue(args.issue, function(error, issue) {

            if (error) {
                config.channel.send('Error retrieving issue: ' + error);
            } else {
                recent[args.issue] = new Date().getTime();

                // Priority color
                var color = '#aaa';
                if (issue.fields.priority.id === '5') {
                    color = '#D5DDD6'; // Trivial
                } else if (issue.fields.priority.id === '1000') {
                    color = '#C6BC00'; // Medium
                } else if (issue.fields.priority.id === '2') {
                    color = '#000'; // Critical
                } else if (issue.fields.priority.id === '4') {
                    color = '#36a64f'; // Minor
                } else if (issue.fields.priority.id === '3') {
                    color = '#BD0909'; // Minor
                }

                config.channel.postMessage({
                    username: 'Deep Thought',
                    icon_url: "https://raw.githubusercontent.com/Antariano/deep-thought/master/icon.png",
                    attachments: [
                        {
                            "fallback": "Required plain-text summary of the attachment.",

                            "color": color,

                            // "pretext": "Optional text that appears above the attachment block",

                            "title": '[' + args.issue + '] ' + issue.fields.summary,
                            "title_link": "https://jira.beam.pro/browse/" + args.issue,

                            "text": issue.fields.description,

                            "fields": [
                                {
                                    "title": "Status",
                                    "value": issue.fields.status.name,
                                    "short": true
                                },
                                {
                                    "title": "Created",
                                    "value": issue.fields.created,
                                    "short": true
                                },
                                {
                                    "title": "Priority",
                                    "value": issue.fields.priority.name,
                                    "short": true
                                },
                                {
                                    "title": "Reporter",
                                    "value": issue.fields.reporter.name,
                                    "short": true
                                },
                                {
                                    "title": "Assignee",
                                    "value": issue.fields.assignee.name,
                                    "short": true
                                }
                            ]
                        }
                    ]
                });

            }

        });

    }
};
