const config = require('../config').database;
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: config.HOST,
  port: config.PORT,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DATABASE,
});

const query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        resolve(err);
      } else {
        connection.query(sql, values, (err, rows, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve({ rows, fields });
          }
          // release connection
          pool.releaseConnection(connection);
        });
      }
    });
  });
};

const execute = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        resolve(err);
      } else {
        connection.execute(sql, values, (err, rows, fields) => {
          if (err) {
            reject(err);
          } else {
            resolve({ rows, fields });
          }
          // release connection
          pool.releaseConnection(connection);
        });
      }
    });
  });
};

const createTable = function (sql) {
  return query(sql, []);
};

const getData = function (table, column, value) {
  const _sql = 'SELECT * FROM ?? WHERE ?? = ?';
  return query(_sql, [table, column, value]);
};

const insertData = function (table, values) {
  const _sql = 'INSERT INTO ?? SET ?';
  return query(_sql, [table, values]);
};

const updateData = function (table, values, column, value) {
  const _sql = 'UPDATE ?? SET ? WHERE ?? = ?';
  return query(_sql, [table, values, column, value]);
};

const deleteData = function (table, column, value) {
  const _sql = 'DELETE FROM ?? WHERE ?? = ?';
  return query(_sql, [table, column, value]);
};

const raw = function (sql) {
  return mysql.raw(sql);
};

const escape = function (value) {
  return mysql.escape(value);
};

const escapeId = function (value) {
  return mysql.escapeId(value);
};

module.exports = {
  pool,
  query,
  execute,
  createTable,
  getData,
  insertData,
  updateData,
  deleteData,
  raw,
  escape,
  escapeId,
};
