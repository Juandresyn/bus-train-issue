const eventLoggerElement = document.getElementById('event-logger');

/**
 * Handles loggin on dom.
 * @param {string} log The data to log.
 */
export default (log) => {
  let tempChild = document.createElement('span');
  tempChild.className = "log-item";
  tempChild.innerHTML = log.toString();

  eventLoggerElement.appendChild(tempChild);
};
