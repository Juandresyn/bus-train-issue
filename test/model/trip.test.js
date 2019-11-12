import Trip from '../../src/model/trip';
import { TRANSPORT_TYPES, FARES } from '../../src/constants';

test('The Trip costrucction should go accordinlly to the parameters', () => {
  const trip = new Trip(TRANSPORT_TYPES.TUBE, 'Holborn', 'Earl\'s Court', FARES.MAX_POSSIBLE_FARE);

  expect(trip.transportType).toBe(TRANSPORT_TYPES.TUBE);
  expect(trip.origin).toBe('Holborn');
  expect(trip.destination).toBe('Earl\'s Court');
  expect(trip.fare).toBe(FARES.MAX_POSSIBLE_FARE);
});
