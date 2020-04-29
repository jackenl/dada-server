const Router = require('koa-router');

const router = new Router();

router.get('/', (ctx, next) => {
  ctx.send('Hello World Koa!');
});

router.get('/error', (ctx, next) => {
  ctx.throw(400, 'name required');
});

module.exports = router;
