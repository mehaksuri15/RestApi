const http = require ('http');

const server = http.createServer ((req,res) => {
  console.log(req.url,req.method, req.headers);
  
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Node JS</title></head>');
  res.write('<body><h1>mehak</h1></body>');
  res.write('</html>');
  res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`)
})

//process.exit(); //stops event loop :
// shuts down the server immediately, so the response (res.write(...)) is never sent to the client.

// this means koi bhi request daalo it will generate similar type of response
