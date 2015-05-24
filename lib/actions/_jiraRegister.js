/**
 * Register someone as JIRA user
 */
var jira = require('../jira.js');
var fs = require('fs');
var nconf = require('../nconf.js');

module.exports = {
    regex: /(?:deep-thought|deep_thought|Deep Thought|DT)(?: |,|:){1,2}(?:I'm )([A-z]*)(?: on )(?:jira|JIRA)/g,
    params: [
        'name'
    ],
    fn: function (slack, config, args) {

        // Check
        jira.api.searchUsers(args.name, 0, 10, true, false, function (err, body) {
            if (body.length === 1) {
                var user = body[0];
                config.channel.send(":smile: I found you on jira as *" + user.displayName + "*. You are now registered in my database!");
                nconf.set('jira:user:'+config.userName, user);
                nconf.save();
            } else if (body.length > 1) {
                config.channel.send(':disappointed: I found multple users, can you be more precise? Found _' + body.map(function (u) {
                    return u.name + ' (' + u.key +')';
                }).join(', ') +'_');
            } else {
                config.channel.send(":sweat_smile: I couldn't find anybody with that information, sorry!");
            }
        });
    }
};
