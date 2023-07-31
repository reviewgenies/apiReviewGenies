module.exports = (sequelize, Sequelize) => {
  
  const Ocupation = sequelize.define("ocupation", {
      id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey:true,
      allowNull: false 
    },
    name:{
      type: Sequelize.STRING(128),
      allowNull: false
    },
    especification:{
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });
  
  return Ocupation;

};