const { authJwt } = require("../middleware");
// const controller = require("../controllers/user.controller");
const semController = require("../controllers/semester.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  // create a semester record
  app.post(
    "/api/semester/create",
    [authJwt.verifyToken],
    semController.create
  );

  // get all semester details
  app.get(
    "/api/semester/all",
    [authJwt.verifyToken],
    semController.getAll
  );

  // get a semester by id
  app.get(
    "/api/semester/:id",
    [authJwt.verifyToken],
    semController.getSemesterById
  );

  // update a semester by id
  app.put(
    "/api/semester/update/:id",
    [authJwt.verifyToken],
    semController.updateSemesterById
  );

  // delete a semester by id
  app.delete(
    "/api/semester/delete/:id",
    [authJwt.verifyToken],
    semController.deleteSemesterById
  );

};