// --- Previous approach ---//

/*
const http = require("http");
const Router = require("./src/core/Router");
const RequestHandler = require("./src/core/RequestHandler");

const userRoutes = require("./routes/userRoutes");

// Initialize router
const router = new Router();

// Register backend/API routes
const AuthController = require('./controllers/AuthController');
router.register("POST", "/signup", AuthController.signup);


// Initialize request handler with router
const handler = new RequestHandler(router);

// Create server
const server = http.createServer((req, res) => handler.handle(req, res));




// Register all route modules
userRoutes(router);
postRoutes(router);

const server = http.createServer((req, res) => {
  requestHandler.handle(req, res, router);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
*/
// --- End of Previous approach ---//

/*
const http = require("http");
const Router = require("./src/core/Router");

// create router instance
const router = new Router();

// import routes
require("./src/routes/userRoutes")(router);

// example request handler
const server = http.createServer(async (req, res) => {
  const handler = router.resolve(req.method, req.url.split("?")[0]);

  if (handler) {
    await handler(req, res); // call controller directly
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
*/

const http = require("http");

const Router = require("./src/core/Router");
const registerRoutes = require("./src/routes/index");

const router = new Router();
registerRoutes(router);

const server = http.createServer((req, res) => {
  router.handle(req, res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

