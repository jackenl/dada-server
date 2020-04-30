const dbUtil = require('../utils/db-util');

const TravelData = {
  async create(model) {
    const defaultModel = {
      id: dbUtil.raw('UUID()'),
    }
    model = Object.assign({}, defaultModel, model);
    const { rows } = await dbUtil.insertData('travel_data', model);
    return rows;
  },

  async getOneByUserId(userId) {
    let result = null;
    const { rows } = dbUtil.getData('travel_data', 'userId', userId);
    if (Array.isArray(rows) && rows.length > 0) {
      result = rows[0];
    }
    return result;
  },

  async updateByUserId(userId, values) {
    const _sql = 'UPDATE `travel_data` SET ? WHERE `userId` = ?';
    const { rows } = await dbUtil.query(_sql, [values, userId]);
    return rows;
  },
}

module.exports = TravelData;
