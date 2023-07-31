const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const functions = require('../function/generatorpassword');
const nodemailer = require("nodemailer");
const dbMail = require("../config/mail.config");
const { use } = require("passport");
var request = require('request');

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    identification: req.body.identification,
    name: req.body.name,
    lastname: req.body.lastname,
    idocupation: req.body.idocupation,
    other: req.body.other,
    email: req.body.email,
    status: 0,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(user => {
    res.send({ message: "El usuario se registró con éxito!" });
    
    var options = {
      'method': 'POST',
      //'url': 'https://prod-98.westus.logic.azure.com:443/workflows/e87ada1f60194c7a8f0475a5d4696e93/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=KHT8jyF69snhGH-3MAcXIsGkZshR8Pg2UigJQTYVcSg',
      'url': 'https://prod-50.westus.logic.azure.com:443/workflows/01c419bc671343e5b0947e149c9a64c4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=D6UIIOWrCWqeYF1twy0hTt5t6lXI6YVW_BC483ZH2AI',
      'headers': {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": user.id,
        "name": user.name,
        "email": user.email
      })

    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body);
    });
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(200).send({ message: "Usuario o contraseña invalido." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(200).send({
          accessToken: null,
          message: "Usuario o contraseña invalido."
        });
      }

      if (user.status == false) {
        return res.status(200).send({ message: "Usuario inactivo" });
      }
      
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      user.token = token;
      User.update(user.dataValues, { where: { id: user.id } }).then(resp => {
        res.status(200).send({ resp });
      }).catch(err => { err })

      res.status(200).send({
        id: user.id,
        username: user.identification,
        email: user.email,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = (req, res) => {

  return User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.dataValues.token = null;

      User.update(user.dataValues, { where: { id: req.body.id } }).then(resp => {
        res.status(200).send({ resp });
      }).catch(err => { err })


    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.recoverPassword = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async user => {
      if (!user) {
        return res.status(404).send({ message: "No existen estas credenciales." });
      }
      var passwordnew = functions.generatePassword();

      let transporter = nodemailer.createTransport({
        host: dbMail.host,
        port: dbMail.port,
        secure: dbMail.secure, // true for 465, false for other ports
        auth: {
          user: dbMail.mail, // generated ethereal user
          pass: dbMail.pass, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Dati" <foo@example.com>', // sender address
        to: user.dataValues.email, // list of receivers
        subject: "Solicitud de Reestablecimiento de Contraseña", // Subject line
        //text: "Hola "+user.nombre +" "+user.apellido+", respondiendo a tu solicitud, hemos creado una de contraseña provisional para el uso de los sistema. Tu contraseña es: "+passwordnew, // plain text body
        html: "Hola <b>" + user.name + " " + user.lastname + "</b>, respondiendo a tu solicitud hemos creado una contraseña provisional para el uso del sistema. Tu contraseña es: <b>" + passwordnew + "</b>" // html body
      });

      user.dataValues.password = bcrypt.hashSync(passwordnew, 8)

      User.update(user.dataValues, {
        where: { id: user.dataValues.id }
      })

      res.status(200).send({ message: "Se ha enviado la contraseña a su correo." });

      //console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.changepassword = (req, res) => {

  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(async user => {
      if (!user) {
        return res.status(404).send({ message: "No existen estas credenciales." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.oldpassword,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "No coinciden los valores."
        });
      }

      user.dataValues.password = bcrypt.hashSync(req.body.newpassword, 8)

      User.update(user.dataValues, {
        where: { id: user.dataValues.id }
      })

      res.status(200).send({ message: "Su contraseña ha sido actualizada con exito." });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.approved = (req, res) => {

  User.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(async user => {
      if (!user) {
        return res.status(404).send({ message: "No existen estas credenciales." });
      }

      user.dataValues.status = req.body.approved

      User.update(user.dataValues, {
        where: { id: user.dataValues.id }
      })

      res.status(200).send({ message: true });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

/* const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var UserDto;


module.exports = {

  async areValidCredentials(username, password) {
    try {
      
      User.findOne({
        where: {
          identification: username
        }
      })
      .then(user => {
        UserDto=user;
        if (!user) {
          message= "Identification or Password Invalid.";
          return message;
        }
      
        var passwordIsValid = bcrypt.compareSync(
          password,
          user.password
        );
    
        if (!passwordIsValid) {
          message= "Identification or Password Invalid." ;
          return false;
        }
        
        return true;
      })
      .catch(err => {
        message=err.message;
      }); 
      
    } catch (err) {
      throw false;
    }

   
  }
};  */


