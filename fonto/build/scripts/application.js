var angular=require("angular"),ngan=require("angular-animate"),ngar=require("angular-aria"),ngme=require("angular-messages"),md=require("angular-material"),app=angular.module("FontoApp",["ngMaterial"]).config(["$mdThemingProvider",function(t){t.theme("default").primaryPalette("blue",{"default":"A200"}).accentPalette("pink")}]);angular.module("FontoApp").controller("FontoController",["FontListSvc",function(t){var n=this;n.fonts={},n.loading=!0,t.loadFonts({},function(t){t.then(function(t){n.loading=!1,n.fonts=t},function(){n.loading=!0},function(){n.loading=!0})})}]),angular.module("FontoApp").directive("fontoFonts",function(){return{restrict:"E",templateUrl:"source/fonts/fonts.html"}}),angular.module("FontoApp").factory("FontListSvc",["$log","$http","$timeout","$q",function(t,n,e,o){return{loadFontAPI:function(t,e){if("google"!=t)return!1;var o="https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDGavjqjIkNU4CV9DHosp0xXV8pJyEQLXk";n.get(o).then,n.get(o).success(function(t){e(t)})},loadFontDatabase:function(){var t=require("nedb"),n=require("appdirectory"),e=new n({appName:"Fonto",appVersion:"v010"});return new t({filename:e.userData()+"/database/Fonts.db",autoload:!0})},loadFonts:function(t,n){var e=this,a=e.loadFontDatabase(),r=o.defer();a.find(t,function(t,e){setTimeout(function(){r.notify("Starting."),t?r.reject("Error."):r.resolve(e)},1e3),n(r.promise)})},syncFonts:function(t){var n=this,e=n.loadFontDatabase();n.loadFontAPI(t,function(t){for(var n=t.items,o=0;o<n.length;o++){var a={family:n[o].family,category:n[o].category,files:n[o].files,lastModified:n[o].lastModified,subsets:n[o].subsets,styles:{count:n[o].variants.length,styles:n[o].variants},enabled:!1,defaultSize:32};e.update({family:n[o].family},a,{upsert:!0},function(){})}})},downloadFontFile:function(t,n,e){var o=require("http"),a=require("fs"),r=a.createWriteStream(n);o.get(t,function(t){t.pipe(r),r.on("finish",function(){r.close(e)})}).on("error",function(){a.unlink(n)})}}}]),angular.module("FontoApp").directive("fontoSidenav",function(){return{restrict:"E",templateUrl:"source/sidenav/sidenav.html"}}),angular.module("FontoApp").controller("ToolbarCtrl",["$mdSidenav",function(t){var n=this;n.toggleSidenav=function(){t("sidenav").toggle()},n.openMenu=function(t,n){t(n)}}]),angular.module("FontoApp").directive("fontoToolbar",function(){return{restrict:"E",templateUrl:"source/toolbar/toolbar.html"}});
//# sourceMappingURL=application.js.map
