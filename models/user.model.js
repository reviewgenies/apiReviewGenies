module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    identification: {
      type: Sequelize.STRING(11),
      allowNull: true
    },
    name: {
      type: Sequelize.STRING(128),
      allowNull: true
    },
    lastname: {
      type: Sequelize.STRING(128),
      allowNull: true
    },
    idocupation: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    other: {
      type: Sequelize.STRING(256),
      allowNull: true
    },
    email: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true
    },
    token: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return User;

};