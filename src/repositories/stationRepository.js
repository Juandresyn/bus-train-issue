import Station from '../model/station';

/**
 * Class representing an Station data repository.
 */
export default class StationRepository {

  /**
   * Creates a StationRepository
   * @param {Object} initialData The station data.
   */
  constructor(initialData) {
    this.data = initialData;
  }

  /**
   * Get an Station by name.
   * @param {string} name The name look for an station by.
   */
  getStationByName(name) {
    return this.data[name] || null;
  }
}

/**
 * Creating mock data.
 */
StationRepository.testFactory = () => new StationRepository(
  {
    'Holborn': new Station('Holborn', 1),
    'Earl\'s Court': new Station('Earl\'s Court', 1, 2),
    'Wimbledon': new Station('Wimbledon', 3),
    'Hammersmith': new Station('Hammersmith', 2),
  }
);
