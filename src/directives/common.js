var echarts = require('../vendors/echarts.min.js');


var pieOption = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        left: 'center',
        bottom: 0,
        data: ['直达', '其它外链', '搜索引擎', '直接输入网址或书签', 'cnblogs.com', '微博', '微信', '百度', '谷歌', '360', '必应', '其他']
    },
    series: [
        {
            name: '访问来源', //内环 
            type: 'pie',
            selectedMode: 'single', //单一选中模式 
            radius: [0, '30%'], //饼图的半径 [内半径，外半径] 

            label: {
                normal: {
                    position: 'inner' //内置文本标签 
                }
            },
            labelLine: {
                normal: {
                    show: false     //不需要设置引导线 
                }
            },
            data: [
                { value: 335, name: '直达', selected: true },
                { value: 679, name: '其它外链' },
                { value: 1548, name: '搜索引擎' }
            ]
        },
        {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '55%'],

            data: [
                { value: 335, name: '直接输入网址或书签' },
                { value: 310, name: 'cnblogs.com' },
                { value: 234, name: '微博' },
                { value: 135, name: '微信' },
                { value: 1048, name: '百度' },
                { value: 251, name: '谷歌' },
                { value: 147, name: '360' },
                { value: 42, name: '必应' },
                { value: 60, name: '其他' }
            ]
        }
    ]
};

var lineOption = {

    title: {
        text: '订单走势'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            splitLine: {
                show: true
            },
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            name: '订单数量(个)',
            nameGap: 15,
            splitLine: {
                show: true
            },
            type: 'value'
        }
    ],
    series: [
        {
            name: '订单数量(个)',
            type: 'line',
            stack: '总量',
            areaStyle: {
                normal: {
                    color: '#0066ff',
                    opacity: 0.1
                }
            },
            symbol: 'circle',
            lineStyle: {
                normal: {
                    color: '#0066ff'
                }
            },
            itemStyle: { normal: { color: '#0066ff' } },
            data: [120, 132, 101, 134, 90, 230, 210]
        }
    ]
}

angular.module('app')
    .directive('carPie', [function () {
        return {
            restrict: 'EA',
            link: function (scope, el, attr) {
                var myChart = echarts.init(el[0]);
                myChart.setOption(pieOption);
            }
        }
    }])
    .directive('orderLine', [function () {
        return {
            restrict: 'EA',
            link: function (scope, el, attr) {
                var myChart = echarts.init(el[0]);
                myChart.setOption(lineOption);
            }
        }
    }])
    .directive('uiToggleClass', ['$timeout', '$document', function ($timeout, $document) {
        return {
            restrict: 'AC',
            link: function (scope, el, attr) {
                el.on('click', function (e) {
                    e.preventDefault();
                    var classes = attr.uiToggleClass.split(','),
                        targets = (attr.target && attr.target.split(',')) || Array(el),
                        key = 0;
                    angular.forEach(classes, function (_class) {
                        var target = targets[(targets.length && key)];
                        (_class.indexOf('*') !== -1) && magic(_class, target);
                        $(target).toggleClass(_class);
                        key++;
                    });
                    $(el).toggleClass('active');

                    function magic(_class, target) {
                        var patt = new RegExp('\\s' +
                            _class.
                                replace(/\*/g, '[A-Za-z0-9-_]+').
                                split(' ').
                                join('\\s|\\s') +
                            '\\s', 'g');
                        var cn = ' ' + $(target)[0].className + ' ';
                        while (patt.test(cn)) {
                            cn = cn.replace(patt, ' ');
                        }
                        $(target)[0].className = $.trim(cn);
                    }
                });
            }
        };
    }])

    .directive('uiNav', [function () {
        return {
            restrict: 'EA',
            template: '<ul class="list-group">' +
            '<li ng-repeat="lv1 in menus" style="height:30px;" ng-class="list-group-item">' +
            '<a ui-sref="{{lv1.href}}">{{lv1.name}}</a>' +
            '</li>' +
            '</ul>',
            link: function (scope, el, attr) {

                //左侧菜单
                scope.menus = [
                    {
                        "name": "hello World",
                        "href": "app.index"
                    },
                    {
                        "name": "表单",
                        "href": "app.submit"
                    },
                    {
                        "name": "$watch",
                        "href": "app.watch"
                    },
                    {
                        "name": "手风琴",
                        "href": "app.accordion"
                    },
                ]
            }
        }
    }])
    .directive('tab', ['$timeout', function ($timeout) {
        return {
            restrict: 'EA',
            scope: {
                tabs: "=tab",
                showMe: '&'
            },
            template: '' +
            '<ul class="tab">' +
            '<li class="tab-line"></li>' +
            '<li ng-click="activeTab($index)" class="tab-item" ng-class={true:"active",false:""}[tab.active] ng-repeat="tab in tabs">{{tab.name}}</li>' +
            '</ul>',
            link: function (scope, el, attr) {
                scope.activeTab = function (index) {
                    angular.forEach(scope.tabs, function (tab, tabIndex) {
                        tab.active = (tabIndex === index) ? true : false;
                    });
                    console.log(index, "--------")
                    scope.showMe();
                };

                function activeChange() {
                    $timeout(function () {
                        var lis = angular.element(document.getElementsByClassName('tab-item'));
                        var activeLi;
                        angular.forEach(lis, function (liEl) {
                            if (liEl.className.indexOf('active') > -1) {
                                activeLi = liEl;
                                var lineLi = angular.element(document.getElementsByClassName('tab-line')[0]),
                                    liLeft = activeLi.offsetLeft,
                                    liWidth = activeLi.offsetWidth;
                                lineLi.css({
                                    'transform': 'translateX(' + liLeft + 'px)',
                                    '-moz-transform': 'translateX(' + liLeft + 'px)',
                                    '-o-transform': 'translateX(' + liLeft + 'px)',
                                    width: liWidth + "px"
                                });
                            }
                        })
                    }, 100)

                }

                //$timeout(activeChange,1);

                //$timeout(function(){
                scope.$watch('tabs', activeChange, true)
                //},100);


            }
        }
    }])

    .directive('accordion', function() {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    template: '<div ng-transclude></div>',
    controller: function() {
      var expanders = [];
      this.gotOpened = function(selectedExpander) {
        angular.forEach(expanders, function(expander) {
          if (selectedExpander != expander) {
            expander.showMe = false;
          }
        });
      };
      this.addExpander = function(expander) {
        expanders.push(expander);
      };
    }
  };
})

.directive('expander', function() {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    require: '^?accordion',
    scope: {
      expanderTitle: '='
    },
    template: '<div>' + '<div class="ex-title" ng-click="toggle()">{{expanderTitle}}</div>' + '<div class="ex-body" ng-show="showMe" ng-transclude></div>' + '</div>',
    link: function(scope, iElement, iAttrs, accordionController) {
      scope.showMe = false;
      accordionController.addExpander(scope);
      scope.toggle = function toggle() {
        scope.showMe = !scope.showMe;
        accordionController.gotOpened(scope);
      };
    }
  };
})