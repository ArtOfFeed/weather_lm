import angular from 'angular';
import view from './view.html';
import weatherTabs from '../../components/weatherTabs';

class HomeController {
  constructor(WeatherService, APPID) {
    this.WeatherService = WeatherService;
    this.APPID = APPID;

    this.error = null;
    this.location = 'London';
    this.tabs = ['wind', 'temperature', 'pressure', 'humidity'];
    this.main = null;
    this.data = null;
    this.chartsData = null;
    this.date = null;

    this.$onInit = () => this.getData();
  }

  getData() {
    this.error = null;

    this.WeatherService.getData(this.location, this.APPID)
    .then((result) => {
      this.main = result.main;
      this.data = result.data;
      this.chartsData = result.chartsData;
      this.date = result.data.dt_txt.substr(0, 10);
    })
    .catch((err) => {
      console.error(err);
      this.error = 'Location doesn\'t exist';
    });
  }
}

const HomeModule = angular
.module('home.module', [weatherTabs.name])
.component('home', {
  template: view,
  controller: ['WeatherService', 'APPID', HomeController]
});

export default HomeModule;
