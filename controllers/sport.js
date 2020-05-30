const recordModel = require('../models/sportRecord');
const dataModel = require('../models/sportData');

module.exports = {
  async getSportRecordsByPage(ctx) {
    const userId = ctx.state.user.id;
    const formData = ctx.query;
    const opts = {
      userId: userId,
    };
    if (formData.pageSize) opts.pageSize = Number(formData.pageSize);
    if (formData.page) opts.page = Number(formData.page);
    const result = await recordModel.getRecordsByPage(opts);
    ctx.send(result);
  },

  async getSportRecordById(ctx) {
    const id = ctx.query.id;
    if (!id) return ctx.throw(400, 'missing required params');

    const result = await recordModel.getOneById(id);
    ctx.send(result);
  },

  async insertSportRecord(ctx) {
    const userId = ctx.state.user.id;
    const formData = ctx.request.body;
    const values1 = {
      userId: userId,
      type: formData.type,
      path: formData.path,
      distance: formData.distance,
      time: formData.time,
      speed: formData.speed,
      calories: formData.calories,
    }
    const result = await recordModel.create(values1);

    let record = await dataModel.getOneByUserId(userId);
    if (!record) {
      await dataModel.create({ userId });
      record = await dataModel.getOneByUserId(userId);
    }

    const { type, distance } = formData;
    const values2 = {};
    values2[type] = record[type] + distance;
    record.all += distance;
    values2.all = record.all;
    await dataModel.updateByUserId(userId, values2);
    ctx.send();
  },

  async getSportData(ctx) {
    const userId = ctx.state.user.id;
    let result = await dataModel.getOneByUserId(userId);
    if (!result) {
      await dataModel.create({ userId });
      result = await dataModel.getOneByUserId(userId);
    }
    ctx.send(result);
  }
}
