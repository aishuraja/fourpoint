module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    full_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  },{
    underscored: true,
  }
  );

  return User;
};