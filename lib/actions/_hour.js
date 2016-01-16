var moment = require('moment');
var _ = require('lodash');
require('moment-timezone');
var tz = {
    'GMT': 'Europe/London',
    'CET': 'Europe/Berlin',
    'PHT': 'Asia/Manila',
    'EST': 'America/New_York',
    'PST': 'America/Los_Angeles'
};


// moment.tz.load(require(process.cwd() + '/timezones.json'));

module.exports = {
    regex: /([0-9]{2}\:[0-9]{2}|[0-9]{2})([a-z]{3}\+[0-9]{1,2}|[a-z]{3})/ig,
    description: 'Localize timezones for team members of MCPH',
    params: [
        'time',
        'timezone'
    ],
    fn: function (slack, config, args) {

        if (args.time.length < 3) {
            args.time = args.time + ':00';
        }
        args.timezone = args.timezone.toUpperCase();

        if (!_.contains(Object.keys(tz), args.timezone)) {
            return;
        }

        var a = moment.tz(args.time, 'HH:mm', tz[args.timezone]);
        var solution = [];

        _.each(tz, function (t, key) {
            if (key !== args.timezone) {
                solution.push({
                    title: key,
                    value: a.tz(t).format('HH:mm'),
                    short: true
                });
            }
        });

        config.channel.postMessage({
            username: 'Deep Thought',
            icon_url: "https://raw.githubusercontent.com/Antariano/deep-thought/master/icon.png",
            attachments: [
                {
                    "fallback": "Required plain-text summary of the attachment.",
                    "fields": solution
                }
            ]
        });
    }
};
