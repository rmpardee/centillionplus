var express = require('express');
var middleware = require('./config/middleware.js');
var socketio = require('socket.io');


var app = express();


//SET UP MIDDLEWARE + ROUTES
middleware(app, express);

var PORT = process.env.PORT || 3000;
// NOTE: if you're running the app locally (not the deployed version on heroku), the line above will take care of the server, but make sure to uncomment out the line on 11 of the public/MainService.js file.

// Save the HTTP server created with express as a variable in order to reuse for socket.io
var server = app.listen(PORT);
console.log('DCYDR listening' + PORT);

// Create the socket variable by passing in the HTTP server we saved above
var io = socketio(server);

io.on('totalVotesChange', function(data) {
  // Re-emit a call for all the clients to hear to update
  console.log("emitting totalVotesChange server");
  server.io.emit('totalVotesChange', data);
});


// Note RMP: I don't think this exported app is actually used anywhere
module.exports.app = app;
// Export the socket so we can have it listen and emit elsewhere (used in voteCtrl):
module.exports.io = io;
