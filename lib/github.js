var GitHubApi = require("github");
var config = require('../config.js');

module.exports = new GithubObject();

function GithubObject () {

    var self = this;

    this.api = new GitHubApi({
        // required
        version: "3.0.0",
        // optional
        debug: true,
        protocol: "https",
        host: "api.github.com", // should be api.github.com for GitHub
        timeout: 5000,
        headers: {
            "user-agent": "Deep-thought bot" // GitHub is happy with a unique user agent
        }
    });

    this.api.authenticate({
        type: "basic",
        username: config.username,
        password: config.password,
    });

}
