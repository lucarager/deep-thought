/**
 * Simple hello action
 * Will reply hello if greeted
 */
module.exports = {
    regex: /(?:deep-thought|deep_thought|Deep Thought|DT)(?: |,|:){1,2}(sudo rm -rf \/)/ig,
    description: "Execute sudo rm -rf /",
    params: {

    },
    fn: function (slack, config, args) {
        var possibleResponses = [
            "Exterminated all of James' suits",
            "Stolen every single one of Matt's lasers",
            "Drank every ounce of Luca's coffee",
            "Ate Fren's waifu",
            "Annihilated all of Tanya's cookies"
        ];
        config.channel.send(possibleResponses[Math.floor(Math.random() * possibleResponses.length)]);
    }
};
