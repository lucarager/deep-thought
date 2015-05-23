/**
 * React with a gif
 */
var request = require('request');
var $ = require('cheerio');

module.exports = {
    regex: /(deep-thought|deep_thought|Deep Thought|DT).{1,2}(react like|react to| react with).(.+$)/ig,
    params: [
        'a',
        'b',
        'string'
    ],
    fn: function (slack, config, args) {
        request.get('http://www.reactiongifs.com/?s='+ args.string.split(' ').join('+') +'&submit=Search', function (err, res, html) {
            if (err) {
                return console.error(err);
            }
            var parsedHTML = $.load(html);
            // get all img tags and loop over them
            var imageURLs = [];
            parsedHTML('img').map(function(i, link) {
                var src = link.attribs.src;
                if (!endsWith(src, '.gif')) {
                    return;
                }
                imageURLs.push(src);
            });

            if (imageURLs.length === 0) {
                config.channel.send("I'm sorry, but I couldn't find an appropriate reaction in my database :(");
            } else {
                // Choose a random one
                var rand = imageURLs[Math.floor(Math.random() * imageURLs.length)];
                // Respond!
                config.channel.postMessage({
                    username: 'Deep Thought',
                    icon_url: "https://raw.githubusercontent.com/Antariano/deep-thought/master/icon.png",
                    attachments: [
                        {
                            "fallback": "Required plain-text summary of the attachment.",

                            "color": "#ccc",
                            "image_url": rand
                        }
                    ]
                });
            }
        });
    }
};

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

// http://replygif.net/api/gifs?tag=okay&tag-operator=and&api-key=39YAprx5Yi
// http://replygif.net/api/gifs?api-key=39YAprx5Yi&tag-operator=and&tag=wat
