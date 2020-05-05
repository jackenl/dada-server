const error = (callback) => {
  return async (ctx, next) => {
    try {
      await next();
      if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
    } catch (err) {
      // ctx.status = typeof err.status === 'number' ? err.status : 500;

      // application
      ctx.app.emit('error', err, ctx);

      if (callback) {
        callback();
      } else {
        ctx.set('Content-Type', 'application/json');
        ctx.body = {
          code: err.status,
          succeed: false,
          data: null,
          msg: err.message || 'not found',
        };
      }
    }
  };
};

module.exports = error;
