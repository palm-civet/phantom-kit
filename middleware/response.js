const fs = require('fs');
const path = require('path');
const axios = require('axios');
const config = require('config');

const renderFromDevServe = ctx => async file => {
  let url = `${config.get('devServe.host')}${config.get('devServe.view')}/${file}.html`;
  console.log(url)
  let res = await axios.get(url);
  ctx.response.type = 'html';
  ctx.response.body = res.data;
}

const error = ctx => msg => {
  ctx.response.type = 'json';
  ctx.response.body = {code: 1, msg};
}

const success = ctx => data => {
  ctx.response.type = 'json';
  ctx.response.body = {code: 0, data, msg: 'success'};
}

const render = ctx => file => {
  let filePath = path.resolve(__dirname, `../views/${file}.html`);
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream(filePath);
}

module.exports = (isProd) => async (ctx, next) => {
  ctx.error = error(ctx);
  ctx.success = success(ctx);
  ctx.render = isProd ? render(ctx) : renderFromDevServe(ctx);
  await next();
}