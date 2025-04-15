//chunks: small pices of data
//data flows as stream of chunks
//buffer: arranging chunks in a sequential manner
//parsing request: analyzing and extracting useful data from an HTTP request sent by the client (browser, API, or another server).


const fs = require('fs');

const userRequestHandler = (req,res)=>{
  console.log(req.url,req.method);

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
    const body = [];
    req.on("data",(chunk) =>{
    console.log(chunk);
    body.push(chunk);
    //Each chunk is logged and stored in the body array.
    });
    //When all data is received, req.on("end", callback) runs.
    req.on("end", () =>{
      const fullBody = Buffer.concat(body).toString();
      // combines the chunks and converts them into a readable string.
      console.log(fullBody); //it will represent as username=mehak+suri&gender=female
      const params = new URLSearchParams(fullBody); 
      // URLSearchParams(fullBody) parses the string and extracts key-value pairs.
      const bodyObject = {};
      for(const [key,val] of params.entries()){
        bodyObject[key] = val;
        //It loops over all entries (key-value pairs) and stores them in bodyObject.
      }
      console.log(bodyObject); //output is {username : 'mehak suri',gender : 'female'}
      fs.writeFileSync('user.txt',JSON.stringify(bodyObject));
      //writing into file user.txt
    });
    
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
};
 module.exports = userRequestHandler;