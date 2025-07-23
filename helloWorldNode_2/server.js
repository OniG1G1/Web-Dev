const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/' || url === '/index.html' || url === '/now') {
    servePage(new Date());
  } else if (url === '/yesterday') {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    servePage(yesterday);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Page not found');
  }

  // helper function to serve HTML with the given date
  function servePage(dateObj) {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error loading HTML file');
        return;
      }

      const pageWithDate = data.replace('{{datetime}}', dateObj.toString());

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(pageWithDate);
    });
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
