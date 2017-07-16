angular.module('app')
    .controller('watchController', ['$scope', function ($scope) {

        $scope.bill = {};

        $scope.items = [
            { title: 'Paint post', quantity: 8, price: 3.95 },
            { title: 'Polka dots', quantity: 17, price: 12.95 },
            { title: 'Pebbles', quantity: 5, price: 6.95 }
        ];

        //总金额
        $scope.totalCart = function () {
            var total = 0;
            for (var i = 0, len = $scope.items.length; i < len; i++) {
                total = total + $scope.items[i].price * $scope.items[i].quantity;
            }

            return total;
        }

        //最终价格
        $scope.subtotal = function () {
            return $scope.totalCart() - $scope.bill.discount;
        }

        //优惠金额  大于100 优惠10元
        function calculateDiscount(newValue, oldValue, scope) {
            $scope.bill.discount = newValue > 100 ? 10 : 0;
        }

        //监听总金额的变化
        $scope.$watch($scope.totalCart, calculateDiscount)


    }]);