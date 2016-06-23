angular.module('FontoApp')
  .controller('ToolbarCtrl', function($mdSidenav) {
    var vm = this;

    vm.toggleSidenav = function() {
      $mdSidenav('sidenav').toggle();
    };
    vm.openMenu = function($mdOpenMenu, event) {
      $mdOpenMenu(event);
    };
  });
