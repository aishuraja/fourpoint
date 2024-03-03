const db = require("../models");
const Semester  = db.semester;

exports.create = (req, res) => {

  // Validate request
  const user_id= req.userId;
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty!"
    });
    return;
  }

  const semester = {
    name: req.body.name,
    user_id: user_id,
    semgpi: req.body.semgpi,
    courses: req.body.courses
  }
  Semester.create(semester)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the semester."
      });
    });
};


exports.getAll = (req, res) => {
  const user_id= req.userId; 
  Semester.findAll({ where: { user_id: user_id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving semester."
      });
    });
};


exports.getSemesterById = (req, res) => {
  const id = req.params.id;

  Semester.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Semester with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Semester with id=" + id
      });
    });
};

exports.updateSemesterById = (req, res) => {
  const id = req.params.id;

  Semester.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Semester was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Semester with id=${id}. Maybe Semester was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Semester with id=" + id
      });
    });
};

exports.deleteSemesterById = (req, res) => {
  const id = req.params.id;

  Semester.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Semester was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Semester with id=${id}. Maybe Semester was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Semester with id=" + id
      });
    });
};

