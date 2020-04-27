const Router = require('koa-router');

const router = new Router();

router.get('/', (ctx, next) => {
  ctx.send('Hello World Koa!');
});

router.get('/error', (ctx, next) => {
  ctx.sendError(401, '请求失败');
});

module.exports = router;
