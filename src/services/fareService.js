import Trip from '../model/trip';
import { TRANSPORT_TYPES, FARES } from '../constants';

/**
 * Class representing a Fare service.
 */
export default class FareService {

  /**
   * Creates a FareService
   * @param {Object} stationRepository The station data.
   */
  constructor(stationRepository) {
    this.stationRepository = stationRepository;
  }

  /**
   * Calculates final fare based on origin and destination.
   * @param {string} origin The origin station.
   * @param {string} destination The destination station.
   */
  calculateFare(origin, destination) {
    const originStation = this.stationRepository.getStationByName(origin);
    const destinationStation = this.stationRepository.getStationByName(destination);
    let tripType;

    if (originStation === null) {
      tripType = TRANSPORT_TYPES.BUS;
    } else {
      if (destinationStation === null) {
        throw new Error('You can not travel from the TUBE to a BUS station');
      } else {
        tripType = TRANSPORT_TYPES.TUBE;
      }
    }

    if (tripType === TRANSPORT_TYPES.BUS) {
      return new Trip(tripType, originStation, destinationStation, FARES.BUS_JOURNEY);
    } else {
      const inZoneOne = this.tripInZoneOne(originStation, destinationStation);
      const inSameZone = this.tripInSameZone(originStation, destinationStation);
      let finalFare;

      if (inZoneOne && inSameZone) {
        finalFare = FARES.ANYWHERE_ZONE_1;
      } else if (!inZoneOne && inSameZone) {
        finalFare = FARES.ANY_ONE_ZONE_OUTSIDE_1;
      } else if (inZoneOne && !inSameZone) {
        finalFare = FARES.ANY_TWO_ZONE_INCLUDING_1;
      } else {
        finalFare = FARES.ANY_TWO_ZONE_EXCLUDING_1;
      }

      return new Trip(tripType, originStation, destinationStation, finalFare);
    }
  }

  /**
   * Checks using an origin and a destination is both are in the zone one.
   * @param {string} origin The origin station.
   * @param {string} destination The destination station.
   */
  tripInZoneOne(origin, destination) {
    return origin.zones.includes(1) && destination.zones.includes(1);
  }

  /**
  * Checks using an origin and a destination is both are in the same zone.
   * @param {string} origin The origin station.
   * @param {string} destination The destination station.
   */
  tripInSameZone(origin, destination) {
    return origin.zones.some((originZone) => destination.zones.includes(originZone));
  }

  /**
   * Creates a Trip.
   * @param {string} origin The origin station.
   */
  createStartingTrip(origin) {
    const originStation = this.stationRepository.getStationByName(origin);
    if (originStation) {
      return new Trip(TRANSPORT_TYPES.TUBE, originStation, null, null);
    } else {
      return new Trip(TRANSPORT_TYPES.BUS, null, null, null);
    }
  }
}
