// validate checkboxes
export function validateCheckboxes(optionsObj) {
  const errorCheckbox = document.getElementById("error-checkbox");
  const buttonGenerate = document.getElementById("button-generate");

  if (!Object.values(optionsObj).includes(true)) {
    errorCheckbox.classList.remove("is-hidden");
    buttonGenerate.classList.add("u-button_disabled");
  } else {
    errorCheckbox.classList.add("is-hidden");
    buttonGenerate.classList.remove("u-button_disabled");
  }
}
