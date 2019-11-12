import FareService from '../../src/services/fareService';
import StationRepository from '../../src/repositories/stationRepository';
import { TRANSPORT_TYPES, FARES } from '../../src/constants';

const stationRepo = StationRepository.testFactory();
const fareService = new FareService(stationRepo);

test('The FareService costrucction should go accordinlly to the parameters', () => {
  expect(fareService.stationRepository).toBe(stationRepo);
});

test('calculateFare should return accurate fare', () => {
  const service1 = fareService.calculateFare('Holborn', 'Earl\'s Court');
  const service2 = fareService.calculateFare('328 bus from Earl\'s Court', 'Chelsea');
  const service3 = fareService.calculateFare('Earl\'s Court', 'Hammersmith');
  const service4 = fareService.calculateFare('Wimbledon', 'Hammersmith');
  const service5 = fareService.calculateFare('Chelsea', 'Hammersmith');

  expect(service1.fare).toBe(FARES.ANYWHERE_ZONE_1);
  expect(service2.fare).toBe(FARES.BUS_JOURNEY);
  expect(service3.fare).toBe(FARES.ANY_ONE_ZONE_OUTSIDE_1);
  expect(service4.fare).toBe(FARES.ANY_TWO_ZONE_EXCLUDING_1);
  expect(service5.fare).toBe(FARES.BUS_JOURNEY);
});

test('User can not go from TUBE station to a BUS station', () => {
  expect(() => fareService.calculateFare('Earl\'s Court', 'Chelsea')).toThrow();
});

test('Transportation Type should be TUBE when origin and destination are TUBE stations', () => {
  expect(fareService.calculateFare('Earl\'s Court', 'Holborn').transportType).toBe(TRANSPORT_TYPES.TUBE);
});

test('tripInZoneOne should be TRUE when both stations are in zone one', () => {
  const originStation = stationRepo.getStationByName('Earl\'s Court');
  const destinationStation = stationRepo.getStationByName('Holborn');
  const destinationStationZoneTwo = stationRepo.getStationByName('Hammersmith');

  expect(fareService.tripInZoneOne(originStation, destinationStation)).toBeTruthy();
  expect(fareService.tripInZoneOne(originStation, destinationStationZoneTwo)).toBeFalsy();
});

test('tripInSameZone should be TRUE when both stations are in same zone', () => {
  const originStation = stationRepo.getStationByName('Earl\'s Court');
  const destinationStation = stationRepo.getStationByName('Holborn');
  const destinationStationZoneTwo = stationRepo.getStationByName('Wimbledon');

  expect(fareService.tripInSameZone(originStation, destinationStation)).toBeTruthy();
  expect(fareService.tripInSameZone(originStation, destinationStationZoneTwo)).toBeFalsy();
});

test('createStartingTrip should return a Trip', () => {
  const originStation = stationRepo.getStationByName('Earl\'s Court');

  expect(fareService.createStartingTrip(originStation)).toBeTruthy();
});

test('createStartingTrip should return TUBE type if origin is a TUBE station', () => {
  expect(fareService.createStartingTrip('Earl\'s Court').transportType).toBe(TRANSPORT_TYPES.TUBE);
  expect(fareService.createStartingTrip('Chelsea').transportType).not.toBe(TRANSPORT_TYPES.TUBE);
});

test('createStartingTrip should return BUS type if origin is a BUS station', () => {
  expect(fareService.createStartingTrip('Chelsea').transportType).toBe(TRANSPORT_TYPES.BUS);
  expect(fareService.createStartingTrip('Earl\'s Court').transportType).not.toBe(TRANSPORT_TYPES.BUS);
});
