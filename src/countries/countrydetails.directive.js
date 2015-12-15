export default class CountryDetails {
  constructor() {
    this.template = require('./countrydetails.directive.html'); 
    this.restrict = 'EA'; 
    this.scope = {
      country: '='
    };
  }
}