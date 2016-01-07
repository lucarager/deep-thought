var moment = require('moment');
var _ = require('lodash');
require('moment-timezone');
var tz = {
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

        var a = moment.tz(args.time, 'HH:mm', args.timezone);
        var solution = [];

        _.each(tz, function (t, key) {
            if (t !== args.timezone) {
                solution.push('*' + a.tz(t).format('HH:mm') + ' ' + key + '*');
            }
        });

        config.channel.send("Heads up, that\'s " + solution.join(', ') + '.');
    }
};
