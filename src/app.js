import angular from 'angular';
import chartjs from 'angular-chart.js';

import './css/main.css';

import Constants from './services/Constants';
import WeatherService from './services/WeatherService';
import Home from './pages/home';

const App = angular
.module('app', [
  chartjs,
  Constants.name,
  WeatherService.name,
  Home.name
]);

export default App;
