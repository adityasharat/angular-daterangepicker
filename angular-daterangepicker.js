/*
 * Use this directive to use bootstrap-daterangepicker with angularJS
 * https://github.com/dangrossman/bootstrap-daterangepicker
 * http://adityasharat.github.io/angular-daterangepicker/
 */
/*global moment*/
(function (angular, moment) {
    var AngularDateRange = angular.module('angular.daterange', []);

    AngularDateRange.directive('dateRangePicker', [

        function () {
            var linker;

            linker = function ($scope, iElm, iAttrs) {
                var start = $scope.start || moment(),
                    end = $scope.end || moment(),
                    ranges = $scope.ranges || defaultRanges,
                    format = iAttrs.format || 'YYYY-MM-DD',
                    opens = iAttrs.opens || 'right',
                    parentId = iAttrs.parentId || 'body',
                    cancelClass,
                    defaultRanges;

                defaultRanges = {};

                iElm.daterangepicker({
                    format: format,
                    ranges: ranges,
                    startDate: start,
                    endDate: end,
                    opens: opens,
                    applyClass: 'btn',
                    cancelClass: cancelClass,
                    parentEl: parentId
                }, function (start, end) {
                    $scope.$apply(function () {
                        $scope.start = start;
                        $scope.end = end;
                    });
                }).val(start.format(format) + ' - ' + end.format(format));

                iElm.on('apply.daterangepicker', function () {
                    if (typeof $scope.onApply === 'function') {
                        $scope.onApply();
                    }
                });
            };

            return {
                name: 'dateRangePicker',
                scope: {
                    start: '=',
                    end: '=',
                    ranges: '=',
                    onApply: '='
                },
                restrict: 'A',
                link: linker
            };
        }
    ]);

}(angular, moment));