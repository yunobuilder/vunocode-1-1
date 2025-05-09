const fs = require('fs');
const folders = ['pages', 'components', 'styles'];

folders.forEach(folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
    console.log(`Pasta criada: ${folder}`);
  } else {
    console.log(`Pasta já existe: ${folder}`);
  }
});
