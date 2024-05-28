class MainController {
  index(req, res) {
    res.render("index", {
      style: "style.css",
      script: "main.js",
    });
  }
}

module.exports = new MainController();
