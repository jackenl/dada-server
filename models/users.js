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
    const _sql = 'SELECT * FROM `users` WHERE `username` = ?';
    const { rows } = await dbUtil.query(_sql, [username]);
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
   * 通过username更新信记录
   * @param {string} username
   * @param {object} options
   */
  async updateByUsername(username, options) {
    const { rows } = await dbUtil.updateData('users', options, 'username', username);
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
