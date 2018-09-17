const log4js = require('koa-log4');
const logger = log4js.getLogger('error');

module.exports = () => async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error('server error', err, ctx)
    ctx.error(err.message);
  }
}