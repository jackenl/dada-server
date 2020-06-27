const dbUtil = require('../utils/db-util');

const TravelRecord = {
  async create(model) {
    const defaultModel = {
      id: dbUtil.raw('UUID()'),
    }
    model = Object.assign({}, defaultModel, model);
    if (model.start) {
      model.start = model.start.toString()
    }
    if (model.end) {
      model.end = model.end.toString()
    }
    const { rows } = await dbUtil.insertData('travel_record', model);
    return rows;
  },

  async getOneById(id) {
    let result = null;
    const { rows } = await dbUtil.getData('travel_record', 'id', id);
    if (Array.isArray(rows) && rows.length > 0) {
      result = rows[0];
      result.start = result.start.split(',');
      result.end = result.end.split(',');
    }
    return result;
  },

  async getRecordsByPage(options) {
    const defaultOpts = {
      pageSize: 10,
      page: 1,
    };
    options = Object.assign({}, defaultOpts, options);
    const limit = options.pageSize;
    const offset = (options.page - 1) * options.pageSize;
    const _sql1 = 'SELECT * FROM `travel_record` WHERE `userId` = ? ORDER BY `create_time` DESC LIMIT ?, ?';
    const { rows } = await dbUtil.query(_sql1, [options.userId, offset, limit]);
    let total = 0;
    const _sql2 = 'SELECT COUNT(*) AS total FROM `travel_record` WHERE `userId` = ?';
    const result = await dbUtil.query(_sql2, [options.userId]);
    total = result.rows[0].total;
    return {
      pageSize: options.pageSize,
      page: options.page,
      rows,
      total,
    }
  },
}

module.exports = TravelRecord;
