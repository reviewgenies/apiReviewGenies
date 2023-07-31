const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require("../controller/auth.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup",[verifySignUp.checkDuplicateUsernameOrEmail],controller.signup);

  app.post("/api/auth/signout",[authJwt.verifyToken], controller.signout);

  app.post("/api/auth/changepassword",[authJwt.verifyToken], controller.changepassword);

  app.post("/api/auth/signin", controller.signin);
  
  app.post("/api/auth/recoverpassword", controller.recoverPassword);

  app.post("/api/auth/approved", controller.approved);
};