/**
 * Print out a JIRA issue whenever it's mentioned
 * Only works for BEAM right now
 */
var github = require('../github.js');
var recent = {};
var interval = 1000 * 60 * 5;

module.exports = {
    regex: /(frontend|backend)\#([0-9]{1,6})/ig,
    params: [
        'repo',
        'issue'
    ],
    fn: function (slack, config, args) {
        var token = args.repo + '#' + args.issue;

        if (recent[token]) {
            if (new Date().getTime() - recent[token] < interval) {
                return;
            }
        }

        github.api.issues.getRepoIssue({
            user: 'WatchBeam',
            repo: args.repo,
            number: args.issue
        }, function (err, data) {
            if (err) {
                return config.channel.send('Error retrieving issue: ' + err.toString());
            }

            config.channel.postMessage({
                username: 'Deep Thought',
                icon_url: "https://raw.githubusercontent.com/Antariano/deep-thought/master/icon.png",
                attachments: [
                    {
                        "color": '#333',

                        "title": '[' + args.repo + '#' + args.issue + '] ' + data.title,
                        "fallback": '[' + args.repo + '#' + args.issue + '] ' + data.title,
                        "title_link": data.url,

                        "pretext": "Here's the issue you just mentioned in case you need it :)",
                        "text": data.body || 'No issue body',

                        "fields": [
                            {
                                "title": "Status",
                                "value": data.state,
                                "short": true
                            },
                            {
                                "title": "Created",
                                "value": data.created_at,
                                "short": true
                            },
                            // {
                            //     "title": "Priority",
                            //     "value": issue.fields.priority.name,
                            //     "short": true
                            // },
                            {
                                "title": "Reporter",
                                "value": data.user.login,
                                "short": true
                            },
                            {
                                "title": "Assignee",
                                "value": data.assignee ? data.assignee.login : 'Nobody is assigned',
                                "short": true
                            }
                        ]
                    }
                ]
            });
        });

    }
};
