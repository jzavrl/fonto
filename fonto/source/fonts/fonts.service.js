angular.module('FontoApp')
  .factory('FontListSvc', ['$log', '$http', '$timeout', '$q', function ($log, $http, $timeout, $q) {
    var sort = {
      type: 'family',
      direction: true
    };

    return {
      loadFontAPI: function (service, callback) {
        if (service == 'google') {
          var path = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDGavjqjIkNU4CV9DHosp0xXV8pJyEQLXk';

          $http.get(path)
            .then

          $http.get(path).success(function(data) {
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

      loadFonts: function (families, callback) {
        var self = this,
          database = self.loadFontDatabase(),
          deferred = $q.defer();

        database.find(families, function (error, matches) {
          // setTimeout(function() {
            deferred.notify('Starting.');

            if (error) {
              deferred.reject('Error.');
            } else {
              deferred.resolve(matches);
            }
          // }, 1000);

          callback(deferred.promise);
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

      setFontSort: function (type) {
        if (sort.type == type) {
          sort.direction = !sort.direction;
        }
        else {
          sort.direction = true;
        }
        sort.type = type;
      },

      getFontSort: function () {
        return sort;
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
