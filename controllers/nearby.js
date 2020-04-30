const recommend = require('../db/recommend.json');

module.exports = {
  async recommend(ctx) {
    const list = recommend.slice(0, 15);
    ctx.send({
      count: 15,
      poi_list: list,
    });
  },
};
