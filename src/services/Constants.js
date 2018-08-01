import angular from 'angular';

const ConstantsModule = angular
.module('constants.module', [])
.constant('APPID', process.env.OPENWEATHERMAP_APP_ID);

export default ConstantsModule;
