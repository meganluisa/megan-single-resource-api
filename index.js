const hostname = 'localhost';
const port = 3000;

const server = require('./lib/server.js');
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});