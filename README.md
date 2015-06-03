![Logo](icon.png)
# Deep Thought
A slack bot for MCProHosting

-----

###Extending Deep Thought
Deep thought works by running a set of regexes on every incoming message and executing a function if the regex passes.

To create a new action:
- Define your action in `lib/actions`
 
- Add it to `lib/actions/index.js`

Hello world action:
```
/**
 * Simple hello action
 * Will reply hello if greeted
 */
module.exports = {
    regex: /^hello.*/ig,
    params: [], // Map regex capture groups to the keys specified in this array. Will be then injected into fn in `args`
    fn: function (slack, config, args) {
        // slack is the core node-slack api
        // config is a generated helper config containing several useful properties
        // args are the results of the regex capture groups mapped to the keys specified in "params"
        config.channel.send('Hello ' + config.userNameFull + '!');
    }
};
```
config object:
```
{
  channel: channel, // channel object from the slack node API
  channelName: channelName, // channel
  user: user, // user object from the slack node API
  userName: userName, // username
  userNameFull: userNameFull // @username
}
```
Sending messages:
Use either `config.channel.send` for simple messages or `config.channel.postMessage` to include advanced things like attachements.
