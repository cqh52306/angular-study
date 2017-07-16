angular.module('app')
    .controller('submitController', ['$scope', function ($scope) {

        $scope.funding = {
            startingEstimate: 0
        }

        $scope.computeNeed = function(){
            $scope.funding.change = $scope.funding.startingEstimate * 10;            
        }
        //只要值改变了 都会刷新视图  手动的/别的模块绑定的/服务器的
        $scope.$watch('funding.startingEstimate',$scope.computeNeed)

        $scope.computeNeeded = function () {
            $scope.needed = $scope.startingEstimate * 10;
        }

        $scope.requestFunding = function () {
            window.alert('Sorry please get more customers first')
        }

        $scope.reset = function () {
             $scope.needed = $scope.startingEstimate = 0;
        }


    }]);