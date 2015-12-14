import angular from 'angular';
import uirouter from 'angular-ui-router';
import ngResource from 'angular-resource';

import routing from './countries.routes';
import CountryListController from './countrylist.controller';
import CountryController from './country.controller';
import CountryManager from './countrymanager.service';

export default angular.module('app.countries', [uirouter, ngResource])
  .config(routing)
  .controller('CountryListController', CountryListController)
  .controller('CountryController', CountryController)
  .service('CountryManager', CountryManager)
  .name;