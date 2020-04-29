const sendHandle = () => {
  // success handle method
  const render = (ctx) => {
    return (data, msg) => {
      ctx.set('Content-Type', 'application/json');
      ctx.body = {
        code: 200,
        succeed: true,
        data: data || null,
        msg: msg || '',
      };
    };
  };

  return async (ctx, next) => {
    ctx.send = render(ctx);
    await next();
  };
};

module.exports = sendHandle;
