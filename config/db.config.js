/*module.exports = {
  HOST: "66.98.81.85",
  PORT: "1433",
  USER: "sa",
  PASSWORD: "Rai@2022",
  DB: "Dati",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
};*/

/*  module.exports = {
  HOST: "localhost",
  PORT: "1433",
  USER: "userDATI",
  PASSWORD: "daTi2@23?-",
  DB: "Dati",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
};  */


module.exports = {
  HOST: "reviewgenies.database.windows.net",
  PORT: "1433",
  USER: "fullpower",
  PASSWORD: "Rai@2022",
  DB: "reviewgenie_app",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}; 