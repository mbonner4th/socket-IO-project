var io = null;
sockets = [];
people = {};

var session = require("client-sessions");
var sessionConfig = require("./sessionConfig");
var cookie = require("cookie");

module.exports = {
    init: function(server){
        io = require('socket.io')(server);
        io.on('connection', function(socket){
            console.log("a user connected");
            var cookieSession = cookie.parse(socket.handshake.headers.cookie).session;
            var newSession = session.util.decode(sessionConfig, cookieSession);
            console.log(newSession);
/* 
Associate users with socket rooms based off of following.
Broadcast to rooms current user is following. 
*/

            io.on("join", function(){
                console.log("test");
            });
        });
    }, 
    instance: function(){
        return io;
    },
}

//you could use e.g. underscore to achieve this (
    function findUserByName(name){
        for(socketId in people){
          if(people[socketId].name === name){
            return socketId;
          }
        }
        return false;
      }