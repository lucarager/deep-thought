/**
 * Simple hello action
 * Will reply hello if greeted
 */
module.exports = {
    regex: /(?:deep-thought|deep_thought|Deep Thought|DT)(?: |,|:){1,2}(approve this|approve that|approve of that|approve of this)/ig,
    params: {

    },
    fn: function (slack, config, args) {
        config.channel.postMessage({
            username: 'Deep Thought',
            icon_url: "https://raw.githubusercontent.com/Antariano/deep-thought/master/icon.png",
            attachments: [
                {
                    "fallback": "Required plain-text summary of the attachment.",

                    "color": "#ccc",
                    "image_url": "https://raw.githubusercontent.com/Antariano/deep-thought/master/approve.png"
                }
            ]
        });
    }
};
