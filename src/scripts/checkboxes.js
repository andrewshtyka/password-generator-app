import * as Validate from "./validate";

// get status of each checkbox
const options = {};

// init checkboxes object
export function initCheckboxObj(selectors) {
  if (!selectors) return;

  selectors.forEach((selector) => {
    options[selector.id] = selector.checked;
  });
}

// update checkboxes
export function updateCheckboxObj(event) {
  options[event.target.id] = event.target.checked;
  Validate.validateCheckboxes(options);
}

// send object with statuses of checkboxes to main.js
export function getCheckboxesObj() {
  return options;
}
