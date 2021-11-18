"use strict"
const http = require('http');
const uuid = require('uuid');
const router = require('./router.js')

function Song(id, name, artist, length, genre) {
  this.id = id;
  this.name = name;
  this.artist = artist;
  this.length = length;
  this.genre = genre;
}

const song = new Song(uuid.v4(), "Man of Oil", "Animal Collective", 5.25, "Indie")
let simpleResource = {song}

router.post('/api/simple-resource', (req, res) => {
  if(!req.body.name){
    res.writeHead(400, 'Bad Request: You need a song name');
    res.end();
    return;
  }

  let song = new Song(uuid.v4(), req.body.name, req.body.artist, req.body.length, req.body.genre);
  
  simpleResource[song.id] = song;

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify(song));
  res.end();
});

router.get('/', (req, res) => {
 res.writeHead(200, {'Content-Type': 'text/html'});
  console.log('home page')
  res.write('Welcome to the Song Collection');
  res.end();
  return
})

router.get('/api/simple-resource', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(simpleResource));
  res.end();
  return
})

// in this module, we create the res, req handling for the body of the server function (https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment#testing_your_nodejs_and_npm_installation) and export it

module.exports = http.createServer(router.route)