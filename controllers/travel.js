const recordModel = require('../models/travelRecord');
const dataModel = require('../models/travelData');

module.exports = {
  async getTravelRecordsByPage(ctx) {
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

  async getTravelReCordById(ctx) {
    const id = ctx.query.id;
    if (!id) return ctx.throw(400, 'missing required params');

    const result = await recordModel.getOneById(id);
    ctx.send(result);
  },

  async insertTravelRecord(ctx) {
    const userId = ctx.state.user.id;
    const formData = ctx.request.body;
    const values1 = {
      userId: userId,
      type: formData.type,
      distance: formData.distance,
      time: formData.time,
      start: formData.start,
      end: formData.end,
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

  async getTravelData(ctx) {
    const userId = ctx.state.user.id;
    let result = await dataModel.getOneByUserId(userId);
    if (!result) {
      await dataModel.create({
        userId: userId,
      });
      result = await dataModel.getOneByUserId(userId);
    }
    ctx.send(result);
  },

  async insertTravelCity(ctx) {
    const userId = ctx.state.user.id;
    const formData = ctx.request.body;
    let record = await dataModel.getOneByUserId(userId);
    if (!record) {
      await dataModel.create({
        userId: userId,
      });
      record = await dataModel.getOneByUserId(userId);
    }
    if (record.cities.indexOf(formData.city) === -1) {
      record.cities.push(formData.city);
    }
    await dataModel.updateByUserId(userId, { cities: record.cities })
    ctx.send();
  }
}
