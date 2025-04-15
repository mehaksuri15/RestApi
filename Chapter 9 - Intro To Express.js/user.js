//chunks: small pices of data
//data flows as stream of chunks
//buffer: arranging chunks in a sequential manner
//parsing request: analyzing and extracting useful data from an HTTP request sent by the client (browser, API, or another server).


const fs = require('fs');

const userRequestHandler = (req, res) => {
  console.log("Request received:", req.url, req.method);

  // Route: Home Page
  if (req.url === '/' && req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Node JS</title></head>');
    res.write('<body><h1>Enter Your Details:</h1>');
    res.write('<form action="/submit-details" method="POST">');
    res.write('<input type="text" name="username" placeholder="Enter your name" required><br><br>');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="male" name="gender" value="male" required/>');
    res.write('<label for="female">Female</label>');
    res.write('<input type="radio" id="female" name="gender" value="female" required/>');
    res.write('<br><br><input type="submit" value="Submit">');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  // Route: Submit Form
  if (req.url === '/submit-details' && req.method === 'POST') {
    const body = [];

    req.on('data', chunk => {
      body.push(chunk);
    });

    req.on('end', () => {
      const fullBody = Buffer.concat(body).toString();
      const params = new URLSearchParams(fullBody);

      const bodyObject = {};
      for (const [key, value] of params.entries()) {
        bodyObject[key] = value;
      }

      fs.writeFile('user.txt', JSON.stringify(bodyObject), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        } else {
          console.log("User details saved:", bodyObject);
        }
      });

      // Redirect back to home
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });

    return; // Important: Avoid sending response prematurely
  }

  // Route: Any Other URL
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Not Found</title></head>');
  res.write('<body><h1>404 - Page Not Found</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = userRequestHandler;
