var App = angular.module('app', ['chart.js']);

App.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.location = 'London';
    $scope.getData = function() {
        $http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + $scope.location + '&APPID=6383e11f4b32e184eb4869efe6131eef').then(function(response) {
            $scope.main = response.data;
            $scope.columns =  $scope.main.list;
            $scope.data = $scope.columns[0];
            $scope.date = $scope.data.dt_txt.substr(0, 10);
            $scope.singleTempArr = $scope.columns.map(function(el, i) {
                return el.main.temp;
            });
            $scope.singleWindArr = $scope.columns.map(function(el, i) {
                return el.wind.speed;
            });
            $scope.singlePressureArr = $scope.columns.map(function(el, i) {
                return el.main.pressure;
            });
            $scope.singleHumidityArr = $scope.columns.map(function(el, i) {
                return el.main.humidity;
            });
            $scope.singleDateArr = $scope.columns.map(function(el, i) {
                return el.dt_txt;
            });
            console.log(response.data);
        }, function(response) {
            alert('Location doesnt exist');
            $scope.myData = 'Location doesnt exist';
        });
    }
    $scope.getData();
}]);

App.controller('TabController', ['$scope', function($scope) {
    $scope.tab = 2;
    $scope.setTab = function(newTab) {
        $scope.tab = newTab;
    };
    $scope.isSet = function(tabNum) {
        return $scope.tab === tabNum;
    };
}]);