# hotreloader
Node.js modules hot reloader. No need the server to restart.

[![NPM version](http://img.shields.io/npm/v/hotreloader.svg?style=flat)](https://npmjs.org/package/hotreloader) 
[![NPM Downloads](https://img.shields.io/npm/dm/hotreloader.svg?style=flat)](https://npmjs.org/package/hotreloader)

## Install

`npm install  hotreloader`

## Usage

```javascript
const reload = require('hotreloader');
// const myModule = require('./myModule.js');
// for myModule.js to reloading you can do so:
const count = reload('./myModule.js') // it's the same like require('./myModule.js')
 console.log(count.count())
 console.log(count.count())
 ```
 ## myModule.js
 
 ```javascript
 var cnt = 0;
 
 var count = () = > {
 return cnt++;
 }
 module.exports={count}
 ```
 ## Then in a router(as example)
 
 Please make changes in a file and then in a router call that module file
 
 ```javascript
 const reload = require('hotreloader');
 var count = reload('./myModule.js');
 router.get('/', async ctx = > {
 ctx.body = count.count();
 })
 ```
 ## Chokidar
 
 Fs watchifying based on chokidar. Its options hardcoded as follows:
 
 `{ ignored: /[\/\\]\./, persistent: true,awaitWriteFinish:{stabilityThreshold:2000,pollInterval:100} }`
 
 ## Happy coding!
 
 ## License
 
 MIT
 



