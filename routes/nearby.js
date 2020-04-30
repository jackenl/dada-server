const Router = require('koa-router');

// controllers
const nearby = require('../controllers/nearby');

const router = new Router({
  prefix: '/nearby',
});

router.get('/recommend', nearby.recommend);

module.exports = router;
