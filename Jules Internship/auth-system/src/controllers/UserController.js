const path = require('path');
const querystring = require("querystring");
const userService = require("../services/UserService");

const handleSignup = (req, res) => {
  let body = "";
  req.on("data", chunk => (body += chunk.toString()));
  req.on("end", () => {
    const { username, password } = querystring.parse(body);
    const result = userService.createUser(username, password);
    res.writeHead(result.success ? 200 : 400, { "Content-Type": "text/plain" });
    res.end(result.message);
  });
};

const handleLogin = (req, res) => {
  let body = "";
  req.on("data", chunk => (body += chunk.toString()));
  req.on("end", () => {
    const { username, password } = querystring.parse(body);
    const result = userService.authenticateUser(username, password);
    res.writeHead(result.success ? 200 : 400, { "Content-Type": "text/plain" });
    res.end(result.message);
  });
};

module.exports = {
  handleSignup,
  handleLogin,
};

