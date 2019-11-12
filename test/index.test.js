import { FARES } from '../src/constants';
import UserRepository from '../src/repositories/userRepository';

test('User should have 30 on balance', () => {
  const userRepo = new UserRepository.testFactory();
  expect(userRepo.getUserById('245432').balance).toBe(30);
});

test('User should have enought balance for trip', () => {
  const userRepo = new UserRepository.testFactory();
  expect(userRepo.getUserById('245432').balance).toBeGreaterThanOrEqual(FARES.MAX_POSSIBLE_FARE);
});
