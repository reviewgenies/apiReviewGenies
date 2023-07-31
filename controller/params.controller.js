const db = require("../models");
const Params = db.params;
const { QueryTypes } = require('sequelize');
const sequelize= require('sequelize');

const dbConfig = require("../config/db.config.js");
var sql = require("mssql");

exports.findAll = (req, res) => {
    Params.findAll({
    order: [
      ['params', 'ASC']
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


exports.findOne = (req,res)=>{

  Params.findOne({
    where: {
      iduser: req.params.id
    }
  })
    .then(resultado => {
      /* console.log(resultado) */
      if (!resultado) {
        return res.status(404).send({ message: "Hubo un error." });
      }
      res.status(200).send({resultado});

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};