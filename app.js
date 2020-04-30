const Koa = require('koa');
const app = new Koa();
const config = require('./config');

// middleware import
const logger = require('koa-logger'),
  json = require('koa-json'),
  views = require('koa-views');
const KoaJwt = require('koa-jwt');
const sendHandle = require('./middlewares/sendHandle');
const error = require('./middlewares/errorHandle');
const cors = require('./middlewares/cors');

const index = require('./routes/index');
const users = require('./routes/users');
const travel = require('./routes/travel');
const sport = require('./routes/sport');
const nearby = require('./routes/nearby');

// error handler
app.use(error());

// global middlewares
app.use(
  views('views', {
    root: __dirname + '/views',
    default: 'jade',
  })
);
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

// jwt verify
const whitelist = [/^\/public/, /\/login/, /\/register/, /\/nearby/];
app.use(
  KoaJwt({
    secret: config.jwt.secret,
    cookie: 'token',
  }).unless({ path: whitelist })
);

app.use(sendHandle()); // send handler
app.use(cors()); // cors handler

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(travel.routes(), travel.allowedMethods());
app.use(sport.routes(), sport.allowedMethods());
app.use(nearby.routes(), nearby.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
