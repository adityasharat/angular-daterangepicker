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
                var start = $scope.start,
                    end = $scope.end,
                    ranges = $scope.ranges,
                    format = iAttrs.format,
                    opens = iAttrs.opens || 'right',
                    parentId = iAttrs.parentId || 'body',
                    cancelClass,
                    defaultRanges;

                defaultRanges = {};

                if (iAttrs.cancel === 'true') {
                    cancelClass = 'cancelBtn btn btn-small btn-default';
                } else {
                    cancelClass = 'ng-hide';
                }

                iElm.daterangepicker({
                    format: format || 'YYYY-MM-DD',
                    ranges: ranges || defaultRanges,
                    startDate: start || moment(),
                    endDate: end || moment(),
                    opens: opens,
                    applyClass: 'btn secondary_action_button',
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