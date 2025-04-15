const http = require('http');
const requestHandler = require ('./handler');


const server = http.createServer(requestHandler);

server.listen (3006,() =>{
  console.log(`Server running on address http://localhost:3006`)
});