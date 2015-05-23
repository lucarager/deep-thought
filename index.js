// Deps
var Slack   = require('slack-client');
var _       = require('lodash');
var prompt  = require('prompt');
var actions = require('./lib/actions');
var config  = require('./config');

// Auth variables
var token = config.token;
var autoReconnect = config.autoReconnect;
var autoMark = config.autoMark;

// Construct
var slack = new Slack(token, autoReconnect, autoMark);

// Start prompt
prompt.start();

// Bindings
slack.on('open', onOpen);
slack.on('error', onError);
slack.on('message', onMessage);

// Activate
start();

// Internals
// ========================

function start () {
    slack.login();
}

function onOpen () {

    var channels = [];
    var groups = [];
    var unreads = slack.getUnreadCount();

    // Get all the channels that bot is a member of
    channels = _.filter(slack.channels, function (c) {
        return c.is_member;
    });

    // Get all groups that are open and not archived
    groups = _.filter(slack.groups, function (g) {
        return g.is_open && !g.is_archived;
    });

    console.log('Welcome to Slack. You are ' + slack.self.name + ' of ' + slack.team.name);
    console.log('You are in: ' + channels.map(function (a) { return a.name; }).join(', ') + groups.map(function (a) { return a.name; }).join(', '));

    messages = unreads === 1 ? 'message' : 'messages';

    console.log('You have ' + unreads + ' unread ' + messages);

}

function onMessage (message) {

    var config = createMessageConfig(message);

    _.forEach(actions, function (action, name) {
        var _a = [];
        try {
            _a = action.regex.exec(message.text) || [];
        } catch(e) {
            onError(e.toString());
        }
        if (_a.length > 0) {
            // If there's subresults, the first one will be the full string
            if (_a.length > 1) {
                _a.shift();
            }
            var args = {};
            for (var i = _a.length - 1; i >= 0; i--) {
                args[action.params[i]] = _a[i];
            }
            console.log('Executing', name);
            action.fn(slack, config, args);
        }

    });

    console.log('Received: ' + message.type + ' ' + config.channelName + ' ' + config.userName + ' ' + message.ts + ' "' + message.text +'"');

}

function onError (error) {
    console.error(error);
}

function createMessageConfig (message) {
    var user = slack.getUserByID(message.user);
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    var channelName = (channel && channel.is_channel ? '#' : '') + (channel ? channel.name : 'UNKNOWN_CHANNEL');
    var userName = (user && user.name ? user.name : 'UNKNOWN_USER');
    var userNameFull = '@' + userName;

    return {
        channel: channel,
        channelName: channelName,
        user: user,
        userName: userName,
        userNameFull: userNameFull
    };
}

// slack.on 'message', (message) ->
//   channel = slack.getChannelGroupOrDMByID(message.channel)
//   user = slack.getUserByID(message.user)
//   response = ''

//   {type, ts, text} = message

//   channelName = if channel?.is_channel then '#' else ''
//   channelName = channelName + if channel then channel.name else 'UNKNOWN_CHANNEL'

//   userName = if user?.name? then "@#{user.name}" else "UNKNOWN_USER"

//   console.log """
//     Received: #{type} #{channelName} #{userName} #{ts} "#{text}"
//   """

//   # Respond to messages with the reverse of the text received.
//   if type is 'message' and text? and channel?
//     response = text.split('').reverse().join('')
//     channel.send response
//     console.log """
//       @#{slack.self.name} responded with "#{response}"
//     """
//   else
//     #this one should probably be impossible, since we're in slack.on 'message'
//     typeError = if type isnt 'message' then "unexpected type #{type}." else null
//     #Can happen on delete/edit/a few other events
//     textError = if not text? then 'text was undefined.' else null
//     #In theory some events could happen with no channel
//     channelError = if not channel? then 'channel was undefined.' else null

//     #Space delimited string of my errors
//     errors = [typeError, textError, channelError].filter((element) -> element isnt null).join ' '

//     console.log """
//       @#{slack.self.name} could not respond. #{errors}
//     """


