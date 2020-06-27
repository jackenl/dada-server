const dbUtil = require('../utils/db-util');

const SportRecord = {
  async create(model) {
    const defaultModel = {
      id: dbUtil.raw('UUID()'),
    }
    model = Object.assign({}, defaultModel, model);
    if (model.path) {
      model.path = JSON.stringify(model.path);
    }
    const { rows } = await dbUtil.insertData('sport_record', model);
    return rows;
  },

  async getOneById(id) {
    let result = null;
    const { rows } = await dbUtil.getData('sport_record', 'id', id);
    if (Array.isArray(rows) && rows.length > 0) {
      result = rows[0];
      result.path = JSON.parse(result.path);
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
    const _sql1 = 'SELECT * FROM `sport_record` WHERE `userId` = ? ORDER BY `create_time` DESC LIMIT ?, ?';
    const { rows } = await dbUtil.query(_sql1, [options.userId, offset, limit]);
    let total = 0;
    const _sql2 = 'SELECT COUNT(*) AS total FROM `sport_record` WHERE `userId` = ?';
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

module.exports = SportRecord;
