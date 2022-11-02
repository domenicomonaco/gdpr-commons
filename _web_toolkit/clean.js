'use strict';
const upath = require('upath');
const sh = require('shelljs');

function clean() {
  const docs = upath.resolve(upath.dirname(__filename), './docs/');
  const dist = upath.resolve(upath.dirname(__filename), './dist/');

  sh.rm('-rf',docs);
  sh.rm('-rf',dist);

}
clean();