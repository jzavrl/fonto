angular.module('FontoApp')
  .controller('FontoController', function(FontListSvc) {
    var fonts = this;
    fonts.families = [];

    fonts.download = false;

    fonts.click = function() {
      fonts.download = true;
      console.log('click');

      download('http://fonts.gstatic.com/s/abeezee/v9/kpplLynmYgP0YtlJA3atRw.ttf', '/Users/JanZavrl/Library/Fonts/abeezee.ttf');
    };

    FontListSvc.getServiceFonts('google').success(function(data) {
      fonts.families = data;
      console.log(data);
    });
  });
