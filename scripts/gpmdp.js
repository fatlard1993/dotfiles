#!/usr/bin/env node
var fs = require('fs');
var exec = require('child_process').exec;
var express = require('express');
var WebSocketClient = require('websocket').client;
 
var client = new WebSocketClient();
var app = express();
 
app.listen(60061);


var connectCommand = {
  namespace: 'connect',
  method: 'connect',
  arguments: ['GPMDP i3wm nodeProxy']
};

 
client.on('connectFailed', function(error){
  console.log('Connect Failure: ', error);
  throw error;
});
 
client.on('connect', function(connection){
  console.log('WebSocket Client Connected');

  connection.on('error', function(error){
    console.log('Connection Error: ', error);
  });

  connection.on('close', function(){
    console.log('Connection Closed');
  });

  connection.on('message', function(message){
    if(message.type === 'utf8'){
      if(message.utf8Data.includes('time')) return;
    
      var response = JSON.parse(message.utf8Data);

      if(response.channel === 'library' || response.channel === 'playlists' || response.channel === 'queue') return;

      console.log(message.utf8Data);

      if(response.payload === 'CODE_REQUIRED'){
        exec('notify-send "GPMDP i3wm nodeProxy" "Enter the 4 digit initialization code"');
        exec(`i3-msg '[class="Google Play Music Desktop Player"] focus, exec i3-input -l 4 -F "exec curl localhost:60061/init/%s" -P "GPMDP key: "'`);
      }
      else if(response.channel === 'connect'){
        fs.writeFile('/home/chase/.i3/gpmdp_key', response.payload, function (err) {
          if(err) return console.log(err);
          console.log('keyfile has been saved!');

          connectCommand.arguments[1] = response.payload;
          if(connection.connected) connection.sendUTF(JSON.stringify(connectCommand));
        });
      }
    }
  });

  if(connection.connected) connection.sendUTF(JSON.stringify(connectCommand));

  app.get('/init/:code', function(req, res){
    connectCommand.arguments[1] = req.params.code.toString();
    if(connection.connected) connection.sendUTF(JSON.stringify(connectCommand));
    res.send('OK!');
  });

  app.get('/:namespace/:method', function(req, res){
    var command = {
    namespace: req.params.namespace,
    method: req.params.method
    };

    if(connection.connected) connection.sendUTF(JSON.stringify(command));
    
    res.send('OK!');
  });
});

fs.readFile('/home/chase/.i3/gpmdp_key', (err, data) => {
  if(err){
    if(err.code === 'ENOENT') console.error('keyfile does not exist');
    else throw err;
  }
  else{
    console.log('Found keyfile: '+ data);
    connectCommand.arguments[1] = data;
  }

  client.connect('ws://localhost:5672/');
});