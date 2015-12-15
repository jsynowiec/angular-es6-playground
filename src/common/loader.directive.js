require('./loader.scss');

export default class Loader {
  constructor() {
    this.template = require('./loader.directive.html'); 
    this.restrict = 'E';
  }
}