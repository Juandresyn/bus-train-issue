/**
 * Class representing a Trip.
 */
export default class Trip {

  /**
   * Creating a Trip.
   * @param {string} transportType The type of transport taken.
   * @param {string} origin The origin Station.
   * @param {string} destination The destination Station.
   * @param {number} fare The trip fare.
   */
  constructor(transportType, origin, destination, fare) {
    this.transportType = transportType;
    this.origin = origin;
    this.destination = destination;
    this.fare = fare;
  }
}
