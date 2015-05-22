/**
 * Calculate the answer
 */
module.exports = {
    regex: /.*(what is)( the answer to life the universe and everything| the meaning of life| the answer).*/ig,
    params: {

    },
    fn: function (slack, config, args) {
        config.channel.send("The answer to the ultimate question of life, the universe and everything is 42.");
    }
};
