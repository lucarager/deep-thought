/**
 * Simple hello action
 * Will reply hello if greeted
 */
module.exports = {
    regex: /^hello?.*/ig,
    params: {

    },
    fn: function (slack, config, args) {
        config.channel.send('Hello ' + config.userNameFull + '!');
    }
};
