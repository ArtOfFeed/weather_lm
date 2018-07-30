import angular from 'angular';
import chartjs from 'angular-chart.js';
import './main.css';

var App = angular.module('app', [chartjs]);

App.controller('MainController', ['$scope', 'WeatherService', ($scope, WeatherService) => {
    $scope.items = ['wind', 'temperature', 'pressure', 'humidity'];
    $scope.location = 'London';
    $scope.getData = () => {
        WeatherService.getData($scope.location).then(response => {
            $scope.singleTempArr = response.singleTempArr;
            $scope.singleWindArr = response.singleWindArr;
            $scope.singlePressureArr = response.singlePressureArr;
            $scope.singleHumidityArr = response.singleHumidityArr;
            $scope.singleDateArr = response.singleDateArr;
            $scope.main = response.main;
            $scope.columns = response.columns;
            $scope.data = response.data;
            $scope.date = response.date;
        }).catch((error) => {
            console.log(error);
            $scope.myData = 'Location doesnt exist';
        });   
    }
    $scope.getData();
}]);

App.service('WeatherService', ['$http', function($http) {
    this.getData = (location) => {
        return $http.get(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${process.env.OPENWEATHERMAP_APP_ID}`).then((response) => {
            let main = response.data;
            let columns = main.list;
            let data = columns[0];
            let date = data.dt_txt.substr(0, 10);

            let singleTempArr = [];
            let singleWindArr = [];
            let singlePressureArr = [];
            let singleHumidityArr = [];
            let singleDateArr = [];

            columns.forEach((el, i) => {
                singleTempArr.push(el.main.temp);
                singleWindArr.push(el.wind.speed);
                singlePressureArr.push(el.main.pressure);
                singleHumidityArr.push(el.main.humidity);
                singleDateArr.push(el.dt_txt);
            });
            return {
                main: main,
                columns: columns,
                data: data,
                date: date,
                singleTempArr: singleTempArr,
                singleWindArr: singleWindArr,
                singlePressureArr: singlePressureArr,
                singleHumidityArr: singleHumidityArr,
                singleDateArr: singleDateArr
            }
        });
    }
}]);

App.controller('TabController', ['$scope', ($scope) => {
    $scope.tab = 1;
    $scope.setTab = (newTab) => {
        $scope.tab = newTab;
    };
    $scope.isSet = (tabNum) => {
        return $scope.tab === tabNum;
    };
}]);

export default App;