/**
 * Calculate the answer
 */
module.exports = {
    regex: /^(?:deep-thought|deep_thought|Deep Thought|DT)(?: |,|:){1,2}(what is)( the answer to life the universe and everything| the meaning of life| the answer).*/ig,
    description: "Calculate the answer to life the universe and everything",
    params: {

    },
    fn: function (slack, config, args) {
        config.channel.send("The answer to the ultimate question of life, the universe and everything is 42.");
    }
};
