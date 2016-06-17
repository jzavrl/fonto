angular.module('FontoApp')
  .factory('FontListSvc', ['$log', '$http', function ($log, $http, FontListSvc) {
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

        var family = {
          family: 'family',
          category: 'category',
          files: {},
          last_modified: 'date',
          subsets: {},
          variants: {},
          enabled: true,
        }

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
