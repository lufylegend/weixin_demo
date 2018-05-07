/* eslint-env node */
const { exec } = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const minimist = require('minimist');
const UglifyJS = require('uglify-es');
const argv = require('minimist')(process.argv.slice(2));
const PATTERN_JS = /\.js$/;
const ENGINE_JS = /(var[\s]{1}LGlobal)|(var[\s]{1}LButtonSample1)/;
let fromPath;
let toPath;
let combinedContent = '';
getPath()
.then(()=>{
    return readFromDir(path.resolve(__dirname + '/../', fromPath));
})
.then(() => {
    let savePath = path.resolve(__dirname + '/../build/', fromPath);
    console.log('savePath=',savePath);
    if(!isDir(savePath)){
        fs.copySync(path.resolve(__dirname + '/../', 'templete'), savePath);
        //fs.mkdirsSync(savePath);
    }
    return writeFile(`${savePath}/js/Main.js`, UglifyJS.minify(combinedContent, {}).code);
})
.catch((e)=>{
    console.error(`error:${e}`);
});
function getPath(){
    if (argv._.length === 0) {
        return Promise.reject('project not found');
    }
    fromPath = argv._[0]
    return Promise.resolve();
}


function isDir(filepath) {
    return fs.existsSync(filepath) && fs.statSync(filepath).isDirectory();
  }
  function readFromDir(path) {
    return new Promise((resolve, reject) => {
        let files = fs.readdirSync(path);
        for (var i = 0; i < files.length; i++) {
          readFiles(path, files[i]);
        }
        resolve();
    });
  }
  function readFiles(path, filename) {
    if (typeof filename === 'undefined' || filename === '.DS_Store') {
      return;
    }
    if (isDir(path + '/' + filename)) {
      readFromDir(path + '/' + filename);
    } else {
      readFile(path, filename);
    }
  }
  function readFile(path, filename) {
    if (PATTERN_JS.exec(filename)) {
      let data = fs.readFileSync(path + '/' + filename);
      if(ENGINE_JS.exec(data)){
          return;
      }
      console.log(path + '/' + filename);
      combinedContent += data + '\n';
    }
  }
  function writeFile(path, text) {
      return new Promise(function(resolve, reject) {
          fs.writeFile(path, text, function(err) {
              if (err) {
                  reject();
              } else {
                  resolve();
              }
          });
      });
  }