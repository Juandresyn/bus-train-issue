import User from '../../src/model/user';
import UserRepository from '../../src/repositories/userRepository';

const userData = {
  '12345': new User('12345', 30),
  '67890': new User('12345', 30),
  '13579': new User('12345', 30),
  '24680': new User('12345', 30),
};

const user = new UserRepository(userData);

test('The UserRepository costrucction should go accordinlly to the parameters', () => {
  expect(user.data).toBe(userData);
});

test('getUserById should return proper data', () => {
  expect(user.getUserById('12345')).toMatchObject(userData['12345']);
});

test('getAllUsers should return users array', () => {
  expect(user.getAllUsers()).toHaveLength(4);
});
