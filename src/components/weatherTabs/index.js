import angular from 'angular';
import view from './view.html';

class WeatherTabsController {
  constructor() {
    this.selected = null;
  }

  setTab(event, tabName) {
    event.preventDefault();
    this.selected = tabName;
  };

  $onInit() {
    this.selected = this.tabs[0];
  };
}

const WeatherTabsModule = angular
.module('weathertabs.module', [])
.component('weatherTabs', {
  template: view,
  controller: WeatherTabsController,
  bindings: {
    tabs: '=',
    data: '='
  }
});

export default WeatherTabsModule;
