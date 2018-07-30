import angular from 'angular';
import App from './app';

angular.bootstrap(document, [App.name], {
  strictDi: true
});
