var session = require("client-sessions");

var currentSession = null;

session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 600 * 1000,
    activeDuration: 5 * 600 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true,
})
module.exports = {
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 600 * 1000,
    activeDuration: 5 * 600 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true,
};