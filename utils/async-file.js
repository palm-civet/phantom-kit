const fs = require('fs');

let asyncFile = module.exports = {};

module.exports.readDir = (path, options = {}) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, options, (err, files) => {
      if(err) reject(err);
      resolve(files);
    })
  })
}

module.exports.readFile = (path, options = {}) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      if(err) reject(err);
      resolve(data);
    })
  })
}

module.exports.fileStat = (path, options = {}) => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if(err) reject(err);
      resolve(stats);
    })
  })
}

// 遍历某个文件夹下的所有文件，并用统一的操作进行处理
module.exports.traversal = async function traversal (dir, ext, exclude, fileMaker, dirMaker) {
  
  let files = await asyncFile.readDir(dir);
  
  return new Promise.all(
    files.filter(file => !file.match(exclude)).map(async file => {
      let path = `${dir}/${file}`;
      let stat = await asyncFile.fileStat(path);

      if (stat.isDirectory()) {
        let children = await traversal(path, ext, exclude, fileMaker, dirMaker);
        return await dirMaker.call(null, path, file, children);
      }
      else if (file.match(ext)) {
        return await fileMaker.call(null, path, file);
      }
    })
  )
  
}