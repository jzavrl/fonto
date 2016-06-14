angular.module('FontoApp')
  .factory('FontListSvc', function ($http) {
    return {
      getServiceFonts: function (service) {
        if (service == 'google') {
          return $http.get('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDGavjqjIkNU4CV9DHosp0xXV8pJyEQLXk');
        } else {
          return false;
        }
      }
    }
  });
