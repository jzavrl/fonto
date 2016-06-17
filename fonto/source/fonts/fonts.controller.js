angular.module('FontoApp')
  .controller('FontoController', function(FontListSvc) {
    var fonts = this;
    fonts.families = [];

    fonts.size = 32;

    FontListSvc.loadFontAPI('google', function(data) {
      fonts.families = data;
    });

    FontListSvc.saveFontToDatabase('family', function(data) {

    });
  });
