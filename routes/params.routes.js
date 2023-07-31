const { authJwt } = require("../middleware");
const controller = require("../controller/params.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    
  var router = require("express").Router();
  
  router.get("/:id",[authJwt.verifyToken], controller.findOne);

  app.use('/api/Params', router);

};



