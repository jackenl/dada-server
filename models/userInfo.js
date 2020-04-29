const dbUtil = require('../utils/db-util');

const UserInfo = {
  async create(model) {
    const defaultModel = {
      id: dbUtil.raw('UUID()'),
    }
    model = Object.assign({}, defaultModel, model);
    const { rows } = await dbUtil.insertData('user_info', model);
    return rows;
  },

  async getOneByUserId(userId) {
    let result = null;
    const _sql = 'SELECT * FROM `user_info` WHERE `userId` = ?';
    const { rows } = await dbUtil.query(_sql, [userId]);
    if (Array.isArray(rows) && rows.length > 0) {
      result = rows[0];
    }
    return result;
  },

  async updateInfoByUserId(userId, values) {
    const { rows } = await dbUtil.updateData('user_info', values, 'userId', userId);
    return rows;
  },

  async deleteByUserId(userId) {
    const { rows } = await dbUtil.deleteData('user_info', 'userId', userId);
    return rows;
  }
}

module.exports = UserInfo
