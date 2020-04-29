const cors = (options) => {
  const defaults = {
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  options = Object.assign({}, defaults, options);

  return async (ctx, next) => {
    const requestOrigin = ctx.get('Origin');
    ctx.vary('Origin');

    if (!requestOrigin) return await next();

    const origin = options.origin || requestOrigin;

    ctx.set('Access-Control-Allow-Origin', origin);
    ctx.set('Access-Control-Allow-Methods', options.allowMethods.join(','));
    ctx.set('Access-Control-Allow-Headers', options.allowHeaders.join(','));
    ctx.set('Access-Control-Allow-Credentials', options.allowCredentials);
    next();
  };
};

module.exports = cors;
