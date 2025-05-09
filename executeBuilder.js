const fs = require('fs');
const path = require('path');
const buildData = require('./build.json');

function createFile(fullPath, content) {
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content);
  console.log(`✅ Criado: ${fullPath}`);
}

// Combina tudo em uma única lista de arquivos
let allFiles = [];

if (buildData.pages) {
  buildData.pages.forEach(page => {
    allFiles.push({
      path: `pages/${page.name}`,
      content: page.content
    });
  });
}

if (buildData.components) {
  buildData.components.forEach(component => {
    allFiles.push({
      path: `components/${component.name}`,
      content: component.content
    });
  });
}

if (buildData.styles) {
  buildData.styles.forEach(style => {
    allFiles.push({
      path: `styles/${style.name}`,
      content: style.content
    });
  });
}

// Agora cria tudo
allFiles.forEach(file => {
  createFile(file.path, file.content);
});

console.log('\n🎉 Build concluído com sucesso.');
