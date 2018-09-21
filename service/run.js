const {getYslow, getReadyTime} = require('../lib/phantom');


module.exports.runUrl = async (url) => {
  let [yerror, yslow] = await getYslow(url);
  let [rerror, readyTime] = await getReadyTime(url);

  return [
    yerror || rerror,
    {
      yslow,
      readyTime
    }
  ]
}