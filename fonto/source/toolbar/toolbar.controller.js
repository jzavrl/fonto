angular.module('FontoApp')
  .controller('ToolbarCtrl', function($mdSidenav, FontListSvc) {
    var vm = this;

    vm.toggleSidenav = function() {
      $mdSidenav('sidenav').toggle();
    };
    vm.openMenu = function($mdOpenMenu, event) {
      $mdOpenMenu(event);
    };
    vm.toggleSort = function(type) {
      FontListSvc.setFontSort(type);
    };
    vm.currentSort = FontListSvc.getFontSort();
  });
