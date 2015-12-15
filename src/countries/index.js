import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import routing from './countries.routes';
import CountryManager from './countrymanager.service';
import CountryListController from './countrylist.controller';
import CountryDetails from './countrydetails.directive';

export default angular.module('app.countries', [uirouter, ngResource])
  .config(routing)
  .service('CountryManager', CountryManager)
  .controller('CountryListController', CountryListController)
  .directive('countryDetails', () => new CountryDetails)
  .name;