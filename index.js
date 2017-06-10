//hotreloader.js
'use strict';
const debug = require('debug')('hotreloader');
const chokidar=require('chokidar');
const path=require('path');
const watch = new chokidar.FSWatcher({ ignored: /[\/\\]\./, persistent: true,awaitWriteFinish:{stabilityThreshold:2000,pollInterval:100} });
require('module-invalidate-2');
function reload(n){
let l=path.resolve(n)
watch.add(l);
return require(l);
}
watch.on('change', p = > {
debug('On change: ', p)
module.invalidateByPath(p)			 
					 })
module.exports = reload;
watch.on('add', p = > {
debug('On added: ', p)
})
process.on('SIGINT',() = > {
watch.close();
debug('Closing watch process.');
process.exit(0)
})