'use strict';
const fs = require('fs');
const upath = require('upath');
const sh = require('shelljs');
var pjson = require('./package.json');
const prependFile = require('prepend-file');

function cpDist() {
  const sourcePath = upath.resolve(upath.dirname(__filename), './docs/');
  const destPath = upath.resolve(upath.dirname(__filename), './docs/' + pjson.version + '/');

  //console.log(sourcePath);

  const files = sh.find(sourcePath).filter(function (file) {
    if (
      file.match(/\.nojekyll$/) ||
      file.match(/\.js$/) ||
      file.match(/\.js.map$/) ||
      file.match(/\.css$/) ||
      file.match(/\.css.map$/)
    ) {

      if (
        file.match(/\.js$/) ||
        file.match(/\.css$/)) {
        const content =
  `/**
    @ name ${pjson.name}
    @ version ${pjson.version}
    @ author ${pjson.author}
    @ reposiotry ${pjson.repository.url}
    @ license ${pjson.license}
    @ home ${pjson.homepage}
  **/
  `;
        prependFile(file, content);
      }

      return true;
    }
  });

  setTimeout(function () {
    if (!fs.existsSync(destPath)) {
      sh.mkdir('-p', destPath);
    }
    files.forEach(file => {
      sh.cp('-Rf', file, destPath);
    });
  }, 3000);

  const from_nojekyll = upath.resolve(upath.dirname(__filename), './src/.nojekyll');
  const to_nojekyll = upath.resolve(upath.dirname(__filename), './docs/.nojekyll');
  sh.cp('-Rf', from_nojekyll, to_nojekyll)
}

cpDist();
