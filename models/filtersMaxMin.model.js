module.exports = (sequelize, Sequelize) => {
  const Filters = sequelize.define("filtersMaxMin", {
      id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey:true,
      allowNull: false 
    },
    MaxRoom: {
      type: Sequelize.INTEGER,
      allowNull: false 
    },
    MinRoom: {
      type: Sequelize.INTEGER,
      allowNull: false 
    },
    Maxm2Plot: {
      type: Sequelize.INTEGER,
      allowNull: false 
    },
    Minm2Plot: {
      type: Sequelize.INTEGER,
      allowNull: false 
    },
    Maxm2Construction: {
      type: Sequelize.INTEGER,
      allowNull: false 
    },
    Minm2Construction: {
      type: Sequelize.INTEGER,
      allowNull: false 
    },
    MaxUSD: {
      type: Sequelize.INTEGER,
      allowNull: false 
    },
    MinUSD: {
      type: Sequelize.INTEGER,
      allowNull: false 
    }

  });
  
  return Filters;

};