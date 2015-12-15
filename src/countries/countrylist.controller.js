export default class CountryListController {

  constructor(countryManager) {
    this.countries = countryManager.countries;
    this.country = null;
  }

  selectCountry(country) {
    this.country = country;
  }
}

CountryListController.$inject = ['CountryManager'];