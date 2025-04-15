console.log("Mehak");
const fs = require('fs'); //you can use require to use different modules in node.js

fs.writeFile("output.txt",'writing file',(err) => {
  if(err) console.log("Errpr occurred");
  else console.log("file written successfully");
});

//REPL : nothing will be saved once ctrl v + ctrl v is done 2 times it will clear off the terminal
//read = read user input
//eval = evaluate user input
//print = print output(result)
//loop 