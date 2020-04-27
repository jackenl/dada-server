const mysql = require('mysql2')

const account = {
  host: 'localhost',
  user: 'root',
  password: 'zj123456',
  database: 'dada_map',
}

// create the connection to database
const connection = mysql.createConnection(account)

module.exports = connection
