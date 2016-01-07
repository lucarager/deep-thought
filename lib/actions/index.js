var _ = require('lodash');

var res = {
    help: {
        regex: /^.*(?:deep-thought|deep_thought|Deep Thought|DT)(?: |,|:){1,2}.*(what can you do|help)/g,
        params: {
        },
        fn: function (slack, config, args) {
            var msg = "Here's what I can do: \n ";
            _.each(res, function (action) {
                if (action.description) {
                    msg += "- " + action.description + "\n";
                }
            });
            config.channel.send(msg);
        }
    },
    hello: require('./_hello.js'),
    cory: require('./_127.js'),
    approve: require('./_approve.js'),
    sudormrf: require('./_sudormrf.js'),
    react: require('./_react.js'),
    githubIssue: require('./_githubIssue.js'),
    lifeUniverseAndEverything: require('./_lifeUniverseAndEverything.js')
};

module.exports = res;
