const http = require("http");
const Router = require("./src/core/Router");
const RequestHandler = require("./src/core/RequestHandler");

// Initialize router
const router = new Router();

// Register backend/API routes
router.register("GET", "/", "UserController.serveLoginPage");


router.register("POST", "/signup", "UserController.signup");
router.register("POST", "/login", "UserController.login");

// Initialize request handler with router
const handler = new RequestHandler(router);

// Create server
const server = http.createServer((req, res) => handler.handle(req, res));

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
