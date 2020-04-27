const sendHandle = () => {
  // success handle method
  const render = (ctx) => {
    return (data, msg) => {
      ctx.set('Content-Type', 'application/json');
      ctx.body = {
        code: 200,
        succeed: true,
        data: data,
        msg: msg || '',
      };
    };
  };

  // fail handle method
  const renderError = (ctx) => {
    return (code, msg) => {
      ctx.set('Content-Type', 'application/json');
      ctx.body = {
        code: code,
        succeed: false,
        data: null,
        msg: msg || '请求失败',
      };
    };
  };

  return async (ctx, next) => {
    ctx.send = render(ctx);
    ctx.sendError = renderError(ctx);
    await next();
  };
};

module.exports = sendHandle;
