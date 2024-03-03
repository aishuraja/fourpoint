module.exports = (sequelize, Sequelize) => {
  const Semester = sequelize.define("semesters", {
    name: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users', 
        key: 'id', 
     }
    },
    semgpi: {
      type: Sequelize.STRING
    },
    courses: {
      type: Sequelize.JSON
    }
  },{
    underscored: true,
  }
  );

  return Semester;
};

