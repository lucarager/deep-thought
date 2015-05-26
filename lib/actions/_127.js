/**
 * Simple hello action
 * Will reply hello if greeted
 */
module.exports = {
    regex: /^.*(?:deep-thought|deep_thought|Deep Thought|DT)(?: |,|:){1,2}.*(127)/g,
    params: {

    },
    fn: function (slack, config, args) {
        // Select random user
        var guy = config.channel.members[Math.floor(Math.random() * config.channel.members.length)];
        var user = slack.getUserByID(guy);
        config.channel.send(['*Poof*  ', 'Uh, oh.... I think I just deleted ', user.name].join(' '));
    }
};
