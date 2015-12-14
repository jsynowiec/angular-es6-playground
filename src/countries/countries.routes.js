routes.$inject = ['$stateProvider'];

export default function routes($stateProvider) {
  $stateProvider
    .state('countries', {
      url: '/countries',
      template: require('./countrylist.html'),
      controller: 'CountryListController',
      controllerAs: 'clctrl'
    })
    .state('country', {
      url: '/countries/:countryCode',
      template: require('./country.html'),
      controller: 'CountryController',
      controllerAs: 'cctrl'
    });
}