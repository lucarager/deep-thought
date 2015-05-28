/**
 * Simple hello action
 * Will reply hello if greeted
 */
module.exports = {
    regex: /(?:deep-thought|deep_thought|Deep Thought|DT)(?: |,|:){1,2}(approve this)/ig,
    params: {

    },
    fn: function (slack, config, args) {
        config.channel.send('(Approve)[https://raw.githubusercontent.com/Antariano/deep-thought/master/icon.png]');
    }
};
