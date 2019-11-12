import Station from '../../src/model/station';
import StationRepository from '../../src/repositories/stationRepository';

const stationData = new Station('Holborn', 1);
const station = new StationRepository(stationData);
const stationRepo = StationRepository.testFactory();

test('The StationRepository costrucction should go accordinlly to the parameters', () => {
  expect(station.data).toBe(stationData);
});

test('getStationByName should return proper data', () => {
  expect(stationRepo.getStationByName('Holborn')).toMatchObject(stationData);
});
