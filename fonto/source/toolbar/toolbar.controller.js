angular.module('FontoApp')
  .controller('ToolbarCtrl', function($scope, $mdSidenav) {
    $scope.toggleSidenav = function() {
      $mdSidenav('sidenav').toggle();
    };
    $scope.openMenu = function($mdOpenMenu, event) {
      $mdOpenMenu(event);
    };
  });
