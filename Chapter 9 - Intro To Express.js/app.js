//note we can remove http also
//we are first converting app to a server then we can do app.listen

//External Module
const express = require('express');

//Local Module
const requestHandler = require('./user');

const app = express();

app.get("/" , (req,res) => {
  return res.send("Hello from home page");
})

app.get("/about" , (req,res) => {
  return res.send(`Hello ${req.query.name}`);s
})



//create server bhi remove kar sakte h
 
const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});

//npm init means ek new project initialise kar rahe h
// we have added a script known as start
//when i write npm start in terminal it works in the same way we write node app.js
//if we add script from a foreign name then we have to write
//npm run "khul-ja-sim-sim"
//npm install nodemon --save-dev : so tha server getsautoupdated and we may not kill it everytime

//IMP POINTS TO BE NOTED DOWN:
//1.Cannot call next() after send()
//2."/" matches everything
//3.calling res.send implicitly calls res.end()