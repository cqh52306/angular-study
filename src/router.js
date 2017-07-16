angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/app/index');
    $stateProvider
        .state('app', {
            abstract: true,
            url: '/app',
            templateProvider: ['$q', function ($q) {
                var defered = $q.defer();
                require.ensure(['./tpl/app.html'], function () {
                    require('./scss/app.scss')
                    var tpl = require('./tpl/app.html');
                    defered.resolve(tpl);
                });
                return defered.promise;

            }]

        })
        .state('app.index', {
            url: '/index',
            templateProvider: ['$q', function ($q) {
                var defered = $q.defer();
                require.ensure(['./tpl/index.html'], function () {
                    var tpl = require('./tpl/index.html');
                    defered.resolve(tpl);
                });
                return defered.promise;

            }],
            resolve: {
                foo: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var module = require('./controllers/indexController.js');
                        deferred.resolve(module);
                    });

                    return deferred.promise;
                }]
            },
            controller: 'IndexController'
        })
        //表单提交
        .state('app.submit', {
            url: '/submit',
            templateProvider: ['$q', function ($q) {
                var defered = $q.defer();
                require.ensure(['./tpl/submit.html'], function () {
                    var tpl = require('./tpl/submit.html');
                    defered.resolve(tpl);
                });
                return defered.promise;

            }],
            resolve: {
                foo: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var module = require('./controllers/submitController.js');
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }]
            },
            controller: 'submitController'
        })
        //$watch
        .state('app.watch', {
            url: '/watch',
            templateProvider: ['$q', function ($q) {
                var defered = $q.defer();
                require.ensure(['./tpl/watch.html'], function () {
                    var tpl = require('./tpl/watch.html');
                    defered.resolve(tpl);
                });
                return defered.promise;

            }],
            resolve: {
                foo: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var module = require('./controllers/watchController.js');
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }]
            },
            controller: 'watchController'
        })
        //手風情
        .state('app.accordion', {
            url: '/accordion',
            templateProvider: ['$q', function ($q) {
                var defered = $q.defer();
                require.ensure(['./tpl/accordion.html'], function () {
                    require('./scss/accordion.scss')                    
                    var tpl = require('./tpl/accordion.html');
                    defered.resolve(tpl);
                });
                return defered.promise;

            }],
            resolve: {
                foo: ['$q', function ($q) {
                    var deferred = $q.defer();
                    require.ensure([], function () {
                        var module = require('./controllers/accordionController.js');
                        deferred.resolve(module);
                    });
                    return deferred.promise;
                }]
            },
            controller: 'AccordionController'
        })
        ;
}]);