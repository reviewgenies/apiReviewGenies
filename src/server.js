// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
// ----------------------------------------------------------------------------

let path = require('path');
let embedToken = require(__dirname + '/embedConfigService.js');
const utils = require(__dirname + "/utils.js");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const db = require("../models");
const cors = require('cors');
const controller = require('../controller/auth.controller');
const app = express();
app.use(cors());

const secureRoute = require('../routes/secure-routes');

const passport = require('passport')
const session = require('express-session')


global.login = false;
global.role = 0;

app.use(
    cors({origin: ['https://mango-mud-004870e0f.3.azurestaticapps.net/', 'http://127.0.0.1:5500']})
  );

app.use(cookieParser());

app.set('view-engine', 'ejs')

app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ alter: true });

app.use(session({
    secret: process.env.SESSION_SECRET || 'Test',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())




require('../routes/auth.routes')(app);

require('../routes/ocupation.routes')(app);

require('../routes/filters.routes')(app);

require('../routes/params.routes')(app);



app.get('/getEmbedToken', checkAuthenticated, async function (req, res) {

    // Validate whether all the required configurations are provided in config.json
    configCheckResult = utils.validateConfig();
    if (configCheckResult) {
        return res.status(400).send({
            "error": configCheckResult
        });
    }
    // Get the details like Embed URL, Access token and Expiry
    let result = await embedToken.getEmbedInfo();

    // result.status specified the statusCode that will be sent along with the result object
    res.status(result.status).send(result);
});


app.get('/logout', checkAuthenticated,function (req, res) {
        res.clearCookie('Role');
        this.login = false;
        req.session = null;
        return res.redirect('/login')

});


function checkAuthenticated(req, res, next) {
    //console.log(req.cookies.tk)
    if (req.cookies.tk) {
        return next()
    }
    res.redirect('/')
}

function checkNotAuthenticated(req, res, next) {
    //console.log(req.cookies.tk)
    if (req.cookies.tk) {
        return res.redirect('/dashboard')
    }
    next()
}

const port = process.env.PORT || 5300;

app.listen(port, () => console.log(`Listening on port ${port}`));




