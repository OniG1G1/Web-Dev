const http = require('http');
const path = require('path');
const fs = require('fs');
const { serveIndex, handleSignup } = require('./controllers/UserController');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    serveIndex(res);
  }
  else if (req.url === '/signup' && req.method === 'POST') {
    handleSignup(req, res);
  }
  else if (req.url.startsWith('/css/')) {
    const filePath = path.join(__dirname, 'public', req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Not found');
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
