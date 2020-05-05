const dbUtil = require('../utils/db-util');

const TravelData = {
  async create(model) {
    const defaultModel = {
      id: dbUtil.raw('UUID()'),
    }
    model = Object.assign({}, defaultModel, model);
    if (model.cities) {
      model.cities = model.cities.toString();
    }
    const { rows } = await dbUtil.insertData('travel_data', model);
    return rows;
  },

  async getOneByUserId(userId) {
    let result = null;
    const { rows } = await dbUtil.getData('travel_data', 'userId', userId);
    if (Array.isArray(rows) && rows.length > 0) {
      result = rows[0];
      if (result.cities) {
        result.cities = result.cities.split(',');
      } else {
        result.cities = []
      }
    }
    return result;
  },

  async updateByUserId(userId, values) {
    const _sql = 'UPDATE `travel_data` SET ? WHERE `userId` = ?';
    if (values.cities) {
      values.cities = values.cities.toString();
    }
    const { rows } = await dbUtil.query(_sql, [values, userId]);
    return rows;
  },
}

module.exports = TravelData;
