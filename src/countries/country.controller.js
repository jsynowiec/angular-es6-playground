export default class CountryController {

  constructor(countryManager, $stateParams) {
    this.country = countryManager.countries.find((element) => {
      return (element.alpha3Code == $stateParams.countryCode);
    });
  }
}

CountryController.$inject = ['CountryManager', '$stateParams'];