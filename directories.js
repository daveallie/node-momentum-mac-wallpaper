var fs = require("fs");
var path = require("path");

var home = process.env.HOME;

// The name of the momentum directory may change over time due to updates,
// so it's better not to hard code it.

var base = home + "/Library/Application Support/Google/Chrome/Default";
var extensionKey = "laookkfknpbbblfpciffpaejjkokdgca";
var directory = fs.readdirSync(base + "/Extensions/" + extensionKey)[0];

var momentumPath = base + "/Extensions/" + extensionKey + "/" + directory + "/";
var localStorage = base + "/Local Storage/chrome-extension_" + extensionKey + "_0.localstorage";
var bgDir = __dirname + "/bg";

if (!fs.existsSync(bgDir)){
    fs.mkdirSync(bgDir);
}

var getBgPath = function(filename) {
  return path.resolve(bgDir + "/" + filename);
};

module.exports = {
  bgDir: bgDir,
  getBgPath: getBgPath,
  momentumPath: momentumPath,
  localStorage: localStorage
};
