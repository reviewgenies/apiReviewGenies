const { authJwt } = require("../middleware");
const controller = require("../controller/ocupation.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    
  var router = require("express").Router();


  // Create a new Ocupation
  //router.get("/",[authJwt.verifyToken], controller.findAll);
  
  router.get("/", controller.findAll);

  app.use('/api/ocupation', router);

};



