import angular from 'angular';

import Loader from './loader.directive';

export default angular.module('app.common', [])
  .directive('loader', () => new Loader)
  .name;