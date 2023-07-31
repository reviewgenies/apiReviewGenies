module.exports = (sequelize, Sequelize) => {
  
    const Params = sequelize.define("params", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull: false 
      },
      params:{
        type: Sequelize.TEXT,
        allowNull: false 
      },
      iduser:{
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // 'fathers' refers to table name
          key: 'id', // 'id' refers to column name in fathers table
       },
        allowNull: false 
      }
    });
    
    return Params;
  
  };