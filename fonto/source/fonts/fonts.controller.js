angular.module('FontoApp')
  .controller('FontoController', function(FontListSvc) {
    var vm = this;

    vm.fonts = {};
    vm.loading = true;

    FontListSvc.loadFonts({}, function (promise) {
      promise.then(function(fonts) {
        vm.loading = false;
        vm.fonts = fonts;
      }, function(reason) {
        vm.loading = true;
      }, function(update) {
        vm.loading = true;
      });
    });

    // FontListSvc.loadFontAPI('google', function(data) {
    //   fonts.families = data;
    // });
    //
    // FontListSvc.saveFontToDatabase('family', function(data) {
    //
    // });
  });
