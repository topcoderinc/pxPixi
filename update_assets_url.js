const fs = require("fs");
const path = require("path");
const distPath = './dist';

if (process.argv.length < 3) {
  console.log('usage : node update_assets_url.js http://127.0.0.1:8000')
  return;
}

function updateAssetsUrl(dir) {
  files = fs.readdirSync(dir);

  files.forEach(function (file, index) {
    const curPath = path.join(dir, file);
    fs.stat(curPath, function (err, stats) {
      if (err) return;
      if (stats.isDirectory()) {
        updateAssetsUrl(curPath);
      } else {
        if (path.extname(curPath) === '.js') {
          let content = fs.readFileSync(curPath, 'utf-8');
          fs.writeFileSync(curPath, content.replace(/const ASSET_URL = (.*);/, 'const ASSET_URL = \'' + process.argv[2] + '\';'))
          console.log('update success - ' + curPath);
        }
      }
    });
  });
}

updateAssetsUrl(distPath);