"use strict"
const http = require('http');
const uuid = require('uuid');
const router = require('./router.js')



function Song(id, name, artist, length) {
  this.id = id;
  this.name = name;
  this.artist = artist;
  this.length = length;
}



const song = new Song(1, "Man of Oil", "Animal Collective", 5.25)
let simpleResource = {1: song}


router.get('api/simple-resource', (req, res) => {
  
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(simpleResource));
  res.end();
  return
})

// in this module, we create the res, req handling for the body of the server function (https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment#testing_your_nodejs_and_npm_installation) and export it

module.exports = http.createServer(router.route)