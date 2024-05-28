var express = require("express");
var router = express.Router();

const mainController = require("../app/controllers/MainController");

router.get("/", mainController.index);

module.exports = router;
