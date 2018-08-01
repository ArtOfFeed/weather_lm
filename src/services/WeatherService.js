import angular from 'angular';

class WeatherService {
  constructor($http) {
    this.$http = $http;
  }

  getData(location, APPID) {
    return this.$http.get(`//api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=${APPID}`)
    .then((response) => {
      console.log(response.data);

      const columns = response.data.list;
      const main = response.data;
      const data = columns[0];

      const chartsData = columns.reduce((acc, el) => {
        acc.wind.push(el.wind.speed);
        acc.temperature.push(el.main.temp);
        acc.pressure.push(el.main.pressure);
        acc.humidity.push(el.main.humidity);
        acc.date.push(el.dt_txt);
        return acc;
      }, {
        wind: [],
        temperature: [],
        pressure: [],
        humidity: [],
        date: [],
      });

      return {
        main: main,
        data: data,
        chartsData: chartsData,
      };
    });
  }
}

const WeatherServiceModule = angular
.module('weatherservice.module', [])
.service('WeatherService', ['$http', WeatherService]);

export default WeatherServiceModule;
