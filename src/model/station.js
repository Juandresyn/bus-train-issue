/**
 * Class representing an Station.
 */
export default class Station {

  /**
   * Creating an Station.
   * @param {string} name The Station name.
   * @param  {Array} zones An array of Station Zones.
   */
  constructor(name, ...zones) {
    this.name = name;
    this.zones = zones;
  }
}
