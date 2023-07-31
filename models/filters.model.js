module.exports = (sequelize, Sequelize) => {
  const Filters = sequelize.define("filters", {
      id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey:true,
      allowNull: false 
    },
    iduser: {
      type: Sequelize.INTEGER,
      allowNull: false 
    },
    idform: {
      type: Sequelize.STRING,
      allowNull: false 
    },
    date:{
      type: Sequelize.DATE, 
      allowNull: false 
    },
    agreementTypes:{
      type: Sequelize.STRING(128),
      allowNull: true
    },
    address:{
      type: Sequelize.STRING,
      allowNull: true
    },
    conditionRypes:{
      type: Sequelize.STRING(128),
      allowNull: true
    },
    propertyTypes:{
      type: Sequelize.STRING,
      allowNull: true
    },
    valueUSD:{
      type: Sequelize.STRING(50),
      allowNull: true
    },
    m2Construction:{
      type: Sequelize.STRING(50),
      allowNull: true
    },
    m2Plot:{
      type: Sequelize.STRING(50),
      allowNull: true
    },
    room:{
      type: Sequelize.STRING(50),
      allowNull: true
    },

  });
  
  return Filters;

};