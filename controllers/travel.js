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
      date: formData.date,
      time: formData.time,
      path: formData.path,
      start: formData.start,
      end: formData.end,
    }
    const result = await recordModel.create(values1);

    const record = await dataModel.getOneByUserId(userId);
    if (!record) {
      await dataModel.create();
      record = await dataModel.getOneByUserId(userId);
    }

    const { type, distance, city } = formData;
    const values2 = {};
    values2[type] = record[type] + distance;
    let cities;
    if (!record.cities) {
      cities = [];
    } else {
      cities = JSON.parse(record.cities);
      if (cities.indexOf(city) === -1) {
        cities.push(city);
      }
    }
    values2.cities = JSON.stringify(cities);
    await dataModel.updateByUserId(userId, values2);
    ctx.send();
  },

  async getTravelData(ctx) {
    const userId = ctx.state.user.id;
    const result = await dataModel.getOneByUserId(userId);
    ctx.send(result);
  }
}
