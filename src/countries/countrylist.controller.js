export default class CountryListController {

  constructor(countryManager) {
    this.countries = countryManager.countries;
  }
}

CountryListController.$inject = ['CountryManager'];