export default class CountryManager {

  constructor($resource) {
    this.resource = $resource('https://restcountries.eu/rest/v1/all');
    this.countries = [];

    this.resource.query().$promise.then((countries) => {
      countries.forEach((country) => {
        this.countries.push(country);
      });
    });
  }
}

CountryManager.$inject = ['$resource'];