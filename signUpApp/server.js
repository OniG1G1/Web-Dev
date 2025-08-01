const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/' || url === '/index.html') {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Could not load form.');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }

  else if (url === '/signup' && method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { username, password } = querystring.parse(body);

      // Validation
      const hasCapital = /[A-Z]/.test(password);
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const isValid = username.trim() !== '' && hasCapital && hasLetter && hasNumber;

      if (!isValid) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid username or password. Password must include at least 1 capital letter, a number, and a letter.');
        return;
      }

      const userData = { username, password };

      const usersPath = path.join(__dirname, 'users.json');

      // Save to file
      fs.readFile(usersPath, 'utf8', (err, fileData) => {
        let users = [];

        if (!err && fileData) {
          try {
            users = JSON.parse(fileData);
          } catch (e) {
            users = [];
          }
        }

        users.push(userData);

        fs.writeFile(usersPath, JSON.stringify(users, null, 2), err => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Could not save user data.');
            return;
          }

          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Signup successful!');
        });
      });
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
