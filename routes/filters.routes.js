const { authJwt } = require("../middleware");
const controller = require("../controller/filters.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    
  var router = require("express").Router();

  // Create a new Filters
  router.post("/",[authJwt.verifyToken],  controller.create);
  
/*   router.get("/findFiltersForm1", controller.findFiltersForm1);
 
  router.get("/findFiltersForm2", controller.findFiltersForm2);

  router.get("/findFiltersForm3", controller.findFiltersForm3); */

  app.use('/api/filters', router);

};




