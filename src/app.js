require('./app.scss');

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './app.config';

import home from './home';
import countries from './countries';

angular.module('app', [uirouter, home, countries])
  .config(routing);