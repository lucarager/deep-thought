/**
 * Simple hello action
 * Will reply hello if greeted
 */
module.exports = {
    regex: /(?:deep-thought|deep_thought|Deep Thought|DT)(?: |,|:){1,2}(hello|hi|yo|wassup)/ig,
    description: "Say hello",
    params: {

    },
    fn: function (slack, config, args) {
        config.channel.send('Hello ' + config.userNameFull + '!');
    }
};
