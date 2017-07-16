require('./scss/reset.scss');
require('./scss/font-awesome/font-awesome.scss');
require("bootstrap/dist/css/bootstrap.css");
require('./scss/main.scss');
require("./vendors/jquery-3.1.0.js");

require("bootstrap/dist/js/bootstrap")


require("angular");

require("angular-ui-bootstrap");

require("angular-ui-router");


var app = angular.module('app', ['ui.router','ui.bootstrap']);


/** Router */

app.config(
    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function($controllerProvider, $compileProvider, $filterProvider, $provide) {
            // lazy controller, directive and service
            app.controller = $controllerProvider.register;
            app.directive = $compileProvider.directive;
            app.filter = $filterProvider.register;
            app.factory = $provide.factory;
            app.service = $provide.service;
            app.constant = $provide.constant;
            app.value = $provide.value;
        }
    ])

require('./router');


require('./directives/common.js');
require('./vendors/angular.DatetimePicker/index.js');


angular.bootstrap(document.body, ['app']);