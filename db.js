const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres", 
    password: "2156",
    host: "localhost",
    port: 5432,
    database: "GreenBookvaDB"
});

module.exports = pool