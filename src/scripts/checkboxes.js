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

  const buttonGenerate = document.getElementById("button-generate");
  if (Object.values(options).includes(true)) {
    buttonGenerate.classList.remove("u-button_disabled");
  } else {
    buttonGenerate.classList.add("u-button_disabled");
  }
}

// send object with statuses of checkboxes to main.js
export function getCheckboxesObj() {
  return options;
}

// make checkbox work on keys Enter and Space
export function checkboxKeyboardToggle(labelEl, inputEl) {
  labelEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputEl.checked = !inputEl.checked;
      inputEl.dispatchEvent(new Event("change"));
    }
  });
}
