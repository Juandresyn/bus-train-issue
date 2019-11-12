import { FARES, TRANSPORT_TYPES } from '../constants';

/**
 * Class representing an User.
 */
export default class User {

  /**
   * Creating an User.
   * @param {string} id The user Id.
   * @param {number} balance The user Balance.
   */
  constructor(id, balance) {
    this.id = id;
    this.balance = balance;
    this.inTrip = false;
  }

  /**
   * This function discounts the trip fare to the user balance.
   * @param {number} value The trip fare value.
   * @param {Funtion} callback A callback function.
   */
  discountTrip(value, callback) {
    if (this.balance >= value) {
      this.balance -= value;
      callback(value, false);
    } else {
      const errorMessage = 'Not enought balance to start this trip';
      callback(errorMessage, true);

      throw new Error(errorMessage);
    }
  }

  /**
   * Refund balance to the user.
   * @param {number} value The balance to refund.
   */
  refundBalance(value) {
    this.balance += value;
  }

  /**
   * Discounts max fare when beginning the trip.
   * Sets user on a inTrip state.
   * @param {Object} trip The trip the user is taking.
   * @param {Function} callback Callback.
   */
  beginTrip(trip, callback) {
    this.discountTrip(
      trip.transportType === TRANSPORT_TYPES.TUBE ? FARES.MAX_POSSIBLE_FARE : FARES.BUS_JOURNEY,
      callback);

    this.inTrip = true;
  }

  /**
   * Ends the user trip.
   * Calculates value to refund to the user.
   * If user is on inTrip state refund balance.
   * Set inTrip state to false.
   * @param {Object} trip The trip the user is taking.
   * @param {Function} callback Callback.
   */
  endTrip(trip, callback) {
    const valueToRefund = trip.transportType === TRANSPORT_TYPES.TUBE ? FARES.MAX_POSSIBLE_FARE - trip.fare : 0;

    if (this.inTrip) {
      if (trip.transportType === TRANSPORT_TYPES.TUBE) {
        this.refundBalance(valueToRefund);
      }

      callback(valueToRefund.toFixed(2));
      this.inTrip = false;
    }
  }
}
