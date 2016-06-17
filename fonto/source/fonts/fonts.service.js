angular.module('FontoApp')
  .factory('FontListSvc', ['$log', '$http', function ($log, $http) {
    return {
      loadFontAPI: function (service, callback) {
        if (service == 'google') {
          $http.get('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDGavjqjIkNU4CV9DHosp0xXV8pJyEQLXk').success(function(data) {
            callback(data);
          });
        } else {
          return false;
        }
      },

      loadFontDatabase: function () {
        var Datastore = require('nedb'),
          AppDirectory = require('appdirectory');

        var app = new AppDirectory({
          appName: 'Fonto',
          appVersion: 'v010'
        });

        return new Datastore({
          filename: app.userData() + '/database/Fonts.db',
          autoload: true
        });
      },

      getFontFromDatabase: function (family, callback) {
        var self = this,
          database = self.loadFontDatabase();

        database.findOne({
          family: family
        }, function (error, matches) {
          if (error) {
            callback(error);
          } else {
            callback(matches);
          }
        });
      },

      saveFontToDatabase: function (family, callback) {
        var self = this,
          database = self.loadFontDatabase();

        database.insert(family, function (error, record) {
          if (error) {
            callback(error);
          } else {
            callback(record);
          }
        });
      },

      syncFonts: function (service) {
        var self = this;
        var db = self.loadFontDatabase();

        self.loadFontAPI(service, function (data) {
          var fonts = data.items;

          for (var i = 0; i < fonts.length; i++) {
            // Set the new database structure
            var family = {
              family: fonts[i].family,
              category: fonts[i].category,
              files: fonts[i].files,
              lastModified: fonts[i].lastModified,
              subsets: fonts[i].subsets,
              styles: {
                count: fonts[i].variants.length,
                styles: fonts[i].variants
              },
              enabled: false,
              defaultSize: 32
            };

            db.update({
              family: fonts[i].family
            }, family, {
              upsert: true
            }, function (error, replaced) {

            });
          }
        });
      },

      downloadFontFile: function (url, destination, callback) {
        var http = require('http'),
          fs = require('fs');

        var file = fs.createWriteStream(destination);
        http.get(url, function(response) {
          response.pipe(file);
          file.on('finish', function() {
            file.close(callback);
          });
        }).on('error', function(error) {
          fs.unlink(destination);
        });
      }
    }
  }]);
