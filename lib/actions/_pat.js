/**
 * Simple hello action
 * Will reply hello if greeted
 */
module.exports = {
    regex: /^.*(pats dt on head|pets dt|thanks dt|rubs dt\'s head|scratches dt\'s ears)/g,
    description: 'Reac to compliments',
    params: {

    },
    fn: function (slack, config, args) {
        var m = ['**wags tail**', '**pants happily**', '**blows a kiss at you**', '**winks back playfully**'];
        var string = m[Math.floor(Math.random() * m.length)];

        config.channel.postMessage({
            username: 'Deep Thought',
            icon_url: "https://raw.githubusercontent.com/Antariano/deep-thought/master/icon.png",
            text: string
        });
    }
};
