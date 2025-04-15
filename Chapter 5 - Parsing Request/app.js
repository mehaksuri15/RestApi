//USING MODULES

const http = require('http');
const requestHandler = require('./user');

const server2 = http.createServer(requestHandler);

const PORT = 3004;
server2.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`)
})

 