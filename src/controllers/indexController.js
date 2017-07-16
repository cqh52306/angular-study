angular.module('app')
    .controller('IndexController', ['$scope', function ($scope) {
        $scope.tabs = [{
            name: "全部",
            active: true
        }, {
            name: "音乐",
            active: false
        }, {
            name: "体育",
            active: false
        }, {
            name: "电影",
            active: false
        }, {
            name: "综艺",
            active: false
        }, {
            name: "直播",
            active: false
        }];

        $scope.showMe = function () {
            console.log("=====")

        }



    }]);