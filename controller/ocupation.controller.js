const db = require("../models");
const Ocupation = db.ocupation;
const { QueryTypes } = require('sequelize');
const sequelize= require('sequelize');

const dbConfig = require("../config/db.config.js");
var sql = require("mssql");

exports.findAll = (req, res) => {
  Ocupation.findAll({
    order: [
      ['name', 'ASC']
    ]
  
  }).then(resultado => {

      if (!resultado) {
        return res.status(404).send({ message: "Hubo un error." });
      }
      res.status(200).send({resultado});
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
