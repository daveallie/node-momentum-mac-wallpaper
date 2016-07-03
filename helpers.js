var directories = require("./directories");
var wallpaper = require("./wallpaper_wrapper");
var fs = require("fs");
var path = require("path");
var request = require("request");

var getValidStamps = function(db, callback) {
  db.all("SELECT key FROM ItemTable WHERE key LIKE 'momentum-background-%'", function(err, rows) {
    var stamps = rows.map(function(row) {
      return row.key.toString().slice(20);
    });

    callback(stamps);
  });
};

var downloadWallpaper = function(db, stamp, callback) {
  db.get("SELECT value FROM ItemTable WHERE key = 'momentum-background-" + stamp + "'", function(err, row) {
    var url = JSON.parse(row.value.toString().replace(/[^\x20-\x7F]/g, "")).filename;
    request(url).pipe(fs.createWriteStream(directories.getBgPath(stamp)));
    callback();
  });
};

var getOrFetchWallpaperFile = function(db, stamp, callback) {
  var existingFiles = fs.readdirSync(directories.bgDir);
  var existingFile = existingFiles.find(function(file) {
    file.startsWith(stamp);
  });

  if (existingFile) {
    callback();
  } else {
    downloadWallpaper(db, stamp, callback);
  }
};

module.exports = {
  getOrFetchWallpaperFile: getOrFetchWallpaperFile,
  getValidStamps: getValidStamps
};
