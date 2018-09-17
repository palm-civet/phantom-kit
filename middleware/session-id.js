const uuidv1 = require('uuid/v1');

const SESSION_IDS = {};

module.exports.generateId = () => async (ctx, next) => {
  if (ctx.session) {
    if (!ctx.session.id || !SESSION_IDS[ctx.session.id]) {
      let newUuid = uuidv1();
      ctx.session.id = newUuid;
      SESSION_IDS[newUuid] = Date.now();
    }
  }
  await next();
}

module.exports.clear = expire => {
  let now = Date.now();
  for (let id in SESSION_IDS) {
    if (now - SESSION_IDS[id] > expire) {
      delete SESSION_IDS[id];
    }
  }
}

module.exports.isNew = id => {
  return !(id in SESSION_IDS);
}