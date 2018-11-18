import './usage/usage';
import fs from 'fs';
import path from 'path';

fs.readdirSync('./tasks/')
  .map(file => path.basename(file, path.extname(file)))
  .map(name => ({ name, data: require(`./tasks/${name}`) }))
  //.filter(task => task.data.isPublic)
  .forEach(task => exports[task.name] = task.data.func);

exports.foo = cb => {

  console.log("foo");
  console.dir(exports);

  cb();
};
