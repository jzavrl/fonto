angular.module('FontoApp')
  .controller('FontoController', function(FontListSvc) {
    var vm = this;

    vm.size = 32;

    // FontListSvc.syncFonts('google');
    var db = FontListSvc.loadFontDatabase();

    db.find({}, function (error, fonts) {
      vm.fonts = fonts;
    });

    // FontListSvc.loadFontAPI('google', function(data) {
    //   fonts.families = data;
    // });
    //
    // FontListSvc.saveFontToDatabase('family', function(data) {
    //
    // });
  });
