const db = require("../models");
const Filter = db.filters;
const { QueryTypes } = require('sequelize');
const sequelize= require('sequelize');

const dbConfig = require("../config/db.config.js");
var sql = require("mssql");

// Create and Save a new Filters
exports.create = (req, res) => {
    // Validate request
    if (!req.body.iduser) {
      res.status(400).send({
        message: "Debe ser un usuario valido!"
      });
      return;
    }

    // Create a Filters
    const Filters = {
        iduser: req.body.iduser,
        idform:req.body.idform,
        date: Date.now(),
        agreementTypes: req.body.agreementTypes,
        address: req.body.address,
        conditionRypes: req.body.conditionRypes,
        propertyTypes: req.body.propertyTypes,
        valueUSD: req.body.valueUSD,
        m2Construction: req.body.m2Construction,
        m2Plot: req.body.m2Plot,
        room: req.body.room,
    };

    // Save User in the database
    Filter.create(Filters)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Filters."
        });
      });
};

exports.findFiltersForm1= async (req,res)=>{

  const AgreementTypes = await db.sequelize.query('SELECT distinct Type FROM Dati.dbo.AgreementTypes Order by Type', {
    type: QueryTypes.SELECT
  });

  const ConditionTypes = await db.sequelize.query('SELECT Condicion FROM Dati.dbo.ConditionTypes Order by Condicion', {
    type: QueryTypes.SELECT
  });

  const Georesults = await db.sequelize.query('SELECT distinct correct_address FROM Dati.dbo.geo_results Order by correct_address', {
    type: QueryTypes.SELECT
  });


  return res.send(JSON.stringify({AgreementTypes,ConditionTypes,Georesults}));

}

exports.findFiltersForm2= async (req,res)=>{

  const AgreementTypes = await db.sequelize.query('SELECT distinct Type FROM Dati.dbo.AgreementTypes Order by Type', {
    type: QueryTypes.SELECT
  });

  const ConditionTypes = await db.sequelize.query('SELECT Condicion FROM Dati.dbo.ConditionTypes Order by Condicion', {
    type: QueryTypes.SELECT
  });

  const Georesults = await db.sequelize.query('SELECT distinct correct_address FROM Dati.dbo.geo_results Order by correct_address', {
    type: QueryTypes.SELECT
  });

  const PropertyTypes = await db.sequelize.query('SELECT distinct Type FROM Dati.dbo.PropertyTypes Order by Type', {
    type: QueryTypes.SELECT
  });
  
  return res.send(JSON.stringify({AgreementTypes,ConditionTypes,Georesults,PropertyTypes}));

}

exports.findFiltersForm3= async (req,res)=>{

  const AgreementTypes = await db.sequelize.query('SELECT distinct Type FROM Dati.dbo.AgreementTypes Order by Type', {
    type: QueryTypes.SELECT
  });

  const ConditionTypes = await db.sequelize.query('SELECT  Condicion FROM Dati.dbo.ConditionTypes Order by Condicion', {
    type: QueryTypes.SELECT
  });

  const Georesults = await db.sequelize.query('SELECT distinct correct_address FROM Dati.dbo.geo_results Order by correct_address', {
    type: QueryTypes.SELECT
  });

  const PropertyTypes = await db.sequelize.query('SELECT distinct Type FROM Dati.dbo.PropertyTypes Order by Type', {
    type: QueryTypes.SELECT
  });

  const ValorUSD = await db.sequelize.query('SELECT [MaxUSD] as Max,[MinUSD] as Min FROM Dati.dbo.filtersMaxMins', {
    type: QueryTypes.SELECT
  }); 

  const Habitaciones = await db.sequelize.query('SELECT [MaxRoom] as Max,[MinRoom] as Min FROM Dati.dbo.filtersMaxMins', {
    type: QueryTypes.SELECT
  });

  const M2Construidos = await db.sequelize.query('SELECT [Maxm2Construction] as Max,[Minm2Construction] as Min FROM Dati.dbo.filtersMaxMins', {
    type: QueryTypes.SELECT
  });

  const M2Solar = await db.sequelize.query('SELECT [Maxm2Plot] as Max,[Minm2Plot] as Min FROM Dati.dbo.filtersMaxMins', {
    type: QueryTypes.SELECT
  });

  return res.send(JSON.stringify({AgreementTypes,ConditionTypes,Georesults,PropertyTypes,ValorUSD,Habitaciones,M2Solar,M2Construidos}));

}
