const querystring = require("querystring");
const userService = require("../services/UserService");

const signup = (req, res) => {
  let body = "";
  req.on("data", chunk => (body += chunk.toString()));
  req.on("end", () => {
    const { username, password } = querystring.parse(body);
    const result = userService.createUser(username, password);
    res.writeHead(result.success ? 200 : 400, { "Content-Type": "text/plain" });
    res.end(result.message);
  });
};

const login = (req, res) => {
  let body = "";
  req.on("data", chunk => (body += chunk.toString()));
  req.on("end", () => {
    const { username, password } = querystring.parse(body);
    const result = userService.authenticateUser(username, password);
    res.writeHead(result.success ? 200 : 400, { "Content-Type": "text/plain" });
    res.end(result.message);
  });
};

module.exports = { signup, login };
