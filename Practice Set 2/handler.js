const sumRequestHandler = require ('./Sum'); 
const requestHandler = (req,res) => {
  console.log(req.url,req.method);
  if(req.url === '/'){
    res.setHeader('Content-Type', 'text/html');
    res.write(`<html lang="en">
<head>
  <title>Practice Set</title>
</head>
<body>
  <h1>Welcome to Calculator</h1>
  <a href ="/calculator">Go to Calculator</a>
</body>
</html>` 
)
return res.end()
}
else if(req.url.toLowerCase() === '/calculator'){
  res.setHeader('Content-Type', 'text/html');
  res.write(`
    <html lang="en">
      <head>
       <title>Practice Set</title>
      </head>
      <body>
        <h1>Here is the Calculator</h1>
        <form action = "/calculate-result" method="POST">
        <input type="text" placeholder="First Num" name = "first"/>
        <input type="text" placeholder="Second Num" name = "second"/>
        <input type= "submit" value="Sum">
      </form>
      </body>
     </html>` 
)
return res.end();
}
else if (req.url.toLowerCase() === '/calculate-result' && req.method === 'POST') {
  {
   sumRequestHandler(req,res);
   return ;
}
};
}


module.exports = requestHandler;
