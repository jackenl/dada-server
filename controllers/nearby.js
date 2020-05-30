const recommend = require('../db/recommend.json');

module.exports = {
  async recommend(ctx) {
    const list = recommend.slice(0, 10);
    ctx.send({
      count: 10,
      poi_list: list,
    });
  },
};
