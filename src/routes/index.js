const mainRouter = require("./main");

function route(app) {
  app.use("/", mainRouter);
}

module.exports = route;
