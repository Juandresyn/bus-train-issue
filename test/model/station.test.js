import Station from '../../src/model/station';

test('The Station costrucction should go accordinlly to the parameters', () => {
  const stationData = {
    name: 'Earl\'s Court',
    zone: 1,
  };

  const station = new Station(stationData.name, stationData.zone);

  expect(station.name).toBe(stationData.name);
  expect(station.zones).toEqual(
    expect.arrayContaining([stationData.zone])
  );
});
