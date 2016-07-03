var path = require("path");
var execFile = require("child_process").execFile;
var binFile = path.resolve(__dirname + "/wallpaper");

var defaultCallback = function(err, stdout, stderr) {
  if (err) console.error('err: ', err);
  if (stdout) console.log('stdout: ', stdout);
  if (stderr) console.error('stderr: ', stderr);
};

var setWallpaper = function(filename, monitor, callback) {
  var fullPath = path.resolve(filename);
  callback = callback || defaultCallback;
  execFile(binFile, [fullPath, monitor], {cwd: __dirname}, callback);
};

var getDisplayCount = function(callback) {
  callback = callback || defaultCallback;
  execFile(binFile, ["--num-displays"], {cwd: __dirname}, callback);
};

module.exports = {
  setWallpaper: setWallpaper,
  getDisplayCount: getDisplayCount
};
