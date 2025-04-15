const http2= require ('http');
const fs = require('fs');

const server2= http2.createServer((req,res)=>{
  console.log(req.url,req.method, req.headers);

  if (req.url === '/'){
    res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Node JS</title></head>');
  res.write('<body><h1>Enter Your Details: </h1>');
  res.write('<form action="/submit-details" method="POST">');
  res.write('<input type="text" name="username" placeholder="Enter your name"> <br>');
  res.write(`<label for="male">Male</label>`);
  res.write(`<input type="radio" id="male" name="gender" value="male"/>`);
  res.write(`<label for="female">Female</label>`);
  res.write(`<input type="radio" id="female" name="gender" value="female"/>`);
  res.write(`<input type="submit" value ="Submit">`);
  res.write('</form>');
  res.write('</body>');
  res.write('</html>');
  return res.end();
  }
  else if (req.url.toLowerCase() === "/submit-details" && req.method=="POST") { 
    fs.writeFileSync('user.txt','Mehak Suri');
    res.statusCode = 302; //means ki redirect to home page ke liye hum 302 code likhte hai
    res.setHeader('Location', '/');
    return res.end();
  } else{
    res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Node JS</title></head>');
  res.write('<body><h1>mehak</h1></body>');
  res.write('</html>');
  res.end();
  }
});

const PORT = 3001;
server2.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`)
})