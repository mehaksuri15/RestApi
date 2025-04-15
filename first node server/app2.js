const http2= require ('http');

const server2= http2.createServer((req,res)=>{
  console.log(req.url,req.method, req.headers);

  if (req.url === '/'){
    res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Node JS</title></head>');
  res.write('<body><h1>Welcome To Home</h1></body>');
  res.write('</html>');
  return res.end();
  }
  else if (req.url === '/products') { 
    res.setHeader('Content-Type', 'text/html');
   res.write('<html>');
  res.write('<head><title>Node JS</title></head>');
  res.write('<body><h1>SHOP PRODUCTS</h1></body>');
  res.write('</html>');
  return res.end(); //writing return kyunki ek baar res.end() kardiya toh 
  //it wont process any command after that
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
//ismei different chheze change karne pe it is over writing the text