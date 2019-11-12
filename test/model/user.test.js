import User from '../../src/model/user';
import Trip from '../../src/model/trip';
import { TRANSPORT_TYPES, FARES } from '../../src/constants';

const userData = {
  id: '123',
  balance: 30,
};

test('The User costrucction should go accordinlly to the parameters', () => {
  const user = new User(userData.id, userData.balance);

  expect(user.id).toEqual('123');
  expect(user.balance).toEqual(30);
  expect(user.inTrip).toBeFalsy();
});

test('User should be discounted by the value passed', () => {
  const user = new User(userData.id, userData.balance);
  user.discountTrip(10, () => null);

  expect(user.balance).toEqual(30 - 10);
});

test('User should not be discounted more than user balance', () => {
  const user = new User(userData.id, userData.balance);

  expect(() => user.discountTrip(40, () => null)).toThrow();
  expect(user.balance).toBe(30);
});

test('User refund should be applied', () => {
  const user = new User(userData.id, userData.balance);
  user.refundBalance(10);

  expect(user.balance).toBe(40);
});

test('User should start BUS trip with the correct fare discount', () => {
  const user = new User(userData.id, userData.balance);
  const trip = new Trip(TRANSPORT_TYPES.BUS, null, null, null);

  user.beginTrip(trip, () => null);

  expect(user.inTrip).toBeTruthy();
  expect(user.balance).toBe(30 - FARES.BUS_JOURNEY);
});

test('User should start TUBE trip with the correct fare discount', () => {
  const user = new User(userData.id, userData.balance);
  const trip = new Trip(TRANSPORT_TYPES.TUBE, 'Station 1', null, null);

  user.beginTrip(trip, () => null);

  expect(user.inTrip).toBeTruthy();
  expect(user.balance).toBe(30 - FARES.MAX_POSSIBLE_FARE);
});

test('User should end TUBE trip and be refunded', () => {
  const user = new User(userData.id, userData.balance);
  const tripBegin = new Trip(TRANSPORT_TYPES.TUBE, 'Station 1', null, null);
  const tripEnd = new Trip(TRANSPORT_TYPES.TUBE, 'Station 1', 'Station 1', FARES.ANYWHERE_ZONE_1);

  user.beginTrip(tripBegin, () => null);
  user.endTrip(tripEnd, () => null);

  expect(user.inTrip).toBeFalsy();
  expect(user.balance).toBe(30 - FARES.ANYWHERE_ZONE_1);
});

test('User should end BUS trip', () => {
  const user = new User(userData.id, userData.balance);
  const tripBegin = new Trip(TRANSPORT_TYPES.BUS, 'Bus Station 1', null, null);
  const tripEnd = new Trip(TRANSPORT_TYPES.BUS, 'Bus Station 1', 'Bus Station 1', null);

  user.beginTrip(tripBegin, () => null);
  user.endTrip(tripEnd, () => null);

  expect(user.inTrip).toBeFalsy();
  expect(user.balance).toBe(30 - FARES.BUS_JOURNEY);
});
