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
        var m = config.channel.members.map(function (uid) {
            return slack.getUserByID(uid);
        });
        // Only active people
        m = m.filter(function (u) {
            return u.presence === 'active';
        });
        var guy = m[Math.floor(Math.random() * m.length)];
        config.channel.send(['*Poof*  ', 'Uh, oh.... I think I just deleted ', guy.name].join(' '));
    }
};
