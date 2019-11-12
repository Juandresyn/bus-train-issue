import StationRepository from './repositories/stationRepository';
import UserRepository from './repositories/userRepository';
import FareService from './services/fareService';
import eventLogger from './utils/eventLogger';

let currentUser;

const userRepo = UserRepository.testFactory();
const stationRepo = StationRepository.testFactory();
const fareService = new FareService(stationRepo);
const allUsers = userRepo.getAllUsers();
const allUsersDropdown = document.getElementById('user-dropdown');
const currentBalance = document.getElementById('current-balance');
const takeTripButton = document.querySelectorAll('.js-take-trip');

/**
 * This function creates the option template for the user dropdown
 * @param {Object} user The current user.
 */
const userToOptionTemplate = (user) => {
  return `<option value="${user.id}">${user.id}</option>`;
};

/**
 * This function generates an user trip.
 * @param {string} origin The origin Station
 * @param {string} destination The destination Station
 */
export const tripGenerator = (origin, destination) => () => {
  const tripStart = fareService.createStartingTrip(origin);
  const fullInformation = fareService.calculateFare(origin, destination);

  currentUser.beginTrip(tripStart, (data, error) => {
    if (!error) {
      eventLogger(`Trip started from ${origin} to ${destination}`);
      eventLogger(`Discounted ${data} from user's balance.`);
    } else {
      eventLogger(`Error: ${data}`);
    }
  });

  currentUser.endTrip(fullInformation, (data) => {
    eventLogger(`Trip ended`);
    eventLogger(`Redfunding: ${data} to current user's balance`);
  });

  currentBalance.innerHTML = currentUser.balance;
};

export const takeTripOne = tripGenerator('Holborn', 'Earl\'s Court');
export const takeTripTwo = tripGenerator('328 bus from Earl\'s Court', 'Chelsea');
export const takeTripThree = tripGenerator('Earl\'s Court', 'Hammersmith');

allUsers.forEach((user) => {
  let tempChild = document.createElement('div');
  tempChild.innerHTML = userToOptionTemplate(user);

  allUsersDropdown.appendChild(tempChild.firstChild);
});

/**
 * Event listener for allUsersDropdown to change the current user.
 */
allUsersDropdown.addEventListener('change', ({ target: { value } }) => {
  currentUser = userRepo.getUserById(value);
  currentBalance.innerHTML = currentUser.balance;
});

/**
 * Map trip button click to the trip corresponding function.
 */
takeTripButton.forEach((button) => {
  button.addEventListener('click', ({ target: { id } }) => {
    switch (id) {
    case '1' :
      takeTripOne();
      break;
    case '2' :
      takeTripTwo();
      break;
    case '3' :
      takeTripThree();
      break;
    }
  });
});
