class Router {
  constructor() {
    this.routes = {}; // store "METHOD:PATH" => handlerName
  }

  register(method, path, handlerName) {
    const key = `${method}:${path}`;
    this.routes[key] = handlerName;
  }

  resolve(method, path) {
    const key = `${method}:${path}`;
    return this.routes[key] || null;
  }
}

module.exports = Router;
