//hotreloader.js
'use strict';
const debug = require('debug')('hotreloader');
const chokidar=require('chokidar');
const path=require('path');
const watch = new chokidar.FSWatcher({ ignored: /[\/\\]\./, persistent: true,awaitWriteFinish:{stabilityThreshold:2000,pollInterval:100} });

function reload(required) {
var modulePath = path.resolve(required);
watch.add(modulePath);
load(modulePath);
return methods[modulePath];
}
function swap(modulePath) {
  var moduleCache = require.cache[modulePath];
  var exportKeys = Object.keys(moduleCache.exports);

  for (var i = 0; i < exportKeys.length; i++) {
    var exportKey = exportKeys[i];
    moduleCache.exports[exportKey] = null
    delete moduleCache.exports[exportKey];
  }

  var tmpModulePath = modulePath + '.tmp';
  require.cache[tmpModulePath] = require.cache[modulePath];
  delete require.cache[modulePath];

  load(modulePath);
  require.cache[modulePath] = require.cache[tmpModulePath];
  delete require.cache[tmpModulePath];

  var methodKeys = Object.keys(methods[modulePath]);

  for (var i = 0; i < methodKeys.length; i++) {
    var methodKey = methodKeys[i];
    moduleCache.exports[methodKey] = methods[modulePath][methodKey];
  }
}

function load(modulePath) {
  methods[modulePath] = require(modulePath);
}

watch.on('change', swap);

module.exports = reload;
watch.on('add', p => {
debug('On added: ', p)
})
process.on('SIGINT',() => {
watch.close();
debug('Closing watch process.');
process.exit(0)
})