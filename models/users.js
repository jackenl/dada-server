const dbUtil = require('../utils/db-util');

const Users = {
  /**
   * 创建用户
   * @param {object} model
   */
  async create(model) {
    const defaultModel = {
      id: dbUtil.raw('UUID()'),
    }
    model = Object.assign({}, defaultModel, model);
    const { rows } = await dbUtil.insertData('users', model);
    return rows;
  },

  /**
   * 通过username查询用户
   * @param {string} username
   */
  async getOneByUsername(username) {
    let result = null;
    const { rows } = await dbUtil.getData('users', 'username', username);
    if (Array.isArray(rows) && rows.length > 0) {
      result = rows[0];
    }
    return result;
  },

  /**
   * 通过username和password查询用户
   * @param {object} options
   */
  async getOneByUsernameAndPassword(options) {
    let result = null;
    const _sql = 'SELECT * FROM `users` WHERE `username` = ? AND `password` = ?';
    const { rows } = await dbUtil.query(_sql, [options.username, options.password]);
    if (Array.isArray(rows) && rows.length > 0) {
      result = rows[0];
    }
    return result;
  },

  /**
   * 更新用户密码
   * @param {object} options
   * @param {string} password
   */
  async updatePassword(options, password) {
    const _sql = 'UPDATE `users` SET `password` = ? WHERE `username` = ? AND `password` = ?';
    const { rows } = await dbUtil.query(_sql, [options.username, options.password], password);
    return rows;
  },

  /**
   * 通过id删除记录
   * @param {string} id
   */
  async deleteById(id) {
    const { rows } = await dbUtil.deleteData('users', 'id', id);
    return rows;
  }
};

module.exports = Users;
