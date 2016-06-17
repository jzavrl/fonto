angular.module('FontoApp')
  .directive('fontoToolbar', function() {
    return {
      restrict: 'E',
      templateUrl: 'source/toolbar/toolbar.html'
    }
  });
