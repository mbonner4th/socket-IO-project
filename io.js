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
            //console.log("a user connected");
            var cookieSession = cookie.parse(socket.handshake.headers.cookie).session;
            var currentUser = session.util.decode(sessionConfig, cookieSession);
            sockets.push(socket);
            people[currentUser.content.user.handle] = socket;
            currentUser.content.user.following.map(function(room){
                socket.join(room);
            });
        });
    }, 
    instance: function(){
        return io;
    },
    joinRoom: function( userHandel, room){
        if( people[userHandel]){
            people[userHandel].join(room);
        }
    }, 
    leaveRoom: function(userHandel, room){
        if( people[userHandel]){
            people[userHandel].leave(room);
        }

    }
}

