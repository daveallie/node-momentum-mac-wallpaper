#!/usr/bin/env node

var sqlite3 = require("sqlite3").verbose();
var helpers = require("./helpers");
var directories = require("./directories");
var wallpaper = require("./wallpaper_wrapper");

var setWallpaper = function() {
  var db = new sqlite3.Database(directories.localStorage, sqlite3.OPEN_READONLY);
  helpers.getValidStamps(db, function(stamps) {
    var len = stamps.length;
    var callback;

    // Start with the newest backgrounds
    stamps.sort().reverse();

    wallpaper.getDisplayCount(function(err, count) {
      var monitors = +count;
      var done = 0;

      var generateCallback = function(stamp, i) {
        return function() {
          done++;
          if (done >= monitors) {
            db.close();
          }
          wallpaper.setWallpaper(directories.getBgPath(stamp), i);
        };
      };

      for (var i = 0; i < monitors; i++) {
        var stamp = stamps[i % len];
        helpers.getOrFetchWallpaperFile(db, stamp, generateCallback(stamp, i));
      }
    });
  });
};

setWallpaper();
