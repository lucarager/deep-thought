/**
 * Simple hello action
 * Will reply hello if greeted
 */
module.exports = {
    regex: /(BEAM-[0-9]{1,6})/g,
    params: [
        'issue'
    ],
    fn: function (slack, config, args) {
        config.channel.send('Recognized issue: ' + args.issue);
        config.channel.postMessage({
            username: 'Deep Thought',
            icon_url: "https://raw.githubusercontent.com/Antariano/deep-thought/master/icon.png",
            attachments: [
                {
                    "fallback": "Required plain-text summary of the attachment.",

                    "color": "#36a64f",

                    "pretext": "Optional text that appears above the attachment block",

                    "title": "Slack API Documentation",
                    "title_link": "https://api.slack.com/",

                    "text": "Optional text that appears within the attachment",

                    "fields": [
                        {
                            "title": "Priority",
                            "value": "High",
                            "short": false
                        }
                    ],

                    "image_url": "http://my-website.com/path/to/image.jpg"
                }
            ]
        });
    }
};
