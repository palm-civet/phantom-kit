const {getYslow} = require('../lib/phantom');

module.exports.runUrl = async (url) => {
  return await getYslow(url);
  // let [errors, msgs] = await getYslow(url);
  // if (errors) {
  //   return errors[0].message;
  // } else {
  //   return msgs.join('\n');
  // }
}