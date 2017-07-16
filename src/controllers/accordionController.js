angular.module('app')
    .controller('AccordionController', ['$scope', function ($scope) {

    $scope.expanders = [{
        title: 'Click me to expand',
        text: 'Hi there folks, I am the content that was hidden but is now shown.'
    }, {
        title: 'Click this',
        text: 'I am even better text than you have seen previously'
    }, {
        title: 'Test',
        text: 'test'
    }];

    }]);