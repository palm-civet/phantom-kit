const phantom = require('phantom');
const config = require('config');
const path = require('path');

// 模拟命令行执行phantom js
function phantomRun (commands) {
  return new Promise((resolve, reject) => {
    let msgs = [];
    let errors = [];
    phantom.create(commands, {
      logger: {
        info: (...msg) => {
          msgs.push(msg)
          resolve(msg)
        }, 
        error: error => {
          errors.push(error)
          reject(error)
        }
      }
    }).then(instance => {
      // if (errors.length > 0) reject(errors);
      // else resolve(msgs);
    })
  })
}

module.exports.phantomRun = phantomRun;

// 获取页面的yslow报告
module.exports.getYslow = async (url, options = {}) => {
  let ysPath = [path.resolve(__dirname, 'yslow.js')]//['./lib/yslow.js'];
  let defaultOptions = config.get('yslow.options');

  let mergedOptions = {...defaultOptions, ...options};

  // 合并yslow参数
  let commands = ysPath.concat(
    Object.keys(mergedOptions).map(
      key => `--${key} ${mergedOptions[key]}`
    )
  ).concat(url)

  try {
    let msgs = await phantomRun(commands);
    return [null, msgs];
  } catch (errs) {
    // TODO: 记录到日志中
    console.log(errs);
    return [errs];
  }
}