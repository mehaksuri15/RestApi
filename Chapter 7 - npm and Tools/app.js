const http = require('http');
const server = http.createServer((req,res) => {
  console.log(req); 

})
 
const PORT = 3005;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});

//npm init means ek new project initialise kar rahe h
// we have added a script known as start
//when i write npm start in terminal it works in the same way we write node app.js
//if we add script from a foreign name then we have to write
//npm run "khul-ja-sim-sim"
//npm install nodemon --save-dev : so tha server getsautoupdated and we may not kill it everytime